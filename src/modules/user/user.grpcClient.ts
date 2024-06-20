import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { resolve } from 'path';

const PROTO_PATH = resolve(__dirname, '../product/product.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition) as any;
const productProto = protoDescriptor.product;

const productClient = new productProto.ProductService('localhost:50052', grpc.credentials.createInsecure());

export default productClient;
