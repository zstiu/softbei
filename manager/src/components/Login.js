import React, { PropTypes, Component } from 'react'
// import { Link } from 'react-router'
import { Form, Icon, Input, Button, Checkbox, Alert  } from 'antd';
const FormItem = Form.Item;

class LoginForm extends Component {

  static propTypes = {
    // value: PropTypes.string.isRequired,
    fetchLogin: PropTypes.func.isRequired,
    errorMessage: PropTypes.string
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let name = values.userName;
        let password = values.password;
        console.log(typeof this.props.fetchLogin)
        this.props.fetchLogin(name, password);
        console.log('Received values of form: ', values);
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { manager } = this.props
    return (
<div>

         {manager.isLogin?"": <Alert
            message="Warning"
            description="你还未登录，登录前所有操作不能进行"
            type="warning"
            showIcon
          />}
      
        {manager.errorMessage ? <Alert
                    message="Error"
                    description={this.props.manager.errorMessage}
                    type="error"
                    showIcon/>:""}

        
      

      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>
          )}
          <a className="login-form-forgot" href="">Forgot password</a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <a href="">register now!</a>
        </FormItem>
      </Form>
</div>
    );
  }
}

const Login = Form.create()(LoginForm);



export default Login
