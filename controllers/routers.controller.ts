import { Request, Response, NextFunction } from 'express'
import { RouteDTO } from '../models/routes'
import * as RouteService from '../services/route.service'

export async function getRoutes(req: Request, res: Response, next: NextFunction) {
    try {
        const routers = await RouteService.getRoutes()
        return res.status(200).json(routers)
    } catch (error) {
        return next(error)
    }
}

export async function getRouteById(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params
        const route = await RouteService.getRouteById(id)

        return res.status(200).json(route)
    } catch (error) {
        return next(error)
    }
}

export async function createRoute(req: Request, res: Response, next: NextFunction) {
    try {
        const route: RouteDTO = req.body
        const saved = await RouteService.createRoute(route)

        return res.status(201).json(saved)
    } catch (error) {
        return next(error)
    }
}

export async function updateRoute(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params
        const routeData: Partial<RouteDTO> = req.body

        const saved = await RouteService.updateRoute(id, routeData)
        return res.status(201).json(saved)
    } catch (error) {
        return next(error)
    }
}

export async function removeRoute(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params
        const vehicle = await RouteService.removeRoute(id)
        
        return res.status(200).json(vehicle)
    } catch (error) {
        return next(error)
    }
}