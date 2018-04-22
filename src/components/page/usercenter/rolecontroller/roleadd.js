import React, {Component} from 'react';
import {Button, Form, Radio, Input, Modal,} from 'antd'
import {post} from '@/ajax/ajax'
import api from '@/ajax/api'


const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const {TextArea} = Input;


class AddRole extends Component {
  constructor(props) {
    super(props);
    this.state={
      loading:false
    }
  }

  componentDidMount() {

  }
  componentWillReceiveProps(nextProps) {
    // console.log(nextProps);
    this.setState({
      loading:nextProps.btnLoading
    })
  }

  /*handleSubmit = (e) => {
    e.preventDefault();
    let url = '';
    this.props.form.validateFields((err, values) => {
      if (this.props.title==='修改') {
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
  };*/
  handleClear = () => {
    this.props.form.resetFields();
  };
  /*cancel = () => {
    this.props.addCancel();
    this.setState({
      formData:{}
    });
  };*/

  render() {
    const {getFieldDecorator} = this.props.form;
    const formItemLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 14}
    };
    return (
      <Modal
        title={this.props.title}
        footer={null}
        style={{top: '10%'}}
        visible={this.props.addVisible}
        onCancel={this.props.addCancel}
      >
        <Form onSubmit={this.props.addSubmit}>
          <FormItem {...formItemLayout} label="角色名">
            {getFieldDecorator('urName', {
              rules: [{
                required: true, message: '必填项！'
              }]
            })(
              <Input placeholder="请输入"/>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="角色代码">
            {getFieldDecorator('urCode', {
              rules: [{
                required: true, message: '必填项！'
              }]
            })(
              <Input placeholder="请输入"/>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="角色描述">
            {getFieldDecorator('remarks', {
            })(
              <TextArea placeholder="请输入"/>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="角色状态">
            {getFieldDecorator('state', {
              initialValue: '0',
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
    )
  }
}

AddRole = Form.create()(AddRole);
export default AddRole;
