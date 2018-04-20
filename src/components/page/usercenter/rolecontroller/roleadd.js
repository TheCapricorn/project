import React, {Component} from 'react';
import {Button, Form, Radio, Input, Modal,} from 'antd'
import {post} from '@/ajax/ajax'
import api from '@/ajax/api'


const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const {TextArea} = Input;


class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addData:{
        visible: this.props.addData.visible,
        urid:this.props.addData.urid,
        type: this.props.addData.type,
      },
      loading: false,
      formData: {}
    };
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps);
    if(nextProps.addData.urid!==this.state.urid){
      // console.log(nextProps.addData.urid);
      this.setState({
        addData: {...nextProps.addData}
      });
      if(nextProps.addData.urid){
        post({
          url: api.role.list,
          data:{entity:{urid:nextProps.addData.urid}}
        }).then(res=>{
          if(res&&res.code===200){
            this.setState({
              formData:res.data.list[0]
            })
          }
        })
      }
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let url = '';
    this.props.form.validateFields((err, values) => {
      if (this.state.addData.type==='modify') {
        url = api.role.update;
        values.urid = this.state.addData.urid
      } else {
        url = api.role.add;
      }
      // console.log(values);
      if (!err) {
        this.setState({
          loading: true
        }, () => {
          post({url, data: values}).then(res => {
            // console.log(res);
            if (res.code === 200) {
              this.props.addCancel();
              this.props.form.resetFields();
              this.props.loadTable();
              this.setState({
                loading: false
              },()=>{
                Modal.confirm({
                  title: '操作成功',
                  content: '角色' + (this.state.addData.type==='modify' ? '修改' : '添加') + '成功，是否继续添加权限？',
                  okText: '添加权限',
                  onOk: () => {
                    this.props.addAuth(values.urid)
                  }
                });
              });
            }
          }).catch((err) => {
            console.log(err);
            this.setState({
              loading: false
            });
          });
        });

      }
    })
  };
  handleClear = () => {
    this.props.form.resetFields();
  };
  cancel = () => {
    this.props.addCancel();
    this.setState({
      formData:{}
    });
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    const formItemLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 14}
    };
    return (
      <div className={'btn-modal'}>
        <Modal
          title={this.state.addData.type==='modify'? '修改' : '新建'}
          footer={null}
          style={{top: '10%'}}
          visible={this.state.addData.visible}
          onCancel={this.cancel}
        >
          <Form onSubmit={this.handleSubmit}>
            <FormItem {...formItemLayout} label="角色名">
              {getFieldDecorator('urName', {
                initialValue: this.state.formData.urName,
                rules: [{
                  required: true, message: '必填项！'
                }]
              })(
                <Input placeholder="请输入"/>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="角色代码">
              {getFieldDecorator('urCode', {
                initialValue: this.state.formData.urCode,
                rules: [{
                  required: true, message: '必填项！'
                }]
              })(
                <Input placeholder="请输入"/>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="角色描述">
              {getFieldDecorator('remarks', {
                initialValue: this.state.formData.remarks,
              })(
                <TextArea placeholder="请输入"/>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="角色状态">
              {getFieldDecorator('state', {
                initialValue: this.state.formData.state || '0',
                rules: [{
                  // required:true,message:'请选择状态！'
                }]
              })(
                <RadioGroup>
                  <Radio value="0">启用</Radio>
                  {/*<Radio value="1">删除</Radio>*/}
                  <Radio value="2">禁用</Radio>
                </RadioGroup>
              )}
            </FormItem>

            <FormItem>
              <div className={'add-form-btns'}>
                <Button type="primary" htmlType="submit" loading={this.state.loading}>提交</Button>
                <Button onClick={this.handleClear}>重置</Button>
              </div>
            </FormItem>
          </Form>
        </Modal>
      </div>
    )
  }
}

AddUser = Form.create()(AddUser);
export default AddUser;
