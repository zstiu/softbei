import React from 'react'
import { Route } from 'react-router'
import App from './containers/App'
import UserPage from './containers/UserPage'
import RepoPage from './containers/RepoPage'
import ManagerPage from './containers/ManagerPage'
import LoginPage from './containers/LoginPage'
import SignUpPage from './containers/SignUpPage'
import UploadPage from './containers/UploadPage'
import UpdateInfo from './containers/UpdateInfoPage'
import ShowPage from './containers/ShowPage'

export default <Route path="/" component={App}>
  <Route path="/"
         component={App} />
  <Route path="/manager"
         component={ManagerPage} />
  <Route path="/login"
         component={LoginPage} />
  <Route path="/signUp"
         component={SignUpPage} />
  <Route path="/upload"
         component={UploadPage} />
  <Route path="/updateInfo"
         component={UpdateInfo} />
  <Route path="/show"
         component={ShowPage} />
</Route>
