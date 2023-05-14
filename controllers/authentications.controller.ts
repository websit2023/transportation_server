import { NextFunction, Request, Response } from "express";
import { Roles, UserInterface, UserSignUpDTO } from "../models/users";
import * as AuthService from "../services/auth.service";
import * as UserService from "../services/users.service"

export async function signIn(request: Request, response: Response, next: NextFunction) {
    try {
        const userData: UserInterface = request.body;
        const res = await AuthService.login(userData)
        return response.status(200).json(res)
    } catch (error) {
        return next(error)
    }
}

export async function adminSignIn(request: Request, response: Response, next: NextFunction) {
    try {
        const userData: UserInterface = request.body;
        const res = await AuthService.adminLogin(userData)
        return response.status(200).json(res)
    } catch (error) {
        return next(error)
    }
}

export async function refreshToken(request: Request, response: Response, next: NextFunction) {
    try {
        const token= request.query['refresh-token'] as string | undefined
        if(!token) throw new Error()

        const res = await AuthService.refreshToken(token)

        return response.status(200).json(res)
    } catch (error) {
        return next(error)
    }
}

export async function signUp(request: Request, response: Response, next: NextFunction) {
    try {
        const userData: UserSignUpDTO = request.body;

        const { customer_profile, driver_profile, ...accountData } = userData

        const newUser = await AuthService.register(accountData)

        if(accountData.role === Roles.Driver && driver_profile) {
            await UserService.createDriverProfile(newUser._id, driver_profile)
        }

        if(accountData.role === Roles.Customer && customer_profile) {
            await UserService.createCustomerProfile(newUser._id, customer_profile)
        }

        return response.status(201).json(newUser)
    } catch (error) {
        return next(error)
    }
}