import { type ReactNode } from 'react'
import '../../style/ExplainationPage.sass'

export const ExplainationPage = (): ReactNode => {
  return (
    <section id="explaination">
      <div className="section-content">
        <div className="section-headline">Explaination</div>
        <div className="section-detail">
          Seminar is opened by member who interests or major in specific field{' '}
          <br />
          Topic range is unlimited: AI, Math, back-end etc. <br />
          Some seminar can be provided as public-opened <br />
          People not in circle can also join pulic-opened
        </div>
      </div>
    </section>
  )
}
