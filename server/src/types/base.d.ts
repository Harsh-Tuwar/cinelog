import { Request } from 'express';

interface CinelogUser {
	email: string,
	name: string,
	iat: number,
	exp: number
}

interface CinelogRequest extends Request {
	user: CinelogUser
}
