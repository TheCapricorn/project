import React, {Component} from 'react';
import {Button, Form, Input, Modal, message, Radio} from 'antd'
import {post} from '@/ajax/ajax'
import api from '@/ajax/api'
// import LinkMenu from './linkmenu'


const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const {TextArea} = Input;



class  AddUser extends Component{//在es6中定义一个AddUser类
  constructor(props){//构造函数
    super(props);
    this.state = {
      visible:false,
      loading:false,
      btnType:this.props.type==='modify',
      formData:this.props.type==='modify'?this.props.data:{}
    };
  }
  componentDidMount(){
    // console.log(this.state.formData);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      formData:nextProps.type==='modify'?nextProps.data:{}
    });
    // console.log(nextProps);
  }
  handleAdd=()=> {
    this.setState({
      visible: true
    });
  };

  handleSubmit=(e)=>{
    e.preventDefault();
    let url='';
    this.props.form.validateFields((err,values)=>{
      if(this.state.btnType){
        url=api.menucontroller.update;
        values.umid=this.state.formData.umid
      }else {
        url=api.menucontroller.add;
      }
      // console.log(values);
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

  handleClick=()=>{
    let Arrdata=this.state.formData;
    Arrdata.push({

    })
  }

  handleClear=()=>{
    this.props.form.resetFields();
  };
  handleOk=()=> {
    this.setState({
      visible: false
    },()=>{
      this.handleClear();
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false
    });
  };

  render(){
    const {getFieldDecorator} = this.props.form;
    const formItemLayout = {
      labelCol:{span : 6},
      wrapperCol:{span: 14}
    };

// 上传判断
//     const props={
//       action: '/api',
//       onChange({ file, fileList }) {
//         if (file.status !== 'uploading') {
//           console.log(file, fileList);
//         }
//       },
//       defaultFileList: [],
//     };

    return(
      <div className={'btn-modal'}>
        {
          this.state.btnType?(
              <Button icon='edit' onClick={this.handleAdd}/>

          ):(
            <Button icon='plus' type="primary" onClick={this.handleAdd}>新建</Button>
          )
        }
        <Modal
          title={this.state.btnType?'修改功能':'新建功能'}
          footer={null}
          style={{top:'10%'}}
          visible={this.state.visible}
          onCancel={this.handleOk}
        >
          <Form onSubmit={this.handleSubmit}>

            <FormItem {...formItemLayout} label = "功能名">
              {getFieldDecorator('umName', {
                initialValue:this.state.formData.umName,
                rules:[{
                  required:true,message:'请输入功能名！'
                }]
              })(
                <Input placeholder="请输入"/>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="功能代码">
              {getFieldDecorator('umHref',{
                initialValue:this.state.formData.umHref,
                rules:[{
                  required:true,message:'请输入功能代码！'
                }]
              })(
                <Input placeholder="请输入"/>
              )}
            </FormItem>
            {/*<FormItem {...formItemLayout} label="功能图标">*/}
              {/*{getFieldDecorator('umIcon',{*/}
                {/*initialValue:this.state.formData.umIcon,*/}
                {/*rules:[{*/}
                  {/*required:true,message:'请上传图标！'*/}
                {/*}]*/}
              {/*})(*/}
                {/*<Upload {...props}>*/}
                  {/*<Button>*/}
                    {/*<Icon type="upload" placeholder="上传文件" />*/}
                  {/*</Button>*/}
                {/*</Upload>*/}
              {/*)}*/}
            {/*</FormItem>*/}



            {
              this.state.btnType?(
                <div>
                  <FormItem {...formItemLayout} label="功能状态">
                    {getFieldDecorator('state',{
                      initialValue:this.state.formData.state||'0',
                      rules:[{
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
                  <FormItem {...formItemLayout} label="备注">
                    {getFieldDecorator('remarks',{
                      initialValue:this.state.formData.remarks,
                    })(
                      <TextArea placeholder="请输入备注！"/>
                    )}
                  </FormItem>
                </div>


              ):(
                <FormItem {...formItemLayout} label="备注">
                  {getFieldDecorator('remarks',{
                    initialValue:this.state.formData.remarks,
                  })(
                    <TextArea placeholder="请输入备注！"/>
                  )}
                </FormItem>
              )
            }


            <FormItem>
              <div className={'add-form-btns'}>
                <Button onClick={this.handleCancel}>取消</Button>
                <Button type="primary" htmlType="submit" loading={this.state.loading}>确定</Button>

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

