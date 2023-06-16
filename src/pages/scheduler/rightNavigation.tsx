import { Component, type ReactNode } from 'react'
import '../../style/rightNavigation.sass'

interface SelectedLecture {
  lectureIds: string[]
}

interface RightNavigationProps {
  lectures: any[]
  selectedLecture: SelectedLecture
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
  selectedChange: (
    lectureIds: string[],
    selecetedLecture: SelectedLecture
  ) => void
}

class NavigationItem extends Component<NavigationItemProps, any> {
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
        onClick={this.selectedChange}
      >
        {this.props.lectureId}
      </div>
    )
  }
}
