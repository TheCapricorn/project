import './header.less'
import React, {Component} from 'react'
import {Menu, Dropdown, Icon, Avatar} from 'antd'
import {post} from '@/ajax/ajax'
import history from '@/history/history';

class Head extends Component {
  constructor(prop) {
    super(prop);
    this.state = {};
    this.menu = (
      <Menu>
        <Menu.Item>
          <a onClick={this.loginOut}>退出登录</a>
        </Menu.Item>
      </Menu>
    );
  }

  loginOut = () => {
    post({
      url: '/uum/sso/logout'
    }).then(res => {
      if (res.code === 200) {
        sessionStorage.setItem('isauth', 'no');
        history.push('/login');
      }
    })
  };

  render() {
    return (
      <header className='header'>
        <div className='cf'>
          <div className='opt-area fr'>
            <div className='search-area'>
              {/*<Search
                placeholder="input search text"
                onSearch={value => console.log(value)}
                style={{ width: 200 }}
              />*/}
              <Icon type="search"/>
            </div>
            <div className='remind-area'>
              <Icon type="bell"/>
            </div>
            <div className='headimg-area'>
              <Dropdown overlay={this.menu}>
                <Avatar
                  size='large'
                  src="https://gss2.bdstatic.com/-fo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike92%2C5%2C5%2C92%2C30/sign=3906839074c6a7efad2ba0749c93c434/5bafa40f4bfbfbed757310307af0f736afc31f52.jpg"/>
              </Dropdown>
            </div>
          </div>
        </div>
      </header>
    )
  }
}

export default Head;
