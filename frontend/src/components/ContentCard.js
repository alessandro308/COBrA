import React from "react";
import {Panel, Button, Tooltip, OverlayTrigger} from "react-bootstrap";
import Web3 from 'web3';
import CatalogContext, {Content} from '../Global';
import Rating from "./ThreeRating";

export class ContentCard extends React.Component{
    constructor(props){
        super(props);
        this.web3 = new Web3(window.web3.currentProvider); //"http://127.0.0.1:7545");
        this.web3.eth.defaultAccount = window.web3.eth.accounts[0];

        /* Javascript binding function */
        this.getAcessRight = this.getAcessRight.bind(this);
        this._consumeIt = this._consumeIt.bind(this);
        this.checkAccessRight = this.checkAccessRight.bind(this);
        this.sendRating = this.sendRating.bind(this);
        this.withdrawMoney = this.withdrawMoney.bind(this);

        this.catalog = (this.web3.eth.contract(this.props.catalog.abi)).at(this.props.catalog.address);
        this.content = this.web3.eth.contract(Content.abi).at(this.props.address);
        const newFeedbackEvent = this.content.newFeedback({_user: this.web3.eth.defaultAccount}, {fromBlock: "latest"});
        newFeedbackEvent.watch(
            async (err, res)=>{
                if(!err){
                    console.log(res);
                    console.log("Your feedback is saved!");
                    this.props.updateRates(this.props.name);
                }
            }
        )
    }

    checkAccessRight(){
        this.catalog.isGranted(this.web3.eth.defaultAccount, this.state.address,
            (err, res) => {
                if(!err){
                    this.setState(this.setState({userHasRightAccess: res}));
                } else {
                    console.error(err);
                }
            })
    }

    _consumeIt(){
        /* Performa a trnsaction */
        this.content.consumeContent((err, res) => {
            if(!err)
                alert(`Content consumed!`);
            else
                console.error(err);
        });
    }
    consumeIt = () => {
        if(this.props.isPremium){
            this.content.consumeContentPremium((err, res) => {
                if(!err)
                    alert(`Content consumed!`)
                else
                    console.error(err);
            });
        }else{
            this._consumeIt();
        }
    }

    getAcessRight(){
        this.catalog.grantAccess(this.props.name, {value: this.web3.toWei(this.props.cost, "ether")}, ((err, res) => {
            if(!err){
                console.log("Transaction sent!");
            } else {
                console.error(err);
            }
        }));
        console.log("Getting Access right...");
    }

    sendRating(fair, cool, appr){
        this.content.leaveFeedback(fair, cool, appr, ((err, res) => {
            if(!err){
                alert("Feedback sent with success!"+res);
                window.setTimeout(this.props.updateHandler, 2*60*1000); /*Invoke the catalog update function when, 
                                                                            hopefully the transaction is mined */
            }else{
                console.error(err);
            }
        }))
    }

    withdrawMoney(){
        if(this.props.balance === 0) return;
        this.content.withdraw((err, res)=>{
            if(!err){
                alert(`The money will be transfered into your account!\n 
                Please, check your wallet later`);
            }else{
                console.error(err);
            }
        })
    }

    render(){
        let tooltip = <Tooltip id="tooltip">{this.props.balance === 0 ? "You need more view to be get paid for your content" : null}</Tooltip>;
        return (
                <Panel>
                    <Panel.Heading>
                        <h4>{this.props.name}</h4>
                        <h6>By: {this.props.author}</h6>
                        <h6>{this.props.cost} ETH</h6>
                        <h6>Views: {this.props.views}</h6>
                    </Panel.Heading>
                    <Panel.Body>
                        {!this.props.accessRight && !this.props.isPremium ?
                            <Button bsSize="xsmall" bsStyle="info" onClick={this.getAcessRight}>Buy one view!</Button> :
                            <Button bsSize="xsmall" bsStyle="info" onClick={this.consumeIt}>Consume it!</Button> }
                        
                        <Button bsSize="xsmall" bsStyle="danger" style={{marginLeft: "5px"}} onClick={e => this.props.triggerModal(this.props.name, this.props.cost)}>Gift a content!</Button>
                    </Panel.Body>
                    <Panel.Footer><h6>Rating (mean values):</h6>
                        <Rating rating={this.props.rating} canRate={this.props.canRate} sendRating={this.sendRating}/>
                        {this.props.owner === this.web3.eth.defaultAccount ?
                            <OverlayTrigger placement="left" overlay={tooltip}>
                                <Button bsSize="xsmall" bsStyle="info" onClick={this.withdrawMoney}>
                                    Withdraw {this.props.balance} ETH
                                </Button> 
                            </OverlayTrigger>
                        : null}
                    </Panel.Footer>
                </Panel>
            );
    }
}

export default props => (
    <CatalogContext.Consumer>
        { catalog => <ContentCard {...props} catalog={catalog} />}
    </CatalogContext.Consumer>
)