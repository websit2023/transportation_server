import { compare, genSalt, hash } from "bcrypt";
import { sign, decode } from "jsonwebtoken";
import UserModel, { UserDTO, UserInterface } from "../models/users";
import { Exception } from "../utils/exception";

export async function login(userData: any): Promise<{ access_token: string, refresh_token: string }> {
    try {
        const { email, password } = userData;

        const user = await UserModel.findOne({ email })
        if (!user) throw new Error()

        // Comparing password
        const isValid = await compare(password, user.password)
        if (!isValid) throw new Error()

        const secret = process.env.JWT_SECRET || ""
        const accessToken = sign(
            { userId: user.id, email: user.email },
            secret,
            { expiresIn: '1h' }
        )
        const refreshToken = sign(
            { userId: user.id, email: user.email },
            secret,
            { expiresIn: '7d' }
        )

        return {
            access_token: accessToken,
            refresh_token: refreshToken
        }

    } catch (error) {
        throw new Exception("Invalid account", 401)
    }
}



export async function adminLogin(userData: any): Promise<{ access_token: string }> {
    try {
        const email = process.env.ADMIN_USER
        const password = process.env.ADMIN_PASSWORD

        // Comparing user & password
        const isValid = (email === userData.email) && (password === userData.password)
        if (!isValid) throw new Error()

        const secret = process.env.JWT_SECRET || ""
        const accessToken = sign(
            { userId: 1, email },
            secret,
            { expiresIn: '1h' }
        )

        return {
            access_token: accessToken
        }
    } catch (error) {
        throw new Exception("Invalid account", 401)
    }
}

export async function refreshToken(token: string): Promise<{ access_token: string, refresh_token: string }> {
    try {
        const decoded: any = decode(token)
        if(!decode) throw new Error()


        const user = await UserModel.findById(decoded.userId)
        if (!user) throw new Error()

        const secret = process.env.JWT_SECRET || ""
        const accessToken = sign(
            { userId: user.id, email: user.email },
            secret,
            { expiresIn: '1h' }
        )
        const refreshToken = sign(
            { userId: user.id, email: user.email },
            secret,
            { expiresIn: '7d' }
        )

        return {
            access_token: accessToken,
            refresh_token: refreshToken
        }
    } catch (error) {
        throw new Exception("Invalid account", 401)
    }
}

export async function register(userData: UserDTO): Promise<UserInterface> {
    try {
        const { password, ...data }: UserDTO = userData

        // Hasing password
        const saltRounds = 10;
        const salt = await genSalt(saltRounds);
        const hashedPassword = await hash(password, salt);

        let newUser = await UserModel.create({
            ...data,
            password: hashedPassword
        })

        return await newUser.save()
    } catch (error) {
        throw new Exception("Create account failed", 400)
    }
}