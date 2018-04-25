import React, {Component} from 'react';
import { Modal, Button, Form, Input, message, Icon, Col, Row} from 'antd';
import {post} from "@/ajax/ajax";
import api from "@/ajax/api";

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

  }

  componentDidMount() {
    // 在开始时禁用submit按钮.
    this.props.form.validateFields();
  }


  remove = (k,arr) => {
    const { form } = this.props;
    // 可以使用数据获取
    const keys = form.getFieldValue('keys');
    // 至少需要几个input框
    if (keys.length === 0) {
      return;
    }

    // 可以使用数据库建立

    Modal.confirm({
      title: '重要提醒',
      content: (
        <p>
          <span style={{color: '#ff0000'}}>该按钮删除后不可恢复</span>，你还要继续吗？
        </p>
      ),
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        post({
          url:api.buttoncontroller.delete,
          data:{uuaButtons:arr}
        }).then(res => {
           console.log(res);
          if (res.code === 200) {
            this.loadTable();
            // 删除input框
            form.setFieldsValue({
              keys: keys.filter(key => key !== k),
            });

          }
        });
      }
    });
  }



  add = () => {
    const { form } = this.props;
    // 可以使用数据获取
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(uuid);
    uuid++;
    // 可以使用数据库建立
    // 检测更改
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
                  // this.props.form.resetFields();
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
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

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
    this.setState({
      visible: false,
    });
  }


  render() {

      const { getFieldDecorator, getFieldValue } = this.props.form;
      const formItemLayout = {
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
      const formItems = keys.map((k,i) => {
        return (
          <div key={i}>
            <Row>
              <Col span="5">
                <FormItem {...formItemLayout} className = '.btnName'>
                  {getFieldDecorator(`blName-${k}`, {
                    initialValue: this.state.formData.blName,
                    rules:[{
                      required:true,message:'请输入按钮名！'
                    }]
                  })(
                    <Input placeholder="按钮名" />
                  )}
                </FormItem>
              </Col>
              <Col span="1">
                <span>一</span>
              </Col>
              <Col span="8">
                <FormItem {...formItemLayout} className = 'btnMethods'>
                  {getFieldDecorator(`blMethod-${k}`, {
                    initialValue: this.state.formData.blMethod,
                    rules:[{
                      required:true,message:'请输入按钮方法！'
                    }]
                  })(
                    <Input placeholder="按钮方法" />
                  )}
                </FormItem>
              </Col>

              <Col span="2">
                <div className="delBtn">
                  <Button type="ghost" shape="circle" icon="minus"
                          onClick={() => this.remove(k)}/>
                </div>
              </Col>


           </Row>
          </div>


        );
      });

    const { visible, confirmLoading } = this.state;

    return (
      <div className={'btn-modal'}>

        <Button icon='plus' onClick={this.showModal}/>

        <Modal title="选择按钮"
               width="30%"
               visible={visible}
               onOk={this.handleSubmit}
               confirmLoading={confirmLoading}
               onCancel={this.handleCancel}
        >
          <Form onSubmit={this.handleSubmit}>
            {formItems}
            <FormItem {...formItemLayoutWithOutLabel}>
              <Button type="solid" onClick={this.add} style={{ width: '100px' }}>
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
