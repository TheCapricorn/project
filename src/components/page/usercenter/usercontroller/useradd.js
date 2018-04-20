import React, {Component} from 'react';
import {Button, Form, Radio, Input, Modal, Cascader, TreeSelect, Upload, AutoComplete} from 'antd'
import {post} from '@/ajax/ajax'
import api from '@/ajax/api'
import city from '@/utils/city'

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const SHOW_PARENT = TreeSelect.SHOW_PARENT;
const Option = AutoComplete.Option;
// const {TextArea} = Input;
// const ButtonGroup=Button.Group;
const reg = {
  IDcard: /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/,
  mobile: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
};

class UserAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      previewVisible: false,
      loading: false,
      emailValue: [],
      formData: {},
      treeData: [
        {id:1, pId:0, value:'1', label:"test1"},
        {id:2, pId:1, value:'12', label:"test2"}
      ],
      fileList: [],
      previewImage: ''
    };
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {

  }

  handleAdd = () => {
    this.setState({
      visible: true
    }, () => {
      post({
        url: api.orgcontroller.listAll,
      }).then(res => {
        console.log(res);
        if (res && res.code === 200) {
          this.setState({
            treeData: res.data
          });
        }
      });
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log(values);
        this.setState({
          loading: true
        }, () => {
          post({
            url: api.user.add,
            data: values
          }).then(res => {
            console.log(res);
            if (res.code) {
              this.setState({
                visible: false,
              }, () => {
                this.props.form.resetFields();
                this.props.callback();
                this.setState({
                  loading: false
                })
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
  cityChange = (val) => {
    console.log(val);
  };
  emailChange = (value) => {
    let emailValue;
    if (!value || value.indexOf('@') >= 0) {
      emailValue = [];
    } else {
      emailValue = [
        '126.com', '163.com','163.net','qq.com', 'sina.com', 'sina.cn','yahoo.com'
      ].map(item => `${value}@${item}`);
    }
    this.setState({emailValue});
  };
  treeSelect=(val)=>{
    console.log(val);
  };
  upImgChange = ({fileList}) => {
    // console.log(fileList);
    this.setState({
      fileList
    })
  };
  imgPreview = (file) => {
    // console.log(file);
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };
  imgPreviewCancel = () => {
    this.setState({
      previewVisible: false
    })
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    const formItemLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 14}
    };
    const children = this.state.emailValue.map((email) => {
      return <Option key={email}>{email}</Option>;
    });
    return (
      <div className={'btn-modal'}>
        <Button icon='plus' type="primary" onClick={this.handleAdd}>新建</Button>
        <Modal
          title={this.state.btnType ? '修改' : '新建'}
          footer={null}
          style={{top: '24px'}}
          visible={this.state.visible}
          onCancel={this.handleOk}
        >
          <Form onSubmit={this.handleSubmit}>
            <FormItem {...formItemLayout} label="姓名">
              {getFieldDecorator('uname', {
                rules: [{
                  required: true, message: '必选项！'
                }]
              })(
                <Input placeholder="请输入"/>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="性别">
              {getFieldDecorator('sez', {
                initialValue: '0',
                rules: [{
                  required: true, message: '必选项！'
                }]
              })(
                <RadioGroup>
                  <Radio value="0">男</Radio>
                  <Radio value="1">女</Radio>
                </RadioGroup>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="手机号码">
              {getFieldDecorator('mobile', {
                rules: [
                  {required: true, message: '必选项！'},
                  {
                    validator(rule, value, callback) {
                      let errors = [];
                      if (!reg.mobile.test(value)) {
                        errors.push(new Error('手机格式不正确'))
                      }
                      callback(errors);
                    }
                  }]
              })(
                <Input placeholder="请输入"/>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="邮箱">
              {getFieldDecorator('email', {
                rules: [
                  {type: 'email', message: "邮箱格式不正确"}
                ]
              })(
                <AutoComplete
                  onSearch={this.emailChange}
                  placeholder="请输入"
                >
                  {children}
                </AutoComplete>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="身份证件">
              {getFieldDecorator('idNumber', {
                rules: [
                  {required: true, message: '必选项！'},
                  {
                    validator(rule, value, callback) {
                      let errors = [];
                      if (!reg.IDcard.test(value)) {
                        errors.push(new Error('身份证格式不正确'))
                      }
                      callback(errors);
                    }
                  }]
              })(
                <Input placeholder="请输入"/>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="通讯地址(可选)">
              <Cascader
                options={city}
                placeholder='可选项'
                onChange={this.cityChange}
                // displayRender={displayRender}
              />
              <Input ref='addressInput' placeholder="请输入"/>
            </FormItem>
            <FormItem {...formItemLayout} label="所属部门">
              {getFieldDecorator('uoid', {
                rules: [{
                  required: true, message: '必选项！'
                }]
              })(
                <TreeSelect
                  treeData={this.state.treeData}
                  multiple={true}
                  treeCheckable={true}
                  // treeDataSimpleMode={[{id: Number, pId: Number, rootPId: null}]}
                  showCheckedStrategy={SHOW_PARENT}
                  placeholder="请选择"
                  onChange={this.treeSelect}
                  style={{width: '100%'}}
                />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="用户头像">
              <div style={{height: '112px'}}>
                <Upload
                  accept='image/bmp,image/jpeg,image/jpg,image/png'
                  action="//jsonplaceholder.typicode.com/posts/"
                  listType='picture-card'
                  fileList={this.state.fileList}
                  onPreview={this.imgPreview}
                  onChange={this.upImgChange}
                >
                  {this.state.fileList.length >= 1 ? null :
                    <div className="ant-upload-text">上传头像</div>
                  }
                </Upload>
              </div>
              <div>支持扩展名：.bmp .png .jpg</div>
              <Modal
                width='250px'
                visible={this.state.previewVisible}
                footer={null}
                onCancel={this.imgPreviewCancel}>
                <img alt='预览图' style={{width: '100%'}} src={this.state.previewImage}/>
              </Modal>
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

UserAdd = Form.create()(UserAdd);
export default UserAdd;
