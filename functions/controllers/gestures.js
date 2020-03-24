
const functions = require('firebase-functions');
const admin = require('firebase-admin');

// TODO: tidy up code

// firebase admin sdk init
admin.initializeApp(functions.config().firebase);

// database connection
const db = admin.firestore();

module.exports = {
    index: (req, res, next) => {        
        db.collection('gestures').get().then(snapshot => {
            const gestures = [];
            snapshot.docs.forEach(doc => {
                const fsGesture = doc.data();
                strokifyPoints(fsGesture);
                gestures.push(fsGesture);
            });

            res.status(200).json(gestures);
            return null;
        }).catch(error => { 
            res.status(500).json(error);
        });

    },

    newGesture: (req, res, next) => {
        const newGesture = req.value.body;
        pointifyStrokes(newGesture);

        db.collection('gestures').add(newGesture).then(ref => {
            res.status(201).json({
                id: ref.id,
                gesture: newGesture
            });
            return null;
        }).catch(error => { 
            res.status(500).json(error);
        });
    },

    getGesture: (req, res, next) => {
        const { gestureId } = req.value.params;
        console.log(gestureId);
        db.collection('gestures')
            .doc(gestureId)
            .get().then(doc => {
                const fsGesture = doc.data();
                strokifyPoints(fsGesture);

                res.status(200).json(fsGesture);
                return null;
            }).catch(error => { 
                res.status(500).json(error);
            });
    }
};

function pointifyStrokes(gesture) {
    const strokes2dArray = gesture.strokes;
    const points = [];
    for (const stroke of strokes2dArray) {
        points.push(...stroke);
    }
    gesture.strokes = points;
}

function strokifyPoints(fsGesture) {
    const pointsArray = fsGesture.strokes;
    const strokes2dArray = [];
    for (const point of pointsArray) {
        if (!strokes2dArray[point.strokeId]) {
            strokes2dArray[point.strokeId] = [];
        }
        strokes2dArray[point.strokeId].push(point);
    }
    fsGesture.strokes = strokes2dArray;
}