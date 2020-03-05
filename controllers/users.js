
const User = require('../models/user');
const Car = require('../models/car');

module.exports = {
    // index: (req, res, next) => {   
    //     User.find({})
    //         .then(users => {
    //             res.status(200).json(users);
    //         })
    //         .catch(err => {
    //             next(err);
    //         });
    // }

    // index: async (req, res, next) => {
    //     try {
    //         const users = await User.find({});
    //         res.status(200).json(users); 
    //     } catch (err) {
    //         next(err);
    //     }               
    // },

    index: async (req, res, next) => {
        const users = await User.find({});
        res.status(200).json(users);
    },

    newUser: async (req, res, next) => {
        const newUser = new User(req.value.body);
        const user = await newUser.save();
        res.status(201).json(user);
    },

    getUser: async (req, res, next) => {
        const { userId } = req.value.params;
        const user = await User.findById(userId);
        res.status(200).json(user);
    },

    replaceUser: async (req, res, next) => {
        // make sure all fields are changed; req.body must contain all fields
        const { userId } = req.value.params;
        const newUser = req.value.body;
        const result = await User.findByIdAndUpdate(userId, newUser, { new: true });
        res.status(200).json(result);
    },

    updateUser: async (req, res, next) => {
        const { userId } = req.value.params;
        const newUser = req.value.body;
        const result = await User.findByIdAndUpdate(userId, newUser, { new: true });
        res.status(200).json(result);
    },

    getUserCars: async (req, res, next) => {
        const { userId } = req.value.params;
        const user = await User.findById(userId).populate('cars');
        res.status(200).json(user.cars);
    },

    newUserCar: async (req, res, next) => {
        const newCar = new Car(req.value.body);        
        const { userId } = req.value.params;
        const user = await User.findById(userId);
        newCar.seller = user;
        await newCar.save();
        user.cars.push(newCar._id);
        await user.save();
        res.status(201).json(newCar);
    }
};