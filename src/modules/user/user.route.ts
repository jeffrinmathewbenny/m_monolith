import { Router } from 'express';
import UserController from './user.controller';

const router = Router();

router.get('/', UserController.getUsers);
router.get('/:userId', UserController.getUserById);
router.post('/', UserController.createUser);
router.put('/:userId', UserController.updateUser);
router.delete('/:userId', UserController.deleteUser);
router.get('/:userId/product', UserController.getUserWithProduct);

export default router;
