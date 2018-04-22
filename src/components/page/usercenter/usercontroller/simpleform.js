import React, {Component} from 'react'
import {Button, Form,/* Select, */Input, Icon} from 'antd'

const FormItem = Form.Item;

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <Form
        layout='inline'
        onSubmit={this.props.searchSubmit}>
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
