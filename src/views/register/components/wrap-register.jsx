import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Form, Input, Select, Button, Icon } from 'antd'
// import { countDownone } from '../../../utils/util'
import './style.less'

const FormItem = Form.Item
const Option = Select.Option


class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showPssword: false,
      userType: 'normal',
      seconds: null,
      disabled: false,
    }
    this.handlePassword = this.handlePassword.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.checkPassword = this.checkPassword.bind(this)
    this.getHandleCaptcha = this.getHandleCaptcha.bind(this)
    this.countDown = this.countDown.bind(this)
  }
  countDown() {
    this.setState({
      seconds: 60,
    })
    let siv = setInterval(() => {
      this.setState(preState => ({
        seconds: preState.seconds - 1,
      }), () => {
        sessionStorage.setItem('count', this.state.seconds)
        if (this.state.seconds === 0) {
          clearInterval(siv)
          this.setState({
            seconds: null,
          })
        }
      })
    }, 1000)
    return null
  }
  tick() {
    let num = parseInt(sessionStorage.getItem('count'), 10)
    if (num <= 0) return null
    let siv = setInterval(() => {
      num -= 1
      this.setState({
        seconds: num,
      })
      sessionStorage.setItem('count', num)
      let savednum = sessionStorage.getItem('count')
      if (savednum === '0') {
        clearInterval(siv)
        this.setState({
          seconds: null,
          disabled: false,
        })
      }
    }, 1000)
    return null
  }

  componentWillMount() {
    if (parseInt(sessionStorage.getItem('count'), 10)) {
      this.setState({
        disabled: true,
      })
      this.tick()
    }
  }
  // 请求验证码 按钮
  getHandleCaptcha() {
    const form = this.props.form
    form.validateFields(['phone', 'prefix'], (err, value) => { // eslint-disable-line
      if (!err) { // 如果输入的电话格式没有错误
        // 发送请求到服务器(电话是否可用)，返回数据 如果是 电话没被注册 执行倒计时函数
        // console.log('电话没有错误', value)
        this.countDown()
        this.setState({
          disabled: true,
        })
      } else {
        // console.log('有错误', err)
      }
    })
  }
  handlePassword() {
    this.setState({
      showPssword: !this.state.showPssword,
    })
  }
  // 选择类型
  handleSelectChange = (value) => {
    this.setState({
      userType: value,
    })
  }
  // 表单发送
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.actions.doRegister(values)
      }
    })
  }
  // 确认密码验证
  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('密码不一致') // eslint-disable-line
    } else {
      callback()
    }
  }
  render() {
    const { showPssword, userType, seconds, disabled } = this.state
    const { getFieldDecorator } = this.props.form
    const { user } = this.props
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(<Select className="icp-selector"><Option value="86">+86</Option></Select>)
    return (
      <Form onSubmit={this.handleSubmit} className="formStyle">
        <span style={{color: 'red'}}>{user.msg}</span>
        <FormItem
          className="formItem"
        >
          {getFieldDecorator('phone', {
            rules: [
              {
                required: true,
                pattern: /^1(3|4|5|7|8)\d{9}$/,
                message: '请输入正确的手机号码',
              },
              {
                validator: this.checkPhoneNumber,
              }],
          })(<Input placeholder="请输入手机号" addonBefore={prefixSelector} />)}
        </FormItem>
        <FormItem
          className="formItem"
          hasFeedback
        >
          {getFieldDecorator('password', {
            rules: [{
              required: true,
              pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/,
              message: '请输入至少6位，数字与字母的组合(请忽输入空格)',
            }],
          })(<Input
            placeholder="请输入密码"
            prefix={
              <Icon
                onClick={this.handlePassword}
                type={showPssword ? 'eye-o' : 'eye'}
                style={{ fontSize: 13 }}
              />
                }
            type={showPssword ? 'text' : 'password'}
          />)}
        </FormItem>
        <FormItem
          className="formItem"
          hasFeedback
        >
          {getFieldDecorator('confirm', {
            rules: [{
              required: true,
              pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/,
              message: '请输入确认密码',
            }, {
              validator: this.checkPassword,
            }],
          })(<Input
            placeholder="请确认密码"
            type={showPssword ? 'text' : 'password'}
            prefix={
              <Icon
                onClick={this.handlePassword}
                type={showPssword ? 'eye-o' : 'eye'}
                style={{ fontSize: 13 }}
              />}
          />)}
        </FormItem>
        <FormItem
          className="formItem"
        >
          {
            getFieldDecorator('type', {
            rules: [{
              required: true, message: '请输入类型',
            }],
            onChange: this.handleSelectChange,
          })(<Select placeholder="请选择类型"><Option value="normal">普通用户</Option><Option value="manager">管理员/需要邀请码</Option></Select>)
          }
        </FormItem>
        {
          (userType === 'manager')
          ?
            <FormItem
              className="formItem"
            >
              {getFieldDecorator('inviteCode', {
                rules: [{
                  required: true,
                  message: '请输入邀请码',
                }],
              })(<Input
                placeholder="请输入管理员邀请码"
                type="text"
              />)
            }
            </FormItem>
          :
          null
        }
        <FormItem>
          {getFieldDecorator('captcha', {
            rules: [{ required: true, message: '请输入验证码' }],
          })(<Input style={{width: '40%', marginRight: '10%'}} placeholder="输入验证码" />)}
          <Button disabled={disabled} onClick={this.getHandleCaptcha} style={{ width: '50%' }} >{ !seconds ? '获取验证码' : `${seconds}秒后重新获取` }</Button>
        </FormItem>
        <FormItem
          style={{ marginBottom: 8 }}
        >
          <a style={{fontSize: 12}}>注册即代表同意《隐私政策》</a>
        </FormItem>
        <FormItem >
          <Button style={{ width: '100%' }} type="primary" htmlType="submit" size="large">注册</Button>
        </FormItem>
        {/* <button onClick={this.countDown}>{this.state.seconds}</button> */}
        <span style={{ display: 'inline-flex', width: '100%', justifyContent: 'flex-end', marginTop: '20px' }}>
          <Link to="/login">{'返回登陆->'}</Link>
        </span>
      </Form>
    )
  }
}

const WrapRegister = Form.create()(Register)

Register.propTypes = {
  form: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
}

export default WrapRegister
