import { Request, Response, NextFunction } from 'express'
import { BookingDTO } from '../models/bookings'
import * as BookingService from '../services/booking.service'

export async function getBookings(req: Request, res: Response, next: NextFunction) {
    try {
        const bookings = await BookingService.getBookingList()
        return res.status(200).json(bookings)
    } catch (error) {
        return next(error)
    }
}

export async function getUserBookings(req: Request, res: Response, next: NextFunction) {
    try {
        const { userId } = req
        if(!userId) throw new Error()

        const bookings = await BookingService.getUserBookings(userId)
        return res.status(200).json(bookings)
    } catch (error) {
        return next(error)
    }
}

export async function getBookingById(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params
        const booking = await BookingService.getBookingById(id)

        return res.status(200).json(booking)
    } catch (error) {
        return next(error)
    }
}

export async function createBooking(req: Request, res: Response, next: NextFunction) {
    try {
        const bookingData: BookingDTO = req.body
        const saved = await BookingService.createBooking(bookingData)

        return res.status(201).json(saved)
    } catch (error) {
        return next(error)
    }
}

export async function updateBooking(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params
        const bookingData: Partial<BookingDTO> = req.body

        const saved = await BookingService.updateBooking(id, bookingData)
        return res.status(201).json(saved)
    } catch (error) {
        return next(error)
    }
}

export async function removeBooking(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params
        const booking = await BookingService.removeBooking(id)
        
        return res.status(200).json(booking)
    } catch (error) {
        return next(error)
    }
}