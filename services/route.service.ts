import RouteModel, { RouteDTO, RouteInterface } from "../models/routes"
import { Exception } from "../utils/exception"

export async function getRoutes(): Promise<RouteInterface[]> {
    try {
        return await RouteModel.find()
    } catch (error) {
        throw new Exception("Get data failed", 404)
    }
}

export async function getRouteById(routerId: string): Promise<RouteInterface[] | null> {
    try {
        return await RouteModel.findById(routerId)
    } catch (error) {
        throw new Exception("Get data failed", 404)
    }
}

export async function createRoute(route: RouteDTO): Promise<RouteInterface> {
    try {
        const newRoute = await RouteModel.create(route)
        return await newRoute.save()
    } catch (error) {
        throw new Exception("Create route failed", 400)
    }
}

export async function updateRoute(routerId: string, route: Partial<RouteDTO>): Promise<RouteInterface> {
    try {
        const updated = await RouteModel.findByIdAndUpdate(routerId, route)
        if(!updated) throw new Error()

        return updated
    } catch (error) {
        throw new Exception("Update route failed", 400)
    }
}

export async function removeRoute(routerId: string): Promise<RouteInterface> {
    try {
        const deleted = await RouteModel.findByIdAndDelete(routerId)
        if(!deleted) throw new Error()

        return deleted
    } catch (error) {
        throw new Exception("Delete route failed", 400)
    }
}