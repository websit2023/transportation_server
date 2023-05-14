import { Schema, model, Types } from "mongoose"

export interface BookedSeat {
    seat_number: number
}

export interface BookingInterface {
    schedule: Types.ObjectId,
    customer: Types.ObjectId,
    passenger_name: string
    passenger_phone: string
    passenger_age: number
    booked_seats: BookedSeat[]
    total_fare: number
    created_at: Date
}

export interface BookingDTO {
    schedule: Types.ObjectId,
    customer: Types.ObjectId,
    passenger_name: string
    passenger_phone: string
    passenger_age: number
    total_fare: number
    booked_seats: BookedSeat[]
}

const BookedSeatSchema = new Schema({
    seat_number: { type: Number, required: true },
    available: { type: Boolean, default: true }
}, { _id: false });

const Booking = new Schema({
    schedule: { type: Schema.Types.ObjectId, ref: 'Schedule', required: true },
    customer: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
    passenger_name: { type: String, required: true },
    passenger_phone: { type: String, required: true },
    passenger_age: { type: Number, required: true },
    booked_seats: { type: [BookedSeatSchema], required: true },
    total_fare: { type: Number, required: true },
    created_at: { type: Date, default: Date.now() }
});

const BookingModel = model('Booking', Booking);
export default BookingModel