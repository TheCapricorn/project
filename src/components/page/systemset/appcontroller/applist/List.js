import React, {Component} from 'react';
import {Form, Divider, Card, List, Icon, Avatar, Input, Modal, Button, Select} from 'antd'
import Bread from '@/components/common/bread'
import api from "@/ajax/api";
import {post} from "@/ajax/ajax";
import Addbtn from '../newapp/newappadd';

const FormItem = Form.Item;
const {Meta} = Card;
// const Search = Input.Search;
const Option = Select.Option;
const AppList = (props) => {
    const {listData,loading,searchSubmit,searchReset,goTo,listDisplay,changeListDisplay} = props;
    const {getFieldDecorator} = props.form;
    const v = listDisplay ? 'block': 'none';
    return (
        <div style={{display:v}}>
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
                    onSubmit={searchSubmit}
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
                                    onClick={searchReset}>重置</Button>
                        </div>
                    </FormItem>
                </Form>
            </div>

            <div className={'btn-group'}>
                <Button
                    onClick={() => {
                        //goTo(2);
                       /* changeListDisplay(false);*/
                        changeListDisplay(false);
                    }}>
                    新建
                </Button>
            </div>
            <Divider/>

            <div style={{padding: "6px"}}>
                <List
                    grid={{gutter: 16, column: 4}}
                    dataSource={listData}
                    loading={loading}
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
                                        <div style={{
                                            whiteSpace: "nowrap",
                                            textOverflow: "ellipsis",
                                            overflow: "hidden"
                                        }}>
                                            <span style={{paddingRight: "10%"}}>历史活跃</span>
                                            <span style={{whiteSpace: "nowrap"}}>今日活跃</span>
                                        </div>
                                        <div style={{
                                            whiteSpace: "nowrap",
                                            textOverflow: "ellipsis",
                                            overflow: "hidden"
                                        }}>
                                                <span style={{
                                                    paddingLeft: "20%",
                                                    fontWeight: 900,
                                                    fontSize: "1.3vw"
                                                }}>{item.lshy}</span>
                                            <span style={{
                                                paddingLeft: "25%",
                                                fontWeight: 900,
                                                fontSize: "1.3vw"
                                            }}>{item.jrhy}</span>
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
const FormList = Form.create()(AppList);
export default FormList