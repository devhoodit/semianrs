import { useState, type ReactNode } from 'react'

import { RightNaviation } from './RightNavigation'
import { Detail } from './Detail'
import '../../style/Calendar.sass'

interface DayTmpProps {
  date: Date
  rightBorderSub: string
  bottomBorderSub: string
  lectureIds: string[]
  rightBorderDefaultColor: string
  bottomBorderDefaultColor: string
}

interface CalendarContainerProps {
  data: any
}

// this is component for computing initialize values
export const CalendarContainer = (props: CalendarContainerProps): ReactNode => {
  if (props.data === undefined) {
    return <div>something wrong, please try again</div>
  }
  const startDate = new Date(props.data.start)
  const endDate = new Date(props.data.end)
  startDate.setDate(startDate.getDate() - startDate.getDay())
  endDate.setDate(endDate.getDate() - endDate.getDay())

  const lectureDate = new Map<number, string[]>()
  const colors = new Map<string, string[]>()
  const lectureInfo = new Map<string, any>()

  for (const v of props.data.items) {
    const name =
      (v.name as string).replaceAll(' ', '').replaceAll('&', '') + 'aofhsuivd'
    lectureInfo.set(name, v)
    v.date.forEach((date: string) => {
      const t = new Date(date)
      const key = t.getTime()
      lectureDate.set(key, [...(lectureDate.get(key) ?? []), name])
      const outFocusedColor = v.outFocusedColor
      const inFocusedColor = v.inFocusedColor
      colors.set(name, [outFocusedColor, inFocusedColor])
    })
  }

  const dayData: DayTmpProps[][] = []

  let i = 0

  for (;;) {
    const firstDayOfWeek = new Date(startDate)
    firstDayOfWeek.setDate(firstDayOfWeek.getDate() + i)
    if (firstDayOfWeek.getTime() > endDate.getTime()) break
    const week: DayTmpProps[] = []
    for (let col = 0; col < 7; col++) {
      const curDate = new Date(startDate)
      curDate.setDate(curDate.getDate() + i)
      const conditionDate = new Date(curDate)
      conditionDate.setDate(curDate.getDate() + 1)
      const tright = lectureDate.get(conditionDate.getTime()) ?? []
      conditionDate.setDate(curDate.getDate() + 7)
      const tbottom = lectureDate.get(conditionDate.getTime()) ?? []
      const lectureIds = lectureDate.get(curDate.getTime()) ?? []

      const right = [
        ...tright.filter((value) => !lectureIds.includes(value)),
        ...lectureIds.filter((value) => !tright.includes(value)),
      ]
      const bottom = [
        ...tbottom.filter((value) => !lectureIds.includes(value)),
        ...lectureIds.filter((value) => !tbottom.includes(value)),
      ]

      let rightBorderDefaultColor = ''
      let bottomBorderDefaultColor = ''
      if (right.length !== 0) {
        rightBorderDefaultColor = (colors.get(right[0]) ?? []).at(0) ?? ''
      }
      if (bottom.length !== 0) {
        bottomBorderDefaultColor = (colors.get(bottom[0]) ?? []).at(0) ?? ''
      }

      const dayTmpProps: DayTmpProps = {
        date: curDate,
        rightBorderSub: right.join(','),
        bottomBorderSub: bottom.join(','),
        lectureIds,
        rightBorderDefaultColor,
        bottomBorderDefaultColor,
      }
      week.push(dayTmpProps)
      i++
    }
    dayData.push(week)
  }

  return (
    <CCalendarContainer
      data={props.data}
      dayData={dayData}
      colors={colors}
      lectureInfo={lectureInfo}
    ></CCalendarContainer>
  )
}

interface CCalendarContainerProps {
  data: any
  dayData: DayTmpProps[][]
  colors: Map<string, string[]>
  lectureInfo: Map<string, any>
}

const CCalendarContainer = (props: CCalendarContainerProps): ReactNode => {
  const [selectedLectureIds, setSelectedLectureIds] = useState(
    new Array<string>()
  )

  const inFocus = (lectureId: string): void => {
    document
      .querySelectorAll(`[data-lecture-id*=${lectureId}]`)
      .forEach((v) => {
        v.classList.add('focused-lecture')
      })
    document.querySelectorAll(`[data-right-sub*=${lectureId}]`).forEach((v) => {
      v.setAttribute(
        'style',
        (v.getAttribute('style') ?? '') +
          `${
            'border-right-color:' + (props.colors.get(lectureId)?.at(1) ?? '')
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
              (props.colors.get(lectureId)?.at(1) ?? '')
            };`
        )
      })
  }

  const outFocus = (lectureId: string): void => {
    document
      .querySelectorAll(`[data-lecture-id*=${lectureId}]`)
      .forEach((v) => {
        v.classList.remove('focused-lecture')
      })
    document.querySelectorAll(`[data-right-sub*=${lectureId}]`).forEach((v) => {
      v.setAttribute(
        'style',
        `border-right-color: ${
          props.colors
            .get(v.getAttribute('data-right-sub')?.split(',')?.at(0) ?? '')
            ?.at(0) ?? ''
        };
        border-bottom-color: ${
          props.colors
            .get(v.getAttribute('data-bottom-sub')?.split(',')?.at(0) ?? '')
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
            props.colors
              .get(v.getAttribute('data-right-sub')?.split(',')?.at(0) ?? '')
              ?.at(0) ?? ''
          };
        border-bottom-color: ${
          props.colors
            .get(v.getAttribute('data-bottom-sub')?.split(',')?.at(0) ?? '')
            ?.at(0) ?? ''
        };
        `
        )
      })
  }

  const selectedChange = (
    lectureIds: string[],
    selectedLectureIds: string[]
  ): void => {
    selectedLectureIds.forEach((lectureId) => {
      outFocus(lectureId)
    })
    setSelectedLectureIds(lectureIds)
    lectureIds.forEach((lectureId) => {
      inFocus(lectureId)
    })
  }

  const cal: ReactNode[] = []
  props.dayData.forEach((week) => {
    const weekNodes: ReactNode[] = []
    week.forEach((d) => {
      weekNodes.push(
        <Day
          date={d.date}
          lectureIds={d.lectureIds}
          rightBorderSub={d.rightBorderSub}
          bottomBorderSub={d.bottomBorderSub}
          rightBorderDefaultColor={d.rightBorderDefaultColor}
          bottomBorderDefaultColor={d.bottomBorderDefaultColor}
          selectedLectureIds={selectedLectureIds}
          inFocus={inFocus}
          outFocus={outFocus}
          selectedChange={selectedChange}
        ></Day>
      )
    })
    cal.push(<div className="calendar-week">{weekNodes}</div>)
  })
  return (
    <div className="calendar__container">
      <div className="main">
        <div className="calendar">{cal}</div>
        <RightNaviation
          data={props.data}
          selectedLectureIds={selectedLectureIds}
          inFocus={inFocus}
          outFocus={outFocus}
          selectedChange={selectedChange}
        ></RightNaviation>
      </div>
      <Detail
        selectedLectureIds={selectedLectureIds}
        data={props.lectureInfo}
      ></Detail>
    </div>
  )
}

interface DayProps {
  date: Date
  lectureIds: string[]
  rightBorderSub: string
  bottomBorderSub: string
  rightBorderDefaultColor: string
  bottomBorderDefaultColor: string
  selectedLectureIds: string[]
  inFocus: (lectureId: string) => void
  outFocus: (lectureId: string) => void
  selectedChange: (lectureIds: string[], selectedLecture: string[]) => void
}

const Day = (props: DayProps): ReactNode => {
  const onMouseEnter = (): void => {
    props.lectureIds.concat(props.selectedLectureIds).forEach((lectureId) => {
      props.inFocus(lectureId)
    })
  }

  const onMouseLeave = (): void => {
    props.lectureIds.forEach((lectureId) => {
      props.outFocus(lectureId)
    })
    props.selectedLectureIds.forEach((lectureId) => {
      props.inFocus(lectureId)
    })
  }

  const onClick = (): void => {
    console.log(props.lectureIds, props.selectedLectureIds)
    props.selectedChange(props.lectureIds, props.selectedLectureIds)
  }

  return (
    <div
      className="calendar-day"
      data-right-sub={props.rightBorderSub}
      data-bottom-sub={props.bottomBorderSub}
      data-lecture-id={props.lectureIds}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      style={{
        borderRightColor: props.rightBorderDefaultColor,
        borderBottomColor: props.bottomBorderDefaultColor,
      }}
    >
      <p>
        {props.date.getDate() === 1
          ? `${props.date.getMonth()}/${props.date.getDate()}`
          : props.date.getDate()}
      </p>
    </div>
  )
}
