import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import './index.scss'
import Home from '../pages/home'
import Practice from '../pages/practice'
import Book from '../pages/book'
import BookDetail from '../pages/bookDetail'

const AppRouter = () => {
  let routeConfig = [
    { title: '首页', path: '/', exact: true, component: Home },
    { title: '练习', path: '/practice', exact: true, component: Practice },
    { title: '书籍列表', path: '/book', exact: true, component: Book },
    { title: '书籍详情', path: '/bookDetail', exact: true, component: BookDetail },
  ]
  return (
    <Router>
      <div className="layout">
        <div className="sideBar">
          <ul>
            {
              routeConfig.map((item, index) => {
                return (<li key={index}><Link to={item.path}>{item.title}</Link></li>)
              })
            }
          </ul>
        </div>
        <div className="main-box">
          <div className="header">头部</div>
          <div className="main-content">
            {/* exact精准匹配 */}
            {
              routeConfig.map((item, index) => {
                return (<Route key={index} path={item.path} exact={item.exact} component={item.component} />)
              })
            }
          </div>
        </div>
      </div>
    </Router>
  )
}
export default AppRouter
