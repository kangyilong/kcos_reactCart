import React, { Component } from 'react';
import CompontHead from '../homeComHead/compontHead';
import OtSingle from './otTypeSingle';

import './ot_type.scss';

export default class HomeOtType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otData: [
        {
          ot_img: '/static/images/all/1495609372.jpg',
          tit: 'One',
          txt: '一个就够了'
        },
        {
          ot_img: '/static/images/all/1495794368.png',
          tit: 'One',
          txt: '一个就够了'
        },
        {
          ot_img: '/static/images/all/1495609812.jpg',
          tit: 'One',
          txt: '一个就够了'
        },
        {
          ot_img: '/static/images/all/1495701022.png',
          tit: 'One',
          txt: '一个就够了'
        }
      ]
    }
  }
  render() {
    return (
      <div className="home_ottype">
        <div className="content">
          <div className="ot-list">
            <CompontHead type="ottype" data={ {tit: '应用', txt: 'Apps'} }/>
            <ul className="ot-ul">
              {
                this.state.otData.map((item, index) =>
                  <OtSingle data={ item } key={ index }/>
                )
              }
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
