import React from 'react'
import './App.sass'
import { SchedulerPage } from './pages/scheduler/SchedulerPage'
import { IntroPage } from './pages/intro/IntroPage'
import { MotivationPage } from './pages/motivation/MotivationPage'
import { ExplainationPage } from './pages/explaination/ExplainationPage'
import { Footer } from './pages/footer/Footer'

function App(): React.ReactNode {
  return (
    <div id="page">
      {/* pages will go here */}
      <IntroPage></IntroPage>
      <MotivationPage></MotivationPage>
      <ExplainationPage></ExplainationPage>
      <SchedulerPage></SchedulerPage>
      <Footer></Footer>
    </div>
  )
}

export default App
