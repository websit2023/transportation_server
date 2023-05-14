import { log } from "console"
import { NextFunction, Request, Response } from "express"
import * as jwt from "jsonwebtoken"

export function AuthGuard(req: Request, res: Response, next: NextFunction) {
	try {
		const authHeader = req.header('Authorization')
		const token = authHeader && authHeader.split(' ')[1]

		if (!token) return res.sendStatus(401)

        const secret =  process.env.JWT_SECRET || "";
		const decoded: any = jwt.verify(token, secret)

		req.userId = decoded.userId

		next()
	} catch (error) {
		return res.sendStatus(403)
	}
}