import React from 'react';


class HanziField extends React.Component {
    borderStrokeWidth() {
        return Math.max(2, Math.min(40, Math.floor((this.props.size || 100) / 25)))
    }
    render() {
        return (
            <g>
                <line x1="0" y1="0" 
                    x2={this.props.size || 100} y2={this.props.size || 100} stroke="lightpink" />
                <line x1={this.props.size || 100} y1="0"
                    x2="0" y2={this.props.size || 100} stroke="lightpink" />
                <line x1={(this.props.size || 100)/2} y1="0" 
                    x2={(this.props.size || 100) / 2} y2={(this.props.size || 100)} stroke="lightpink" />
                <line x1="0" y1={(this.props.size || 100)/2} 
                    x2={(this.props.size || 100)} y2={(this.props.size || 100)/2} stroke="lightpink" />
                <line x1="0" y1="0" 
                    x2="0" y2={(this.props.size || 100) } 
                    strokeWidth={this.borderStrokeWidth()} stroke="pink" />
                <line x1={(this.props.size || 100)} y1="0" 
                    x2={(this.props.size || 100) } y2={(this.props.size || 100) } 
                    strokeWidth={this.borderStrokeWidth()} stroke="pink" />
                <line x1="0" y1="0" 
                    x2={(this.props.size || 100) } y2="0" 
                    strokeWidth={this.borderStrokeWidth()} stroke="pink" />
                <line x1="0" y1={(this.props.size || 100) } 
                    x2={(this.props.size || 100)} y2={(this.props.size || 100) } 
                    strokeWidth={this.borderStrokeWidth()} stroke="pink" />
            </g>
        )
    }
}


export default HanziField;
