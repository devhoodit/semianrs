import { Component, type ReactNode } from 'react'
import '../../style/schedulerHandler.sass'
import Scheduler from './scheduler'

interface SchedulerHandlerProps {
  QuaterListLink: string
}

interface SchedulerHandlerState {
  fetchState: FetchState
  quaterList: string[]
}

enum FetchState {
  Wait,
  Ok,
  Fail,
}

class SchedulerHandler extends Component<
  SchedulerHandlerProps,
  SchedulerHandlerState
> {
  constructor(props: SchedulerHandlerProps) {
    super(props)
    this.state = { fetchState: FetchState.Wait, quaterList: [] }
  }

  async fetchQuaterIds(url: string): Promise<boolean> {
    return await fetch(url)
      .then(async (resp) => await resp.json())
      .then((resp) => {
        this.setState({ quaterList: resp.name })
        console.log(`fecth ${url}`)
        return true
      })
      .catch(() => {
        return false
      })
  }

  componentDidMount(): void {
    void this.fetchQuaterIds(this.props.QuaterListLink).then((resp) => {
      if (resp) {
        this.setState({ fetchState: FetchState.Ok })
      } else {
        this.setState({ fetchState: FetchState.Fail })
      }
    })
  }

  render(): ReactNode {
    if (this.state.fetchState === FetchState.Wait) {
      return (
        <div className="fetchstate__container scheduler-handler__container">
          <p className="header">Waiting for fetching quater list</p>
        </div>
      )
    }
    if (this.state.fetchState === FetchState.Ok) {
      return <Scheduler QuaterIds={this.state.quaterList}></Scheduler>
    }
    return (
      <div className="fetchstate__container scheduler-handler__container">
        <p className="header">Fail to fetching quater list</p>
        <p>Sorry, loading information failed</p>
        <p>If you want some help, please contact to us</p>
      </div>
    )
  }
}

export default SchedulerHandler
