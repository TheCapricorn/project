import React, {Component} from 'react'
import {Button, Form, Select, Input, Icon} from 'antd'

const FormItem = Form.Item;
const Option = Select.Option;

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  /*searchSelect=()=>{
    this.props.searchSubmit()
  };*/
  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <Form
        layout='inline'
        onSubmit={this.props.searchSubmit}>
        <FormItem
          label="角色名">
          {getFieldDecorator('urName')(
            <Input placeholder="请输入"/>
          )}
        </FormItem>
        <FormItem
          label="状态">
          {getFieldDecorator('state')(
            <Select
              style={{width: 174}}
              placeholder='请选择'>
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
                    onClick={this.props.searchReset}>重置</Button>
            <a className='expand-btn' onClick={this.props.changeExpand}>
              展开<Icon type="down"/>
            </a>
          </div>
        </FormItem>
      </Form>
    )
  }

}

SearchForm = Form.create()(SearchForm);
export default SearchForm;
