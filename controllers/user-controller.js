const { User } = require('../models');

//GETS ALL USERS
module.exports = {
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  //GETS SINGLE USER BY ID
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
    .select('-__v')
    .populate('friends')
    .populate('thoughts')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  //CREATES NEW USER
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },
 //UPDATES USER
 updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  //DELETE A USER AND THEIR THOUGHTS
  deleteUser(req, res) {
    User.findByIdAndRemove({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
         // : Thought.deleteMany({ _id: { $in: user.thoughts } })
      )
     // .then(() => res.json({ message: 'User and thoughts deleted!' }))
      .catch((err) => res.status(500).json(err));
  },

//ADDS A FRIEND
addFriend(req, res) {
  User.findOneAndUpdate(
    { _id: req.params.userId },
    { $push: { friends: req.params.friendId } },
    { runValidators: true, new: true },
  )
    .then((user) =>
      !user
        ? res.status(404).json({ message: 'No user with this id!' })
        : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
},

//REMOVE A FRIEND
deleteFriend(req, res) {
  User.findOneAndDelete({ _id: req.params.friendId })
  .then((friend) =>
    !friend
      ? res.status(404).json({ message: 'No friend with that ID' })
      : User.findOneAndUpdate(
        { friends: req.params.friendId },
        { $pull: { friend: req.params.friendId } },
        { new: true }
        )
  )
  .then(() => res.json({ message: 'Friend deleted!' }))
  .catch((err) => res.status(500).json(err));
},

//GET FRIEND - FOR TESTING
getFriend(req, res) {
  return res.json({ message: 'Friend got!'})
},

};
