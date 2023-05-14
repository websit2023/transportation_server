import { Schema, model, Types } from "mongoose"

export interface AvailableSeat {
    seat_number: number
    available: boolean
}

export interface ScheduleInterface {
    start_time: Date
    end_time: Date
    route: Types.ObjectId
    vehicle: Types.ObjectId
    driver: Types.ObjectId
    available_seats: AvailableSeat[]
    created_at: Date
}

export interface ScheduleDTO {
    start_time: Date
    end_time: Date
    route: Types.ObjectId
    vehicle: Types.ObjectId
    driver: Types.ObjectId
    status: boolean
}

const SeatSchema = new Schema({
    seat_number: { type: Number, required: true },
    available: { type: Boolean, default: true }
}, { _id: false });

const Schedule = new Schema({
    start_time: { type: Date, required: true },
    end_time: { type: Date, required: true },
    route: { type: Schema.Types.ObjectId, ref: 'Route', required: true },
    vehicle: { type: Schema.Types.ObjectId, ref: 'Vehicle', required: true },
    driver: { type: Schema.Types.ObjectId, ref: 'Driver', required: true },
    available_seats: { type: [SeatSchema], required: true },
    status: { type: Boolean, default: true },
    created_at: { type: Date, default: Date.now() }
});

const ScheduleModel = model('Schedule', Schedule);
export default ScheduleModel