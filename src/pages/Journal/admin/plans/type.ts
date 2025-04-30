import { I_WITH_PAGINATION } from '@/types/paginationType'
export type I_ROLE_TYPE = {
  _id: string
  planName: string
  description: string
  duration: number
  amount: number
  interestRate: number
  fineRate: number
  status: number
  createdAt: string
  updatedAt: string
}

export type I_ROLE_TYPE_VIEW = {
  success: boolean
  data: I_ROLE_TYPE
}

export type I_ROLE_TYPE_LIST = I_WITH_PAGINATION<I_ROLE_TYPE>
