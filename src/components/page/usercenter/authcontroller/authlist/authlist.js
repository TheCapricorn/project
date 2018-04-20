import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Button, Form, Select, Divider, Input, Table, Modal, Breadcrumb, /*Badge,*/ Alert} from 'antd'
import {post} from '../../../../../ajax/ajax'
import Addbtn from './add'

const FormItem = Form.Item;
const Option = Select.Option;

class ButtonList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
      selectedRows: [],
      loading: false,
      page: 1,
      size: 10
    };
    this.columns = [{
      title: '组织机构树',
      dataIndex: 'name',
      key: 'name',
      width: 200,
    }, {
      title: '组织机构代码',
      dataIndex: 'uoCode',
      key: 'uoCode',
      width: 150,
    }, {
      title: '负责人',
      dataIndex: 'leaderName',
      key: 'leaderName',
      width: 100,
      align: 'center',
    }, {
      title: '状态',
      dataIndex: 'state',
      key: 'state',
      width: 80,
      align: 'center',
    }, {
      title: '操作',
      // dataIndex: 'leaderName',
      // key: 'leaderName',
      align: 'center',
      width: 200,
      render: () => {

      }
    }];
    this.routes = [{
      path: '/app/usercenter',
      breadcrumbName: '用户中心'
    }, {
      path: '/rolecontroller/rolelist',
      breadcrumbName: '角色管理'
    }];
    this.itemRender = (route, params, routes, paths) => {
      // console.log(routes);
      const last = routes.indexOf(route) === routes.length - 1;
      return last ? <Link to={'/' + paths.join('/')}>{route.breadcrumbName}</Link> :
        <span>{route.breadcrumbName}</span>;
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
          url: '/uua/role/delete',
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
        url: '/uua/org/listAll',
        data: {
          // page:this.state.page,
          // size:this.state.size,
          entity: this.props.form.getFieldsValue(),
          ...data
        }
      }).then(res => {
        // console.log(res);
        if (res.code === 200) {
          this.setState({
            tableData: res.data,
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
    // console.log(e);
    e.preventDefault();
    this.loadTable({
      // entity:this.props.form.getFieldsValue()
    });

  };
  searchReset = () => {
    this.props.form.resetFields();
    this.loadTable();
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      onSelect: (record, selected, selectedRows) => {
        // console.log(record, selected, selectedRows);
        this.setState({
          selectedRows
        })
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        // console.log(selected, selectedRows, changeRows);
        this.setState({
          selectedRows
        })
      },
    };

    return (
      <div className={'main-box'}>
        <div className='bread-group'>
          <Breadcrumb itemRender={this.itemRender} routes={this.routes}/>
        </div>
        <Divider/>
        <div className='main-content'>
          <div className={'search-group'}>
            <Form
              layout='inline'
              onSubmit={this.searchSubmit}
            >
              <FormItem
                label="角色名"
              >
                {getFieldDecorator('urName')(
                  <Input/>
                )}
              </FormItem>
              <FormItem
                label="状态"
              >
                {getFieldDecorator('state', {
                  initialValue: ''
                })(
                  <Select
                    style={{width: 174}}
                    // onChange={this.searchSubmit}
                  >
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
                          onClick={this.searchReset}>重置</Button>
                  <Button onClick={() => {
                    this.props.history.push('/app')
                  }}>去其他页面</Button>
                </div>
              </FormItem>
            </Form>
          </div>
          <div className={'btn-group'}>
            <Addbtn callback={this.loadTable}/>
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
              rowKey='id'
              columns={this.columns}
              dataSource={this.state.tableData}
              pagination={false}
              rowSelection={rowSelection}
              size='small'
              scroll={{y: 600}}
              loading={this.state.loading}
            />
          </div>
        </div>
      </div>
    )
  }
}

ButtonList = Form.create()(ButtonList);
export default ButtonList
