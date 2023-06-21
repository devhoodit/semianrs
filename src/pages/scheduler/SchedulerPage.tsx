import { type ReactNode } from 'react'
import { Schedule } from './Scheduler'
import '../../style/SchedulerPage.sass'

export const SchedulerPage = (): ReactNode => {
  return (
    <section id="scheduler">
      <div className="section-content">
        <div className="section-headline">Schedule History</div>
        <div className="section-detail">
          Checkout our seminar schedule & history
        </div>
      </div>
      <Schedule quaterIdsURL="https://raw.githubusercontent.com/stnuc/seminars/main/data/seminar.json"></Schedule>
    </section>
  )
}
