import React, {Component} from 'react';
import { Modal, Button, Form, Input, message, Icon} from 'antd';
import {post} from "@/ajax/ajax";
import api from "@/ajax/api";
import './menustyle.less'

const FormItem = Form.Item;
let uuid = 0;

class LinkMenu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible:false,
      loading:false,
      tableData: [],
      confirmLoading: false,
      // dataSource:[],
      selectedRows: [],
      btnType:this.props.type==='modify',
      formData:this.props.type==='modify'?this.props.data:{}
    };
    // this.columns = [{
    //   title:'按钮名',
    //   dataIndex: 'blName',
    //   key:'blName',
    // }, {
    //   title:'按钮方法',
    //   dataIndex: 'blName',
    //   key:'blName',
    // }];
  }

  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }


  remove = (k) => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  }

  delData = (arr) => {
    Modal.confirm({
      title: '重要提醒',
      content: (
        <p>
          <span style={{color: '#ff0000'}}>按钮删除后不可恢复</span>，你还要继续吗？
        </p>
      ),
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        post({
          url:api.buttoncontroller.delete,
          data:{uuaButtons:arr}
        }).then(res => {
          // console.log(res);
          if (res.code === 200) {
            this.loadTable();
          }
        });
      }
    });
  };


  add = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(uuid);
    uuid++;
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  }





  handleSubmit=(e)=>{
    e.preventDefault();
    let url='';
    this.props.form.validateFields((err,values)=>{
      url=api.buttoncontroller.list;
      values.umid=this.state.formData.umid;

      let Arrdata = this.state.formData;
      let arrData = Array.from(Arrdata);
      arrData.push({});

      console.log(values);
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
            };
            console.log(res.code);
          }).catch(()=>{
            this.setState({
              loading:false
            });
          });
        });

      }
    })
  };


handleAdd = () =>{
  Form.create({
    content: (
      <input type="text"/>
    ),
  })
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

  }
  handleCancel = () => {
    // console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  }


  render() {

    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
      },
    };
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => {
      return (
        <FormItem
          {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
          label={index === 0 ? '按钮' : ''}
          required={false}
          key={k}
        >
          {getFieldDecorator(`names[${k}]`, {
            validateTrigger: ['onChange', 'onBlur'],
            rules: [{

              whitespace: true,

            }],
          })(
            <span>
              <FormItem {...formItemLayoutWithOutLabel} className={'btnName'}>
                {
                  getFieldDecorator('blName', {
                    initialValue:this.state.formData.blName,
                    rules:[{
                      required:true,message:'请输入按钮名！'
                    }]
                  })(

                    <input type="text" placeholder="按钮名称" style={{ width: '40%', height:'33px', borderRadius:'6px'}} />

                  )
                }

              </FormItem>
              <FormItem {...formItemLayoutWithOutLabel} className={'btnMethods'}>
              {
                getFieldDecorator('blMethod', {
                  initialValue:this.state.formData.blMethod,
                  rules:[{
                    required:true,message:'请输入按钮方法！'
                  }]
                })(

                  <Input placeholder="按钮方法" style={{ width: '60%'}} />
                )
              }
            </FormItem>


            </span>

          )}
          {keys.length > 1 ? (
            <Icon
              className="dynamic-delete-button"
              type="minus-circle-o"
              disabled={keys.length === 1}
              onClick={() => this.remove(k)}
            />
          ) : null}
        </FormItem>
      );
    });



    const { visible, confirmLoading } = this.state;



    return (
      <div className={'btn-modal'}>

        <Button icon='plus' onClick={this.showModal}/>

        <Modal title="选择按钮"
               width="45%"
               visible={visible}
               onOk={this.handleSubmit}
               confirmLoading={confirmLoading}
               onCancel={this.handleCancel}
        >
          <Form onSubmit={this.handleSubmit}>
            {formItems}

            <FormItem {...formItemLayoutWithOutLabel}>
              <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
                <Icon type="plus" /> 添加
              </Button>
            </FormItem>

          </Form>


        </Modal>




      </div>
    );
  }
}
LinkMenu = Form.create()(LinkMenu);
export default  LinkMenu;
