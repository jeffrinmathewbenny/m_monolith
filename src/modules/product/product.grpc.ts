import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { resolve } from 'path';
import ProductService from './product.service';

const PROTO_PATH = resolve(__dirname, './product.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition) as any;
const productProto = protoDescriptor.product;

class ProductGrpcService implements grpc.UntypedServiceImplementation {
  [method: string]: grpc.UntypedHandleCall;

  getProduct: grpc.handleUnaryCall<any, any> = (call, callback) => {
    const productId = call.request.productId;
    const product = ProductService.getProductById(productId);
    if (product) {
      callback(null, { productId: product.productId, name: product.name, price: product.price });
    } else {
      callback({
        code: grpc.status.NOT_FOUND,
        message: 'Product not found',
      }, null);
    }
  };
}

function startProductGrpcServer() {
  const server = new grpc.Server();
  server.addService(productProto.ProductService.service, new ProductGrpcService());
  const port = '50052';
  server.bindAsync(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure(), () => {
    console.log(`Product gRPC server running at http://127.0.0.1:${port}`);
    server.start();
  });
}

export { startProductGrpcServer };
