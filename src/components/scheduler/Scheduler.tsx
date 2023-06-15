import { Component, type ReactNode } from 'react'
import '../../style/scheduler.sass'
import Schedule from './Schedule'

interface SchedulerState {
  seminarList: string[]
  curQuater: string
  fetchState: FetchState
  curFetchState: FetchState
  cachedQuater: Map<string, any>
}

enum FetchState {
  Wait,
  Ok,
  Fail,
}

class Scheduler extends Component<any, SchedulerState> {
  constructor(props: any) {
    super(props)
    this.state = {
      seminarList: [],
      curQuater: '',
      fetchState: FetchState.Wait,
      curFetchState: FetchState.Wait,
      cachedQuater: new Map<string, any>(),
    }
  }

  async getQuaterList(url: string): Promise<string> {
    console.log(`fetching ${url}`)
    return await fetch(url)
      .then(async (resp) => {
        const res = await resp.json()
        this.setState({
          seminarList: res.name,
          curQuater: res.name[0],
          fetchState: FetchState.Ok,
        })
        return res.name[0]
      })
      .catch(() => {
        this.setState({ fetchState: FetchState.Fail })
        return ''
      })
  }

  async getQuaterInfo(name: string): Promise<void> {
    console.log(
      `fecthing https://raw.githubusercontent.com/devhoodit/semianrs/main/public/seminars/${name}.json`
    )
    await fetch(
      `https://raw.githubusercontent.com/devhoodit/semianrs/main/public/seminars/${name}.json`
    )
      .then(async (resp) => {
        const res = await resp.json()
        this.setState({
          cachedQuater: this.state.cachedQuater.set(name, res.data),
          curFetchState: FetchState.Ok,
        })
      })
      .catch(() => {
        this.setState({ curFetchState: FetchState.Fail })
      })
  }

  componentDidMount(): void {
    void this.getQuaterList(
      'https://raw.githubusercontent.com/devhoodit/semianrs/main/public/seminars/seminar.json'
    ).then((quater) => {
      if (quater.length === 0) {
        return
      }
      this.changeQuater(quater)
    })
  }

  changeQuater(quater: string): void {
    const curQuater = quater
    if (this.state.cachedQuater.has(curQuater)) {
      this.setState({ curQuater, curFetchState: FetchState.Ok })
    } else {
      this.setState({ curQuater, curFetchState: FetchState.Wait })
      void this.getQuaterInfo(curQuater)
    }
  }

  render(): ReactNode {
    if (this.state.fetchState === FetchState.Wait) {
      //  wait
      return (
        <div className="seminar__scheduler fetch-waiting">
          <p className="header">Waiting for Fetch Quater List</p>
        </div>
      )
    } else if (this.state.fetchState === FetchState.Ok) {
      if (this.state.curFetchState === FetchState.Wait) {
        return (
          <div className="seminar__scheduler fetch-waiting">
            <p className="header">Waiting for Fetching Quater</p>
          </div>
        )
      } else if (this.state.curFetchState === FetchState.Ok) {
        const selectedLecture: selectedLecture = { lectureIds: [] }
        const data = new Map<number, string[]>()
        const colors = new Map<string, string[]>()
        for (const info of this.state.cachedQuater.get(this.state.curQuater)) {
          const tmpDate = new Date(info.date)
          data.set(tmpDate.getTime(), [
            ...(data.get(tmpDate.getTime()) ?? []),
            info.name.replace(' ', ''),
          ])
          console.log(info)
          colors.set(info.name.replace(' ', ''), [
            info.outFocusedColor,
            info.inFocusedColor,
          ])
        }
        console.log(colors)
        return (
          <div className="seminar__scheduler fetch-ok">
            <Schedule
              selectedLecture={selectedLecture}
              topDate={new Date('2023-6-14')}
              bottomDate={new Date('2023-8-14')}
              data={data}
              colors={colors}
            ></Schedule>
          </div>
        )
      } else {
        return (
          <div className="seminar__scheduler fetch-fail">
            <p className="header">Fail to Fetch Quater</p>
            <p>Sorry, loading information failed</p>
            <p>If you want some help, please contact to us</p>
          </div>
        )
      }
    } else {
      //  fail
      return (
        <div className="seminar__scheduler fetch-fail">
          <p className="header">Fail to Fetching Quater List</p>
          <p>Sorry, loading information failed</p>
          <p>If you want some help, please contact to us</p>
        </div>
      )
    }
    // const data = new Map<number, string[]>()
    // const colors = new Map<string, string[]>()
    // const selectedLecture: selectedLecture = { lectureIds: [] }
    // return (
    //   <div style={{ height: '50%' }}>
    //     <Schedule
    //       selectedLecture={selectedLecture}
    //       topDate={new Date('2023-6-14')}
    //       bottomDate={new Date('2023-8-14')}
    //       data={data}
    //       colors={colors}
    //     ></Schedule>
    //   </div>
    // )
  }
}
interface selectedLecture {
  lectureIds: string[]
}

export default Scheduler
