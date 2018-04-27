import React, {Component} from 'react';
import {Button, Form, Divider, Table, Modal, Badge, Alert, Icon,} from 'antd'
import {post} from '@/ajax/ajax'
import api from '@/ajax/api'
import moment from 'moment'
import SimpleForm from './simpleform'
import AllForm from './allform'
import Bread from '@/components/common/bread'
import AddAuth from './authset'
import Addbtn from './roleadd'

//我是另外修改的部分
class RoleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addVisible: false,
      modify:false,
      urid:'',
      addAuthVisible: false,
      addAuthData:'',
      TabPaneData:[],
      tableData: [],
      selectedRows: [],
      tableLoading: false,
      btnLoading:false,
      expand: false,
      orderByClause: '',
      tablePage: {
        current: 1,
        pageSize: 10,
        defaultCurrent: 1,
        defaultPageSize: 10,
        showQuickJumper: true,
        showSizeChanger: true,
        total: 0,
        showTotal(total, range) {
          return `共 ${total} 条记录 第 ${range[0]} - ${range[1]} 条`
        }
      }
    };
    this.columns = [{
      title: '角色编号',
      dataIndex: 'urid',
      key: 'urid',
      // width: '300',
    }, {
      title: '角色名',
      dataIndex: 'urName',
      key: 'urName',
      width: 100,
    }, {
      title: '角色代码',
      dataIndex: 'urCode',
      key: 'urCode',
      width: 100,
      sorter: true,
    }, {
      title: '状态',
      dataIndex: 'state',
      align: 'center',
      width: 100,
      key: 'state',
      sorter: true,
      render: (text) => (
        <div>
          {
            parseInt(text, 10) === 0 ? <Badge status="success" text="启用"/>
              : parseInt(text, 10) === 1 ? <Badge status="error" text="删除"/>
              : <Badge status="warning" text="禁用"/>
          }
        </div>
      )
    }, {
      title: '更新人',
      dataIndex: 'updateUid',
      key: 'updateUid',
      width: 100,
      sorter: true,
    }, {
      title: '更新时间',
      dataIndex: 'updatedate',
      key: 'updatedate',
      sorter: true,
      width: 120,
      align: 'center',
      render: (text) => (
        <div>
          {text ? moment(text).format('Y-M-D') : null}
        </div>
      )
    }, {
      title: '操作',
      width: 150,
      // key:'createUid',
      align: 'center',
      render: (text, record) => {
        return (
          <div className={'table-opt-btns'}>
            <a
              onClick={this.delData.bind(this, record)}
              disabled={parseInt(record.state, 10) === 1}>
              <Icon type='delete'/>
            </a>
            <a onClick={this.addShow.bind(this, record.urid)}>
              <Icon type='edit'/>
            </a>
          </div>
        )
      }
    }];
    this.rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
      },
      onSelect: (record, selected, selectedRows) => {
        this.setState({
          selectedRows
        })
      },
      onSelectAll: (selected, selectedRows,) => {
        this.setState({
          selectedRows
        })
      },
    };
  }

  componentDidMount() {
    this.loadTable();
  }
  componentWillReceiveProps(nextProps) {}

  loadTable = (data) => {
    this.setState({
      tableLoading: true
    }, () => {
      post({
        url: api.role.list,
        data: {
          page: this.state.tablePage.current,
          size: this.state.tablePage.pageSize,
          entity: this.roleSearchForm.props.form.getFieldsValue(),
          orderByClause: this.state.orderByClause,
          ...data
        }
      }).then(res => {
        // console.log(res);
        if (res.code === 200) {
          this.setState({
            tableData: res.data.list,
            tablePage: {
              ...this.state.tablePage,
              total: res.data.total
            },
            tableLoading: false
          })
        }
      }).catch(() => {
        this.setState({
          tableLoading: false
        })
      });
    });
  };
  delData = (arr) => {
    Modal.confirm({
      title: '重要提醒',
      content: (
        <p>
          <span style={{color: '#ff0000'}}>角色删除后不可恢复</span>，你还要继续吗？
        </p>
      ),
      onOk: () => {
        post({
          url: api.role.delete,
          data: {uuaRoles: arr}
        }).then(res => {
          // console.log(res);
          if (res.code === 200) {
            this.loadTable();
          }
        });
      }
    });
  };
  delAllData = () => {
    // console.log(this.state.selectedRows);
    this.delData(this.state.selectedRows);
  };
  searchSubmit = (e) => {
    e.preventDefault();
    this.setState({
      tablePage: {
        ...this.state.tablePage,
        current: 1,
      },
    }, () => {
      this.loadTable({
        entity: this.roleSearchForm.props.form.getFieldsValue()
      });
    })
  };
  searchReset = () => {
    this.roleSearchForm.props.form.resetFields();
    this.loadTable();
  };
  tableChange = (pagination, filters, sorter) => {
    let order = '';
    if (sorter.field) {
      order = `${sorter.field} ${sorter.order.slice(0, sorter.order.length - 3)}`;
    }
    this.setState({
      orderByClause: order,
      tablePage: {
        ...this.state.tablePage,
        current: pagination.current,
        pageSize: pagination.pageSize
      }
    }, () => {
      this.loadTable({
        entity: this.roleSearchForm.props.form.getFieldsValue(),
        orderByClause: order,
      })
    });
  };
  changeExpand = () => {
    this.setState({
      expand: !this.state.expand
    });
  };

  // 新建表单显示，并做是否修改判断
  addShow = (urid) => {
    if(urid){
      post({
        url: api.role.list,
        data:{entity:{urid}}
      }).then(res=>{
        if(res&&res.code===200){
          let data=res.data.list[0];
          this.addForm.props.form.setFieldsValue({
            urName:data.urName,
            urCode:data.urCode,
            remarks:data.remarks,
            state:data.state,
          })
        }
      });
      this.setState({
        modify:true,
        addVisible: true,
        urid,
      })
    }else {
      this.setState({
        modify:false,
        addVisible: true
      })
    }

  };
  // 新建表单模态框关闭
  addCancel = () => {
    this.setState({
      addVisible:false
    });
    this.addForm.props.form.resetFields();
  };
  // 新建表单提交
  addSubmit = (e) => {
    e.preventDefault();
    let url = '';
    this.addForm.props.form.validateFields((err, values) => {
      if (this.state.modify) {
        url = api.role.update;
        values.urid = this.state.urid
      } else {
        url = api.role.add;
      }
      if (!err) {
        this.setState({
          btnLoading: true
        }, () => {
          post({url, data: values}).then(res => {
            // console.log(res);
            if (res.code === 200) {
              this.addCancel();
              this.setState({
                btnLoading: false,
              },()=>{
                this.loadTable();
                Modal.confirm({
                  title: '操作成功',
                  content: '角色' + (this.state.modify ? '修改' : '添加') + '成功，是否继续添加权限？',
                  okText: '添加权限',
                  onOk: () => {
                    this.addAuthShow(values.urid)
                  }
                });
              });
            }
          }).catch(() => {
            this.setState({
              btnLoading: false
            });
          });
        });

      }
    })
  };
  // 添加权限开启
  addAuthShow=(id)=>{
    // console.log(id);
    this.setState({
      addAuthVisible:true,
      addAuthData:id,
    });
    post({
      url:'/uua/app/center/list',
    }).then(res=>{
      // console.log(res);
      if(!res){
        return false;
      }
      this.setState({
        TabPaneData:res.data,
      });
    });
  };
  // 添加权限关闭
  addAuthCancel=()=>{
    this.setState({
      addAuthVisible:false,
    });
  };
  AuthTabChange=(key)=>{

  };
  AuthSubmit=()=>{

  };
  render() {
    return (
      <div className={'main-box'}>
        <AddAuth
          wrappedComponentRef={ins=>this.addauthForm=ins}
          TabPaneData={this.state.TabPaneData}
          AuthTabChange={this.AuthTabChange}
          AuthSubmit={this.AuthSubmit}
          authBtnLoading={this.state.authBtnLoading}
          addAuthData={this.state.addAuthData}
          addAuthVisible={this.state.addAuthVisible}
          addAuthCancel={this.addAuthCancel}/>
        {
          this.state.modify?
            <Addbtn
              wrappedComponentRef={ins=>this.addForm=ins}
              title='修改'
              btnLoading={this.state.btnLoading}
              addVisible={this.state.addVisible}
              addSubmit={this.addSubmit}
              addCancel={this.addCancel}/>:
            <Addbtn
              wrappedComponentRef={ins=>this.addForm=ins}
              title='新建'
              btnLoading={this.state.btnLoading}
              addVisible={this.state.addVisible}
              addSubmit={this.addSubmit}
              addCancel={this.addCancel}/>
        }

        <Button onClick={this.addAuthShow}>选线</Button>
        <div className='bread-group'>
          <Bread bread={['用户中心', '角色管理', '角色列表']}/>
        </div>
        <Divider/>

        <div className='main-content'>
          <div className={'search-group'}>
            {
              this.state.expand ? <AllForm
                  wrappedComponentRef={(inst) => this.roleSearchForm = inst}
                  searchSubmit={this.searchSubmit}
                  searchReset={this.searchReset}
                  changeExpand={this.changeExpand}/> :
                <SimpleForm
                  wrappedComponentRef={(inst) => this.roleSearchForm = inst}
                  searchSubmit={this.searchSubmit}
                  searchReset={this.searchReset}
                  changeExpand={this.changeExpand}/>
            }
          </div>
          <div className={'btn-group'}>
            <Button icon='plus' type="primary" onClick={this.addShow.bind(this,'')}>新建</Button>
            <Button onClick={this.delAllData} disabled={this.state.selectedRows.length === 0}>批量删除</Button>
          </div>
          <div className='info-group'>
            {
              this.state.selectedRows.length > 0 ?
                <Alert
                  message={(
                    <em>
                      已选择<i style={{padding: '0 5px', color: '#1890FF'}}>{this.state.selectedRows.length}</i>项
                    </em>
                  )}
                  type="info"
                  showIcon
                />
                : null
            }
          </div>
          <div className={'table-group'}>
            <Table
              bordered
              size='middle'
              scroll={{y: 500}}
              rowKey='urid'
              columns={this.columns}
              dataSource={this.state.tableData}
              pagination={this.state.tablePage}
              rowSelection={this.rowSelection}
              loading={this.state.tableLoading}
              onChange={this.tableChange}
            />
          </div>
        </div>
      </div>
    )
  }
}

RoleList = Form.create()(RoleList);
export default RoleList
