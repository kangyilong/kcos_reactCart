import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Footer from '../../../comment/footer';
import PersonalHeader from './personal_header';
import PersonalLeft  from './personal_left';
import AddRess from './personal_right/addRess.tsx';
import Collection from './personal_right/collection';
import Consumption from './personal_right/consumption';
import Order from './personal_right/order';
import Owner from './personal_right/owner';
import { getQueryString } from "../../../comment/methods/util";

import './style/index.scss';

class PersonalIndex extends Component {

  constructor(props) {
    super(props);
    let toIndex = getQueryString('index');
    this.state = {
      isAddRess: toIndex !== '4',
      isCollection: toIndex !== '3',
      isConsumption: toIndex !== '5',
      isOrder: toIndex !== '2',
      isOwner: toIndex !== '1',
      selectedIndex: toIndex || '1'
    };
  }

  targetLeft = () => {
    this.setState({
      isAddRess: true,
      isCollection: true,
      isConsumption: true,
      isOrder: true,
      isOwner: true,
      selectedIndex: getQueryString('index')
    }, () => {
      switch(this.state.selectedIndex) {
        case '1':
          this.setState({
            isOwner: false
          });
          break;
        case '2':
          this.setState({
            isOrder: false
          });
          break;
        case '3':
          this.setState({
            isCollection: false
          });
          break;
        case '4':
          this.setState({
            isAddRess: false
          });
          break;
        case '5':
          this.setState({
            isConsumption: false
          });
          break;
      }
      this.setState({
        selectedIndex: this.state.selectedIndex
      });
    });
  };

  render() {
    return (
      <div>
        <PersonalHeader />
        <div className="personal-index">
          <div className="container">
            <div className="index-left">
              <PersonalLeft targetLeft={this.targetLeft} selectedIndex={this.state.selectedIndex}/>
            </div>
            <div className="index-right">
              <AddRess isShow={this.state.isAddRess}/>
              <Collection isShow={this.state.isCollection}/>
              <Consumption isShow={this.state.isConsumption}/>
              <Order isShow={this.state.isOrder}/>
              <Owner isShow={this.state.isOwner}/>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default withRouter(PersonalIndex);