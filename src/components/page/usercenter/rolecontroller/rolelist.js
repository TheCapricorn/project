import React, {Component} from 'react';
import {Button, Form, Divider, Table, Modal, Badge, Alert, Icon} from 'antd'
import {post} from '@/ajax/ajax'
import api from '@/ajax/api'
import moment from 'moment'
import SimpleForm from './simpleform'
import AllForm from './allform'
import Bread from '@/components/common/bread'
import AddAuth from './authset'
import Addbtn from './roleadd'

class RoleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addAuthVisible: false,
      addAuthData:'',
      addData: {
        visible: false,
        type: 'add',
        urid: ''
      },
      tableData: [],
      selectedRows: [],
      loading: false,
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
            <a onClick={this.addShow.bind(this, 'modify', record.urid)}>
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

  componentWillReceiveProps(nextProps) {
    // console.log('调用了');
  }

  loadTable = (data) => {
    this.setState({
      loading: true
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
            loading: false
          })
        }
      }).catch(() => {
        this.setState({
          loading: false
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
    // console.log(this.state.tablePage);
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
  addShow = (type, urid) => {
    // console.log(e.target);
    this.setState({
      addData: {
        visible: true,
        type,
        urid
      }
    })
  };
  addCancel = () => {
    this.setState({
      addData: {
        urid:'',
        type:'add',
        visible: false
      }
    })
  };
  addAuth=(id)=>{
    // console.log(id);
    this.setState({
      addAuthVisible:true,
      addAuthData:id,
    });
  };
  addAuthCancel=()=>{
    this.setState({
      addAuthVisible:false,
    });
  };
  render() {
    return (
      <div className={'main-box'}>
        <AddAuth addAuthData={this.state.addAuthData} addAuthVisible={this.state.addAuthVisible} addAuthCancel={this.addAuthCancel}/>
        <Button onClick={this.addAuth}>选线</Button>
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
            <Addbtn addData={this.state.addData} loadTable={this.loadTable} addCancel={this.addCancel} addAuth={this.addAuth}/>
            <Button icon='plus' type="primary" onClick={this.addShow.bind(this, 'add', '')}>新建</Button>
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
              loading={this.state.loading}
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
