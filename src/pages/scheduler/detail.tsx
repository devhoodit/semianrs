import { Component, useState, type ReactNode, useEffect } from 'react'
import '../../style/detail.sass'

interface DetailProps {
  selectedLectures: string[]
  data: Map<string, any>
}

const Detail = (props: DetailProps): ReactNode => {
  const [indexState, setIndexState] = useState(0)
  const detailSlides: ReactNode[] = []
  const length = props.selectedLectures.length

  const onLeftClick = (): void => {
    setIndexState((prev) => prev - 1)
  }
  const onRightClick = (): void => {
    setIndexState((prev) => prev + 1)
  }

  useEffect(() => {
    setIndexState(0)
  }, [props.selectedLectures])

  for (const value of props.selectedLectures) {
    detailSlides.push(<DetailInfo data={props.data.get(value)}></DetailInfo>)
  }
  if (props.selectedLectures.length <= 0) {
    return (
      <div className="detail__container">
        <div className="detail__container-guide">
          Click calendar to see detail information
        </div>
      </div>
    )
  }
  console.log(indexState)
  return (
    <div className="detail__container">
      <div
        className="detail__slider"
        style={{
          transform:
            length === 1
              ? ''
              : `translateY(-${(100 * indexState) / (length - 1)}%)`,
        }}
      >
        {detailSlides}
      </div>
      <div className="detail-button__container">
        <button
          className={`left-button detail-button ${
            indexState <= 0 ? 'button-disable' : 'button-enable'
          }`}
          onClick={indexState <= 0 ? undefined : onLeftClick}
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
          className={`right-button detail-button ${
            indexState < length - 1 ? 'button-enable' : 'button-disable'
          }`}
          onClick={indexState < length - 1 ? onRightClick : undefined}
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

export default Detail

interface DetailInfoProps {
  data: any
}

class DetailInfo extends Component<DetailInfoProps, any> {
  render(): ReactNode {
    return (
      <div className="detail-slide">
        <div className="detail-title">
          {this.props.data.name}
          <div
            className="detail-sepbar"
            style={{ backgroundColor: this.props.data.inFocusedColor }}
          ></div>
        </div>
        <div className="detail-description">{this.props.data.description}</div>
        <div className="detail-organizer">{`Opened by @${
          this.props.data.organizer as string
        }`}</div>
      </div>
    )
  }
}
