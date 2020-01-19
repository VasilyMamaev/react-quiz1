import React, { Component } from 'react';
import classes from './auth.module.css';
import Button from '../../components/ui/button/button';
import Input from '../../components/ui/input/input';
import is from 'is_js';


export default class Auth extends Component {

  state = {
    isFormValid: false,
    formControls: {
      email: {
        value: '',
        type: 'email',
        label: 'Email',
        errorMessage: 'Введите корректный email',
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true
        }
      },
      password: {
        value: '',
        type: 'password',
        label: 'Пароль',
        errorMessage: 'Введите корректный пароль',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6
        }
      }
    }
  }

  loginHandler = () => {

  }

  registerHandler = () => {

  }

  submitHandler = (evt) => {
    evt.preventDefault()
  }

  validateControl(value, validation) {
    if (!validation) {
      return true
    }

    let isValid = true

    if (validation.required) {
      isValid = value.trim() !== '' && isValid
    }

    if (validation.email) {
      isValid = is.email(value) && isValid
    }

    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid
    }

    return isValid
  }

  onChangeHandler = (evt, controlName) => {

    const formControls = { ...this.state.formControls }
    const control = { ...formControls[controlName] }

    control.value = evt.target.value
    control.touched = true
    control.valid = this.validateControl(control.value, control.validation)

    formControls[controlName] = control

    let isFormValid = true

    Object.keys(formControls).forEach((name) => {
      isFormValid = formControls[name].valid && isFormValid
    })

    this.setState({
      formControls,
      isFormValid
    })
  }

  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, i) => {
      const control = this.state.formControls[controlName]
      return (
        <Input 
          key={controlName + i}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          shoudValidate={!!control.validation}
          errorMessage={control.errorMessage}
          onChange={(evt) => {this.onChangeHandler(evt, controlName)}}
        />
      )
    })
  }

  render() {
    return (
      <div className={classes.Auth}>
        <div>
          <h1>Авторизация</h1>

          <form className={classes.AuthForm} onSubmit={this.submitHandler}>
            
            { this.renderInputs() }

            <Button 
            type="success"
            onClick={this.loginHandler}
            disabled={!this.state.isFormValid}
            >Войти</Button>

            <Button
            type="primary"
            onClick={this.registerHandler}
            disabled={!this.state.isFormValid}
            >Зарегистрироваться</Button>
          </form>
        </div>
      </div>
    )
  }
}
