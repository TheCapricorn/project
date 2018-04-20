import React, {Component} from 'react'
import './App.less'
import {Layout} from 'antd'
import Head from './components/header/header'
import Myrouter from './routes/router'
import Aside from './components/aside/aside'

const {Header, /*Footer,*/ Content} = Layout;

class App extends Component {
  render() {
    return (
      <Layout style={{height: '100%'}}>
        <Aside/>
        <Layout style={{overflow: 'hidden'}}>
          <Header className='header-box'>
            <Head/>
          </Header>
          <Content className='content-box'>
            <Myrouter/>
          </Content>
          {/*<Footer className='footer-box'>
            我是底部你好吗
          </Footer>*/}
        </Layout>
      </Layout>
    );
  }
}

export default App;
