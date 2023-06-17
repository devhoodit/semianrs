import { useState, type ReactNode, useEffect } from 'react'

import { CalendarContainer } from './CalendarContainer'
import '../../style/Quater.sass'

// quater control navigation component

enum FetchState {
  WAIT,
  OK,
  FAIL,
}

interface QuaterProps {
  QuaterIds: string[]
}

export const Quater = (props: QuaterProps): ReactNode => {
  const [curQuaterId, setCurQuaterId] = useState(props.QuaterIds[0])
  const [cachedQuater, setCachedQuater] = useState(new Map<string, any>())
  const [fetchState, setFetchState] = useState(FetchState.FAIL)

  const changeQuaterId = (quaterId: string): void => {
    if (fetchState === FetchState.WAIT) return
    if (!cachedQuater.has(quaterId)) {
      setFetchState(FetchState.WAIT)
      fetch(
        `https://raw.githubusercontent.com/devhoodit/semianrs/main/public/seminars/${quaterId}.json`
      )
        .then(async (resp) => {
          return await resp.json()
        })
        .then((resp) => {
          setCachedQuater((prev) => new Map([...prev, [curQuaterId, resp]]))
          setFetchState(FetchState.OK)
        })
        .catch(() => {
          setFetchState(FetchState.FAIL)
        })
    }
    setCurQuaterId(quaterId)
  }
  useEffect(() => {
    changeQuaterId(curQuaterId)
  }, [])

  const quaterItems: ReactNode[] = []
  for (const quaterId of props.QuaterIds) {
    quaterItems.push(
      <QuaterItem
        quaterId={quaterId}
        focused={quaterId === curQuaterId}
        changeQuaterId={changeQuaterId}
      ></QuaterItem>
    )
  }

  if (fetchState === FetchState.WAIT) {
    return (
      <div className="schedule__container">
        <div className="quater__container">{quaterItems}</div>
        <div className="fetch-waiting">
          <p className="header">Loading Quater Data...</p>
          <p>Try to fetching Quater data from {curQuaterId}</p>
          <p>Please wait patiently</p>
        </div>
      </div>
    )
  } else if (fetchState === FetchState.OK) {
    return (
      <div className="schedule__container">
        <div className="quater__container">{quaterItems}</div>
        <CalendarContainer
          data={cachedQuater.get(curQuaterId)}
        ></CalendarContainer>
      </div>
    )
  } else {
    return (
      <div className="schedule__container">
        <div className="quater__container">{quaterItems}</div>
        <div className="fetch-fail">
          <p className="header">Fail to load Schedule</p>
          <p>Sorry for error, please refreshing to try again</p>
          <p>If same error occurs, please contact us</p>
        </div>
      </div>
    )
  }
}

interface QuaterItemProps {
  quaterId: string
  focused: boolean
  changeQuaterId: (quaterId: string) => void
}

const QuaterItem = (props: QuaterItemProps): ReactNode => {
  return (
    <div
      className={`quater-item ${props.focused ? 'focused' : ''}`}
      onClick={
        props.focused
          ? undefined
          : () => {
              props.changeQuaterId(props.quaterId)
            }
      }
    >
      {props.quaterId}
    </div>
  )
}
