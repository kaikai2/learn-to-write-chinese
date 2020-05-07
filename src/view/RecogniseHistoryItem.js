import React from 'react';
import {ListGroup} from 'react-bootstrap'
import moment from 'moment/min/moment-with-locales'
import VoiceText from './VoiceText'

class RecogniseHistoryItem extends React.Component {
    
    constructor(props, context){
        super(props)
    }
    text() {
        moment.locale('zh-cn')
        const now = moment()
        const start = moment(new Date(this.props.date))
        const finish = moment(new Date(this.props.finishDate))
        let s = '开始于';
        s += now.diff(start) < moment.duration(1, 'days') ? start.fromNow() : start.calendar()
        s += this.props.finishDate ? "，学习时间：" + moment.duration(start.diff(finish)).humanize() + "。": "，没有完成。"
        s += '学习新字：'
        s += this.props.newChar.join('、')
        return s
    }

    render() {
        return (
            <ListGroup.Item variant={this.props.finishDate ? "success" : "secondary"}>
                <VoiceText text={this.text()}/>
            </ListGroup.Item>
        )
    }
}
export default RecogniseHistoryItem;
