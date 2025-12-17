export interface Customer {
  id: number
  name: string
  email: string | null
  phone: string | null
  status?: string
  gender?: string
}
