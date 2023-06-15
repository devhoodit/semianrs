import { Component, type ReactNode } from 'react'

interface CalenderProps {
  data: any
}

interface CalenderState {
  selectedLectureIds: string[]
  focusedLectureIds: string[]
  lectureDate: Map<number, string[]>
}

class Calender extends Component<CalenderProps, CalenderState> {
  constructor(prop: CalenderProps) {
    super(prop)

    const lectureDate = new Map<number, string[]>()
    for (const v of prop.data.items) {
      const name = v.name
      v.date.forEach((date: string) => {
        const t = new Date(date)
        const key = t.getTime()
        if (lectureDate.has(key)) {
          lectureDate.set(key, [...(lectureDate.get(key) ?? []), name])
        } else {
          lectureDate.set(key, [name])
        }
      })
    }
    this.state = {
      selectedLectureIds: [],
      focusedLectureIds: [],
      lectureDate,
    }
  }

  render(): ReactNode {
    const start = new Date(this.props.data.start)
    const end = new Date(this.props.data.end)
    return <div></div>
  }
}

export default Calender
