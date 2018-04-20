import React, {Component} from 'react'
import {Button, Form, Select, Input, Icon,} from 'antd'

const FormItem = Form.Item;
const Option = Select.Option;

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    const formItemLayout = {
      /*labelCol: {span: 4},
      wrapperCol: {span: 20}*/
    };
    return (
      <Form
        className='fullform'
        onSubmit={this.props.searchSubmit}
        layout="inline">
        <div className='cf'>
          <FormItem
            label="姓名">
            {getFieldDecorator('uname')(
              <Input placeholder="请输入"/>
            )}
          </FormItem>
          <FormItem
            label="手机号码">
            {getFieldDecorator('mobile')(
              <Input placeholder="请输入"/>
            )}
          </FormItem>
          <FormItem
            label="身份证">
            {getFieldDecorator('idNumber')(
              <Input placeholder="请输入"/>
            )}
          </FormItem>
          <FormItem
            label="组织机构">
            {getFieldDecorator('uoid')(
              <Input placeholder="请输入"/>
            )}
          </FormItem>
          <FormItem
            label="邮箱">
            {getFieldDecorator('email')(
              <Input placeholder="请输入"/>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="状态">
            {getFieldDecorator('state')(
              <Select
                placeholder='请选择'>
                <Option value="">请选择</Option>
                <Option value="0">启用</Option>
                <Option value="1">删除</Option>
                <Option value="2">停用</Option>
              </Select>
            )}
          </FormItem>
        </div>

        <div className='cf' style={{paddingTop: '10px'}}>
          <div className={'search-btns fr'}>
            <Button type="primary" htmlType="submit" className="login-form-button">查询</Button>
            <Button type="default" htmlType="reset" className="login-form-button"
                    onClick={this.props.searchReset}>重置</Button>
            <a className='expand-btn' onClick={this.props.changeExpand}>
              收起<Icon type="up"/>
            </a>
          </div>
        </div>
      </Form>
    )
  }

}

SearchForm = Form.create()(SearchForm);
export default SearchForm;
