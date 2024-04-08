import jwt from 'jsonwebtoken';
import { NextFunction, Response } from 'express';
import { CinelogRequest } from '../types/base';

type DecodedToken = {
	email: string;
	name: string;
	iat: number;
	exp: number;
}

export const isAuthenticated = async (req: CinelogRequest, res: Response, next: NextFunction) => {
	try {
		const token = req.headers.authorization.split(' ')[1];
		const jwtSecret = process.env.JWT_SECRET_KEY;

		const decodedToken = jwt.verify(token, jwtSecret) as DecodedToken;

		req.user = decodedToken;

		next();
	} catch (error) {
		console.log(error);
		return res
			.status(401)
			.json({ message: "Not authorized, token not available" });
	}
}
