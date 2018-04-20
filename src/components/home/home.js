import React, {Component} from 'react';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.props.history.push('/app/appcontroller/applist/applist')
  }

  render() {
    return (
      <div>我是首页</div>
    )
  }
}
