import React from 'react'
import { Switch, Route, Link } from "react-router-dom";

const Comp1 = () => <div>Comp1</div>
const Comp2 = () => <div>Comp2</div>
const Comp3 = () => <div>Comp3</div>

const TestRouting = [
  {
    path: "/path1",
    component: Comp1,
    exact: true
  },
  {
    path: "/path2",
    component: Comp2,
    exact: true
  },
  {
    path: "/path3",
    component: Comp3,
    exact: true
  }
];

export const TestPage = () => {
  return (
    <div>
      <nav>
        <ul>
          <li><Link to='/path1'>path1</Link></li>
          <li><Link to='/path2'>path2</Link></li>
          <li><Link to='/path3'>path3</Link></li>
        </ul>
      </nav>
      <Switch>
        {TestRouting.map((route) => {
          return (<Route key={route.path} exact={route.exact} path={route.path} component={route.component} />)
        })}
      </Switch>
    </div>
  )
}

