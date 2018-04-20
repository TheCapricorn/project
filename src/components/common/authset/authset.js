import React, {Component} from 'react';
import {Button, Form, Divider, Table, Modal, Badge, Icon} from 'antd'
import {post} from '@/ajax/ajax'
import api from '@/ajax/api'
import SimpleForm from './simpleform'
import AllForm from './allform'
import Bread from '@/components/common/bread'

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class AuthSet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
      selectedRows: [],
      loading: false,
      expand: false,
    };
    this.columns = [{
      title: '功能树',
      dataIndex: 'urid',
      key: 'urid',
      // width: '300',
    }, {
      title: '功能编码',
      dataIndex: 'urName',
      key: 'urName',
      width: 100,
    }, {
      title: '启用',
      dataIndex: 'urCode',
      key: 'urCode',
      width: 100,
      sorter: true,
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
            <Addbtn type='modify' data={record} callback={this.loadTable}/>
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

  delData = (arr) => {
    Modal.confirm({
      title: '重要提醒',
      content: (
        <p>
          <span style={{color: '#ff0000'}}>角色删除后不可恢复</span>，你还要继续吗？
        </p>
      ),
      okText: '确认',
      cancelText: '取消',
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
  loadTable = (data) => {
    this.setState({
      loading: true
    }, () => {
      post({
        url: api.role.list,
        data: {
          page: this.state.tablePage.current,
          size: this.state.tablePage.pageSize,
          entity: this.searchForm.props.form.getFieldsValue(),
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
  searchSubmit = (e) => {
    if (e) {
      e.preventDefault();
    }
    this.setState({
      tablePage: {
        ...this.state.tablePage,
        current: 1,
      },
    }, () => {
      this.loadTable({
        entity: this.searchForm.props.form.getFieldsValue()
      });
    })
  };
  searchReset = () => {
    this.searchForm.props.form.resetFields();
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
      // console.log(this.state.orderByClause);
      this.loadTable({
        entity: this.searchForm.props.form.getFieldsValue(),
        orderByClause: order,
      })
    });
  };
  changeExpand = () => {
    this.setState({
      expand: !this.state.expand
    });
  };

  render() {
    return (
      <div className={'main-box'}>
        <div className='bread-group'>
          <Bread bread={['用户中心', '角色管理', '角色列表']}/>
        </div>
        <Divider/>
        <div className='main-content'>
          <div className={'search-group'}>
            <Form
              layout='inline'
              onSubmit={this.props.searchSubmit}>
              <FormItem
                label="角色名">
                {getFieldDecorator('urName')(
                  <Input placeholder="请输入"/>
                )}
              </FormItem>
              <FormItem
                label="状态">
                {getFieldDecorator('state')(
                  <Select
                    style={{width: 174}}
                    placeholder='请选择'>
                    <Option value="">请选择</Option>
                    <Option value="0">启用</Option>
                    <Option value="1">删除</Option>
                    <Option value="2">禁用</Option>
                  </Select>
                )}
              </FormItem>
              <FormItem>
                <div className={'search-btns'}>
                  <Button type="primary" htmlType="submit" className="login-form-button">查询</Button>
                  <Button type="default" htmlType="reset" className="login-form-button"
                          onClick={this.props.searchReset}>重置</Button>
                  <a className='expand-btn' onClick={this.props.changeExpand}>
                    展开<Icon type="down"/>
                  </a>
                </div>
              </FormItem>
            </Form>
          </div>

          <div className={'table-group'}>
            <Table
              bordered
              size='middle'
              scroll={{y: 500}}
              rowKey='urid'
              columns={this.columns}
              dataSource={this.state.tableData}
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

AuthSet = Form.create()(AuthSet);
export default AuthSet;
