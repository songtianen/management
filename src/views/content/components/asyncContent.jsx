import React from 'react'
import Loadable from 'react-loadable'

const LoadableComponent = Loadable({
  loader: () => import(/* webpackChunkName: "Content" */ './index'),
  loading: () => <div>Loding</div>,
})

export default class LoadableDashboard extends React.Component {
  componentDidMount() {
  }
  render() {
    return <LoadableComponent />
  }
}
