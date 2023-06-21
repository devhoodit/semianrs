import { type ReactNode } from 'react'
import '../../style/Footer.sass'

export const Footer = (): ReactNode => {
  return (
    <section className="footer">
      <div className="footer-content">
        <div className="footer-column">
          <div className="footer-column-header">Applicator</div>
          <div className="footer-column-item">Careers</div>
          <div className="footer-column-item">Event</div>
        </div>
        <div className="footer-column">
          <div className="footer-column-header">Resource</div>
          <div className="footer-column-item">
            <a href="https://github.com/stnuc">Github</a>
          </div>
          <div className="footer-column-item">
            <a href="https://github.com/stnuc/seminars">Seminar</a>
          </div>
          <div className="footer-column-item">
            <a href="https://github.com/stnuc/2023-H1-projects">Project</a>
          </div>
        </div>
        <div className="footer-column">
          <div className="footer-column-header">Contact</div>
          <div className="footer-column-item">Email</div>
          <div className="footer-column-item">Phone</div>
        </div>
      </div>
    </section>
  )
}
