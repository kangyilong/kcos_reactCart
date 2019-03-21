import React, {Component} from 'react';
import { withRouter } from "react-router-dom";
import CollectionComponent from './coll-component/CollectionComponent';

export interface Props {
    isShow?: boolean,
    history: {
        push: Function
    }
}

class Collection extends Component <Props, any> {

    state = {
        collectionData: []
    };

    componentWillMount() {

    }

  render() {
    const { isShow } = this.props;
    return (
      <div className={`${isShow ? 'none' : ''} collection-warp`}>
        <div>
          <div className="coll-head">
            <p><span>已收藏</span></p>
          </div>
          <div className="coll-con">
              <CollectionComponent history={this.props.history}/>
          </div>
        </div>
      </div>
    )
  }
}
export default withRouter<any>(Collection);