import expres from 'express';
import { authRouter } from './auth';
import { homeRouter } from './home';

export const routes = expres.Router();

routes.use('/auth', authRouter);
routes.use('/home', homeRouter);
