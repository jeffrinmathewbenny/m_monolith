import app from './app';
import { startUserGrpcServer } from './modules/user/user.grpc';
import { startProductGrpcServer } from './modules/product/product.grpc';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`HTTP server running on port ${PORT}`);
});

startUserGrpcServer();
startProductGrpcServer();
