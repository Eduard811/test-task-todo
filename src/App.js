import { Route, Switch } from 'react-router-dom'
import TodosContainer from './components/Todos/TodosContainer'

const App = () => {
  return (
    <Switch>
      <Route path="/" component={TodosContainer} />
    </Switch>
  )
}

export default App
