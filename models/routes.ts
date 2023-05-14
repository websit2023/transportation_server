import { Schema, model } from "mongoose"

export interface RouteInterface {
  route_name: string
  start_point: string
  end_point: string
  distance: number
  fare: number
}

export interface RouteDTO {
  route_name: string
  start_point: string
  end_point: string
  distance: number
  fare: number
}

const RouteSchema = new Schema({
  route_name: { type: String, required: true },
  start_point: { type: String, required: true },
  end_point: { type: String, required: true },
  distance: { type: Number, required: true },
  fare: { type: Number, required: true }
});

const RouteModel = model('Route', RouteSchema);
export default RouteModel