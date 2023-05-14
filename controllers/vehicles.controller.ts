import { Request, Response, NextFunction } from 'express'
import { Vehicle } from '../models/vehicles'
import * as VehicleService from '../services/vehicles.service'

export async function getVehicles(req: Request, res: Response, next: NextFunction) {
    try {
        const vehicles = await VehicleService.getVehicleList()
        return res.status(200).json(vehicles)
    } catch (error) {
        return next(error)
    }
}

export async function getVehicleById(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params
        const vehicle = await VehicleService.getVehicleById(id)

        return res.status(200).json(vehicle)
    } catch (error) {
        return next(error)
    }
}

export async function createVehicle(req: Request, res: Response, next: NextFunction) {
    try {
        const vehicleData: Vehicle = req.body
        const saved = await VehicleService.createVehicle(vehicleData)

        return res.status(201).json(saved)
    } catch (error) {
        return next(error)
    }
}

export async function updateVehicle(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params
        const vehicleData: Partial<Vehicle> = req.body

        const saved = await VehicleService.updateVehicle(id, vehicleData)
        return res.status(201).json(saved)
    } catch (error) {
        return next(error)
    }
}

export async function removeVehicle(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params
        const vehicle = await VehicleService.removeVehicle(id)
        
        return res.status(200).json(vehicle)
    } catch (error) {
        return next(error)
    }
}