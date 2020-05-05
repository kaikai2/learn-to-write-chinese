import React from 'react'

import {Button} from 'react-bootstrap'
import {GiSpeaker} from 'react-icons/gi'
import { speak } from '../module/speak'

class VoiceText extends React.Component {

    constructor(props, context){
        super(props)
        this.state = {
            speaking : false,
        }
    }
    componentDidMount(){
        if (this.props.autoSpeak) {
            this.doSpeak()
        }
    }

    doSpeak() {
        if (this.state.speaking) {
            return
        }
        this.setState({speaking: true})
        speak(this.props.text).then((e) => {
            this.setState({speaking: false})
        })
    }

    render() {
        return (
            <>
                {this.props.text}
                {" "}
                <Button variant="outline-info" onClick={this.doSpeak.bind(this)} disabled={this.state.speaking}>
                    <GiSpeaker  />
                </Button>
            </>
        )
    }
}

VoiceText.defaultProps = {
    autoSpeak: false
}
export default VoiceText;
