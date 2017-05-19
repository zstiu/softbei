import React from 'react'
import { Route } from 'react-router'
import App from './containers/App'
import UserPage from './containers/UserPage'
import RepoPage from './containers/RepoPage'
import ManagerPage from './containers/ManagerPage'
import LoginPage from './containers/LoginPage'
import UploadPage from './containers/UploadPage'

export default <Route path="/" component={App}>
  <Route path="/"
         component={App} />
  <Route path="/manager"
         component={ManagerPage} />
  <Route path="/login"
         component={LoginPage} />
  <Route path="/upload"
         component={UploadPage} />
</Route>
