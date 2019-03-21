import React, { useState, useEffect, useCallback } from 'react';
import {Icon, message} from 'antd';
import {wantShopData} from '../../../../../api/shopApi';
import {getUserId} from '../../../../../comment/methods/util';

interface Props {
    history: {
        push: any
    }
}

export default function CollectionComponent(props: Props) {

    const [collectionData, setCollectionData] = useState([]);
    const user_id = getUserId();
    const statements = `SELECT p.code, p.product_id, pp.shop_pic, pp.shop_pri, pp.shop_name FROM userCollection p, shopMsg pp WHERE user_id = '${user_id}' AND p.shop_id = pp.shop_id`;

    let userCollection = useCallback(() => {
        wantShopData({statements}).then(data => {
            setCollectionData(data);
        });
    }, []);

    let delCollection = useCallback((code) => {
        // delete from 表名 where id = ?
        const hasMsg = message.loading('');
        const d_statements = `DELETE FROM userCollection WHERE code = '${code}'`;
        wantShopData({statements: d_statements}).then(() => {
            hasMsg();
            userCollection();
        }, hasMsg);
    }, []);

    useEffect(() => {
        userCollection();
    }, []);

    return(
        <>
            <ul className="coll-ul">
                {
                    collectionData.length > 0 ? collectionData.map(item => (
                        <li key={item['code']}>
                            <div className="coll-show">
                                <div className="img-box">
                                    <img src={item['shop_pic']} alt=""/>
                                </div>
                                <h5>{item['shop_name']}</h5>
                                <p>{item['shop_pri']}元</p>
                            </div>
                            <div className="coll-hide">
                                <p>
                                    <span onClick={() => {props.history.push(`/shopDet?productId=${item['product_id']}`)}}>
                                        <Icon type="shopping-cart" />
                                    </span>
                                    <span onClick={() => {delCollection(item['code'])}}>
                                        <Icon type="delete" />
                                    </span>
                                </p>
                            </div>
                        </li>
                    )) : null
                }
            </ul>
        </>
    )
}