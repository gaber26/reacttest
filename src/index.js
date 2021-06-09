import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import './assets/css/reset.scss'  // 基本全局样式
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

import AppRputer from './router'

ReactDOM.render(
  <Provider store={store}>
    <AppRputer/>
  </Provider>, // 组件
  document.getElementById('root') //挂载在哪里
);
