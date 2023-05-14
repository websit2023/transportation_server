import { Schema, model, Document, Types } from "mongoose"

export enum VehicleStatus {
    Available = "available",
    UnAvailable = "unavailable"
}

export interface Vehicle extends Document {
    vehicle_name: string
    image: string
    seats: number
    status: VehicleStatus | string
    year: number
    created_at: Date
}

export interface VehicleDTO {
    vehicle_name: string
    image: string
    seats: number
    status: VehicleStatus | string
    year: number
}

const Vehicle = new Schema({
    vehicle_name: { type: String, required: true },
    image: { type: String, required: true },
    seats: { type: Number, required: true },
    year: { type: Number, required: true },
    status: { type: String, enum: ['available', 'unavailable'], default: 'available' },
    created_at: { type: Date, default: Date.now()},
});

const VehicleModel = model('Vehicle', Vehicle);
export default VehicleModel