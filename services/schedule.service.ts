import ScheduleModel, { ScheduleInterface, ScheduleDTO } from "../models/schedules"
import UserModel from "../models/users"
import VehicleModel from "../models/vehicles"
import { Exception } from "../utils/exception"

export interface ScheduleFilter {
    start_time: string
    start_point: string
    end_point: string
}

export async function getScheduleById(id: string): Promise<ScheduleInterface | null> {
    try {
        const schedule = await ScheduleModel.findById(id)
        return schedule
    } catch (error) {
        throw new Exception("Not found", 404)
    }
}

export async function searchSchedule(filter: ScheduleFilter): Promise<ScheduleInterface[]> {
    try {
        const d = new Date(filter.start_time);
        const d1 = new Date(d.getTime() + 86400000);

        const schedules: ScheduleInterface[] = await ScheduleModel.aggregate([
            {
                $match: {
                    'start_time': {
                        $gt: d,
                        $lt: d1
                    },
                    "status": true
                }
            },
            {
                $lookup: {
                    from: 'routes', // the name of the driver collection
                    localField: 'route',
                    foreignField: '_id',
                    as: 'route'
                }
            },
            {
                $match: {
                    'route.start_point': filter.start_point,
                    'route.end_point': filter.end_point
                }
            },
            {
                $unwind: '$route'
            },
            {
                $lookup: {
                    from: 'vehicles', // the name of the driver collection
                    localField: 'vehicle',
                    foreignField: '_id',
                    as: 'vehicle'
                }
            },
            {
                $unwind: '$vehicle'
            }
        ])

        return schedules
    } catch (error) {
        return []
    }
}

export async function getScheduleList(): Promise<ScheduleInterface[]> {
    try {
        const schedules: ScheduleInterface[] = await ScheduleModel.find().populate(['driver', 'vehicle', 'route'])

        return schedules
    } catch (error) {
        return []
    }
}

export async function getDriverSchedules(userId: string): Promise<ScheduleInterface[]> {
    try {
        const user = await UserModel.findById(userId)

        const schedules: ScheduleInterface[] = await ScheduleModel.find({ driver: user?.driver }).populate(['vehicle', 'route'])
        return schedules
    } catch (error) {
        return []
    }
}

export async function getAllSchedule(): Promise<ScheduleInterface[]> {
    try {
        const d = new Date();

        const schedules: ScheduleInterface[] = await ScheduleModel
            .find({ status: true, start_time: { $gt: d } })
            .populate(['vehicle', 'route'])

        return schedules
    } catch (error) {
        return []
    }
}

export async function createSchedule(scheduleData: ScheduleDTO): Promise<ScheduleInterface> {
    try {
        const vehicle = await VehicleModel.findById(scheduleData.vehicle)
        if (!vehicle) throw new Error()

        const available_seats = new Array(vehicle.seats).fill("").map((_, index) => ({
            seat_number: index + 1,
            available: true
        }))

        const newScheduleData = {
            ...scheduleData,
            available_seats
        }

        const newSchedule = await ScheduleModel.create(newScheduleData)
        return await newSchedule.save()
    } catch (error) {
        throw new Exception("Invalid schedule data", 400)
    }
}

export async function updateSchedule(id: string, scheduleData: Partial<ScheduleDTO>): Promise<ScheduleInterface | null> {
    try {
        const schedule = await ScheduleModel.findByIdAndUpdate(id, scheduleData)
        return schedule
    } catch (error) {
        throw new Exception("Invalid schedule data, update failed", 400)
    }
}

export async function removeSchedule(id: string): Promise<ScheduleInterface | null> {
    try {
        const schedule = await ScheduleModel.findByIdAndDelete(id)
        return schedule
    } catch (error) {
        throw new Exception("Not found, cannot delete this schedule", 404)
    }
}