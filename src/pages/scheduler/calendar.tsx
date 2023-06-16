import { Component, type ReactNode } from 'react'
import '../../style/calendar.sass'
import RightNavigation from './rightNavigation'
import Detail from './detail'

interface CalendarProps {
  data: any
}

interface CalendarState {
  lectureDate: Map<number, string[]>
  colors: Map<string, string[]>
  selectedLectures: string[]
}

interface SelectedLecture {
  lectureIds: string[]
}

class Calendar extends Component<CalendarProps, CalendarState> {
  lectureInfoMap: Map<string, any>
  constructor(prop: CalendarProps) {
    super(prop)
    const lectureDate = new Map<number, string[]>()
    const colors = new Map<string, string[]>()
    const lectureInfoMap = new Map<string, any>()
    for (const v of prop.data.items) {
      const name = (v.name.replace(' ', '') as string) + 'zyqo'
      lectureInfoMap.set(name, v)
      v.date.forEach((date: string) => {
        const t = new Date(date)
        const key = t.getTime()
        if (lectureDate.has(key)) {
          lectureDate.set(key, [...(lectureDate.get(key) ?? []), name])
        } else {
          lectureDate.set(key, [name])
        }
      })
      const outFocusedColor = v.outFocusedColor
      const inFocusedColor = v.inFocusedColor
      colors.set(name, [outFocusedColor, inFocusedColor])
    }
    this.state = {
      lectureDate,
      colors,
      selectedLectures: [],
    }
    this.lectureInfoMap = lectureInfoMap
  }

  inFocus = (lectureId: string): void => {
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
            'border-right-color:' +
            (this.state.colors.get(lectureId)?.at(1) ?? '')
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
              (this.state.colors.get(lectureId)?.at(1) ?? '')
            };`
        )
      })
  }

  outFocus = (lectureId: string): void => {
    document
      .querySelectorAll(`[data-lecture-id*=${lectureId}]`)
      .forEach((v) => {
        v.classList.remove('focused-lecture')
      })
    document.querySelectorAll(`[data-right-sub*=${lectureId}]`).forEach((v) => {
      v.setAttribute(
        'style',
        `border-right-color: ${
          this.state.colors
            .get(v.getAttribute('data-right-sub')?.split(',')?.at(0) ?? '')
            ?.at(0) ?? ''
        };
        border-bottom-color: ${
          this.state.colors
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
            this.state.colors
              .get(v.getAttribute('data-right-sub')?.split(',')?.at(0) ?? '')
              ?.at(0) ?? ''
          };
        border-bottom-color: ${
          this.state.colors
            .get(v.getAttribute('data-bottom-sub')?.split(',')?.at(0) ?? '')
            ?.at(0) ?? ''
        };
        `
        )
      })
  }

  selectedChange = (
    lectureIds: string[],
    selectedLecture: SelectedLecture
  ): void => {
    this.setState({ selectedLectures: lectureIds })
    selectedLecture.lectureIds.forEach((lectureId) => {
      this.outFocus(lectureId)
    })
    selectedLecture.lectureIds = lectureIds
    lectureIds.concat(selectedLecture.lectureIds).forEach((lectureId) => {
      this.inFocus(lectureId)
    })
  }

  render(): ReactNode {
    // initialize start & end date (start of week)
    const selectedLecture: SelectedLecture = {
      lectureIds: this.state.selectedLectures,
    }
    const start = new Date(this.props.data.start)
    const end = new Date(this.props.data.end)
    start.setDate(start.getDate() - start.getDay())
    end.setDate(end.getDate() - end.getDay())
    const cal: ReactNode[] = []
    let i = 0
    for (;;) {
      const firstDayOfWeek = new Date(start)
      firstDayOfWeek.setDate(firstDayOfWeek.getDate() + i)
      if (firstDayOfWeek.getTime() > end.getTime()) {
        break
      }
      const week: ReactNode[] = []
      for (let col = 0; col < 7; col++) {
        const curDate = new Date(start)
        curDate.setDate(curDate.getDate() + i)
        const conditionDate = new Date(curDate)
        conditionDate.setDate(curDate.getDate() + 1)
        const tright = this.state.lectureDate.get(conditionDate.getTime()) ?? []
        conditionDate.setDate(curDate.getDate() + 7)
        const tbottom =
          this.state.lectureDate.get(conditionDate.getTime()) ?? []
        const lectureIds = this.state.lectureDate.get(curDate.getTime()) ?? []

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

        week.push(
          <Day
            date={curDate}
            subBorder={subBorder}
            lectureIds={lectureIds}
            selectedLecture={selectedLecture}
            colors={this.state.colors}
            inFocus={this.inFocus}
            outFocus={this.outFocus}
            selectedChange={this.selectedChange}
          ></Day>
        )
        i++
      }
      cal.push(<div className="calendar-week">{week}</div>)
    }

    return (
      <div className="calendar__container">
        <div className="main">
          <div className="left-nav"></div>
          <div className="calendar">{cal}</div>
          <RightNavigation
            lectures={this.props.data.items}
            selectedLecture={selectedLecture}
            inFocus={this.inFocus}
            outFocus={this.outFocus}
            selectedChange={this.selectedChange}
          ></RightNavigation>
        </div>

        <Detail
          selectedLectures={this.state.selectedLectures}
          data={this.lectureInfoMap}
        ></Detail>
      </div>
    )
  }
}

export default Calendar

interface SubBorder {
  left?: string[]
  top?: string[]
  right: string[]
  bottom: string[]
}

interface DayProps {
  date: Date
  lectureIds: string[]
  subBorder: SubBorder
  selectedLecture: SelectedLecture
  colors: Map<string, string[]>
  inFocus: (lectureId: string) => void
  outFocus: (lectureId: string) => void
  selectedChange: (
    lectureIds: string[],
    selectedLecture: SelectedLecture
  ) => void
}

const Day = (prop: DayProps): ReactNode => {
  const onMouseEnter = (): void => {
    prop.lectureIds
      .concat(prop.selectedLecture.lectureIds)
      .forEach((lectureId) => {
        prop.inFocus(lectureId)
      })
  }

  const onMouseLeave = (): void => {
    prop.lectureIds.forEach((lectureId) => {
      prop.outFocus(lectureId)
    })
    prop.selectedLecture.lectureIds.forEach((id) => {
      prop.inFocus(id)
    })
  }

  const onClick = (): void => {
    prop.selectedChange(prop.lectureIds, prop.selectedLecture)
  }

  return (
    <div
      className={`calendar-day border-type-${0}`}
      data-right-sub={prop.subBorder.right}
      data-bottom-sub={prop.subBorder.bottom}
      data-lecture-id={prop.lectureIds}
      data-top-sub={null}
      data-left-sub={null}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
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
