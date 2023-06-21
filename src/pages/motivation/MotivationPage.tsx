import { type ReactNode } from 'react'
import '../../style/MotivationPage.sass'

export const MotivationPage = (): ReactNode => {
  return (
    <section id="motivation">
      <div className="section-content">
        <div className="section-headline">Motivation</div>
        <div className="section-detail">
          Starting from scratch is hard job <br />
          So, we decide to open seminar to try to help <br />
          Start from simple topics, grow to complex and difficult topics
        </div>
      </div>
    </section>
  )
}
