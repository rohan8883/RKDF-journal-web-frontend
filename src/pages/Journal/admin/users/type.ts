import { I_WITH_PAGINATION } from '@/types/paginationType'
export type I_USER_TYPE = {
  _id: string
  fullName: string
  roleId: string
  email: string
  address: string
  password: string
  mobile: string
  status: number
  imageUrl: string
  createdAt: string
  updatedAt: string
}



export type I_USER_TYPE_VIEW = {
  success: boolean
  userDetails: I_USER_TYPE
}

export type I_USER_LIST = I_WITH_PAGINATION<I_USER_TYPE>
