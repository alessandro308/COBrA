import React from "react";
import {Jumbotron, FormControl, FormGroup, ControlLabel, HelpBlock, Button} from "react-bootstrap"

export default class AddNewContent extends React.Component{
    constructor(props){
        super(props);
        this.onChange = this.onChange.bind(this);
        this.state = {
            address: ""
        }
    }

    onChange(e){
        let address = e.target.value;
        this.setState({address});
    }


    render(){
        return (<Jumbotron>
            <h1>Publish your content!</h1>
            <form>
                <FormGroup
                controlId="formBasicText"
                >
                <ControlLabel>Please, insert here your content address</ControlLabel>
                <FormControl
                    type="text"
                    placeholder="Enter text"
                    onChange={this.onChange}
                    value={this.state.address}
                    autoComplete="off"
                />
                <HelpBlock>You haven't any content address? Deploy it with Remix and link it here!</HelpBlock>
                </FormGroup>
            </form>
            <p>
                <Button bsStyle="primary" onClick={e => this.props.publishContent(this.state.address)}>Publish content</Button>
            </p>
        </Jumbotron>);
    }
}