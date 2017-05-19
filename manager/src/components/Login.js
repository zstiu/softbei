import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;

class LoginForm extends React.Component {

  static propTypes = {
    // value: PropTypes.string.isRequired,
    fetchLogin: PropTypes.func.isRequired
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
    return (
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
    );
  }
}

const Login = Form.create()(LoginForm);

// class Login extends Component {
//   // const { name, managerId } = manager
//   static propTypes = {
//     value: PropTypes.string.isRequired,
//     onChange: PropTypes.func.isRequired
//   }


//   handelChange = () => {
//     console.log(this.refs.name.value)
//     // this.props.onChange(this.getInputValue())
//   }
//   render() {
//     return (
//       <div>
//         name：<Input ref="name"/>
//         <br/>
//         password：<Input ref="password"/>
//         <br/>
//           <button onClick={this.handelChange}>
//             登录
//           </button>
//       </div>
//     )
//   }
// }



export default Login
