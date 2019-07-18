import React, {PureComponent} from 'react';
import { message } from 'antd';
import { isLogin } from '../../comment/methods/util';

interface Props {
    history?: any
}

export default function LoginHOC(Wc: any) {
    return class extends PureComponent<Props, any> {
        state: any = {
            ...this.state,
            isVisLogin: false
        };
        async componentDidMount() {
            if(!!(await isLogin()).length) {
                this.setState({
                    isVisLogin: true
                })
            }else {
                message.warning('还未登录哦，请登录', 1.5, () => {
                    this.props.history.push('/login');
                });
            }
        }
        render() {
            if(this.state.isVisLogin) {
                return <Wc {...this.props} />
            }
            return null;
        }
    }
}