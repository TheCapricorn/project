import React, {Component} from 'react';
import {Button, Form, Radio, Input, Modal, message, Icon} from 'antd'
import {post} from '../../../../../ajax/ajax'
import api from '../../../../../ajax/api'

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class AddBtn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      loading: false,
      btnType: this.props.type === 'modify',
      formData: this.props.type === 'modify' ? this.props.data : {}
    };
  }

  componentDidMount() {
    // console.log(this.state.formData);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      formData: nextProps.type === 'modify' ? nextProps.data : {}
    });
    // console.log(nextProps);
  }

  handleAdd = () => {
    this.setState({
      visible: true
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    let url = '';
    this.props.form.validateFields((err, values) => {
      if (this.state.btnType) {
        url = api.orggroup.update;
        values.ugid = this.state.formData.ugid
      } else {
        url = api.orggroup.add;
      }
      // console.log(values);
      if (!err) {
        this.setState({
          loading: true
        }, () => {
          post({url, data: values}).then(res => {
            switch (res.code) {
              case 200:
                this.setState({
                  visible: false,
                }, () => {
                  this.props.form.resetFields();
                  this.props.callback();
                  this.setState({
                    loading: false
                  })
                });
                break;
              case 400:
                message.warn(res.message);
                this.setState({
                  loading: false
                });
                break;
              default:
                this.setState({
                  loading: false
                });
            }
          }).catch(() => {
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
  handleOk = () => {
    this.setState({
      visible: false
    }, () => {
      this.handleClear();
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
        {
          this.state.btnType ? (
            <a
              onClick={this.handleAdd}>
              <Icon type='edit'/>
            </a>
          ) : (
            <Button icon='plus' type="primary" onClick={this.handleAdd}>新建</Button>
          )
        }
        <Modal
          title={this.state.btnType ? '修改' : '新建'}
          footer={null}
          style={{top: '10%'}}
          visible={this.state.visible}
          onCancel={this.handleOk}
        >
          <Form onSubmit={this.handleSubmit}>
            <FormItem {...formItemLayout} label="项目组名称">
              {getFieldDecorator('ugName', {
                initialValue: this.state.formData.ugName,
                rules: [{
                  required: true, message: '必填项'
                }]
              })(
                <Input placeholder="请输入"/>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="项目组代码">
              {getFieldDecorator('ugCode', {
                initialValue: this.state.formData.ugCode,
                rules: [{
                  required: true, message: '必填项！'
                }]
              })(
                <Input placeholder="请输入"/>
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
                  <Radio value="2">停用</Radio>
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

AddBtn = Form.create()(AddBtn); //解决了getFieldDecorator无法定义;
export default AddBtn;
