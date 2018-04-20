import React, {Component} from 'react';
import { Modal, Button, Form, Input, message} from 'antd';
import {post} from "@/ajax/ajax";
import api from "@/ajax/api";
import './menustyle.less'

const FormItem = Form.Item;
// const Option = Select.Option;
// const data =[];

class LinkMenu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible:false,
      loading:false,
      tableData: [],
      // dataSource:[],
      selectedRows: [],
      btnType:this.props.type==='modify',
      formData:this.props.type==='modify'?this.props.data:{}
    };
    this.columns = [{
      title:'按钮名',
      dataIndex: 'blName',
      key:'blName',
    }, {
      title:'按钮方法',
      dataIndex: 'blName',
      key:'blName',
    }];
  }

  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }


  handleSub=(e)=>{
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
           console.log(res);
          if (res.code === 200) {
            this.loadTable();
          }
        });
      }
    });
  };


  state = {
    // ModalText: 'Content of the modal',
    visible: false,
    confirmLoading: false,
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
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
  }
  handleCancel = () => {
    // console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  handleAdd = () =>{
      // const { visible, confirmLoading } = this.state;
      // const rowSelection = {
      //   onChange: (selectedRowKeys, selectedRows) => {
      //     // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      //   },
      //   onSelect: (record, selected, selectedRows) => {
      //     // console.log(record, selected, selectedRows);
      //     this.setState({
      //       selectedRows
      //     })
      //   },
      //   onSelectAll: (selected, selectedRows) => {
      //     // console.log(selected, selectedRows);
      //     this.setState({
      //       selectedRows
      //     })
      //   },
      // };
      const formItemLayout = {
        labelCol:{span : 6},
        wrapperCol:{span:14}
      }
      const { getFieldDecorator} = this.props.form;
      return(
        Modal.innerHTML(
          <Form>
            <FormItem {...formItemLayout} className={'btnName'}>
              {
                getFieldDecorator('blName', {
                  initialValue:this.state.formData.blName,
                  rules:[{
                    required:true,message:'请输入按钮名！'
                  }]
                })(

                  <Input type="text" placeholder="按钮名"/>

                )
              }

            </FormItem>
            {/*<span className={'Sty'}>----</span>*/}
            <FormItem {...formItemLayout} className={'btnMethods'}>
              {
                getFieldDecorator('blMethod', {
                  initialValue:this.state.formData.blMethod,
                  rules:[{
                    required:true,message:'请输入按钮方法！'
                  }]
                })(
                  <Input type="text" placeholder="按钮方法"/>

                )
              }
            </FormItem>
            <FormItem className={'delBtn'} >
              <Button onClick={this.delData} shape="circle" icon="search" icon="minus-circle-o"/>

            </FormItem>
          </Form>
        )

      );


  }

  render() {
    const { visible, confirmLoading } = this.state;


    // const rowSelection = {
    //   onChange: (selectedRowKeys, selectedRows) => {
    //     // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    //   },
    //   onSelect: (record, selected, selectedRows) => {
    //     // console.log(record, selected, selectedRows);
    //     this.setState({
    //       selectedRows
    //     })
    //   },
    //   onSelectAll: (selected, selectedRows, changeRows) => {
    //     // console.log(selected, selectedRows, changeRows);
    //     this.setState({
    //       selectedRows
    //     })
    //   },
    // };
    const formItemLayout = {
      labelCol:{span : 6},
      wrapperCol:{span:14}
    }
    const { getFieldDecorator } = this.props.form;

    return (
      <div className={'btn-modal'}>

        <Button icon='plus' onClick={this.showModal}/>

        <Modal title="选择按钮"
               width="45%"
               visible={visible}
               onOk={this.handleSub}
               confirmLoading={confirmLoading}
               onCancel={this.handleCancel}
        >
          <Form>
            <FormItem {...formItemLayout} className={'btnName'}>
              {
                getFieldDecorator('blName', {
                  initialValue:this.state.formData.blName,
                  rules:[{
                    required:true,message:'请输入按钮名！'
                  }]
                })(

                  <Input type="text" placeholder="按钮名"/>

                )
              }

            </FormItem>
            {/*<span className={'Sty'}>----</span>*/}
            <FormItem {...formItemLayout} className={'btnMethods'}>
              {
                getFieldDecorator('blMethod', {
                  initialValue:this.state.formData.blMethod,
                  rules:[{
                    required:true,message:'请输入按钮方法！'
                  }]
                })(
                    <Input type="text" placeholder="按钮方法"/>

                )
              }
            </FormItem>
            <FormItem className={'delBtn'} >
              <Button onClick={this.delData} shape="circle" icon="search" icon="minus-circle-o"/>

            </FormItem>
          </Form>
         {/*<List*/}
           {/*itemLayout="horizontal"*/}
           {/*rowKey='ids'*/}
           {/*// rowSelection={rowSelection}*/}
           {/*// dataSourse={this.state.tableData}*/}
           {/*// pagination={this.state.tablePage}*/}
           {/*renderItem={item=>(*/}
               {/*<div>*/}
               {/*<FormItem {...formItemLayout} className={'btnName'}>*/}
                 {/*{*/}
                   {/*getFieldDecorator('blName', {*/}
                     {/*initialValue:item.blName,*/}
                     {/*rules:[{*/}
                       {/*required:true,message:'请输入按钮名！'*/}
                     {/*}]*/}
                   {/*})(*/}

                     {/*<Input type="text" placeholder="按钮名"/>*/}

                   {/*)*/}
                 {/*}*/}

               {/*</FormItem>*/}
               {/*/!*<span className={'Sty'}>----</span>*!/*/}
               {/*<FormItem {...formItemLayout} className={'btnMethods'}>*/}
                 {/*{*/}
                   {/*getFieldDecorator('blMethod', {*/}
                     {/*initialValue:item.blMethod,*/}
                     {/*rules:[{*/}
                       {/*required:true,message:'请输入按钮方法！'*/}
                     {/*}]*/}
                   {/*})(*/}
                    {/*<div>*/}
                      {/*<Input type="text" placeholder="按钮方法"/>*/}
                      {/*<Button*/}
                        {/*onClick={this.delData.bind(this, record)}*/}
                        {/*disabled={parseInt(record.state, 10) ===1}*/}
                        {/*shape="circle"*/}
                        {/*icon="minus-circle-o"/>*/}
                    {/*</div>*/}


                   {/*)*/}
                 {/*}*/}

               {/*</FormItem>*/}


             {/*</div>*/}

         {/*)}*/}

         {/*/>*/}
          <FormItem>
            <Button
              onClick={this.handleAdd}
              icon='plus'
              callback={this.loadTable}

            >
              添加
            </Button>
          </FormItem>


        </Modal>




      </div>
    );
  }
}
LinkMenu = Form.create()(LinkMenu); //解决了getFieldDecorator无法定义;
export default  LinkMenu;