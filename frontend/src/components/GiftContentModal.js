import React from "react";
import {Modal, Button, FormControl, FormGroup, ControlLabel, Alert} from "react-bootstrap";
import CatalogContext from "../Global";
import Web3 from "web3";

export class GiftContentModal extends React.Component{

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
        this.catalog.giftContent(this.props.contentName, this.state.value, 
            {value: this.web3.toWei(this.props.contentCost, "ether")}, (err, res) => {
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
                <Modal.Title>Super! Gift a content!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.state.giftDone ? 
                        (<Alert bsStyle="warning">
                            <strong>Great!</strong> Your gift is completed!
                        </Alert>) : null}
                    <form>
                        <FormGroup
                        controlId="formBasicText"
                        >
                        <ControlLabel>Insert the address of the gift receiver</ControlLabel>
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
                        bsStyle="success">Gift {this.props.contentName} now ({this.props.contentCost} ETH)!
                    </Button> : null}
                <Button onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}
export default props => (
    <CatalogContext.Consumer>
        { catalog => <GiftContentModal {...props} catalog={catalog} />}
    </CatalogContext.Consumer>
)