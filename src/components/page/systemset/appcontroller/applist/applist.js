import React, {Component} from 'react';
import {Form, Divider, Card, List, Icon, Avatar, Input, Modal, Button, Select} from 'antd'
import Bread from '@/components/common/bread'
import api from "@/ajax/api";
import {post} from "@/ajax/ajax";
import Addbtn from '../newapp/newappadd'


const FormItem = Form.Item;
const {Meta} = Card;
// const Search = Input.Search;
const Option = Select.Option;


class ButtonList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: [],
      selectedRows: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.loadList();
  }

  componentWillReceiveProps(nextProps) {
    // console.log('调用了');
  }

  delData = (arr) => {
    Modal.confirm({
      title: '重要提醒',
      content: (
        <p>
          <span style={{color: '#ff0000'}}>该应用删除后不可恢复</span>，你还要继续吗？
        </p>
      ),
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        post({
          url: api.appcontroller.delete,
          data: {uapps: arr}
        }).then(res => {
          // console.log(res);
          if (res.code === 200) {
            this.loadTable();
          }
        });
      }
    });
  };
  delAllData = () => {
    console.log(this.state.selectedRows);
    this.delData(this.state.selectedRows);
  };
  loadList = () => {
    this.setState({
      loading: true
    }, () => {
      post({
        url: api.appcontroller.list,
      }).then(res => {
        // console.log(res);
        if (res.code === 200) {
          this.setState({
            listData: res.data.list,
            loading: false
          })
        }
      }).catch(() => {
        this.setState({
          loading: false
        })
      });
    });

  };


  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <div className={'main-box'}>
        <div className='bread-group'>
          <Bread bread={['应用管理', '应用列表']}/>
        </div>
        <Divider/>

        <div style={{marginBottom: "16px"}}>
          <span style={{fontWeight: "900", fontSize: "24px", marginRight: "20px"}}>应用列表</span>
          <span>应用管理负责应用的创建，修改</span><br/>
        </div>

        <div className={'search-group'}>
          <Form
            layout='inline'
            onSubmit={this.searchSubmit}
          >
            <FormItem
              label="应用名称"
            >
              {getFieldDecorator('uappName')(
                <Input placeholder="请输入"/>
              )}
            </FormItem>
            <FormItem
              label="应用编码"
            >
              {getFieldDecorator('uappCode')(
                <Input placeholder="请输入"/>
              )}
            </FormItem>
            <FormItem
              label="状态"
            >
              {getFieldDecorator('state', {
                initialValue: ''
              })(
                <Select
                  style={{width: 174}}
                  // onChange={this.searchSubmit}
                >
                  <Option value="">请选择</Option>
                  <Option value="0">启用</Option>
                  <Option value="1">删除</Option>
                  <Option value="2">禁用</Option>
                </Select>
              )}
            </FormItem>
            <FormItem>
              <div className={'search-btns'}>
                <Button type="primary" htmlType="submit" className="login-form-button">查询</Button>
                <Button type="default" htmlType="reset" className="login-form-button"
                        onClick={this.searchReset}>重置</Button>
              </div>
            </FormItem>
          </Form>
        </div>

        <div className={'btn-group'}>
          <Addbtn callback={this.loadTable}/>
        </div>
        <Divider/>

        <div style={{padding: "6px"}}>
          <List
            grid={{gutter: 16, column: 4}}
            dataSource={this.state.listData}
            loading={this.state.loading}
            renderItem={item => {
              return (
                <List.Item>
                  <Card
                    title={item.title}
                    style={{width: "75%"}}
                    cover={<img alt="" src={item.uappImg}/>}
                    actions={[<Icon type="eye-o"/>, <Icon type="edit"/>,
                      <Icon type="delete" onClick={this.delAllData}/>, <Icon type="arrows-alt"/>]}
                  >
                    <div>
                      <Meta
                        avatar={<Avatar src={item.uappIcon}/>}
                        title={item.uappName}
                        // description="历史活跃"
                      />
                      <div style={{whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden"}}>
                        <span style={{paddingRight: "10%"}}>历史活跃</span>
                        <span style={{whiteSpace: "nowrap"}}>今日活跃</span>
                      </div>
                      <div style={{whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden"}}>
                        <span style={{paddingLeft: "20%", fontWeight: 900, fontSize: "1.3vw"}}>{item.lshy}</span>
                        <span style={{paddingLeft: "25%", fontWeight: 900, fontSize: "1.3vw"}}>{item.jrhy}</span>
                      </div>
                    </div>
                  </Card>
                </List.Item>
              )
            }
            }
          />


        </div>


      </div>
    )
  }
}

ButtonList = Form.create()(ButtonList);
export default ButtonList
