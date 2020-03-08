
const Gesture = require('../models/gesture');

module.exports = {
    index: async (req, res, next) => {
        const gestures = await Gesture.find({});
        res.status(200).json(gestures);
    },

    newGesture: async (req, res, next) => {
        const newGesture = new Gesture(req/*.value*/.body);
        const gesture = await newGesture.save();
        res.status(201).json(gesture);
    },

    getGesture: async (req, res, next) => {
        const { gestureId } = req.value.params;
        const gesture = await Gesture.findById(gestureId);
        res.status(200).json(gesture);
    }
};