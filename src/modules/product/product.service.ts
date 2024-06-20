class ProductService {
  private products = [
    { productId: '1', name: 'Product A', price: 10.0 },
    { productId: '2', name: 'Product B', price: 20.0 }
  ];

  getProductById(productId: string) {
    return this.products.find(product => product.productId === productId);
  }
}

export default new ProductService();
