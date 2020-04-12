import React from 'react';


class HanziField extends React.Component {

    render() {
        return (
            <g>
                <line x1="0" y1="0" 
                    x2={this.props.size || 100} y2={this.props.size || 100} stroke="#DDD" />
                <line x1={this.props.size || 100} y1="0"
                    x2="0" y2={this.props.size || 100} stroke="#DDD" />
                <line x1={(this.props.size || 100)/2} y1="0" 
                    x2={(this.props.size || 100) / 2} y2={(this.props.size || 100)} stroke="#DDD" />
                <line x1="0" y1={(this.props.size || 100)/2} 
                    x2={(this.props.size || 100)} y2={(this.props.size || 100)/2} stroke="#DDD" />
                <line x1="0" y1="0" 
                    x2="0" y2={(this.props.size || 100) } strokeWidth="2" stroke="#000" />
                <line x1={(this.props.size || 100)} y1="0" 
                    x2={(this.props.size || 100) } y2={(this.props.size || 100) } strokeWidth="2" stroke="#000" />
                <line x1="0" y1="0" 
                    x2={(this.props.size || 100) } y2="0" strokeWidth="2" stroke="#000" />
                <line x1="0" y1={(this.props.size || 100) } 
                    x2={(this.props.size || 100)} y2={(this.props.size || 100) } strokeWidth="2" stroke="#000" />
            </g>
        )
    }
}


export default HanziField;
