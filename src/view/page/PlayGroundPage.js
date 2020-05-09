import React from 'react'

import { Container, Row, Col } from 'react-bootstrap'
import { VoiceText } from '..'

class PlayGroundPage extends React.Component {

    render() {
        const lyrics = [
            "我感觉",
            "你说",
            "这句话",
            "你在",
            "无中生有",
            "暗度陈仓",
            "凭空想象",
            "凭空捏造",
            "胡言胡语",
            /*"无可救药",
            "逝者安息",
            "一路走好",
            "永无止境",
            "没钱买药",
            "头脑有病",
            "嘴里流能",
            "眼里有泡",
            "污言秽语",
        "咎由自取"*/]
        return (
            <Container fluid>
                <Row>
                    <Col>
                        <VoiceText text='欢迎来到语音游乐场'/>
                    </Col>
                </Row>
                <Row>
                    {lyrics.map((c, i) => (
                        <Col key={i}>
                            <VoiceText text={c} 
                                doubleSpeak={true}
                                flush={true}/>
                        </Col>
                    ))}
                </Row>
            </Container>
        )
    }
}

export default PlayGroundPage;
