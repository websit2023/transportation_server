import { Router } from "express";
import * as AuthController from "../controllers/authentications.controller";
import * as UserController from "../controllers/users.controller";
import * as RouteController from "../controllers/routers.controller"
import { createVehicle, getVehicles, getVehicleById, updateVehicle, removeVehicle } from "../controllers/vehicles.controller";
import * as ScheduleController from "../controllers/schedule.controller";
import * as BookingController from "../controllers/booking.controller";
import * as StatsController from "../controllers/stats.controller";
import { AuthGuard } from "../middlewares/jwt";

const router = Router()

// Vehicles
router.get('/vehicle/getList', AuthGuard, getVehicles)
router.post('/vehicle/create', AuthGuard, createVehicle)
router.get('/vehicle/getById/:id', AuthGuard, getVehicleById)
router.put('/vehicle/update/:id', AuthGuard, updateVehicle)
router.delete('/vehicle/delete/:id', AuthGuard, removeVehicle)

// Auth
router.post('/auth/signIn', AuthController.signIn)
router.post('/auth/signUp', AuthController.signUp)
router.get('/auth/refresh', AuthController.refreshToken)
router.post('/auth/adminSignIn', AuthController.adminSignIn)

// User
router.get('/user/profile', AuthGuard, UserController.getUserProfile)
router.get('/admin/profile', AuthGuard, UserController.getAdminProfile)
router.get('/user/getList', UserController.getUsers)
router.post('/user/createProfile/customer', AuthGuard, UserController.createProfileByCustomer)
router.post('/user/createProfile/driver', AuthGuard, UserController.createProfileByDriver)
router.post('/user/createProfile/user/:userId', AuthGuard, UserController.createUserProfile)
router.put('/user/updateProfile/customer', AuthGuard, UserController.updateProfileByCustomer)
router.put('/user/updateProfile/driver', AuthGuard, UserController.updateProfileByDriver)
router.put('/user/updateProfile/user/:userId', AuthGuard, UserController.updateUserProfile)
router.delete('/user/deleteUser/:userId', AuthGuard, UserController.deleteUser)

router.get('/driver/getList', AuthGuard, UserController.getDrivers)


// Schedule
router.get('/schedule/getList', ScheduleController.getSchedules)
router.get('/schedule/getAll', ScheduleController.getAllSchedule)
router.get('/schedule/search', ScheduleController.searchSchedule)
router.get('/schedule/getByDriver', AuthGuard ,ScheduleController.getDriverSchedules)
router.post('/schedule/create', AuthGuard, ScheduleController.createSchedule)
router.get('/schedule/getById/:id', ScheduleController.getScheduleById)
router.put('/schedule/update/:id', AuthGuard, ScheduleController.updateSchedule)
router.delete('/schedule/delete/:id', AuthGuard, ScheduleController.removeSchedule)

// Booking
router.get('/booking/getList', BookingController.getBookings)
router.get('/booking/getUserBooking', AuthGuard, BookingController.getUserBookings)
router.post('/booking/create', AuthGuard, BookingController.createBooking)
router.get('/booking/getById/:id', AuthGuard, BookingController.getBookingById)
router.put('/booking/update/:id', AuthGuard, BookingController.updateBooking)
router.delete('/booking/delete/:id', AuthGuard, BookingController.removeBooking)

// Route
router.get('/route/getList', RouteController.getRoutes)
router.post('/route/create', RouteController.createRoute)
router.get('/route/getById/:id', RouteController.getRouteById)
router.put('/route/update/:id', RouteController.updateRoute)
router.delete('/route/delete/:id', RouteController.removeRoute)

// Stats
router.get('/stats/year', AuthGuard, StatsController.getBookingStatisticsForThisYear)
router.get('/stats/month', AuthGuard, StatsController.getBookingStatisticsForThisMonth)
router.get('/stats/all', AuthGuard, StatsController.getDashboardStats)


export default router;