import { Request, Response } from 'express';
import ProductService from './product.service';

class ProductController {
  getProduct(req: Request, res: Response) {
    const productId = req.params.productId;
    const product = ProductService.getProductById(productId);
    if (product) {
      res.json(product);
    } else {
      res.status(404).send('Product not found');
    }
  }
}

export default new ProductController();
