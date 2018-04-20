import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {/*message ,*/Button, Form, Input, Icon, Checkbox} from 'antd';
import './login.less'
import {post} from '@/ajax/ajax'
import history from '@/history/history';

const FormItem = Form.Item;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        post({
          url: '/uum/sso/login',
          data: values
        }).then(res => {
          // console.log(res);
          switch (res.code) {
            case 200:
              // console.log(this.props);
              history.push('/app');
              break;
            default:
          }
        }).catch(() => {
        });
      }
    });
  };

  componentDidMount() {
    // console.log(this.props)
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <div className="login">
        <div className="login-form">
          <div className="login-logo">
            <span>登录页面</span>
          </div>
          <Form onSubmit={this.handleSubmit} style={{maxWidth: '300px'}}>
            <FormItem>
              {getFieldDecorator('account', {
                initialValue: 'zjl',
                rules: [{required: true, message: '请输入用户名!'}],
              })(
                <Input prefix={<Icon type="user" style={{fontSize: 13}}/>} placeholder="请输入"/>
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('upasswd', {
                initialValue: '111111',
                rules: [{required: true, message: '请输入密码!'}],
              })(
                <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>} type="password" placeholder="请输入"/>
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('remember', {
                // valuePropName: 'checked',
                initialValue: false,
              })(
                <Checkbox>记住我</Checkbox>
              )}
              <a className="login-form-forgot" href="" style={{float: 'right'}}>忘记密码</a>
              <Button type="primary" htmlType="submit" className="login-form-button" style={{width: '100%'}}>登录</Button>
              <p>
                <Link to="/app/appcontroller/applist/applist">或 现在就去注册!</Link>
              </p>
            </FormItem>
          </Form>
        </div>
      </div>
    );
  }
}

const login = Form.create()(Login);
export default login
