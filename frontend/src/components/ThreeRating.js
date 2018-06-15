import Rating from "react-rating"
import React from "react"

export default class ThreeRating extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            fairness: this.props.rating[0],
            coolness: this.props.rating[1],
            appreciation: this.props.rating[2],
            fairnessSet: false,
            coolnessSet: false,
            appreciationSet: false
        }
        this.onChange = this.onChange.bind(this);
        this.sendRating = this.sendRating.bind(this);
    }
    
    onChange(index, value){
        switch(index){
            case 0:
                this.setState(
                    {
                        fairness: value,
                        fairnessSet: true
                    },
                    this.sendRating
                ) 
                break;
            case 1:
                this.setState(
                    {
                        coolness: value,
                        coolnessSet: true
                    },
                    this.sendRating
                ) 
                break;
            case 2:
                this.setState(
                    {
                        appreciation: value,
                        appreciationSet: true
                    },
                    this.sendRating
                ) 
                break;
            default:
                break;
        }
    }

    sendRating(){
        if(this.state.fairnessSet && this.state.coolnessSet && this.state.appreciationSet){
            /* *51 multiplication is done since the rating range is 0-255 */
            this.props.sendRating(this.state.fairness*51, this.state.coolness*51, this.state.appreciation*51); 
        }
    }

    render(){
        return(
            <React.Fragment>
                Fairness: <Rating initialRating={this.state.fairness} readonly={!this.props.canRate} onChange={ value => this.onChange(0, value)}/><br/>
                Coolness: <Rating initialRating={this.state.coolness} readonly={!this.props.canRate} onChange={ value => this.onChange(1, value)}/><br/>
                Appreciation: <Rating initialRating={this.state.appreciation} readonly={!this.props.canRate} onChange={ value => this.onChange(2, value)}/>
            </React.Fragment>
        )
        
    }
}