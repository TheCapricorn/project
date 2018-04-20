const api = {
  role: {
    add: '/uua/role/add',
    list: '/uua/role/list',
    delete: '/uua/role/delete',
    update: '/uua/role/update',
    listRole: '/uua/role/listRole'
  },
  user: {
    add: '/uum/user/add',
    list: '/uum/user/list',
    del: '/uum/user/del',
    delete: '/uum/user/delete',
    update: '/uum/user/update',
    setrole:'/uum/user/setrole',
  },
  menucontroller: {
    add: '/uua/menu/add',
    list: '/uua/menu/listPage',
    delete: '/uua/menu/delBatch',
    update: '/uua/menu/update',
  },
  buttoncontroller: {
    add: '/uua/button/add',
    list: '/uua/button/list',
    delete: '/uua/button/delete',
    update: '/uua/button/update',
  },
  orggroup: {
    add: '/uum/group/add',
    list: '/uum/group/list',
    deletes: '/uum/group/deletes',
    update: '/uum/group/update',
  },
  orgcontroller: {
    add: '/uua/org/listAll',
    listAll: '/uua/org/listAll',
  },
  appcontroller: {
    add: '/uua/app/center/add',
    list: '/uua/app/center/listPage',
    delete: '/uua/app/center/del',
    update: '/uua/app/center/update',
  }
};
export default api
