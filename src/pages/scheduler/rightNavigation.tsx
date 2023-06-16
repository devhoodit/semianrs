import { Component, type ReactNode } from 'react'
import '../../style/rightNavigation.sass'

interface SelectedLecture {
  lectureIds: string[]
}

interface RightNavigationProps {
  lectures: any[]
  selectedLecture: SelectedLecture
  inFocus: (lectureId: string) => void
  outFocus: (lectureId: string) => void
  selectedChange: (
    lectureIds: string[],
    selecetedLecture: SelectedLecture
  ) => void
}

class RightNavigation extends Component<RightNavigationProps, any> {
  render(): ReactNode {
    const row: ReactNode[] = []
    for (const lectureId of this.props.lectures) {
      row.push(
        <NavigationItem
          lectureId={lectureId.name as string}
          selectedLecture={this.props.selectedLecture}
          inFocus={this.props.inFocus}
          outFocus={this.props.outFocus}
          selectedChange={this.props.selectedChange}
        ></NavigationItem>
      )
    }
    return <div className="right-nav">{row}</div>
  }
}

export default RightNavigation

interface NavigationItemProps {
  lectureId: string
  selectedLecture: SelectedLecture
  inFocus: (lectureId: string) => void
  outFocus: (lectureId: string) => void
  selectedChange: (
    lectureIds: string[],
    selecetedLecture: SelectedLecture
  ) => void
}

class NavigationItem extends Component<NavigationItemProps, any> {
  onMouseEnter = (): void => {
    this.props.selectedLecture.lectureIds
      .concat([this.props.lectureId.replace(' ', '') + 'zyqo'])
      .forEach((id) => {
        this.props.inFocus(id)
      })
  }

  onMouseLeave = (): void => {
    this.props.outFocus(this.props.lectureId.replace(' ', '') + 'zyqo')
    this.props.selectedLecture.lectureIds.forEach((id) => {
      this.props.inFocus(id)
    })
  }

  selectedChange = (): void => {
    this.props.selectedChange(
      [this.props.lectureId.replace(' ', '') + 'zyqo'],
      this.props.selectedLecture
    )
  }

  render(): ReactNode {
    return (
      <div
        className="item"
        data-lecture-id={this.props.lectureId.replace(' ', '') + 'zyqo'}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        onClick={this.selectedChange}
      >
        {this.props.lectureId}
      </div>
    )
  }
}
