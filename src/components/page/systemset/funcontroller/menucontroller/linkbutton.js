import React, {Component} from 'react';
import { Modal, Button, Form, Table, Alert, message } from 'antd';
import Addbtn from './buttonadd'
import {post} from "@/ajax/ajax";
import api from "@/ajax/api";

const FormItem = Form.Item;
// const Option = Select.Option;

class LinkButton extends Component {

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
      width: 300,
      key: 'blName',
    }, {
      title: '按钮方法',
      dataIndex: 'blMethod',
      width: 300,
      key: 'blMethod',
    }];

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
          url:api.buttoncontroller.delete,
          data:{uuaButton:arr}
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
        url:api.buttoncontroller.list,
        data:{
          page:this.state.page,
          size:this.state.size,
          entity:this.props.form.getFieldsValue(),
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


  handleSubmit=(e)=>{
    e.preventDefault();
    let url='';
    this.props.form.validateFields((err,values)=>{
        url=api.buttoncontroller.list;
        values.umid=this.state.formData.umid;
       console.log(values.umid);
      if(!err){
        this.setState({
          loading:true
        },()=>{
          post({url,data:values}).then(res=>{
            switch (res.code){
              case 200:
                this.setState({
                  visible: false,
                },()=>{
                  this.props.form.resetFields();
                  this.props.callback();
                  this.setState({
                    loading:false
                  })
                });
                break;
              case 400:
                message.warn(res.message);
                this.setState({
                  loading:false
                });
                break;
              default:
                this.setState({
                  loading:false
                });
            }
          }).catch(()=>{
            this.setState({
              loading:false
            });
          });
        });

      }
    })
  };


  state = {
    // ModalText: 'Content of the modal',
    visible: false,
    confirmLoading: false,
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = () => {
    this.setState({
      ModalText: '',
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
  }
  handleCancel = () => {
    // console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  }
  render() {
    const { visible, confirmLoading } = this.state;

    // const {getFieldDecorator} = this.props.form;
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
      <div className={'btn-modal'}>

        <Button className={'addButton'} icon='plus' onClick={this.showModal}/>

        <Modal title="选择按钮"
               width="35%"
               visible={visible}
               onOk={this.handleOk}
               confirmLoading={confirmLoading}
               onCancel={this.handleCancel}
               onSubmit={this.handleSubmit}
        >



          <div className='main-content'>
            <div className={'search-group'}>

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
                rowSelection={rowSelection}
                size='small'
                scroll={{ y: 600}}
                loading={this.state.loading}
              />
            </div>
            <FormItem>
              <Addbtn icon='plus'  callback={this.loadTable}/>
            </FormItem>
          </div>






        </Modal>







      </div>
    );
  }
}
LinkButton = Form.create()(LinkButton); //解决了getFieldDecorator无法定义;
export default  LinkButton;