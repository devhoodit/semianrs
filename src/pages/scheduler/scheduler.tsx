import { useState, type ReactNode, useEffect } from 'react'
import '../../style/Scheduler.sass'

import { Quater } from './Quater'

// this component will manage fetching QuaterList

enum FetchState {
  WAIT,
  OK,
  FAIL,
}

interface SchedulerProps {
  quaterIdsURL: string
}

export const Schedule = (props: SchedulerProps): ReactNode => {
  const [fetchState, setFetchState] = useState(FetchState.WAIT)
  const [quaterIds, setQuaterIds] = useState([])
  useEffect(() => {
    fetch(props.quaterIdsURL)
      .then(async (resp) => {
        return await resp.json()
      })
      .then((resp) => {
        setQuaterIds(resp.name)
        setFetchState(FetchState.OK)
      })
      .catch(() => {
        setFetchState(FetchState.FAIL)
      })
  }, [])

  if (fetchState === FetchState.WAIT) {
    // wait
    return (
      <div className="schedule__container">
        <div className="fetch-waiting">
          <p className="header">Loading Schedule...</p>
          <p>Try to fetching Quater Ids from {props.quaterIdsURL}</p>
          <p>Please wait patiently</p>
        </div>
      </div>
    )
  } else if (fetchState === FetchState.OK) {
    return <Quater QuaterIds={quaterIds}></Quater>
  } else {
    return (
      <div className="schedule__container">
        <div className="fetch-fail">
          <p className="header">Fail to load Schedule</p>
          <p>Sorry for error, please refreshing to try again</p>
          <p>If same error occurs, please contact us</p>
        </div>
      </div>
    )
  }
}
