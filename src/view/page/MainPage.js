import React from 'react';
import {Button, ButtonGroup, Container, Row, ListGroup, Col} from 'react-bootstrap'
import {MdReplay, MdChevronLeft, MdChevronRight} from 'react-icons/md'
import Hanzi from '../Hanzi'

class MainPage extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            curIndex: 0,
            chars: ['天','地', '花', '哒'],
            replayed: 0,
            width: 0,
            height: 0
        }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }
      
    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }
    
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    
    updateWindowDimensions() {
        console.log("window.innerWidth=", window.innerWidth, "window.innerHeight=", window.innerHeight)
        let res = Math.max(100, Math.min(window.innerWidth, window.innerHeight) * 0.8)
        console.log("optimalCharSize=", res)
        this.setState({ optimalCharSize: res });
    }

    prevChar() {
        console.log('prevChar', this.state.curIndex);
        this.setState({
            curIndex: this.state.curIndex - 1
        });
    }
    nextChar() {
        console.log('nextChar', this.state.curIndex);
        this.setState({
            curIndex: this.state.curIndex + 1
        });
    }
    replay() {
        console.log('replay');
        this.setState({
            replayed: this.state.replayed + 1
        });
    }

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col>
                        <h1>今日汉字</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ListGroup horizontal>
                        {this.state.chars.map((c, i) => (
                            <ListGroup.Item key={i.toString()} active={i === this.state.curIndex} onClick={() => this.setState({curIndex: i})}>{c}</ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Col>
                </Row>
                <Row className="mt-1">
                    <Col>
                        <Container >

                        <Hanzi replay={this.state.replayed}
                            size={this.state.optimalCharSize}
                            char={this.state.chars[this.state.curIndex]} />
                
                        </Container>
                    </Col>
                </Row>
                <Row className="mt-1">
                    <Col>
                        <ButtonGroup>
                            <Button variant="primary" disabled={this.state.curIndex === 0} onClick={this.prevChar.bind(this)}>
                                <MdChevronLeft/>
                                上一个
                            </Button> 
                            <Button variant="success" onClick={this.replay.bind(this)}>
                                <MdReplay></MdReplay>
                            </Button>
                            <Button variant="primary" disabled={this.state.curIndex === this.state.chars.length - 1} onClick={this.nextChar.bind(this)}>
                                下一个
                                <MdChevronRight/>
                            </Button> 
                        </ButtonGroup>
                    </Col>
                </Row>
                    
            </Container>
        )
    }
}


export default MainPage;
