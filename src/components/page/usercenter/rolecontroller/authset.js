import React, {Component} from 'react';
import {Button, Form, Table, Modal, Icon, Select, Input,Tabs} from 'antd'
import {post} from '@/ajax/ajax'
import api from '@/ajax/api'

const FormItem = Form.Item;
const Option = Select.Option;
const TabPane = Tabs.TabPane;


class AuthSet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: this.props.addAuthVisible,
      tableData: [],
      selectedRows: [],
      tabPane:[],
      loading: false,
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
            <a>
              <Icon type='delete'/>
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
    post({
      url:'/uua/app/center/list',
    }).then(res=>{
      // console.log(res);
      if(!res){
        return false;
      }
      let tabPane=[];
      res.data.map((item,i)=>{
        post({
          url:'/uua/app/center/modular/cmmbTree',
          data:{uacid:item.uacid}
        }).then(res=>{
          console.log(res);
          return tabPane.push(
            <TabPane tab={item.uappName} key={i}>
              <div className='auth-remark'>{item.uappRemarks}</div>
              <div className='auth-tree'>
                {
                  res.data.map((item)=>{

                  })
                }
              </div>
            </TabPane>
          )
        });

      });
    });
  }

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps.addAuthVisible);
    this.setState({
      visible: nextProps.addAuthVisible
    });
    if(nextProps.addAuthVisible){


    }
  }

  loadTable = (data) => {
    this.setState({
      loading: true
    }, () => {

    });
  };
  searchSubmit = (e) => {
    if (e) {
      e.preventDefault();
    }
    this.setState({}, () => {
      this.loadTable({
        entity: this.props.form.getFieldsValue()
      });
    })
  };
  searchReset = () => {
    this.searchForm.props.form.resetFields();
    // console.log(this.state.tablePage);
    this.loadTable();
  };
  tableChange = (pagination, filters, sorter) => {
    this.setState({}, () => {

    });
  };
  cancel=()=>{
    this.props.addAuthCancel();
  };
  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <Modal
        title='创建菜单/选择模块'
        width='80%'
        footer={null}
        style={{top: '10%'}}
        visible={this.state.visible}
        onCancel={this.cancel}
      >
        <div className={'main-box'}>
          <div className='main-content'>
            <div className={'search-group'}>
              <Form
                layout='inline'
                onSubmit={this.props.searchSubmit}>
                <FormItem
                  label="功能名">
                  {getFieldDecorator('urName')(
                    <Input placeholder="请输入"/>
                  )}
                </FormItem>
                <FormItem
                  label="功能代码">
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
                  </div>
                </FormItem>
              </Form>
            </div>
            <Tabs
              defaultActiveKey="0"
              tabPosition='top'
              style={{ height: 450 }}
            >
              {this.state.tabPane}
            </Tabs>
            <div className={'add-form-btns'}>
              <Button type="primary" loading={this.state.loading}>提交</Button>
              <Button onClick={this.cancel}>取消</Button>
            </div>
          </div>
        </div>
      </Modal>

    )
  }
}

AuthSet = Form.create()(AuthSet);
export default AuthSet;
