import React, {Component} from 'react'
import {Button, Form, Select, Input, Icon, DatePicker} from 'antd'

const FormItem = Form.Item;
const Option = Select.Option;
const {RangePicker} = DatePicker;

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
          <FormItem {...formItemLayout} label="角色编号">
            {getFieldDecorator('urid')(<Input placeholder="请输入"/>)}
          </FormItem>

          <FormItem {...formItemLayout} label="角色名">
            {getFieldDecorator('urName')(<Input placeholder="请输入"/>)}
          </FormItem>

          <FormItem {...formItemLayout} label="角色代码">
            {getFieldDecorator('urCode')(<Input placeholder="请输入"/>)}
          </FormItem>

          <FormItem {...formItemLayout} label="状态">
            {getFieldDecorator('state')(
              <Select
                // style={{width:174}}
                placeholder='请选择'>
                <Option value="">请选择</Option>
                <Option value="0">启用</Option>
                <Option value="1">删除</Option>
                <Option value="2">禁用</Option>
              </Select>
            )}
          </FormItem>

          <FormItem {...formItemLayout} label="更新人">
            {getFieldDecorator('updateUid')(<Input placeholder="请输入"/>)}
          </FormItem>

          <FormItem {...formItemLayout} label="更新时间">
            {getFieldDecorator('updatedate')(
              <RangePicker
                style={{width: '100%'}}
                showTime={{format: 'HH:mm:ss'}}
                format="YYYY-MM-DD HH:mm:ss"
                placeholder={['开始时间', '结束时间']}
              />
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
