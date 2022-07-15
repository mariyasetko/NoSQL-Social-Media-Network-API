const { Thought } = require('../models');

//GETS ALL THOUGHTS
module.exports = {
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  //GETS SINGLE THOUGHT BY ID
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .populate('reactions')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  //CREATES NEW THOUGHT
  createThought(req, res) {
    Thought.create(req.body)
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => res.status(500).json(err));
  },
 //UPDATES THOUGHT
 updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  //DELETE A THOUGHT
  deleteThought(req, res) {
    Thought.findByIdAndRemove({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : User.findOneAndUpdate(
            { thoughts: req.params.thoughtId },
            { $pull: { thoughts: req.params.thoughtId } },
            { new: true }
            )
      )
      .then(() => res.json({ message: 'Thought deleted!' }))
      .catch((err) => res.status(500).json(err));
  },

//ADDS A REACTION  
addReaction(req, res) {
  Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $push: { reactions: req.params.reactionId } },
    { runValidators: true, new: true },
  )
    .then((thought) =>
      !thought
        ? res.status(404).json({ message: 'No thought with this id!' })
        : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
},

//REMOVE A REACTION
deleteReaction(req, res) {
  Thought.findOneAndDelete({ _id: req.params.reactionId })
  .then((reaction) =>
    !reaction
      ? res.status(404).json({ message: 'No reaction with that ID' })
      : Thought.findOneAndUpdate(
        { reactions: req.params.reactionId },
        { $pull: { reaction: req.params.reactionId } },
        { new: true }
        )
  )
  .then(() => res.json({ message: 'Reaction deleted!' }))
  .catch((err) => res.status(500).json(err));
},

};
