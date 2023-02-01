const {ObjectId} = require('mongoose').Types;
const {User, Thought} = require('../models');

module.exports = {
    getUsers(req,res) {
        User.find()
        .then(async (users) => {
            const usersObj = users;
        return res.json(usersObj);
        })
        .catch((error) => {
            console.log(error);
            return res.status(500).json(error);
        })
    },
    getSingleUser(req,res) {
        User.findOne({ _id: req.params.userId })
        .select('-__v')
        .then(async (user) =>
        !user
            ? res.status(404).json({message: 'No user with that ID'})
            : res.json({user})
        )
        .catch((error) => {
            console.log(error);
            return res.status(500).json(error);
        });
    },
    createUser(req,res) {
        User.create(req.body)
          .then((user) => res.json(user))
          .catch((error) => res.status(500).json(error));
    },
    updateUser(req,res) {
        User.findOneAndUpdate(
            { _id: req.params.userId},
            {$set: req.body},
            {runValidators: true, new: true}
        )
        .then((updatedUser) => res.json(updatedUser))
        .catch((error) => res.status(500).json(error));
    },
    deleteUser(req,res) {
        User.findOneAndRemove({ _id: req.params.userId})
          .then((user) =>
            !user
              ? res.status(404).json({message: "User not found!"})
              : Thought.deleteMany({ _id: {$in: user.thoughts}})
          )
          .then(() => res.json({message: 'User and thoughts successfully deleted'})
          )
          .catch((error) => {
            console.log(error);
            res.status(500).json(error);
          });
    },
    newFriend(req,res) {
        User.findOneAndUpdate(
            { _id: req.params.userId},
            { $addToSet: {friends: req.params.friendId}},
            {runValidators: true, new: true}
        )
        .then((user) =>
        !user
            ? res.status(500).json({message: 'User not found!'})
            :res.json(user)
        )
        .catch((error) => res.status(500).json(error));
    },
    deleteFriend(req,res) {
        User.findOneAndUpdate(
            { _id: req.params.userId},
            { $pull: { friends: req.params.friendId}},
            {runValidators: true, new: true}
        )
        .then((user) =>
        !user
            ? res.status(500).json({message: 'User not found!'})
            :res.json(user)
        )
        .catch((error) => res.status(500).json(error));
    }
}