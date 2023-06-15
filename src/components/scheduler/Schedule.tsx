/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, type ReactNode } from 'react'
import '../../style/schedule.sass'

interface ScheduleProps {
  selectedLecture: selectedLecture
  data: Map<number, string[]>
  colors: Map<string, string[]>
  topDate: Date
  bottomDate: Date
}

class Schedule extends Component<ScheduleProps, any> {
  render(): ReactNode {
    const leftTopDate = new Date(this.props.topDate)
    leftTopDate.setDate(
      this.props.topDate.getDate() - this.props.topDate.getDay()
    )
    const leftBottomDate = new Date(this.props.bottomDate)
    leftBottomDate.setDate(
      this.props.bottomDate.getDate() - this.props.bottomDate.getDay()
    )
    const com: ReactNode[] = []
    let i = 0
    for (;;) {
      const curDate = new Date(leftTopDate)
      curDate.setDate(curDate.getDate() + i)
      if (curDate.getTime() > leftBottomDate.getTime()) {
        break
      }
      const column: ReactNode[] = []
      for (let col = 0; col < 7; col++) {
        const sectionDate = new Date(leftTopDate)
        sectionDate.setDate(sectionDate.getDate() + i)
        const conditionDate = new Date(sectionDate)
        conditionDate.setDate(sectionDate.getDate() + 1)
        const tright = this.props.data.get(conditionDate.getTime()) ?? []
        conditionDate.setDate(sectionDate.getDate() + 7)
        const tbottom = this.props.data.get(conditionDate.getTime()) ?? []
        const lectureIds = this.props.data.get(sectionDate.getTime()) ?? []

        console.log(`${sectionDate.getDate()} ${lectureIds.join(' ')}`)
        console.log(this.props.data.get(sectionDate.getTime()))

        let right: string[] = []
        let bottom: string[] = []
        right = right.concat(
          tright.filter((value) => !lectureIds.includes(value)),
          lectureIds.filter((value) => !tright.includes(value))
        )
        bottom = bottom.concat(
          tbottom.filter((value) => !lectureIds.includes(value)),
          lectureIds.filter((value) => !tbottom.includes(value))
        )

        const subBorder = {
          right,
          bottom,
        }

        let top: string[] | undefined
        let left: string[] | undefined

        if (col === 0) {
          left = lectureIds
        }
        if (i < 7) {
          top = lectureIds
        }
        const additionalBorder: AdditionalBorder = {
          left,
          top,
        }

        column.push(
          <Day
            date={sectionDate}
            selectedLecture={this.props.selectedLecture}
            subBorder={subBorder}
            additionalBorder={additionalBorder}
            lectureIds={lectureIds}
            colors={this.props.colors}
            uuid={i}
          ></Day>
        )
        i++
      }
      com.push(<div className="schedule-week">{column}</div>)
    }
    return <div className="schedule">{com}</div>
  }
}

export default Schedule

interface SubscribeBorder {
  right: string[]
  bottom: string[]
}

interface AdditionalBorder {
  top?: string[]
  left?: string[]
}

interface selectedLecture {
  lectureIds: string[]
}

interface DayProp {
  selectedLecture: selectedLecture
  date: Date
  subBorder: SubscribeBorder
  additionalBorder: AdditionalBorder
  lectureIds: string[]
  colors: Map<string, string[]>
  uuid: number
}

const Day = (prop: DayProp): ReactNode => {
  const mouseEnter = (): void => {
    prop.lectureIds
      .concat(prop.selectedLecture.lectureIds)
      .forEach((lectureId) => {
        document
          .querySelectorAll(`[data-lecture-id*=${lectureId}]`)
          .forEach((v) => {
            v.classList.add('focused-lecture')
          })
        document
          .querySelectorAll(`[data-right-sub*=${lectureId}]`)
          .forEach((v) => {
            v.setAttribute(
              'style',
              (v.getAttribute('style') ?? '') +
                `${
                  'border-right-color:' +
                  (prop.colors.get(lectureId)?.at(1) ?? '')
                };`
            )
          })
        document
          .querySelectorAll(`[data-bottom-sub*=${lectureId}]`)
          .forEach((v) => {
            v.setAttribute(
              'style',
              (v.getAttribute('style') ?? '') +
                `${
                  'border-bottom-color:' +
                  (prop.colors.get(lectureId)?.at(1) ?? '')
                };`
            )
          })
      })
  }
  const mouseLeave = (): void => {
    prop.lectureIds.forEach((lectureId) => {
      document
        .querySelectorAll(`[data-lecture-id*=${lectureId}]`)
        .forEach((v) => {
          v.classList.remove('focused-lecture')
        })
      document
        .querySelectorAll(`[data-right-sub*=${lectureId}]`)
        .forEach((v) => {
          v.setAttribute(
            'style',
            `border-right-color: ${
              prop.colors
                .get(v.getAttribute('data-right-sub')?.split(' ')?.at(0) ?? '')
                ?.at(0) ?? ''
            };
            border-bottom-color: ${
              prop.colors
                .get(v.getAttribute('data-bottom-sub')?.split(' ')?.at(0) ?? '')
                ?.at(0) ?? ''
            };
            `
          )
        })
      document
        .querySelectorAll(`[data-bottom-sub*=${lectureId}]`)
        .forEach((v) => {
          v.setAttribute(
            'style',
            `border-right-color: ${
              prop.colors
                .get(v.getAttribute('data-right-sub')?.split(' ')?.at(0) ?? '')
                ?.at(0) ?? ''
            };
            border-bottom-color: ${
              prop.colors
                .get(v.getAttribute('data-bottom-sub')?.split(' ')?.at(0) ?? '')
                ?.at(0) ?? ''
            };
            `
          )
        })
    })
  }

  const selectedChange = (lectureIds: string[]): void => {
    prop.selectedLecture.lectureIds.forEach((lectureId) => {
      document
        .querySelectorAll(`[data-lecture-id*=${lectureId}]`)
        .forEach((v) => {
          v.classList.remove('focused-lecture')
        })
      document
        .querySelectorAll(`[data-right-sub*=${lectureId}]`)
        .forEach((v) => {
          v.setAttribute(
            'style',
            `border-right-color: ${
              prop.colors
                .get(v.getAttribute('data-right-sub')?.split(' ')?.at(0) ?? '')
                ?.at(0) ?? ''
            };
            border-bottom-color: ${
              prop.colors
                .get(v.getAttribute('data-bottom-sub')?.split(' ')?.at(0) ?? '')
                ?.at(0) ?? ''
            };
            `
          )
        })
      document
        .querySelectorAll(`[data-bottom-sub*=${lectureId}]`)
        .forEach((v) => {
          v.setAttribute(
            'style',
            `border-right-color: ${
              prop.colors
                .get(v.getAttribute('data-right-sub')?.split(' ')?.at(0) ?? '')
                ?.at(0) ?? ''
            };
            border-bottom-color: ${
              prop.colors
                .get(v.getAttribute('data-bottom-sub')?.split(' ')?.at(0) ?? '')
                ?.at(0) ?? ''
            };
            `
          )
        })
    })
    prop.selectedLecture.lectureIds = lectureIds
    mouseEnter()
  }

  const mouseClink = (): void => {
    selectedChange(prop.lectureIds)
  }

  return (
    <div
      className={`schedule-day`}
      data-right-sub={prop.subBorder.right.join(' ')}
      data-bottom-sub={prop.subBorder.bottom.join(' ')}
      data-lecture-id={prop.lectureIds.join(' ')}
      data-top-sub={null}
      data-left-sub={null}
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
      onClick={mouseClink}
      style={{
        borderRightColor:
          prop.colors.get(prop.subBorder.right.at(0) ?? '')?.at(0) ?? '',
        borderBottomColor:
          prop.colors.get(prop.subBorder.bottom.at(0) ?? '')?.at(0) ?? '',
      }}
    >
      <p>{prop.date.getDate()}</p>
    </div>
  )
}
