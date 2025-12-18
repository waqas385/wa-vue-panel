import type { IconName } from '@/components/svgicon'

export interface NavItem {
  id: number
  name: string
  icon: IconName
  active: boolean
  path: string
}
