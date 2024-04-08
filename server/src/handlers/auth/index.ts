import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { doc, getDoc, setDoc } from 'firebase/firestore';

import { logger } from '../../utils/logger';

import firebaseHelpers from '../../utils/firebaseHelpers';

const TOKEN_EXPIRY = 604800; // 1 week in seconds

export const login = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400).json({
				message: "Username or Password not present",
			});
		}

		const collectionRef = firebaseHelpers.getCollectionRef('users');

		const document = await getDoc(doc(collectionRef, email))

		if (!document.exists()) {
			return res.status(401).json({
				message: 'Login not successful',
				error: 'No user found for the provided Username/Password'
			});
		}

		const userData = document.data();

		const isMatchingPass = await bcrypt.compare(password, userData.password);

		let msg = 'Login Failed!';
		let token = '';

		if (isMatchingPass) {
			msg = 'Login Successfull';

			token = jwt.sign(
				{
					email: userData.email,
					name: userData.name
				},
				process.env.JWT_SECRET_KEY,
				{
					expiresIn: TOKEN_EXPIRY,
				}
			);
		}

		return res.status(201).json({
			message: msg,
			token
		});
	} catch (error) {
		logger.error(error);
		return res.status(400).json({
			error: 'Bad Request'
		});
	}
};

export const register = async (req: Request, res: Response) => {
	try {
		const collectionRef = firebaseHelpers.getCollectionRef('users');

		const { email, password, name } = req.body;

		const document = await getDoc(doc(collectionRef, email))

		if (document.exists()) {
			return res.status(401).json({
				message: 'Registration failed!',
				error: 'User already exist!'
			});
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		await setDoc(doc(collectionRef, email), {
			email,
			name,
			password: hashedPassword,
		});

		const token = jwt.sign(
			{
				email: email,
				name: name
			},
			process.env.JWT_SECRET_KEY,
			{
				expiresIn: TOKEN_EXPIRY,
			}
		);

		return res.status(200).json({
			message: `Document written`,
			token
		});
	} catch (error) {
		logger.error(error);
		return res.status(400).json({
			error: 'Bad Request'
		});
	}
};
