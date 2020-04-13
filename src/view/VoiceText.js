import React from 'react';

import { speak } from '../module/speak'

class VoiceText extends React.Component {

    componentDidMount(){
        speak(this.props.text)

    }

    render() {
        return (
            <>
                {this.props.text}
            </>
        )
    }
}


export default VoiceText;
