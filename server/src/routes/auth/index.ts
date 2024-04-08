import express from 'express';
import * as authHandlers from '../../handlers/auth';

export const authRouter = express.Router();

authRouter.post('/login', authHandlers.login);
authRouter.post('/register', authHandlers.register);

