
import React from 'react'
// import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { Link, Redirect, withRouter } from 'react-router-dom'
import { Form, Icon, Input, Button } from 'antd'
import './style.less'

const FormItem = Form.Item
class NormalLoginForm extends React.Component {
  constructor(props) {
    // console.log('这是login页面的constructor')
    super(props)
    this.state = {
      path: this.props.location.state ? this.props.location.state.from : '/',
    }
    // console.log('这是login页面的constructor', this.props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.close = this.close.bind(this)
  }
  // componentWillMount() {
  //   console.log('这是login页面的componentWillMount')
  //   // this.forceUpdate()
  // }
  close(event) {
    // (event || window.event).returnValue = '确认离开页面？！'
    let sure = event.returnValue || window.event.returnValue
    sure = '确认离开页面？！'
    return sure
  }
  // componentDidMount() {
  //   window.addEventListener('beforeunload', this.close)
  //   console.log('这是login页面的componentDidMount')
  // }
  // componentWillReceiveProps() {
  //   console.log('这是login页面的componentWillReceiveProps')
  // }
  // shouldComponentUpdate() {
  //   console.log('这是login页面的shouldComponentUpdate')
  //   return true
  // }
  // componentWillUpdate() {
  //   console.log('这是login页面的componentWillUpdate')
  // }
  // componentDidUpdate() {
  //   console.log('这是login页面的componentDidUpdate')
  // }
  // componentWillUnmount() {
  //   alert('123') // eslint-disable-line
  //   window.removeEventListener('beforeunload', this.close)
  //   // const $this = ReactDOM.findDOMNode(this) // eslint-disable-line
  //   // $this.removeEventListener('click', this.close, false)
  // }
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.actions.doLogin(values)
      }
    })
  }
  render() {
    // console.log('这是login页面的render')
    if (this.props.loginState.code === 0) {
      return <Redirect to={this.state.path} />
    }
    const { getFieldDecorator } = this.props.form
    return (
      <div>
        <Form onSubmit={this.handleSubmit} className=" formStyle">
          <span>{this.props.loginState.msg}</span>
          <FormItem>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '请输入手机/用户名!' }],
            })(<Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="手机/用户名" />)
            }
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码!' }],
            })(<Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />)
            }
          </FormItem>
          <FormItem>
            <Button style={{width: '100%'}} type="primary" htmlType="submit">
              登陆
            </Button>
          </FormItem>
        </Form>
        <span style={{ display: 'inline-flex', width: '100%', justifyContent: 'flex-end', marginTop: '20px' }}>
          <Link to="/register">{'去注册 ->'}</Link>
        </span>
      </div>

    )
  }
}
NormalLoginForm.propTypes = {
  form: PropTypes.object.isRequired,
  loginState: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm)

export default withRouter(WrappedNormalLoginForm)
