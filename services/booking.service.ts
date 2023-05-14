import BookingModel, { BookingInterface, BookingDTO } from "../models/bookings"
import ScheduleModel from "../models/schedules"
import { Exception } from "../utils/exception"

export async function getBookingById(id: string): Promise<BookingInterface | null> {
    try {
        const booking = await BookingModel.findById(id)
        return booking
    } catch (error) {
        throw new Exception("Not found", 404)
    }
}

export async function getBookingList(): Promise<BookingInterface[]> {
    try {
        const bookings: BookingInterface[] = await BookingModel.find()
        return bookings
    } catch (error) {
        return []
    }
}

export async function getUserBookings(userId: string): Promise<BookingInterface[]> {
    try {
        const bookings: BookingInterface[] = await BookingModel.find({ customer: userId }).populate('schedule')
        return bookings
    } catch (error) {
        return []
    }
}

export async function createBooking(bookingData: BookingDTO): Promise<BookingInterface> {
    try {
        const newBooking = await BookingModel.create(bookingData)

        await ScheduleModel.findOneAndUpdate(
            { _id: bookingData.schedule },
            { $set: { "available_seats.$[elem].available": false } },
            {
                arrayFilters: [{ "elem.seat_number": { $in: bookingData.booked_seats.map(seat => seat.seat_number) } }]
            }
        )

        return await newBooking.save()
    } catch (error) {
        throw new Exception("Invalid booking data", 400)
    }
}

export async function updateBooking(id: string, bookingData: Partial<BookingDTO>): Promise<BookingInterface | null> {
    try {
        const booking = await BookingModel.findById(id, bookingData)
        return booking
    } catch (error) {
        throw new Exception("Invalid booking data, update failed", 400)
    }
}

export async function removeBooking(id: string): Promise<BookingInterface | null> {
    try {
        const booking = await BookingModel.findByIdAndDelete(id)
        return booking
    } catch (error) {
        throw new Exception("Not found, cannot delete this booking", 404)
    }
}