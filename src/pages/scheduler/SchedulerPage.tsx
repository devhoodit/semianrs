import { type ReactNode } from 'react'
import { Schedule } from './Scheduler'

export const SchedulerPage = (): ReactNode => {
  return (
    <section>
      <Schedule quaterIdsURL="https://raw.githubusercontent.com/stnuc/seminars/main/data/seminar.json"></Schedule>
    </section>
  )
}
