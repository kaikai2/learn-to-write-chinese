import React from 'react'

import { Button } from 'react-bootstrap'
import { GiSpeaker } from 'react-icons/gi'
import { speak } from '../module/speak'

class VoiceText extends React.Component {
    _isMounted = false

    constructor(props, context){
        super(props)
        this.state = {
            speaking : false,
        }
    }
    
    componentDidMount(){
        this._isMounted = true
        if (this.props.autoSpeak) {
            this.doSpeak()
        }
    }

    componentWillUnmount(){
        this._isMounted = false
    }

    doSpeak() {
        if (!this.props.doubleSpeak && this.state.speaking) {
            return
        }
        this.setState({speaking: true})
        speak(this.props.text, this.props.flush).then((e) => {
            if (this._isMounted) {
                this.setState({speaking: false})
            }
        })
    }

    render() {
        return (
            <>
                {this.props.text}
                {" "}
                <Button variant="outline-info" onClick={this.doSpeak.bind(this)} disabled={!this.props.doubleSpeak && this.state.speaking}>
                    <GiSpeaker  />
                </Button>
            </>
        )
    }
}

VoiceText.defaultProps = {
    autoSpeak: false,
    doubleSpeak: false,
    flush: false,
}

export default VoiceText;
