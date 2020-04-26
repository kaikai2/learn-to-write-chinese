import React from 'react'

import {Button} from 'react-bootstrap'
import {GiSpeaker} from 'react-icons/gi'
import { speak } from '../module/speak'

class VoiceText extends React.Component {

    componentDidMount(){
        speak(this.props.text)
    }

    doSpeak() {
        speak(this.props.text)
    }

    render() {
        return (
            <>
                {this.props.text}
                {" "}
                <Button variant="outline-info" onClick={this.doSpeak.bind(this)} >
                    <GiSpeaker  />
                </Button>
            </>
        )
    }
}


export default VoiceText;
