const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
    getFriend,
} = require('../../controllers/user-controller');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router
  .route('/:userId')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);

// /api/users/:userId/friends/:friendId
router
  .route('/:userId/friends/:friendId')
  .put(addFriend)
  .delete(deleteFriend);

// getFriend route for testing
router
.route('/:userId/friends/:friendId')
.get(getFriend);
  
module.exports = router;
