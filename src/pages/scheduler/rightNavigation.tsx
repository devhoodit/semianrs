import { type ReactNode } from 'react'
import '../../style/RightNavigation.sass'

interface RightNaviationProps {
  data: any
  selectedLectureIds: string[]
  inFocus: (lectureId: string) => void
  outFocus: (lectureId: string) => void
  selectedChange: (lectureIds: string[], selectedLectureIds: string[]) => void
}

export const RightNaviation = (props: RightNaviationProps): ReactNode => {
  const row: ReactNode[] = []
  props.data.items.forEach((item: any) => {
    row.push(
      <Item
        lectureId={item.name}
        selectedLectureIds={props.selectedLectureIds}
        inFocusColor={item.inFocusedColor}
        inFocus={props.inFocus}
        outFocus={props.outFocus}
        selectedChange={props.selectedChange}
      ></Item>
    )
  })
  return <div className="calendar-right-nav">{row}</div>
}

interface ItemProps {
  lectureId: string
  selectedLectureIds: string[]
  inFocusColor: string
  inFocus: (lectureId: string) => void
  outFocus: (lectureId: string) => void
  selectedChange: (lectureIds: string[], selectedLectureIds: string[]) => void
}

const Item = (props: ItemProps): ReactNode => {
  const preProccessedLectureId = props.lectureId.replace(' ', '') + 'aofhsuivd'

  const onMouseEnter = (): void => {
    props.inFocus(preProccessedLectureId)
    props.selectedLectureIds.forEach((lectureId) => {
      props.inFocus(lectureId)
    })
  }

  const onMouseLeave = (): void => {
    props.outFocus(preProccessedLectureId)
    props.selectedLectureIds.forEach((lectureId) => {
      props.inFocus(lectureId)
    })
  }

  const onClick = (): void => {
    if (
      props.selectedLectureIds.length === 1 &&
      props.selectedLectureIds[0] === props.lectureId
    )
      return
    props.selectedChange([preProccessedLectureId], props.selectedLectureIds)
  }

  return (
    <div
      className="item"
      data-lecture-id={preProccessedLectureId}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <div
        className="label"
        style={{ background: `${props.inFocusColor}` }}
      ></div>
      {props.lectureId}
    </div>
  )
}
