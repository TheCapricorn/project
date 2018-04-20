import React, {Component} from 'react';
// import {Link} from 'react-router-dom'
import {Button, Form,  Divider, Table, Modal,  Badge, Alert} from 'antd'
import {post} from '../../../../../ajax/ajax'
import api from '../../../../../ajax/api'
import SearchForm from './searchform'
import UserAdd from './useradd'
import LinkRole from './linkrole'
import Bread from '../../../../common/bread'


/*const FormItem = Form.Item;
const Option = Select.Option;*/

// const AutoCompleteOption = AutoComplete.Option;

class ButtonList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
      selectedRows: [],
      loading: false,
      page:1,
      size:10,
      tablePage: {
        defaultCurrent: 1,
        defaultPageSize: 10,
        showQuickJumper: true,
        showSizeChanger: true,
        onChange: (page, size) => {
          this.loadTable({
            page,
            size,
          });
          this.setState({
            page,
            size,
          });
        },
        onShowSizeChange:(page,size)=>{
          this.loadTable({
            page,
            size,
          });
          this.setState({
            page,
            size,
          });
        }
      }
    };
    this.columns = [{
      title: '按钮名',
      dataIndex: 'blName',
      key: 'blName',
      // width: '300',
    }, {
      title: '按钮编码',
      dataIndex: 'ubid',
      key: 'ubid',
      align: 'center',
      width: 100,
    }, {
      title: '所属功能',
      dataIndex: 'blMethod',
      key: 'blMethod',
      width: 100
    }, {
      title: '状态',
      dataIndex: 'state',
      width: 100,
      key: 'state',
      align: 'center',
      filters: [
        {text: '启用', value: '0'},
        {text: '删除', value: '1'},
        {text: '禁用', value: '2'},
      ],
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
      width: 150,
      // key:'createUid',
      align: 'center',
      render: (text, record) => {
        return (
          <div className={'table-opt-btns'}>
            <Button icon='delete' onClick={this.delData.bind(this, record)}
                    disabled={parseInt(record.state, 10) === 1}/>
            <Button icon='edit'/>
          </div>
        )
      }
    }];
    this.rowSelection = {
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
          url:api.menucontroller.delete,
          data:{uuaRoles:arr}
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
        url:api.menucontroller.list,
        data:{
          page:this.state.page,
          size:this.state.size,
          entity:this.searchform.props.form.getFieldsValue(),
          ...data
        }
      }).then(res => {
        // console.log(res);
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
  searchSubmit = (e) => {
    console.log(this.searchform.props.form.getFieldsValue());
    e.preventDefault();
    this.loadTable({
      entity:this.searchform.props.form.getFieldsValue()
    });

  };
  searchReset = () => {
    this.searchform.props.form.resetFields();
    this.loadTable();
  };
  tableChange=(pagination, filters, sorter)=>{
    console.log(pagination, filters, sorter);
  };
  render() {

    return (
      <div className={'main-box'}>
        <div className='bread-group'>
          <Bread bread={['选择按钮']}/>
        </div>
        <Divider />
        <div className='main-content'>
          <div className={'search-group'}>
            <SearchForm wrappedComponentRef={(inst) => this.searchform= inst} searchSubmit={this.searchSubmit} searchReset={this.searchReset}/>
          </div>
          <div className={'btn-group'}>
            <UserAdd/>
            <LinkRole/>
          </div>
          <div className='info-group'>
            {
              this.state.selectedRows.length > 0 ?
                <Alert
                  message={(
                    <em>
                      已选择<i style={{padding:'0 5px',color:'#1890FF'}}>{this.state.selectedRows.length}</i>项
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
              rowKey='umid'
              columns={this.columns}
              dataSource={this.state.tableData}
              pagination={this.state.tablePage}
              rowSelection={this.rowSelection}
              size='middle'
              scroll={{ y: 600}}
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
