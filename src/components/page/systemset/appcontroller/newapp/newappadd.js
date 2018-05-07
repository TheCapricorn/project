import React, {Component} from 'react';
import {Button, Form, Radio, Input, Modal, message} from 'antd'
import {post} from '../../../../../ajax/ajax'
import api from '../../../../../ajax/api'


const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const {TextArea} = Input;


class AddUser extends Component {
    constructor(props) {
        super(props);
        console.log(props);
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
    handleSubmit = (self) => {

        let url = '';
        this.props.form.validateFields((err, values) => {
            if (this.state.btnType) {
                url = api.role.update;
                values.urid = this.state.formData.urid
            } else {
                url = api.role.add;
            }
            // console.log(values);
          /*  self.props.history.push('/app/systemset/appcontroller/newapp');*/
            if (!err) {
                this.setState({
                    loading: true
                }, () => {
                    post({url, data: values}).then(res => {
                        console.log(res);

                        //this.props.state.push()
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
        const _self = this;
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 14}
        };
        console.log(this)
        return (
            <div className={'btn-modal'}>
                {
                    this.state.btnType ? (
                        <Button icon='edit' onClick={this.handleAdd}/>
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
                    <Form onSubmit={(e)=>{
                        e.preventDefault();
                        _self.handleSubmit(_self);

                    }}>
                        {/*<FormItem {...formItemLayout} label = "角色编码">
              {getFieldDecorator('urid', {
                initialValue:this.state.formData.urid
              })(
                <Input disabled/>
              )}
            </FormItem>*/}
                        <FormItem {...formItemLayout} label="角色名">
                            {getFieldDecorator('urName', {
                                initialValue: this.state.formData.urName,
                                rules: [{
                                    required: true, message: '请输入角色名！'
                                }]
                            })(
                                <Input placeholder="请输入您的用户名！"/>
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="角色代码">
                            {getFieldDecorator('urCode', {
                                initialValue: this.state.formData.urCode,
                                rules: [{
                                    required: true, message: '请输入角色代码！'
                                }]
                            })(
                                <Input placeholder="请输入角色代码"/>
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="角色描述">
                            {getFieldDecorator('remarks', {
                                initialValue: this.state.formData.remarks,
                            })(
                                <TextArea placeholder="请输入您的角色描述！"/>
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

AddUser = Form.create()(AddUser); //解决了getFieldDecorator无法定义;
export default AddUser;
