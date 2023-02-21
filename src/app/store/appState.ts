import { BlogState } from './reducer/blog.reducer';
import { CartState } from './reducer/cart.reducer';
import { LoginState } from './reducer/login.reducer';
import { ProductState } from './reducer/product.reducer';

export interface AppState {
  app: {
    product: ProductState;
    login: LoginState;
    cart: CartState;
    blogs: BlogState;
  };
}
