import { type ReactNode } from 'react'

import '../../style/IntroPage.sass'

export const IntroPage = (): ReactNode => {
  return (
    <section id="intro">
      <div className="title">
        <svg
          className="logo"
          width="131"
          height="130"
          viewBox="0 0 131 130"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            id="behind"
            d="M80.979 3C76.9622 37.3163 71.3388 104.746 80.979 99.9325C93.0292 93.916 116.46 53.806 124.494 28.403C132.527 3 42.8201 109.96 8.00842 111.297"
            stroke="white"
            strokeWidth="11"
            pathLength="100"
          />
          <path
            id="front"
            d="M6 119.987C13.1409 130.015 38 120.656 80.3096 3"
            stroke="white"
            strokeWidth="13"
            pathLength="100"
          />
        </svg>
        <svg
          className="backlogo"
          width="702"
          height="699"
          viewBox="0 0 702 699"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M437.26 7C414.746 199.171 383.226 576.776 437.26 549.822C504.802 516.129 636.134 291.513 681.162 149.257C726.19 7 223.378 605.976 28.257 613.463"
            stroke="#252525"
            strokeWidth="36"
          />
          <path
            d="M17 662.13C57.0248 718.284 196.361 665.873 433.508 7"
            stroke="#252525"
            strokeWidth="40"
          />
        </svg>
        pplicator Seminar
      </div>
      <div className="sub-title">Talk about complex topics</div>
      <div className="scrolldown">
        <svg
          width="40"
          height="88"
          viewBox="0 0 40 88"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="20" cy="68" r="18" stroke="#5a5a5a" strokeWidth="4" />
          <rect x="18" width="4" height="48" fill="#5a5a5a" />
        </svg>
        <p>Scroll down</p>
      </div>
    </section>
  )
}
