import { Schema, model, Document, Types } from "mongoose"
import { DriverDTO } from "./drivers"
import { CustomerDTO } from "./customers"

export interface UserInterface extends Document {
  email: string
  password: string
  role: string | Roles
  customer?: Types.ObjectId
  driver?: Types.ObjectId
}

export interface UserDTO {
  email: string
  password: string
  role: string | Roles
}

export interface UserSignUpDTO extends UserDTO {
  driver_profile?: DriverDTO
  customer_profile?: CustomerDTO
}

export enum Roles {
  Customer = 'customer',
  Driver = 'driver',
  Admin = 'admin'
}

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: Roles, required: true },
  customer: { type: Schema.Types.ObjectId, ref: 'Customer' },
  driver: { type: Schema.Types.ObjectId, ref: 'Driver' }
});

const UserModel = model('User', UserSchema);
export default UserModel