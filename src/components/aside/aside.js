import React, {Component} from 'react';
import {Layout, /*Button,*/Icon/*,Menu*/} from 'antd';
import {withRouter/*,Link*/} from 'react-router-dom';
import SiderMenu from './renderMenu';
import menus from './menuList'
import './aside.less'

const {Sider} = Layout;
// const SubMenu=Menu.SubMenu;
// const MenuItemGroup=Menu.ItemGroup;

class SiderCustom extends Component {
  constructor(props) {
    const {pathname} = props.location;
    let pathArr = pathname.split('/');
    pathArr.splice(0, 1);
    let key1, key2;
    if (pathArr.length > 3) {
      key1 = pathname.substr(0, pathname.lastIndexOf('/'));
      key2 = key1.substr(0, key1.lastIndexOf('/'));
    }
    super(props);
    this.state = {
      collapsed: false,
      // mode: 'vertical',
      openKey: [key1, key2],
      selectedKey: pathname,
      firstHide: false,
    };
  }

  componentDidMount() {
    this.setMenuOpen(this.props);
    // console.log(1)
  }

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps);
    // this.onCollapse(false);
    this.setMenuOpen(nextProps)
  }

  setMenuOpen = (props) => {
    const {pathname} = props.location;
    let pathArr = pathname.split('/');
    pathArr.splice(0, 1);
    let key1, key2;
    if (pathArr.length > 3) {
      key1 = pathname.substr(0, pathname.lastIndexOf('/'));
      key2 = key1.substr(0, key1.lastIndexOf('/'));
    }
    this.setState({
      openKey: [key1, key2],
      selectedKey: pathname,
    })
  };
  /*onCollapse = (collapsed) => {
    // console.log(collapsed);
    this.setState({
      collapsed,
      firstHide: collapsed,
      mode: collapsed ? 'vertical' : 'inline',
    });
  };*/
  menuClick = e => {
    // console.log(e);
    this.setState({
      selectedKey: e.key
    });
    /*console.log(this.props);
    const { popoverHide } = this.props;     // 响应式布局控制小屏幕点击菜单时隐藏菜单操作
    popoverHide && popoverHide();*/
  };
  /*openMenu = v => {
    // console.log(v);
    this.setState({
      openKey: v[v.length - 1],
      firstHide: false,
    })
  };*/
  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
      firstHide: !this.state.firstHide
    })
  };
  render() {
    return (
      <Sider
        collapsible
        className={'aside-box'}
        trigger={null}
        collapsed={this.state.collapsed}
      >
        <div className='aside-btn'>
          <a onClick={this.toggleCollapsed} style={{marginBottom: 16}}>
            <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}/>
          </a>
        </div>
        <div className="logo">

        </div>
        {/*<Menu
          className={'menu-box'}
          theme='dark'
          mode='inline'
          onSelect={this.menuClick}
          inlineCollapsed={this.state.collapsed}
          selectedKeys={[this.state.selectedKey]}
          defaultOpenKeys={this.state.openKey}
        >
          <Menu.Item key="/app">
            <Link to='/app'>
              <Icon type="pie-chart" />
              <span>首页</span>
            </Link>
          </Menu.Item>
          <SubMenu
            key="/app/usercenter"
            title={<span><Icon type="mail" /><span>用户中心</span></span>}>
            <MenuItemGroup key="/app/usercenter/rolecontroller" title="角色管理">
              <Menu.Item key="/app/usercenter/rolecontroller/rolelist">
                <Link to='/app/usercenter/rolecontroller/rolelist'>
                  <Icon type="pie-chart" />
                  <span>角色列表</span>
                </Link>
              </Menu.Item>
            </MenuItemGroup>
            <MenuItemGroup key="/app/usercenter/usercontroller" title="用户管理">
              <Menu.Item key="/app/usercenter/usercontroller/userlist">
                <Link to='/app/usercenter/usercontroller/userlist'>
                  <Icon type="pie-chart" />
                  <span>用户列表</span>
                </Link>
              </Menu.Item>
            </MenuItemGroup>
            <MenuItemGroup key="/app/usercenter/orgmenucontroller" title="组织机构管理">
              <Menu.Item key="/app/usercenter/orgmenucontroller/orgmenulist">
                <Link to='/app/usercenter/orgmenucontroller/orgmenulist'>
                  <Icon type="pie-chart" />
                  <span>组织机构列表</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="/app/usercenter/orgmenucontroller/projectlist">
                <Link to='/app/usercenter/orgmenucontroller/projectlist'>
                  <Icon type="pie-chart" />
                  <span>项目组管理</span>
                </Link>
              </Menu.Item>
            </MenuItemGroup>
          </SubMenu>
          <SubMenu
            key="/app/funcontroller"
            title={<span><Icon type="mail" /><span>功能管理</span></span>}>
          >
            <Menu.Item key="/app/funcontroller/menucontroller">
              <Link to='/app/funcontroller/menucontroller'>
                <Icon type="pie-chart" />
                <span>功能列表</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="/app/funcontroller/buttoncontroller">
              <Link to='/app/funcontroller/buttoncontroller'>
                <Icon type="pie-chart" />
                <span>按钮管理</span>
              </Link>
            </Menu.Item>
          </SubMenu>
        </Menu>*/}
        <SiderMenu
          menus={menus}
          onSelect={this.menuClick}
          theme='dark'
          mode='inline'
          inlineCollapsed={this.state.collapsed}
          selectedKeys={[this.state.selectedKey]}
          defaultOpenKeys={this.state.openKey}
          // openKeys={this.state.firstHide ? null : this.state.openKey}
          // onOpenChange={this.openMenu}
        />
      </Sider>
    )
  }
}

export default withRouter(SiderCustom);
