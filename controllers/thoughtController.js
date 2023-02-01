const {User, Thought} = require('../models');

module.exports = {
    getThoughts(req, res) {
        Thought.find()
          .then((thoughts) => res.json(thoughts))
          .catch((error) => res.status(500).json(error));
      },
      getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId})
          .select('-__v')
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No thought with that ID' })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
      },
      createThought(req, res) {
        Thought.create(req.body)
          .then((thought) => res.json(thought))
          .catch((error) => {
            console.log(error);
            return res.status(500).json(error);
          });
      },
      deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId})
          .then((thought) =>
            !thought
              ? res.status(404).json({message: 'No thought with that ID'})
              : res.json({message: 'Thought deleted!'})
          )
          .catch((error) => res.status(500).json(error));
      },
      updateThought(req, res) {
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId},
          {$set: req.body},
          {runValidators: true, new: true}
        )
          .then((thought) =>
            !thought
              ? res.status(404).json({message: 'No thought with this id!'})
              : res.json(thought)
          )
          .catch((error) => res.status(500).json(error));
      },
      addReaction(req,res) {
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId},
          {$addToSet: {reactions: req.body}},
          {runValidators: true, new: true}
          )
          .then((thought) =>
          !thought
            ? res.status(500).json({message: 'Thought not found!'})
            : res.json(thought)
          )
          .catch((error) => res.status(500).json(error))
      },
      deleteReaction(req,res) {
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId},
          {$pull: {reactions: {_id: req.params.reactionId}}},
          {runValidators: true, new: true}
          )
          .then((thought) =>
          !thought
            ? res.status(500).json({message: 'Thought not found!'})
            : res.json(thought)
          )
          .catch((error) => res.status(500).json(error))
      }
}