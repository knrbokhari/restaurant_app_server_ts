import 'dotenv/config';
import 'module-alias/register';
import ProductController from './resources/product/product.controller';
import App from './app';
import UserController from './resources/user/user.controller';
import validateEnv from './utils/validateEnv';

validateEnv();

const app = new App(
    [new UserController(), new ProductController],
    Number(process.env.PORT)
);

app.listen();