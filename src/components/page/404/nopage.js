import React, {Component} from 'react'
import './nopage.less'
import img from '../../../style/images/404.png'

export default class NotFound extends Component {
  render() {
    return (
      <div className="center" style={{height: '100%', background: '#ececec', overflow: 'hidden'}}>
        <img src={img} alt="404"/>
      </div>
    )
  }
}
