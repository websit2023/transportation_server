import { Request, Response, NextFunction } from 'express'
import { ScheduleDTO } from '../models/schedules'
import * as ScheduleService from '../services/schedule.service'

export async function getSchedules(req: Request, res: Response, next: NextFunction) {
    try {
        const schedules = await ScheduleService.getScheduleList()
        return res.status(200).json(schedules)
    } catch (error) {
        return next(error)
    }
}

export async function getDriverSchedules(req: Request, res: Response, next: NextFunction) {
    try {
        const { userId } = req
        if(!userId) throw new Error()

        console.log(userId);
        

        const schedules = await ScheduleService.getDriverSchedules(userId)
        return res.status(200).json(schedules)
    } catch (error) {
        return next(error)
    }
}

export async function getAllSchedule(req: Request, res: Response, next: NextFunction) {
    try {
        const schedules = await ScheduleService.getAllSchedule()
        return res.status(200).json(schedules)
    } catch (error) {
        return next(error)
    }
}

export async function searchSchedule(req: Request, res: Response, next: NextFunction) {
    try {
        const filter: any = req.query
        const schedules = await ScheduleService.searchSchedule(filter)
        return res.status(200).json(schedules)
    } catch (error) {
        return next(error)
    }
}

export async function getScheduleById(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params
        const schedule = await ScheduleService.getScheduleById(id)

        return res.status(200).json(schedule)
    } catch (error) {
        return next(error)
    }
}

export async function createSchedule(req: Request, res: Response, next: NextFunction) {
    try {
        const scheduleData: ScheduleDTO = req.body
        const saved = await ScheduleService.createSchedule(scheduleData)

        return res.status(201).json(saved)
    } catch (error) {
        return next(error)
    }
}

export async function updateSchedule(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params
        const scheduleData: Partial<ScheduleDTO> = req.body

        const saved = await ScheduleService.updateSchedule(id, scheduleData)
        return res.status(201).json(saved)
    } catch (error) {
        return next(error)
    }
}

export async function removeSchedule(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params
        const schedule = await ScheduleService.removeSchedule(id)
        
        return res.status(200).json(schedule)
    } catch (error) {
        return next(error)
    }
}