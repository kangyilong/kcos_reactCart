import React, {PureComponent} from 'react';
import OrderComponent from './OrderComponent';

export default class RemComponentOrder extends PureComponent {
    render() {
        return(
            <div className="will-payment">
                <OrderComponent status="已取消" isDelOrder="0" zf_status="0"/>
            </div>
        )
    }
}