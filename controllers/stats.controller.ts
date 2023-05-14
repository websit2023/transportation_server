import { Request, Response, NextFunction } from 'express'
import * as StatsService from '../services/stats.service'

export async function getBookingStatisticsForThisYear(req: Request, res: Response, next: NextFunction) {
    try {
        const yearStats = await StatsService.getBookingStatisticsForThisYear()
        return res.status(200).json(yearStats)
    } catch (error) {
        return next(error)
    }
}

export async function getBookingStatisticsForThisMonth(req: Request, res: Response, next: NextFunction) {
    try {
        const monthStats = await StatsService.getBookingStatisticsForThisMonth()
        return res.status(200).json(monthStats)
    } catch (error) {
        return next(error)
    }
}

export async function getDashboardStats(req: Request, res: Response, next: NextFunction) {
    try {
        const monthStats = await StatsService.totalStats()
        return res.status(200).json(monthStats)
    } catch (error) {
        return next(error)
    }
}