import VehicleModel, { Vehicle, VehicleDTO } from "../models/vehicles"
import { Exception } from "../utils/exception"

export async function getVehicleById(id: string): Promise<Vehicle | null> {
    try {
        const vehicle = await VehicleModel.findById(id)
        return vehicle
    } catch (error) {
        throw new Exception("Not found", 404)
    }
}

export async function getVehicleList(): Promise<Vehicle[]> {
    try {
        const vehicles: Vehicle[] = await VehicleModel.find()
        return vehicles
    } catch (error) {
        return []
    }
}

export async function createVehicle(vehicleData: VehicleDTO): Promise<Vehicle> {
    try {
        const newVehicle = await VehicleModel.create(vehicleData)
        return await newVehicle.save()
    } catch (error) {
        throw new Exception("Invalid vehicle data", 400)
    }
}

export async function updateVehicle(id: string, vehicleData: Partial<VehicleDTO>): Promise<Vehicle | null> {
    try {
        const vehicle = await VehicleModel.findById(id, vehicleData)
        return vehicle
    } catch (error) {
        throw new Exception("Invalid vehicle data, update failed", 400)
    }
}

export async function removeVehicle(id: string): Promise<Vehicle | null> {
    try {
        const vehicle = await VehicleModel.findByIdAndDelete(id)
        return vehicle
    } catch (error) {
        throw new Exception("Not found, cannot delete this vehicle", 404)
    }
}