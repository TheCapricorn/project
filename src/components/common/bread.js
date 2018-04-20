import React, {Component} from 'react'
// import {Link} from 'react-router-dom'
import {Breadcrumb,} from 'antd'

export default class Bread extends Component {
  constructor(props) {
    super(props);
    this.routes = [];
    this.props.bread.map(item => {
      return this.routes.push({breadcrumbName: item})
    });
    this.itemRender = (route, params, routes, paths) => {
      // console.log(routes);
      // const last = routes.indexOf(route) === routes.length - 1;/*last ? <Link to={'/' + paths.join('/')}>{route.breadcrumbName}</Link> :*/
      return <span>{route.breadcrumbName}</span>;
    };
  }

  render() {
    return (
      <Breadcrumb
        itemRender={this.itemRender}
        routes={this.routes}/>
    )

  }
}
