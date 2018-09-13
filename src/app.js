import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
// import thunk from 'redux-thunk'
import { BrowserRouter } from 'react-router-dom'
// import { createLogger } from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './redux/reducer'
import App from './views/home'
import rootSaga from './sagas/index'

const sagaMiddleware = createSagaMiddleware()
let middleWare = [sagaMiddleware]
// middleWare.push(createLogger())
const applyMiddleWare = applyMiddleware(...middleWare)
const reduxTool = window.devToolsExtension ? window.devToolsExtension() : undefined
const store = createStore(rootReducer, reduxTool, compose(applyMiddleWare))
sagaMiddleware.run(rootSaga)
ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'),
)


// 热更新
if (module.hot) {
  module.hot.accept('./views/home/index.jsx', () => {
    console.log('Accepting the updated printMe module!');
    const NextApp = require('./views/home/index.jsx').default
    ReactDOM.render(
      <NextApp />,
      document.getElementById('root'),
    )
  })
}
