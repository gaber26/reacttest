import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

// compose增强函数====这里用于谷歌调试插件redux-dev
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose

const enhancers = composeEnhancers(applyMiddleware(thunk))


const store = createStore(
  enhancers
)

export default store