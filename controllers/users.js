
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
        const newUser = new User(req.body);
        const user = await newUser.save();
        res.status(201).json(user);
    },

    getUser: async (req, res, next) => {
        const { userId } = req.params;
        const user = await User.findById(userId);
        res.status(200).json(user);
    },

    replaceUser: async (req, res, next) => {
        // make sure all fields are changed
        const { userId } = req.params;
        const newUser = req.body;
        const result = await User.findByIdAndUpdate(userId, newUser, { new: true });
        res.status(200).json(result);
    },

    updateUser: async (req, res, next) => {
        const { userId } = req.params;
        const newUser = req.body;
        const result = await User.findByIdAndUpdate(userId, newUser, { new: true });
        res.status(200).json(result);
    },

    getUserCars: async (req, res, next) => {
        const { userId } = req.params;
        const user = await User.findById(userId).populate('cars');
        res.status(200).json(user.cars);
    },

    newUserCar: async (req, res, next) => {
        const newCar = new Car(req.body);        
        const { userId } = req.params;
        const user = await User.findById(userId);
        newCar.seller = user;
        await newCar.save();
        user.cars.push(newCar);
        await user.save();
        res.status(201).json(newCar);
    }
};