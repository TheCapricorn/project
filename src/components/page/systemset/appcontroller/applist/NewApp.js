import React, {Component} from 'react';
import {Form, Input, Steps, Radio, Upload, InputNumber, Icon, Button, Divider} from 'antd'


import Bread from '../../../../common/bread'

const FormItem = Form.Item;
// const Option = Select.Option;
// const AutoCompleteOption = AutoComplete.Option;
// const {TextArea} = Input;
const RadioGroup = Radio.Group;
const Step = Steps.Step;


const newApp = (props) =>{
    const {listDisplay} = props;
    const {getFieldDecorator} = props.form;

    const formItemLayout = {
        labelCol: {
            xs: {span: 24},
            sm: {span: 8},
        },
        wrapperCol: {
            xs: {span: 24},
            sm: {span: 16},
        },
    };
    const tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 16,
                offset: 8,
            },
        },
    };
// 上传判断
    const uploadProps = {
        // action: '/api',
        onChange({file, fileList}) {
            if (file.status !== 'uploading') {
                console.log(file, fileList);
            }
        },
        defaultFileList: [],
    };

    function onChange(value) {
        console.log('changed', value);
    }
    console.log(listDisplay)
    const v = (!listDisplay) ? 'block': 'none';
    return (
        <div style={{display:v}}>
            <div className='bread-group'>
                <Bread bread={['应用管理', '新建应用']}/>
            </div>
            <Divider/>
            <Steps current={1}>
                <Step title="填写基础信息" description=""/>
                <Step title="选择模板" description=""/>
                <Step title="完成" description=""/>
            </Steps>
            <Form onSubmit={this.handleSubmit}>


                <FormItem {...formItemLayout} label="应用名称">
                    {getFieldDecorator('urCode', {
                        // initialValue:this.state.formData.urCode,
                        rules: [{
                            required: true, message: '请输入应用名称！'
                        }]
                    })(
                        <Input placeholder="请输入"/>
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label="应用编码">
                    {getFieldDecorator('urCode', {
                        // initialValue:this.state.formData.urCode,
                        rules: [{
                            required: true, message: '请输入应用编码！'
                        }]
                    })(
                        <Input placeholder="请输入"/>
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label="应用图标">
                    {getFieldDecorator('umIcon', {
                        // initialValue:this.state.formData.umIcon,
                        rules: [{
                            required: true, message: '请上传应用图标！'
                        }]
                    })(
                        <Upload {...uploadProps}>
                            <Button>
                                <Icon type="upload" placeholder="上传文件"/>
                            </Button>
                        </Upload>
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label="封面图标">
                    {getFieldDecorator('umIcon', {
                        // initialValue:this.state.formData.umIcon,
                        rules: [{
                            required: true, message: '请上传封面图标！'
                        }]
                    })(
                        <Upload {...uploadProps}>
                            <Button>
                                <Icon type="upload" placeholder="上传文件"/>
                            </Button>
                        </Upload>
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label="应用序号">
                    {getFieldDecorator('sort', {
                        // initialValue:this.state.formData.umIcon,
                        rules: [{
                            // required:true,message:'请上传图标！'
                        }]
                    })(
                        <InputNumber min={1} max={10} defaultValue={3} onChange={onChange}/>
                    )}
                </FormItem>

                <FormItem {...formItemLayout} label="应用状态">
                    {getFieldDecorator('state', {
                        // initialValue:this.state.formData.state||'0',
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


                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">下一步</Button>
                </FormItem>
            </Form>
        </div>
    )
};


const NewApp = Form.create()(newApp);
export default NewApp