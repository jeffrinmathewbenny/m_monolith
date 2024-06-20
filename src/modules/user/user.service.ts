import User from './user.model';
import Product from '../product/product.model';
import productClient from './user.grpcClient';

class UserService {
  private users: User[] = [
    { userId: '1', name: 'John Doe', email: 'john@example.com' },
    { userId: '2', name: 'Jane Doe', email: 'jane@example.com' }
  ];

  getUsers(): User[] {
    return this.users;
  }

  getUserById(userId: string): User | undefined {
    return this.users.find(user => user.userId === userId);
  }

  createUser(user: User): User {
    this.users.push(user);
    return user;
  }

  updateUser(userId: string, updatedUser: User): User | undefined {
    let userIndex = this.users.findIndex(user => user.userId === userId);
    if (userIndex !== -1) {
      this.users[userIndex] = { ...updatedUser, userId };
      return this.users[userIndex];
    }
    return undefined;
  }

  deleteUser(userId: string): boolean {
    const initialLength = this.users.length;
    this.users = this.users.filter(user => user.userId !== userId);
    return this.users.length !== initialLength;
  }

  async getUserWithProduct(userId: string): Promise<{ user: User, product: Product | null } | undefined> {
    const user = this.getUserById(userId);
    let product = null;
    if (!user) {
      return undefined;
    }
    try {
      const response = await new Promise<any>((resolve, reject) => {
        productClient.getProduct({ productId: '1' }, (error: any, response: any) => {
          if (error) {
            reject(error);
          } else {
            resolve(response);
          }
        });
      });
      product = response;
    } catch (error) {
      console.error('Error fetching product:', error);
      product = null;
    }
    return { user, product };
  }
}

export default new UserService();
