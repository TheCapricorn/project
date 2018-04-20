import React, {Component} from 'react';
import {Button, /*Radio, Input,*/ Modal, /*message ,*/Select, Form} from 'antd'
import {post} from '@/ajax/ajax'
import api from '@/ajax/api'

const FormItem = Form.Item;
const Option = Select.Option;
const ButtonGroup = Button.Group;

class LinkRole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      defaultValue: [],
      children: [],
      uumUserRoles: [],
      uumUsers: this.props.data
    };
  }

  componentDidMount() {
    post({
      url: api.role.listRole,
    }).then(res => {
      // console.log(res);
      if (res.code === 200 && res.data.length) {
        let children = [];
        res.data.map((item, i) => {
          return children.push(<Option key={item.urName} urid={item.urid}>{item.urName}</Option>);
        });
        this.setState({
          children
        });
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      uumUsers: nextProps.data
    })
  }

  showModal = () => {
    this.setState({
      visible: true
    });
  };
  handleCancel = () => {
    this.setState({
      visible: false
    })
  };
  linkRoleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, val) => {
      if (!err) {
        this.setState({
          loading: true
        }, () => {
          post({
            url: api.user.setrole,
            data: {
              uumUserRoles: this.state.uumUserRoles,
              uumUsers: this.state.uumUsers
            }
          }).then(res => {
            // console.log(res);
            if (res.code === 200) {
              this.setState({
                visible: false
              },()=>{
                this.props.form.resetFields();
                this.props.callback();
                this.setState({
                  loading: false
                });
              })
            }
          }).catch(() => {
            this.setState({
              loading: false
            });
          });

        })
      }
    });
  };
  selectChange = (val, opt) => {
    // console.log(opt);
    let uumUserRoles = [];
    opt.map(item => {
      return uumUserRoles.push(item.props)
    });
    this.setState({
      uumUserRoles
    })
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    const formItemLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 14}
    };
    return (
      <div className={'btn-modal'}>
        <ButtonGroup>
          <Button onClick={this.showModal}>关联角色</Button>
          <Button onClick={this.props.delAllData}>批量删除</Button>
        </ButtonGroup>
        <Modal
          title={(<div>关联角色<span className='small-title'>直接输入角色代码或者角色名进行搜索</span></div>)}
          footer={null}
          style={{top: '10%'}}
          visible={this.state.visible}
          onCancel={this.handleCancel}
        >
          <Form onSubmit={this.linkRoleSubmit}>
            <FormItem {...formItemLayout} label="已选角色">
              {getFieldDecorator('uumUserRoles', {
                rules: [{required: true, message: '必选项！'},],
                initialValue: this.state.defaultValue
              })(
                <Select
                  mode="multiple"
                  placeholder="请选择"
                  // filterOption={this.filterOption}
                  labelInValue={true}
                  onChange={this.selectChange}
                  style={{width: '100%'}}
                >
                  {this.state.children}
                </Select>
              )}
            </FormItem>
            <div className={'add-form-btns'} style={{marginTop: '50px'}}>
              <Button type="primary" htmlType='submit' loading={this.state.loading}>确定</Button>
              <Button onClick={this.handleCancel}>取消</Button>
            </div>
          </Form>
        </Modal>
      </div>
    )
  }
}

LinkRole = Form.create()(LinkRole);
export default LinkRole;
