const menusList = [
  /*{ link: '/login', title: '登录', icon: 'pie-chart', },
  {
    link: '/app', title: 'home', icon: 'scan'
  },*/
  {
    link: 'usercenter', title: '用户中心', icon: 'user',
    sub: [
      {
        link: 'orgmenucontroller', title: '组织机构管理', icon: 'credit-card',
        sub: [
          {link: 'orggroup', title: '项目组管理', icon: '',},
          {link: 'orgmenulist', title: '组织机构列表', icon: '',}
        ]
      },
      {
        link: 'rolecontroller', title: '角色管理', icon: 'team',
        sub: [
          {link: 'rolelist', title: '角色列表', icon: '',}
        ]
      },
      {
        link: 'usercontroller', title: '用户管理', icon: 'solution',
        sub: [
          {link: 'userlist', title: '用户列表', icon: '',}
        ]
      },
      {
        link: 'authcontroller', title: '权限管理', icon: 'api',
        sub: [
          {link: 'authlist', title: '权限组列表', icon: '',},
          {link: 'authset', title: '权限设置', icon: '',}
        ]
      },
    ],
  },
  {
    link: 'systemset', title: '系统配置', icon: 'setting',
    sub: [
      {
        link: 'modcontroller', title: '模块管理', icon: 'appstore',
        sub: [
          {link: 'modularlist', title: '模块列表', icon: '',},
          {link: 'newmodular', title: '新建模块', icon: '',},
        ],
      },
      {
        link: 'funcontroller', title: '功能管理', icon: 'bars',
        sub: [
          {link: 'menulist', title: '功能列表', icon: '',},
          {link: 'buttonlist', title: '按钮列表', icon: '',},
        ],
      },
      {
        link: 'appcontroller', title: '应用管理', icon: 'layout',
        sub: [
          {link: 'applist', title: '应用列表', icon: '',}
        ],
      },
    ]
  },
];
const formatter=(data, parentPath = '/app')=>{
  return data.map(item => {
    let { link } = item;
    if(link){
      link = `${parentPath}/${item.link}`;
    }
    const result = {
      ...item,
      link,
    };
    if (item.sub) {
      result.sub = formatter(item.sub, link);
    }
    return result;
  });
};
export default formatter(menusList)
