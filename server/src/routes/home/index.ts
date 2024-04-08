import express from 'express';
import { isAuthenticated } from '../../middlewares/auth';
import { CinelogRequest } from '../../types/base';

export const homeRouter = express.Router();

homeRouter.get('/test', isAuthenticated, (req: CinelogRequest, res) => {
	return res.status(200).json({
		done: 1
	});
});
