import { useState, type ReactNode, useEffect } from 'react'
import '../../style/Detail.sass'

interface DetailProps {
  selectedLectureIds: string[]
  data: Map<string, any>
}

export const Detail = (props: DetailProps): ReactNode => {
  const [pageIndex, setPageIndex] = useState(0)
  const detailSlides: ReactNode[] = []
  const length = props.selectedLectureIds.length

  const pageUp = (): void => {
    setPageIndex((prev) => prev - 1)
  }

  const pageDown = (): void => {
    setPageIndex((prev) => prev + 1)
  }

  useEffect(() => {
    setPageIndex(0)
  }, [props.selectedLectureIds])

  props.selectedLectureIds.forEach((lectureId) => {
    detailSlides.push(
      <DetailInfo data={props.data.get(lectureId)}></DetailInfo>
    )
  })

  if (props.selectedLectureIds.length <= 0) {
    return (
      <div className="calendar-detail">
        <div className="guide">Click calendar to see detail information</div>
      </div>
    )
  }

  return (
    <div className="calendar-detail">
      <div
        className="calendar-detail-slider"
        style={{
          transform:
            length === 1
              ? ''
              : `translateY(-${(100 * pageIndex) / (length - 1)}%)`,
        }}
      >
        {detailSlides}
      </div>
      <div className="calendar-detail-button__container">
        <button
          className={`up ${
            pageIndex <= 0 ? 'button-disable' : 'button-enable'
          }`}
          onClick={pageIndex <= 0 ? undefined : pageUp}
        >
          <div>
            <svg
              width="14"
              height="12"
              viewBox="0 0 14 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7 0L13.9282 12H0.0717969L7 0Z" fill="white" />
            </svg>
          </div>
        </button>
        <button
          className={`down ${
            pageIndex < length - 1 ? 'button-enable' : 'button-disable'
          }`}
          onClick={pageIndex < length - 1 ? pageDown : undefined}
        >
          <div>
            <svg
              width="14"
              height="12"
              viewBox="0 0 14 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7 12L13.9282 0H0.0717969L7 12Z" fill="white" />
            </svg>
          </div>
        </button>
      </div>
    </div>
  )
}

interface DetailInfoProps {
  data: any
}

const DetailInfo = (props: DetailInfoProps): ReactNode => {
  let link: ReactNode | undefined
  if (props.data.link !== undefined) {
    link = (
      <div className="link">
        <a href={props.data.link} target="_blank" rel="noreferrer">
          Link
        </a>
      </div>
    )
  }

  return (
    <div className="detail-slide">
      <div className="detail-title">
        {props.data.name}
        <div
          className="detail-sepbar"
          style={{ backgroundColor: props.data.inFocusedColor }}
        ></div>
      </div>

      <div className="detail-description">
        <p>{props.data.description}</p>
      </div>
      {link}
      <div className="detail-organizer">
        Opened by&nbsp;
        <a href={props.data.organizerProfile} target="_blank" rel="noreferrer">
          @{props.data.organizer}
        </a>
      </div>
    </div>
  )
}
