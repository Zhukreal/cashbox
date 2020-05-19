import { HomePage } from './home/homePage'
import { LoginPage } from './login/loginPage'
import { SettingsPage } from './settings/settingsPage'
import { TestPage } from './test/testPage'

import { NotFoundPage } from './internal/not-found/page'

export const routes = () => [
  {
    path: '/',
    exact: true,
    component: HomePage,
  },
  {
    path: '/login',
    exact: true,
    component: LoginPage,
  },
  {
    path: '/settings',
    exact: true,
    component: SettingsPage,
  },
  {
    path: '/test',
    exact: true,
    component: TestPage,
  },

  { component: NotFoundPage },
]
