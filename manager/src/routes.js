import React from 'react'
import { Route } from 'react-router'
import App from './containers/App'
import UserPage from './containers/UserPage'
import RepoPage from './containers/RepoPage'
import ManagerPage from './containers/ManagerPage'

export default <Route path="/" component={App}>

  <Route path="/manager"
         component={ManagerPage} />
</Route>
