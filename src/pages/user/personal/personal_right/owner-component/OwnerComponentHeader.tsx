import React, { useState, useEffect, useCallback } from 'react';
import {getUserId} from '../../../../../comment/methods/util';
import {wantShopData} from '../../../../../api/shopApi';

export default function OwnerComponentHeader() {
    const [userImage, setUserImage] = useState('');
    const [userNickName, setUserNickName] = useState('');
    const [userLevel, setUserLevel] = useState('');
    const user_id = getUserId();
    let getUserMsgData = useCallback(() => {
        let statements = `SELECT user_hpic, user_nick_name, user_level FROM userMsg WHERE user_id = '${user_id}'`;
        wantShopData({statements}).then(data => {
            let userImage = data[0].user_hpic ? data[0].user_hpic : '/static/images/all/user.jpg';
            let userNickName = data[0].user_nick_name;
            let userLevel = data[0].user_level ? data[0].user_level : '普通用户';
            setUserImage(userImage);
            setUserNickName(userNickName);
            setUserLevel(userLevel);
        });
    }, []);

    let changeIupImage = (e: any) => {
        let targetFile = e.currentTarget.files[0];
        const fileReader = new FileReader();
        fileReader.readAsDataURL(targetFile);
        fileReader.onload = function(ev: any){
            let result = ev.target.result;
            let statements = `UPDATE userMsg SET user_hpic = '${result}' WHERE user_id = '${user_id}'`;
            setUserImage(result);
            wantShopData({statements});
        };
    };

    useEffect(() => {
        getUserMsgData();
    }, []);

    return (
        <>
            <div className="owner-head">
                <div className="img-box">
                    <div className="show-img">
                        <img src={userImage} alt=""/>
                    </div>
                    <div className="hide-iup">
                        <input type="file" accept="image/*" onChange={(e) => {changeIupImage(e)}}/>
                    </div>
                </div>
                <div className="u-name">
                    <p className="fz_18">{userNickName}</p>
                </div>
                <div className="fz_16">
                    <p>{userLevel}</p>
                </div>
            </div>
        </>
    )
}