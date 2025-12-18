export type Gender = 'male' | 'female' | 'other' | null

export interface Customer {
  id: number
  name: string
  email: string | null
  phone: string | null
  status?: string
  gender?: Gender
}
