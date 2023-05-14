import { Schema, model, Document, Types } from "mongoose"

export interface CustomerInterface extends Document {
    customer_name: string
    phone_number: string
    year_of_birth?: number
    address?: string
    bookings: Types.ObjectId[]
}

export interface CustomerDTO {
    customer_name: string
    phone_number: string
    year_of_birth?: number
    address?: string
}

const Customer = new Schema({
    customer_name: { type: String, required: true },
    phone_number: { type: String, required: true },
    address: { type: String },
    year_of_birth: { type: Number },
    bookings: [{ type: Schema.Types.ObjectId, ref: 'Booking', default: [] }]
});

const CustomerModel = model('Customer', Customer);
export default CustomerModel