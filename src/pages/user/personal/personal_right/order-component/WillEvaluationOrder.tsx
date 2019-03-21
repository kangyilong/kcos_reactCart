import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Button, message, Modal } from 'antd';
import OrderComponent from './OrderComponent.js';

class WillEvaluationOrder extends Component {
    constructor(props: object) {
        super(props);
    }

    state = {
        current: 1,
        pageSize: 3
    };

    render() {
        return (
            <div className="will-payment">
                <OrderComponent status="待评价" isDelOrder="0" zf_status="0"/>
            </div>
        )
    }
}

export default withRouter<any>(WillEvaluationOrder);