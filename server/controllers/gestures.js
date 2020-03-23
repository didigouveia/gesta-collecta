
const admin = require('firebase-admin');
const serviceAccount = require('../../../gesta-collecta-firebase-adminsdk-d9hs7-b3e72b43e9');

// TODO: tidy up code

// firebase admin sdk init
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

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
        });
    },

    getGesture: async (req, res, next) => {
        const { gestureId } = req.value.params;
        const gesture = await Gesture.findById(gestureId);
        res.status(200).json(gesture);
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