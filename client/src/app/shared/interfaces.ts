//import {appendFile} from "fs";

export interface User {
  _id?: string
  email: string,
  password: string
}

export interface Message {
  message: string
}

export interface Category {
  _id?: string
  imageSrc?: string
  name: string
  user?: string
}

export interface Position {
  _id?: string
  cost: number
  name: string
  category: string
  user?: string
  quantity?: number
}

export interface Order {
  date?: Date
  order?: number
  user?: string
  list: OrderPosition[]
  _id?: string
}

export interface OrderPosition {
  name: string
  cost: number
  quantity: number
  _id?: string
}

export interface Filter {
  start?: Date
  end?: Date
  order?: number
}

export interface OverviewPage {
  orders: OverviewPageItem
  gain: OverviewPageItem
}

export interface OverviewPageItem {
  percent: number
  compare: number
  yesterday: number
  isHigher: boolean
}
