import React, { Component, type ReactNode } from 'react'
import Calender from './calender'
import '../../style/scheduler.sass'

interface SchedulerProps {
  QuaterIds: string[]
}

enum FetchState {
  Wait,
  Ok,
  Fail,
}

interface SchedulerState {
  curQuaterId: string
  cachedQuaterData: Map<string, any>
  quaterFetchState: FetchState
}

class Scheduler extends Component<SchedulerProps, SchedulerState> {
  constructor(props: SchedulerProps) {
    super(props)
    this.state = {
      curQuaterId: props.QuaterIds[0],
      cachedQuaterData: new Map<string, any>(),
      quaterFetchState: FetchState.Wait,
    }
  }

  componentDidMount(): void {
    this.changeQuater(this.state.curQuaterId)
  }

  async fetchQuater(quaterId: string): Promise<boolean> {
    this.setState({ quaterFetchState: FetchState.Wait })
    return await fetch(
      `https://raw.githubusercontent.com/devhoodit/semianrs/main/public/seminars/${quaterId}.json`
    )
      .then(async (resp) => await resp.json())
      .then((resp) => {
        this.setState({
          cachedQuaterData: this.state.cachedQuaterData.set(quaterId, resp),
        })
        console.log(
          `fetch https://raw.githubusercontent.com/devhoodit/semianrs/main/public/seminars/${quaterId}.json`
        )
        return true
      })
      .catch(() => {
        return false
      })
  }

  changeQuater(quaterId: string): void {
    if (this.state.cachedQuaterData.has(quaterId)) {
      this.setState({ curQuaterId: quaterId, quaterFetchState: FetchState.Ok })
    }
    this.setState({ curQuaterId: quaterId, quaterFetchState: FetchState.Wait })
    void this.fetchQuater(quaterId).then(() => {
      this.setState({ quaterFetchState: FetchState.Ok })
    })
  }

  render(): React.ReactNode {
    let controlDropbox = true
    let container: ReactNode
    if (this.state.quaterFetchState === FetchState.Wait) {
      controlDropbox = false
      container = (
        <div className="fetchstate__container scheduler__container">
          <p className="header">Waiting for fetching quater</p>
        </div>
      )
    } else if (this.state.quaterFetchState === FetchState.Ok) {
      controlDropbox = true
      container = (
        <Calender
          data={this.state.cachedQuaterData.get(this.state.curQuaterId)}
        ></Calender>
      )
    } else {
      controlDropbox = true
      container = (
        <div className="fetchstate__container scheduler__container">
          <p className="header">Fail to fetching quater</p>
          <p>Sorry, loading quater failed</p>
          <p>You can see other quaters</p>
          <p>If you want some help, please contact to us</p>
        </div>
      )
    }
    return (
      <div className="scheduler__container">
        <div className="title">
          Scheduler
          {/*  */}
          <div className="dropbox">{controlDropbox ? '' : ''}</div>
        </div>
        {container}
      </div>
    )
  }
}

export default Scheduler
