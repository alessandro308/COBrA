import React from "react";
import {Modal, Button, FormControl, FormGroup, ControlLabel, Alert} from "react-bootstrap";
import CatalogContext from "../Global";
import Web3 from "web3";

export class GiftPremiumModal extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            value: ""
        }
        this.web3 = new Web3(window.web3.currentProvider); //"http://127.0.0.1:7545");
        this.web3.eth.defaultAccount = window.web3.eth.accounts[0];
        this.catalog = (this.web3.eth.contract(this.props.catalog.abi)).at(this.props.catalog.address);
    }

    handleChange = (e) => {
        let val = e.target.value;
        this.setState({value: val});
    }

    giftContent = () => {
        alert("Done");
        this.catalog.giftPremium(this.state.value, 
            {value: this.web3.toWei(this.props.premiumCost, "ether")}, (err, res) => {
            if(!err){
                this.setState({giftDone: true});
                setTimeout(this.props.onHide, 2000);
            }else{
                console.error(err);
            }
        })
    }



    render(){
        return (
            <Modal show={this.props.show} onHide={this.props.onHide} onEnter={e => {this.setState({giftDone: false})} }>
                <Modal.Header closeButton>
                <Modal.Title>Great! Gift a premium subscription!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.state.giftDone ? 
                        (<Alert bsStyle="warning">
                            <strong>Super!</strong> Your gift is completed!
                        </Alert>) : null}
                    <form>
                        <FormGroup
                        controlId="formBasicText"
                        >
                        <ControlLabel>Insert the address of the premium subscription receiver</ControlLabel>
                        <FormControl
                            type="text"
                            value={this.state.value}
                            placeholder="Enter text"
                            onChange={this.handleChange}
                        />
                        </FormGroup>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                {!this.state.giftDone ? 
                    <Button 
                        onClick={this.giftContent} 
                        bsStyle="success">Gift premium subscription now ({this.props.premiumCost} ETH)!
                    </Button> : null}
                <Button onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}
export default props => (
    <CatalogContext.Consumer>
        { catalog => <GiftPremiumModal {...props} catalog={catalog} />}
    </CatalogContext.Consumer>
)