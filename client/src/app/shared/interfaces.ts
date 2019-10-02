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
