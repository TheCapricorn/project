import React, {Component} from 'react';
import {Button, Form, Input, Modal,message} from 'antd'
import {post} from '@/ajax/ajax'
import api from '@/ajax/api'


const FormItem = Form.Item;
// const RadioGroup = Radio.Group;
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
        url=api.buttoncontroller.add;
        // values.umid=this.state.formData.umid;
        let Arrdata=[];
        let Arrd=this.state.formData;
        Arrdata.push(Arrd);
        //数据
       //console.log(values);
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

  handleCancel = () =>{
    this.setState({
      visible:false
    });
  };

  handleOk=()=> {
    this.setState({
      visible: false
    },()=>{
      this.handleClear();
    });
  };
  render(){
    const {getFieldDecorator} = this.props.form;
    const formItemLayout = {
      labelCol:{span : 6},
      wrapperCol:{span: 14}
    };

    // 上传判断
    // const props={
    //   action: '/api',
    //   onChange({ file, fileList }) {
    //     if (file.status !== 'uploading') {
    //       console.log(file, fileList);
    //     }
    //   },
    //   defaultFileList: [],
    // };



    return(
      <div className={'btn-modal'}>
        <Button icon='plus' className={'addButton'} onClick={this.handleAdd}>添加</Button>
        <Modal
          title={'添加按钮'}
          footer={null}
          style={{top:'10%'}}
          visible={this.state.visible}
          onCancel={this.handleOk}
        >
          <Form onSubmit={this.handleSubmit}>

            <FormItem {...formItemLayout} label = "按钮名">
              {getFieldDecorator('blName', {
                initialValue:this.state.formData.blName,
                rules:[{
                  required:true,message:'请输入按钮名！'
                }]
              })(
                <Input placeholder="请输入"/>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="按钮编号">
              {getFieldDecorator('ids',{
                initialValue:this.state.formData.ids,
                rules:[{
                  required:true,message:'请输入按钮编号！'
                }]
              })(
                <Input placeholder="请输入"/>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="功能编号">
              {getFieldDecorator('umid',{
                initialValue:this.state.formData.umid,
                rules:[{
                  required:true,message:'请输入功能编号！'
                }]
              })(
                <Input placeholder="请输入"/>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="按钮类型">
              {getFieldDecorator('blCode',{
                initialValue:this.state.formData.blCode,
                rules:[{
                  required:true,message:'请输入按钮类型！'
                }]
              })(
                <Input placeholder="请输入"/>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="按钮方法">
              {getFieldDecorator('blMethod',{
                initialValue:this.state.formData.blMethod,
                rules:[{
                  required:true,message:'请输入按钮方法！'
                }]
              })(
                <Input placeholder="请输入"/>
              )}
            </FormItem>
            {/*<FormItem {...formItemLayout} label="按钮图标">*/}
              {/*{getFieldDecorator('blIcon',{*/}
                {/*initialValue:this.state.formData.blIcon,*/}
                {/*rules:[{*/}
                  {/*required:true,message:'请上传图标！'*/}
                {/*}]*/}
              {/*})(*/}
                {/*<Upload {...props}>*/}
                  {/*<Button>*/}
                    {/*<Icon type="update" placeholder="上传文件" />*/}
                  {/*</Button>*/}
                {/*</Upload>*/}
              {/*)}*/}
            {/*</FormItem>*/}
            <FormItem {...formItemLayout} label="备注">
              {getFieldDecorator('remarks',{
                initialValue:this.state.formData.remarks,
              })(
                <TextArea placeholder="请输入备注！"/>
              )}
            </FormItem>
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
