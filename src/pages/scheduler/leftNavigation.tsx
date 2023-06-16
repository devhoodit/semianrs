import { type ReactNode } from 'react'
import '../../style/leftNavigation.sass'

interface LeftNavigationProps {
  quaterList: string[]
  curQuater: string
  changeQuater: (quaterId: string) => void
}

const LeftNavigation = (props: LeftNavigationProps): ReactNode => {
  const items: ReactNode[] = []
  props.quaterList.forEach((v) => {
    items.push(
      <LeftNavigationItem
        focused={v === props.curQuater}
        quater={v}
        changeQuater={props.changeQuater}
      ></LeftNavigationItem>
    )
  })
  return <div className="left-navigation__container">{items}</div>
}

export default LeftNavigation

interface LeftNavigationItemProps {
  focused: boolean
  quater: string
  changeQuater: (quaterId: string) => void
}

const LeftNavigationItem = (props: LeftNavigationItemProps): ReactNode => {
  const changeQuater = (): void => {
    props.changeQuater(props.quater)
  }
  return (
    <div
      className={`navigation-item ${props.focused ? 'focused-item' : ''}`}
      onClick={props.focused ? undefined : changeQuater}
    >
      {props.quater}
    </div>
  )
}
