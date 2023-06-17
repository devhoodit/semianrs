import { type ReactNode } from 'react'
import { Schedule } from './Scheduler'

export const SchedulerPage = (): ReactNode => {
  return (
    <section>
      <Schedule quaterIdsURL="https://raw.githubusercontent.com/devhoodit/semianrs/main/public/seminars/seminar.json"></Schedule>
    </section>
  )
}
