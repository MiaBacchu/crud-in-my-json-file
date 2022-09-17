const express = require('express');
const allUser = require('../../controller/allUser');
const userRoute = express.Router();

userRoute.get('/all',allUser.allUserGet);
userRoute.get('/random',allUser.randomUserGet);
userRoute.post('/save',allUser.randomUserPost);
userRoute.delete('/delete',allUser.randomUserDelete);
userRoute.patch('/update',allUser.randomUserUpdate);
userRoute.patch('/bulk-update',allUser.bulkUserUpdate);

//userRouter exported
module.exports = userRoute;