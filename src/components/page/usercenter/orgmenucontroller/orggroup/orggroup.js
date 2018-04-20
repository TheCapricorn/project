import React, {Component} from 'react';
import {Button, Divider, Table, Modal, Badge, Alert, Icon} from 'antd'
import {post} from '@/ajax/ajax'
import api from '@/ajax/api'
import Addbtn from './add'
import AddPeople from './addpeople'

import SimpleForm from './simpleform'
import Bread from '@/components/common/bread'

class OrgGroup extends Component {
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
      }
    };
    this.columns = [{
      title: '项目组名称',
      dataIndex: 'ugName',
      key: 'ugName',
      sorter: true,
      // width: '300',
    }, {
      title: '状态',
      dataIndex: 'state',
      key: 'state',
      align: 'center',
      width: 100,
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
              : <Badge status="warning" text="停用"/>
          }
        </div>
      )
    }, {
      title: '项目组功能',
      dataIndex: 'ugCode',
      key: 'ugCode',
      width: 100,
    }, {
      title: '操作',
      width: 150,
      // key:'createUid',
      align: 'center',
      render: (text, record) => {
        return (
          <div className={'table-opt-btns'}>
            <a
              onClick={this.delData.bind(this, [record])}
              disabled={parseInt(record.state, 10) === 1}>
              <Icon type='delete'/>
            </a>
            <Addbtn type='modify' data={record} callback={this.loadTable}/>
            <AddPeople data={record}/>
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
      onSelectAll: (selected, selectedRows, changeRows) => {
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
          url: api.orggroup.deletes,
          data: {uumGroups: arr}
        }).then(res => {
          console.log(res);
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
        url: api.orggroup.list,
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

    let order;
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
        entity: {
          ...this.searchForm.props.form.getFieldsValue(),
          ...filters
        },
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
          <Bread bread={['用户中心', '组织机构管理', '项目组管理']}/>
        </div>
        <Divider/>
        <div className='main-content'>
          <div className={'search-group'}>
            <SimpleForm
              wrappedComponentRef={(inst) => this.searchForm = inst}
              searchSubmit={this.searchSubmit}
              searchReset={this.searchReset}
              changeExpand={this.changeExpand}/>
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
              size='middle'
              scroll={{y: 500}}
              rowKey='ugid'
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

// OrgGroup = Form.create()(OrgGroup);
export default OrgGroup
