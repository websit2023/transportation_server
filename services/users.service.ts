import CustomerModel, { CustomerDTO, CustomerInterface } from "../models/customers"
import DriverModel, { DriverDTO, DriverInterface } from "../models/drivers"
import UserModel, { UserInterface } from "../models/users"
import { Exception } from "../utils/exception"

export async function createDriverProfile(userId: string, driverData: DriverDTO): Promise<DriverInterface> {
    try {
        let count = await DriverModel.countDocuments()
        const newDriver = await DriverModel.create({
            ...driverData,
            code: `DRIVER_${++count}`
        })
        const saved = await newDriver.save()

        await UserModel.findByIdAndUpdate(userId, { driver: saved._id })
        return saved
    } catch (error) {
        throw new Exception("Invalid user data", 400)
    }
}

export async function createCustomerProfile(userId: string, customerData: CustomerDTO): Promise<CustomerInterface> {
    try {
        const customer = await CustomerModel.create(customerData)
        const saved = await customer.save()

        await UserModel.findByIdAndUpdate(userId, { customer: saved._id })
        return saved
    } catch (error) {
        throw new Exception("Invalid user data", 400)
    }
}

export async function updateDriverProfile(userId: string, driverData: DriverDTO): Promise<DriverInterface> {
    try {
        const user = await UserModel.findById(userId)
        const updatedDriver = await DriverModel.findByIdAndUpdate(user?.driver, driverData)
        if (!updatedDriver) throw new Error()

        return updatedDriver
    } catch (error) {
        throw new Exception("Update data failed", 400)
    }
}

export async function updateCustomerProfile(userId: string, customerData: CustomerDTO): Promise<CustomerInterface> {
    try {
        const user = await UserModel.findById(userId)
        const updatedCustomer = await CustomerModel.findByIdAndUpdate(user?.customer, customerData)
        if (!updatedCustomer) throw new Error()

        return updatedCustomer
    } catch (error) {
        throw new Exception("Update data failed", 400)
    }
}

export async function getProfile(userId: string): Promise<UserInterface | null> {
    try {
        const user = await UserModel.findById(userId).populate(['driver', 'customer'])
        return user
    } catch (error) {
        throw new Exception("Not found profile", 404)
    }
}

export async function getAdminProfile(userId: string): Promise<Partial<UserInterface> | null> {
    try {
        const email = process.env.ADMIN_USER

        const user = {
            userId,
            email,
            role: 'admin'
        }
        return user
    } catch (error) {
        throw new Exception("Not found profile", 404)
    }
}

export async function getUsers(): Promise<UserInterface[]> {
    try {
        const user = await UserModel.find().populate(['driver', 'customer'])
        return user
    } catch (error) {
        return []
    }
}

export async function getDrivers(): Promise<DriverInterface[]> {
    try {
        const user = await DriverModel.find()
        return user
    } catch (error) {
        return []
    }
}

export async function deleteUser(userId: string): Promise<UserInterface> {
    try {
        const user = await UserModel.findByIdAndDelete(userId)
        if (!user) throw new Error()

        await Promise.all([
            user.driver && DriverModel.deleteMany({ _id: user.driver }),
            user.customer && CustomerModel.deleteMany({ _id: user.customer })
        ]);

        return user
    } catch (error) {
        throw new Exception("Delete failed", 404)
    }
}