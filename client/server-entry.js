import React from 'react';
import { StaticRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'

import App from './views/App.jsx';
import { Createstoremap } from './store/store'

process.on('unhandledRejection', (reason, p) => {
  // eslint-disable-next-line no-console
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
});

// 让mobx在服务端渲染的时候不会重复数据变换
// useStaticRendering(true)  // 如果使用会报错，hooks使用不正确
// eslint-disable-next-line react/jsx-filename-extension
export default (stores, routerContext, url) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Provider {...stores}>
    <StaticRouter context={routerContext} location={url}>
      <App />
    </StaticRouter>
  </Provider>
)

export { Createstoremap }
