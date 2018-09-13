
import React from 'react'
import PropTypes from 'prop-types'

class NormalLoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.actions.doLogin(values)
        // console.log('Received values of form: ', values)
      }
    })
  }
  render() {
    return null
  }
}
NormalLoginForm.propTypes = {
  form: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
}


export default NormalLoginForm
