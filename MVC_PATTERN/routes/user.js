const express = require('express');
const { getAllUsers, getUserById, updateUserById, createUser } = require('../controllers/user');
const router = express.Router();






router.get('/', getAllUsers);


router.route('/:id')
    .get(getUserById)
    .patch(updateUserById);



router.post('/', createUser);

module.exports = router;


