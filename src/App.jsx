import { useState } from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './index.css'

import Nav from './components/Nav'
import Dashboard from './Pages/Dashboard'
import Courses from './Pages/Courses'
import Plan from './Pages/Plan'
import About from './Pages/About'
import styled from 'styled-components'

const AppContainer = styled.main`
  background: var(--light);
  max-width: 100vw;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  overflow: scroll;
`
const PageContianer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
export const App = () => {
  const [selected, setSelected] = useState('dashboard')

  return (
    <AppContainer>
      <Nav selected={selected} setSelected={setSelected} />
      <PageContianer>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/courses" component={Courses} />
          <Route exact path="/plan" component={Plan} />
          <Route exact path="/about" component={About} />
        </Switch>
      </PageContianer>
    </AppContainer>
  )
}

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
)
