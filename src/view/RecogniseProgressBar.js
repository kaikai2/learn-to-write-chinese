import React from 'react';
import { ProgressBar } from 'react-bootstrap'

class RecogniseProgressBar extends React.Component {

    render() {
        return (
            <ProgressBar>
                {this.props.progress().map((c, i) => (
                    <ProgressBar key={i}
                        {...c}
                    />
                ))}
            </ProgressBar>
        )
    }
}

export default RecogniseProgressBar;
