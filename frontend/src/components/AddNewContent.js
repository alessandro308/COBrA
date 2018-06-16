import React from "react";
import {Jumbotron, FormControl, FormGroup, ControlLabel, HelpBlock, Button, Form} from "react-bootstrap"
import Web3 from "web3";

export default class AddNewContent extends React.Component{
    constructor(props){
        super(props);
        this.onChange = this.onChange.bind(this);
        this.state = {
            address: "",
            name: "Divina commedia",
            author: "Dante",
            cost: 0.001,
            genre: 2
        }
        this.web3 = new Web3();
    }

    onChange(e){
        let address = e.target.value;
        this.setState({address});
    }

    handleChange = e => {
        let val = e.target.value;
        this.setState({
            [e.target.name]: val
        });
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
                <HelpBlock>You haven't any content address? Deploy it with Remix and link it here or use the form below!</HelpBlock>
                </FormGroup>
            </form>
            <p>
                <Button bsStyle="primary" onClick={e => this.props.publishContent(this.state.address)}>Publish content</Button>
            </p>
            <h5 className="withline">or</h5>
            <Form inline>
                <FormGroup controlId="formInlineName">
                    <ControlLabel>Name</ControlLabel>{' '}
                    <FormControl 
                        type="text" 
                        placeholder="Oliver Twist" 
                        name="name"
                        value={this.state.name}
                        onChange={this.handleChange}/>
                </FormGroup>{' '}
                <FormGroup controlId="formInlineName">
                    <ControlLabel>Author</ControlLabel>{' '}
                    <FormControl 
                        type="text" 
                        placeholder="Jane Doe" 
                        name="author"
                        value={this.state.author}
                        onChange={this.handleChange}/>
                </FormGroup>{' '}
                <FormGroup controlId="formControlsSelect">
                    <ControlLabel>Genre</ControlLabel>
                    <FormControl componentClass="select" name="genre" placeholder="select" onChange={this.handleChange} value={this.state.genre}>
                        <option value="0" >Song</option>
                        <option value="1" >Book</option>
                        <option value="2" >Video</option>
                        <option value="3" >Movie</option>
                        <option value="4" >Other</option>
                    </FormControl>
                </FormGroup>{" "}
                <FormGroup controlId="formInlineName">
                    <ControlLabel>Cost (ETH)</ControlLabel>{' '}
                    <FormControl 
                        type="number" 
                        name="cost"
                        value={this.state.cost}
                        onChange={this.handleChange} />
                </FormGroup>
            </Form>
            <p>
                <Button bsStyle="primary" onClick={e => this.props.deployAndPublish(
                                                            this.web3.toHex(this.state.name), 
                                                            this.state.author, 
                                                            this.state.genre, 
                                                            this.web3.toWei(this.state.cost, "ether"))}>
                    Deploy &amp; publish content!
                </Button>
            </p>
        </Jumbotron>);
    }
}