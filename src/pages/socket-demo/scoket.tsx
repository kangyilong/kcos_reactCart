import React, { useState, useEffect, useCallback } from 'react';
import io from 'socket.io-client';
import { withRouter } from 'react-router-dom';
import {Button, message} from 'antd';
import {getUserId, outLogin} from '../../comment/methods/util';
import {wantShopData} from '../../api/shopApi';
import './scoket.scss';

const socket = io();
const user_id = getUserId();
const chatTypeMsg = {
    'onlineUserList': '在线用户',
    'userLoginChat': '加入聊天室',
    'userSendMsg': '用户发送信息',
    'userOutChat': '退出聊天室'
};
const isOnline = {
    '0': '离线',
    '1': '在线'
};

let SOCKET_INDEX = 0, chatMsg = {chat_code: '', user_id: '', user_nick_name: ''};

interface Props {
    history: {
        push: Function
    }
}

function Scoket(props: Props) {
    const [chatCode, setChatCode] = useState(''); // 聊天表code
    const [chatUserList, setChatUserList] = useState([]); // 所有在线用户
    const [userChatMsgList, setUserChatMsgList] = useState([]); // 所有的聊天信息
    let userMsg = '';
    let isChat = true;
    let textareaRef: any = null;

    let getUserMsg = async () => {
        let u_statements = `SELECT user_hpic, user_nick_name, user_level FROM userMsg WHERE user_id = '${user_id}'`;
        await wantShopData({statements: u_statements}).then(data => {
            if(data.length === 0) {
                message.warning('非法登录', 1.5, () => {
                    outLogin();
                    props.history.push('/');
                });
                return;
            }
            let msg = data[0];
            socket.emit('welcome to me', { msg: msg.user_nick_name });
            if(isChat) {
                // 加入到聊天表
                msg.user_hpic = msg.user_hpic ? msg.user_hpic : '/static/images/all/user.jpg';
                msg.user_level = msg.user_level ? msg.user_level : '普通用户';
                msg.user_id = user_id;
                socket.emit('user msg', { userMsg: msg });
            }
            // 4、
            getUserList();
            // 5、
            getUserMsgList();
        });
    };

    let getUserList = async () => {
        let u_statements = `SELECT p.user_id, p.user_nick_name, pp.user_hpic, p.user_level FROM user_chat AS p LEFT JOIN userMsg AS pp on p.user_id = pp.user_id  WHERE p.is_online = '1'`;
        wantShopData({statements: u_statements}).then(data => {
            setChatUserList(data);
        });
    };

    let getUserMsgList = async () => {
        let l_statements = `SELECT p.user_id, p.user_nick_name, um.user_hpic, p.user_level, pp.chat_record, pp.chat_time FROM user_chat p LEFT JOIN userMsg AS um on p.user_id = um.user_id, user_record pp  WHERE p.user_id = pp.user_id`;
        await wantShopData({statements: l_statements}).then(data => {
            setUserChatMsgList(data);
            let scoketUl: any = document.getElementById('scoket-ul');
            scoketUl.scrollTop = scoketUl.scrollHeight;
        });
    };

    let changeChatUser = async () => {
        let i_statements = `UPDATE user_chat SET is_online = '1' WHERE chat_code = '${chatMsg.chat_code}' AND user_id = '${chatMsg.user_id}'`;
        await wantShopData({statements: i_statements});
    };

    /*
    * 1、该用户是否已经加入到了聊天表
    * 2、没加入则加入
    * 3、加入则将该用户设置为在线状态
    * 4、查询在线的所有用户
    * 5、查询所有用户的聊天信息
    * */
    let getChatMsg = async () => {
        if(!user_id) {
            message.loading('请先登录后进行聊天', 1.5, () => {
                props.history.push('/login');
            });
            return;
        }
        // 1、
        let c_statements = `SELECT chat_code, user_nick_name FROM user_chat WHERE user_id = '${user_id}'`;
        await wantShopData({statements: c_statements}).then(async (data) => {
            if(data.length > 0) {
                setChatCode(data[0].chat_code);
                isChat = false;
                // 3、
                chatMsg = {chat_code: data[0].chat_code, user_id, user_nick_name: data[0].user_nick_name};
                changeChatUser();
            }
            // 2、
            getUserMsg();
        });
    };

    let sendMessage = async () => {
        const chatMsg = textareaRef.value;
        const chat_time = new Date().getTime();
        socket.emit('send user msg', { chatMsg, user_id, chat_time });
    };

    useEffect(() => {
        getChatMsg();
    }, []);

    function socketOut() {
        socket.emit('me out socket', {user_id, user_nick_name: chatMsg.user_nick_name});
    }

    socket.on('welcome to you', (data: any) => {
        if(SOCKET_INDEX === 0) {
            userMsg = data.msg;
            message.success(`${data.msg}，欢迎来到kcos聊天室`, 1.5, () => {
                SOCKET_INDEX = 0;
                getUserList();
            });
        }
        SOCKET_INDEX ++;
    });

    socket.on('send success', (data: any) => {
        if(data.successCode === 'userLoginChat') {
            // 4、
            getUserList();
        }
        if(data.successCode === 'userSendMsg') {
            if(textareaRef) {
                textareaRef.value = '';
            }
            let scoketUl: any = document.getElementById('scoket-ul');
            scoketUl.scrollTop = scoketUl.scrollHeight;
            getUserMsgList();
        }
    });

    socket.on('out success', (data: any) => {
        if(SOCKET_INDEX === 0) {
            message.warning(data.user_nick_name + '退出聊天室', 1.5, () => {
                SOCKET_INDEX = 0;
                getUserList();
                if(chatMsg.user_id === data.user_id) {
                    props.history.push('/');
                }
            });
        }
        SOCKET_INDEX ++;
    });

    socket.on('send error', (data: any) => {
        message.error(data.errorMsg);
    });

    return (
        <div className="scoket-warp">
            <div className="scoket-user">
                <p style={{'marginBottom': '10px'}}>
                    <span>在线用户</span>
                    <span
                        style={{'color': '#BD2D30', 'float': 'right', 'fontSize': '13px', 'cursor': 'pointer'}}
                        onClick={
                            () => {
                                socketOut()
                            }
                        }
                    >退出聊天室 </span>
                </p>
                <ul>
                    {
                        chatUserList.map((item: any) => (
                            <li key={item.user_id}>
                                <span><img src={item.user_hpic} alt=""/></span>
                                <span>{item.user_nick_name}</span>
                                <span className="user-level">({item.user_level})</span>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className="scoket-container">
                <div className="scoket-context">
                    <ul id="scoket-ul">
                        {
                            userChatMsgList.map((item: any, index) => (
                                <li key={index}>
                                    <div className="send-time">
                                        <p>
                                            {
                                                index > 0 ? +item.chat_time - userChatMsgList[index - 1]['chat_time'] > 60000 ? new Date(+item.chat_time).toLocaleString() : '' : ''
                                            }
                                        </p>
                                    </div>
                                    <div className="chat-content" style={{'flexDirection': item.user_id === user_id ? 'row-reverse' : 'inherit'}}>
                                        <div className="msg-left">
                                            <span><img src={item.user_hpic} alt=""/></span>
                                        </div>
                                        <div className="msg-right">
                                            <span>{item.chat_record}</span>
                                        </div>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="scoket-send">
                    <div className="send-left">
                        <textarea
                            placeholder="说点啥呗"
                            ref={(val) => { textareaRef = val }}
                            onKeyDown={
                                (e: any) => {
                                    console.log(e.keyCode);
                                    if(e.keyCode === 13) {
                                        sendMessage();
                                    }
                                }
                            }
                        ></textarea>
                    </div>
                    <div className="send-right">
                        <Button onClick={sendMessage}>发送</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Scoket);