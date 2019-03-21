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
      this.setState({
        selectedIndex: this.state.selectedIndex
      });
    });
  };
  
  showComponentRight = () => {
    switch(this.state.selectedIndex) {
      case '1':
        return (
          <Owner />
        );
      case '2':
        return (
          <Order />
        );
      case '3':
        return (
          <Collection />
        );
      case '4':
        return (
          <AddRess />
        );
      case '5':
        return (
          <Consumption />
        );
    }
  };
  
  componentWillMount() {
    this.showComponentRight();
  }

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
              {
                this.showComponentRight()
              }
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default withRouter(PersonalIndex);