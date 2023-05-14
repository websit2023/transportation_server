import { Schema, model, Document } from "mongoose"

export interface DriverInterface extends Document {
    driver_name: string
    phone_number: string
    code: string
    address?: string
    created_at: Date 
}

export interface DriverDTO {
    driver_name: string
    phone_number: string
    address?: string
}

const Driver = new Schema({
    driver_name: { type: String, required: true },
    phone_number: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    address: { type: String },
    created_at: { type: Date, default: Date.now() }
});

const DriverModel = model('Driver', Driver);
export default DriverModel