const menusList = [
  /*{ link: '/login', title: '登录', icon: 'pie-chart', },
  {
    link: '/app', title: 'home', icon: 'scan'
  },*/
  {
    link: '/app/usercenter', title: '用户中心', icon: 'user',
    sub: [
      {
        link: '/app/usercenter/orgmenucontroller', title: '组织机构管理', icon: 'credit-card',
        sub: [
          {link: '/app/usercenter/orgmenucontroller/orggroup', title: '项目组管理', icon: '',},
          {link: '/app/usercenter/orgmenucontroller/orgmenulist', title: '组织机构列表', icon: '',}
        ]
      },
      {
        link: '/app/usercenter/rolecontroller', title: '角色管理', icon: 'team',
        sub: [
          {link: '/app/usercenter/rolecontroller/rolelist', title: '角色列表', icon: '',}
        ]
      },
      {
        link: '/app/usercenter/usercontroller', title: '用户管理', icon: 'solution',
        sub: [
          {link: '/app/usercenter/usercontroller/userlist', title: '用户列表', icon: '',}
        ]
      },
      {
        link: '/app/usercenter/authcontroller', title: '权限管理', icon: 'api',
        sub: [
          {link: '/app/usercenter/authcontroller/authlist', title: '权限组列表', icon: '',},
          {link: '/app/usercenter/authcontroller/authset', title: '权限设置', icon: '',}
        ]
      },
    ],
  },
  {
    link: '/app/systemset', title: '系统配置', icon: 'setting',
    sub: [
      {
        link: '/app/systemset/modcontroller', title: '模块管理', icon: 'appstore',
        sub: [
          {link: '/app/systemset/modcontroller/modularlist', title: '模块列表', icon: '',},
          {link: '/app/systemset/modcontroller/newmodular', title: '新建模块', icon: '',},
        ],
      },
      {
        link: '/app/systemset/funcontroller', title: '功能管理', icon: 'bars',
        sub: [
          {link: '/app/systemset/funcontroller/menulist', title: '功能列表', icon: '',},
          {link: '/app/systemset/funcontroller/buttonlist', title: '按钮列表', icon: '',},
        ],
      },
      {
        link: '/app/systemset/appcontroller', title: '应用管理', icon: 'layout',
        sub: [
          {link: '/app/systemset/appcontroller/applist', title: '应用列表', icon: '',},
          {link: '/app/systemset/appcontroller/newapp', title: '新建应用', icon: '',},
        ],
      },
    ]
  },

];
export default menusList
