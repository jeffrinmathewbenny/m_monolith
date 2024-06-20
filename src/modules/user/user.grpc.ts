import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { resolve } from 'path';
import UserService from './user.service';
import productClient from './user.grpcClient';

const PROTO_PATH = resolve(__dirname, './user.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition) as any;
const userProto = protoDescriptor.user;

class UserGrpcService implements grpc.UntypedServiceImplementation {
  [method: string]: grpc.UntypedHandleCall;

  getUser: grpc.handleUnaryCall<any, any> = (call, callback) => {
    const userId = call.request.userId;
    const user = UserService.getUserById(userId);
    if (user) {
      // Call ProductService to get product details
      productClient.getProduct({ productId: '1' }, (error: any, response: any) => {
        if (error) {
          callback(error, null);
        } else {
          callback(null, {
            userId: user.userId,
            name: user.name,
            email: user.email,
            product: response,
          });
        }
      });
    } else {
      callback({
        code: grpc.status.NOT_FOUND,
        message: 'User not found',
      }, null);
    }
  };
}

function startUserGrpcServer() {
  const server = new grpc.Server();
  server.addService(userProto.UserService.service, new UserGrpcService());
  const port = '50051';
  server.bindAsync(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure(), () => {
    console.log(`User gRPC server running at http://127.0.0.1:${port}`);
    server.start();
  });
}

export { startUserGrpcServer };
