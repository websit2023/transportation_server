import { Request, Response, NextFunction } from 'express'
import { CustomerDTO } from '../models/customers'
import { DriverDTO } from '../models/drivers'
import * as UserService from '../services/users.service'
import { Roles } from '../models/users'

export async function getUsers(req: Request, res: Response, next: NextFunction) {
    try {
        const users = await UserService.getUsers()
        return res.status(200).json(users)
    } catch (error) {
        return next(error)
    }
}

export async function getDrivers(req: Request, res: Response, next: NextFunction) {
    try {
        const users = await UserService.getDrivers()
        return res.status(200).json(users)
    } catch (error) {
        return next(error)
    }
}

export async function getUserProfile(req: Request, res: Response, next: NextFunction) {
    try {
        if (!req.userId) throw new Error()

        const userProfile = await UserService.getProfile(req.userId)
        return res.status(200).json(userProfile)
    } catch (error) {
        return next(error)
    }
}

export async function getAdminProfile(req: Request, res: Response, next: NextFunction) {
    try {
        if (!req.userId) throw new Error()

        const userProfile = await UserService.getAdminProfile(req.userId)
        return res.status(200).json(userProfile)
    } catch (error) {
        return next(error)
    }
}

export async function createProfileByDriver(req: Request, res: Response, next: NextFunction) {
    try {
        if (!req.userId) throw new Error()

        const data: DriverDTO = req.body
        const profile = await UserService.createDriverProfile(req.userId, data)
        return res.status(200).json(profile)
    } catch (error) {
        return next(error)
    }
}

export async function createProfileByCustomer(req: Request, res: Response, next: NextFunction) {
    try {
        if (!req.userId) throw new Error()

        const data: CustomerDTO = req.body
        const profile = await UserService.createCustomerProfile(req.userId, data)
        return res.status(200).json(profile)
    } catch (error) {
        return next(error)
    }
}

export async function updateProfileByDriver(req: Request, res: Response, next: NextFunction) {
    try {
        if (!req.userId) throw new Error()

        const data: DriverDTO = req.body
        const profile = await UserService.updateDriverProfile(req.userId, data)
        return res.status(200).json(profile)
    } catch (error) {
        return next(error)
    }
}

export async function updateProfileByCustomer(req: Request, res: Response, next: NextFunction) {
    try {
        if (!req.userId) throw new Error()

        const data: CustomerDTO = req.body
        const profile = await UserService.updateCustomerProfile(req.userId, data)
        return res.status(200).json(profile)
    } catch (error) {
        return next(error)
    }
}

export async function createUserProfile(req: Request, res: Response, next: NextFunction) {
    try {
        const { role, ...data } = req.body
        const userId = req.params.userId

        if (role === Roles.Driver) {
            const profile = await UserService.createDriverProfile(userId, data)
            return res.status(200).json(profile)
        }

        if (role === Roles.Customer) {
            const profile = await UserService.createCustomerProfile(userId, data)
            return res.status(200).json(profile)
        }

        throw new Error()
    } catch (error) {
        return next(error)
    }
}

export async function updateUserProfile(req: Request, res: Response, next: NextFunction) {
    try {
        const { role, ...data } = req.body
        const userId = req.params.userId

        if (role === Roles.Driver) {
            const profile = await UserService.updateDriverProfile(userId, data)
            return res.status(200).json(profile)
        }

        if (role === Roles.Customer) {
            const profile = await UserService.updateCustomerProfile(userId, data)
            return res.status(200).json(profile)
        }

        throw new Error()
    } catch (error) {
        return next(error)
    }
}

export async function deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = req.params.userId
        const user = await UserService.deleteUser(userId)

        return res.status(200).json(user)
    } catch (error) {
        return next(error)
    }
}