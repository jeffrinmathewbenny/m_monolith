import express from 'express';
import userRoutes from './modules/user/user.route';
import productRoutes from './modules/product/product.route';

const app = express();

app.use(express.json());
app.use('/users', userRoutes);
app.use('/products', productRoutes);

export default app;
