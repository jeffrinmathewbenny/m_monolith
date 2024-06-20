// import { Request, Response } from 'express';
// import * as grpc from '@grpc/grpc-js';
// import * as protoLoader from '@grpc/proto-loader';
// import { resolve } from 'path';

// const PROTO_PATH = resolve(__dirname, './user.proto');
// const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
//   keepCase: true,
//   longs: String,
//   enums: String,
//   defaults: true,
//   oneofs: true,
// });
// const protoDescriptor = grpc.loadPackageDefinition(packageDefinition) as any;
// const userProto = protoDescriptor.user;

// const client = new userProto.UserService('localhost:50051', grpc.credentials.createInsecure());

// class UserController {
//   public static async getUser(req: Request, res: Response) {
//     const userId = req.params.userId;
//     client.getUser({ userId }, (error: any, response: any) => {
//       if (error) {
//         return res.status(500).json({ error: error.message });
//       }
//       return res.status(200).json(response);
//     });
//   }
// }

// export default UserController;


import { Request, Response } from 'express';
import UserService from './user.service';
import User from './user.model';

class UserController {
  getUsers(req: Request, res: Response): void {
    const users = UserService.getUsers();
    res.json(users);
  }

  getUserById(req: Request, res: Response): void {
    const userId = req.params.userId;
    const user = UserService.getUserById(userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).send('User not found');
    }
  }

  createUser(req: Request, res: Response): void {
    const newUser: User = req.body;
    const createdUser = UserService.createUser(newUser);
    res.status(201).json(createdUser);
  }

  updateUser(req: Request, res: Response): void {
    const userId = req.params.userId;
    const updatedUser: User = req.body;
    const user = UserService.updateUser(userId, updatedUser);
    if (user) {
      res.json(user);
    } else {
      res.status(404).send('User not found');
    }
  }

  deleteUser(req: Request, res: Response): void {
    const userId = req.params.userId;
    const success = UserService.deleteUser(userId);
    if (success) {
      res.status(204).send();
    } else {
      res.status(404).send('User not found');
    }
  }

  async getUserWithProduct(req: Request, res: Response): Promise<void> {
    const userId = req.params.userId;
    const userWithProduct = await UserService.getUserWithProduct(userId);
    if (userWithProduct) {
      res.json(userWithProduct);
    } else {
      res.status(404).send('User not found');
    }
  }
}

export default new UserController();
