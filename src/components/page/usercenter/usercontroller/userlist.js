import React, {Component} from 'react';
// import {Link} from 'react-router-dom'
import {Button, Form, Divider, Table, Modal, Badge, Alert, Icon} from 'antd'
import {post} from '@/ajax/ajax'
import api from '@/ajax/api'
import SimpleForm from './simpleform'
import AllForm from './allform'
import UserAdd from './useradd'
import LinkRole from './linkrole'
import Bread from '@/components/common/bread'


class ButtonList extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      title: '用户编号',
      dataIndex: 'uuid',
      key: 'uuid',
      // width: '300',
      render: (text) => <div title={text} style={{width: '100px'}} className='textOverflow'>{text}</div>
    }, {
      title: '姓名',
      dataIndex: 'uname',
      key: 'uname',
      align: 'center',
      width: 80,
    }, {
      title: '组织机构',
      dataIndex: 'uumUserOrgs',
      key: 'uumUserOrgs',
      align: 'center',
      width: 100
    }, {
      title: '联系方式',
      dataIndex: 'mobile',
      key: 'mobile',
      align: 'center',
      sorter: true,
      width: 110
    }, {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
      align: 'center',
      sorter: true,
      width: 180
    }, {
      title: '身份证',
      dataIndex: 'idNumber',
      key: 'idNumber',
      align: 'center',
      sorter: true,
      width: 200
    }, {
      title: '状态',
      dataIndex: 'state',
      width: 100,
      key: 'state',
      align: 'center',
      /*filters: [
        {text: '启用', value: '0'},
        {text: '删除', value: '1'},
        {text: '禁用', value: '2'},
      ],*/
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
      title: '操作',
      width: 100,
      // key:'createUid',
      align: 'center',
      render: (text, record) => {
        return (
          <div className={'table-opt-btns'}>
            <a
              onClick={this.delData.bind(this, record.uuid)}
              disabled={parseInt(record.state, 10) === 1}>
              <Icon type='delete'/>
            </a>
            <a><Icon type='edit'/></a>
          </div>
        )
      }
    }];
    this.rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
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
        url: api.user.list,
        data: {
          page: this.state.tablePage.current,
          size: this.state.tablePage.pageSize,
          entity: this.userSearchForm.props.form.getFieldsValue(),
          orderByClause: this.state.orderByClause,
          ...data
        }
      }).then(res => {
        console.log(res);
        if (res.code === 200) {
          this.setState({
            tableData: res.data.list,
            tablePage: {
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
  delData = (arr,allArr) => {
    let data={},url='';
    if(allArr){
      data={uumUsers:arr};
      url=api.user.delete
    }else {
      data={uuid : arr};
      url=api.user.del
    }
    Modal.confirm({
      title: '重要提醒',
      content: (
        <p>
          <span style={{color: '#ff0000'}}>用户删除后不可恢复</span>，你还要继续吗？
        </p>
      ),
      onOk: () => {
        post({
          url: url,
          data: data
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
    this.delData(this.state.selectedRows,true);
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
        entity: this.userSearchForm.props.form.getFieldsValue()
      });
    })
  };
  searchReset = () => {
    this.userSearchForm.props.form.resetFields();
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
        entity: this.userSearchForm.props.form.getFieldsValue(),
        orderByClause: order,
      })
    });
  };
  changeExpand = () => {
    this.setState({
      expand: !this.state.expand
    });
  };
  deleteAll = () => {

  };

  render() {
    return (
      <div className={'main-box'}>
        <div className='bread-group'>
          <Bread bread={['用户中心', '用户管理', '用户列表']}/>
        </div>
        <Divider/>
        <div className='main-content'>
          <div className={'search-group'}>
            {
              this.state.expand ? <AllForm
                  wrappedComponentRef={(inst) => this.userSearchForm = inst}
                  searchSubmit={this.searchSubmit}
                  searchReset={this.searchReset}
                  changeExpand={this.changeExpand}/> :
                <SimpleForm
                  wrappedComponentRef={(inst) => this.userSearchForm = inst}
                  searchSubmit={this.searchSubmit}
                  searchReset={this.searchReset}
                  changeExpand={this.changeExpand}/>
            }
          </div>
          <div className={'btn-group'}>
            <UserAdd/>
            {
              this.state.selectedRows.length ?
                <LinkRole delAllData={this.delAllData} data={this.state.selectedRows} callback={this.loadTable}/>
                : null
            }
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
              rowKey='uuid'
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

ButtonList = Form.create()(ButtonList);
export default ButtonList
