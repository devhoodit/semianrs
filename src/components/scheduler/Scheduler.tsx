import { Component, type ReactNode } from 'react'
import Schedule from './Schedule'

class Scheduler extends Component {
  render(): ReactNode {
    const data = new Map<number, string[]>()
    const colors = new Map<string, string[]>()
    let t = new Date('2023-6-22').getTime()
    data.set(t, ['reinforce'])
    t = new Date('2023-6-11').getTime()
    data.set(t, ['reinforce'])
    t = new Date('2023-6-29').getTime()
    data.set(t, ['reinforce'])
    t = new Date('2023-6-30').getTime()
    data.set(t, ['reinforce'])
    t = new Date('2023-6-28').getTime()
    data.set(t, ['reinforce'])
    t = new Date('2023-7-6').getTime()
    data.set(t, ['reinforce'])
    t = new Date('2023-6-26').getTime()
    data.set(t, ['machine'])
    t = new Date('2023-6-27').getTime()
    data.set(t, ['machine'])
    t = new Date('2023-6-29').getTime()
    data.set(t, ['ml', 'reinforce'])
    t = new Date('2023-8-17').getTime()
    data.set(t, ['ml', 'reinforce'])

    t = new Date('2023-7-13').getTime()
    data.set(t, ['reinforce'])
    colors.set('reinforce', ['red', 'green'])
    colors.set('machine', ['blue', 'white'])
    colors.set('ml', ['yellow', 'white'])
    const selectedLecture: selectedLecture = { lectureIds: [] }
    return (
      <div style={{ height: '50%' }}>
        <Schedule
          selectedLecture={selectedLecture}
          topDate={new Date('2023-6-14')}
          bottomDate={new Date('2023-8-14')}
          data={data}
          colors={colors}
        ></Schedule>
      </div>
    )
  }
}
interface selectedLecture {
  lectureIds: string[]
}

export default Scheduler
