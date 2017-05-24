import React, { PropTypes, Component } from 'react'
// import { Link } from 'react-router'
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, Alert } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

class SignUpForm extends Component {

  static propTypes = {
    // value: PropTypes.string.isRequired,
    fetchSignUp: PropTypes.func.isRequired,
    manager: PropTypes.object
  }

  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        let name = values.nickname;
        let password = values.password;
        let confirmPassword = values.confirm
        let email = values.email
        let phone = values.phone
        // console.log(typeof this.props.fetchLogin)
        this.props.fetchSignUp(name, password, confirmPassword, email, phone);
        console.log('Received values of form: ', values);
      }
    });
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }
  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  handleWebsiteChange = (value) => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;
    const { manager } = this.props

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 14,
          offset: 6,
        },
      },
    };
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select className="icp-selector">
        <Option value="86">+86</Option>
      </Select>
    );

    const websiteOptions = autoCompleteResult.map((website) => {
      return <AutoCompleteOption key={website}>{website}</AutoCompleteOption>;
    });

    return (

    <div>
            {manager.errorMessage ? <Alert
                    message="Error"
                    description={this.props.manager.errorMessage}
                    type="error"
                    showIcon/>:""}

                    {
                      manager.signUpSuccess ?   <Alert
                                            message="success tips"
                                            description="您已经注册成功，请前往登录"
                                            type="success"
                                            showIcon
                                          /> :
                                          <Form onSubmit={this.handleSubmit}>

                                              <FormItem
                                                {...formItemLayout}
                                                label={(
                                                  <span>
                                                    Name&nbsp;
                                                    <Tooltip title="What do you want other to call you?">
                                                      <Icon type="question-circle-o" />
                                                    </Tooltip>
                                                  </span>
                                                )}
                                                hasFeedback
                                              >
                                                {getFieldDecorator('nickname', {
                                                  rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
                                                })(
                                                  <Input />
                                                )}
                                              </FormItem>
                                              
                                              <FormItem
                                                {...formItemLayout}
                                                label="Password"
                                                hasFeedback
                                              >
                                                {getFieldDecorator('password', {
                                                  rules: [{
                                                    required: true, message: 'Please input your password!',
                                                  }, {
                                                    validator: this.checkConfirm,
                                                  }],
                                                })(
                                                  <Input type="password" />
                                                )}
                                              </FormItem>
                                              <FormItem
                                                {...formItemLayout}
                                                label="Confirm Password"
                                                hasFeedback
                                              >
                                                {getFieldDecorator('confirm', {
                                                  rules: [{
                                                    required: true, message: 'Please confirm your password!',
                                                  }, {
                                                    validator: this.checkPassword,
                                                  }],
                                                })(
                                                  <Input type="password" onBlur={this.handleConfirmBlur} />
                                                )}
                                              </FormItem>
                                              

                                              <FormItem
                                                {...formItemLayout}
                                                label="E-mail"
                                                hasFeedback
                                              >
                                                {getFieldDecorator('email', {
                                                  rules: [{
                                                    type: 'email', message: 'The input is not valid E-mail!',
                                                  }, {
                                                    required: false, message: 'Please input your E-mail!',
                                                  }],
                                                })(
                                                  <Input />
                                                )}
                                              </FormItem>

                
                                              <FormItem
                                                {...formItemLayout}
                                                label="Phone Number"
                                              >
                                                {getFieldDecorator('phone', {
                                                  rules: [{ required: false, message: 'Please input your phone number!' }],
                                                })(
                                                  <Input addonBefore={prefixSelector} />
                                                )}
                                              </FormItem>
                                              
                                              <FormItem {...tailFormItemLayout} style={{ marginBottom: 8 }}>
                                                {getFieldDecorator('agreement', {
                                                  valuePropName: 'checked',
                                                })(
                                                  <Checkbox>I have read the <a href="">agreement</a></Checkbox>
                                                )}
                                              </FormItem>
                                              <FormItem {...tailFormItemLayout}>
                                                <Button type="primary" htmlType="submit" size="large">Register</Button>
                                              </FormItem>
                                            </Form>
                    }

      
    </div>
    );
  }
}

const SignUp = Form.create()(SignUpForm);



export default SignUp
