import express from 'express';
import UserController from '../Controllers/User';

const UserRouter = express.Router();

UserRouter.post('/create', UserController.createUser);
// UserRouter.post('/update/:id', upload.single('file'), UserController.updateUser);
// UserRouter.delete('/delete/:id', UserController.deleteUser);
UserRouter.post('/update/:id', UserController.updateUser);

UserRouter.get('/:id', UserController.getUserById);
// UserRouter.get('/current', UserController.getCurrentUser);
// UserRouter.get('/bookmark/:id', UserController.getUsersBookmarks);
// UserRouter.get('/bookmarksevent', UserController.getUsersEventsBookmarks);
// UserRouter.post('/follow/:id', UserController.sendFollowRequest);
// UserRouter.get('/get-requests/:id', UserController.getFollowRequests);
// UserRouter.post('/approve/:id', UserController.approveFollowRequest);
// UserRouter.post('/reject/:id', UserController.rejectFollowRequest);
// UserRouter.get('/getfollowers/:id', UserController.getFollowers);
// UserRouter.get('/getfollowing/:id', UserController.getFollowings);
// UserRouter.post('/unfollow/:id', UserController.unfollow);
// UserRouter.post('/searchUsersByQuery/:query', UserController.searchUsers);
// UserRouter.get('/chatHistory/:id', UserController.chatHistory);
// UserRouter.get('/isUsernameAvailable/:username', UserController.isUsernameAvailable);
// // UserRouter.get('/blockuser/:id', UserController.blockUser);

export default UserRouter;