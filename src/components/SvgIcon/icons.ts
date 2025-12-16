import Expand from '@/assets/icons/expand.svg'
import Collapse from '@/assets/icons/collapse.svg'
import People from '@/assets/icons/people.svg'
import Briefcase from '@/assets/icons/briefcase.svg'
import Lifeguard from '@/assets/icons/lifeguard.svg'
import Calendar from '@/assets/icons/calendar.svg'
import Report from '@/assets/icons/report.svg'
import Payment from '@/assets/icons/payment.svg'
import Setting from '@/assets/icons/setting.svg'
import Star from '@/assets/icons/star.svg'
import Home from '@/assets/icons/home.svg'
import Dotted from '@/assets/icons/dotted.svg'
import Profile from '@/assets/icons/profile.svg'
import Help from '@/assets/icons/help.svg'
import Out from '@/assets/icons/out.svg'
import Search from '@/assets/icons/search.svg'
import Cross from '@/assets/icons/cross.svg'
import Lock from '@/assets/icons/lock.svg'
import Plus from '@/assets/icons/plus.svg'

export const icons = {
  expand: Expand,
  collapse: Collapse,
  people: People,
  briefcase: Briefcase,
  lifeguard: Lifeguard,
  calendar: Calendar,
  report: Report,
  payment: Payment,
  setting: Setting,
  star: Star,
  home: Home,
  dotted: Dotted,
  profile: Profile,
  help: Help,
  out: Out,
  search: Search,
  cross: Cross,
  lock: Lock,
  plus: Plus,
} as const

export type IconName = keyof typeof icons