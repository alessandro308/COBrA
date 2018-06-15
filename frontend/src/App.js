import React, { Component } from 'react';
import {Navbar, Nav, NavItem, Jumbotron} from 'react-bootstrap';
import Web3 from 'web3';
import './App.css';
import {CatalogContext, Content} from "./Global";
import ContentsGrid from './components/ContentsGrid';
import AddNewContent from './components/AddNewContent';

const Menu = (props => <Navbar>
  <Navbar.Header>
    <Navbar.Brand>
      <a href="#home">COBrA</a>
    </Navbar.Brand>
  </Navbar.Header>
  <Nav>
    <NavItem eventKey={0} onClick={e => props.onClick(0)} selected={props.selected===0}>
      {props.selected===0 ? <b>All contents</b> : "All contents"}
    </NavItem>
    <NavItem eventKey={1} onClick={e => props.onClick(1)} selected={props.selected===1}>
      {props.selected===1 ? <b>Accessible Contents</b> : "Accessible Contents"}
    </NavItem>
    <NavItem eventKey={2} onClick={e => props.onClick(2)} selected={props.selected===2}>
      {props.selected===2 ? <b>Your content</b> : "Your content"}
    </NavItem>
  </Nav>
  <Nav pullRight>
        <NavItem>
          Developed by Alessandro Pagiaro
        </NavItem>
  </Nav>
  </Navbar>);

class App extends Component {
  constructor(props){
    super(props);
    this.web3 = new Web3(window.web3.currentProvider); //"http://127.0.0.1:7545"); 
    this.web3.eth.defaultAccount = window.web3.eth.accounts[0];
    this.catalog = (this.web3.eth.contract(props.catalog.abi)).at(props.catalog.address);
    this.state = {
      contents: [],
      menu: 0
    };
    this.updateCatalogData = () => {
      this.catalog.getContentList( 
        (_, res) => {
            let promises = [];
            for(let i = 0; i<res.length; i++){
              promises.push(this.name2address(res[i]));
            }
            Promise.all(promises).then(
              values => {
                this.getValues(values, 0);
              }
            )
        });
    };
    this.updateCatalogData();

    /* Set the event listerner for grantingAccess and contentConsuming */
    var event = this.catalog.ContentBought({_user: this.web3.eth.defaultAccount});
    event.watch(
        async (err, res)=>{
            if(res.args._user === this.web3.eth.defaultAccount){ /* Should be always true */
              let contents = [...this.state.contents];
              for(let i = 0; i<contents.length; i++){
                if(contents[i].name === this.web3.toAscii(res.args._content)){
                  contents[i].accessRight = await this.checkAccess(contents[i].address);
                  this.setState({contents});
                }
              }
            }
        }
    );

    var event1 = this.catalog.ContentConsumed({_user: this.web3.eth.defaultAccount}); /* BUG: this is not fired*/
    event1.watch(
        async (err, res) => {
            console.log(err);
            console.log(res);
            console.log(res.args._user);
            console.log(this.web3.eth.defaultAccount);
            if(res.args._user === this.web3.eth.defaultAccount){ /* Should be always true but not*/
                /* Check if the user lost the access right or if he bought the content another time */
                console.log("IF CONDITION PASSE")
                let contents = [...this.state.contents];
                for(let i = 0; i<contents.length; i++){
                  console.log(contents[i].name);
                  console.log(this.web3.toAscii(res.args._content));
                  if(contents[i].name === this.web3.toAscii(res.args._content)){
                    contents[i].accessRight = await this.checkAccess(contents[i].address);
                    console.log(contents[i].accessRight);
                    this.setState({contents});
                  }
                }
            }
        }
    )

    /* Javascript boilerplate function */
    this.menuClickHandler = key => this.setState({menu: key});
    this.getValues = this.getValues.bind(this);
    this.getAuthor = this.getAuthor.bind(this);
    this.getRatingMean = this.getRatingMean.bind(this);
    this.getViews = this.getViews.bind(this);
    this.checkAccess = this.checkAccess.bind(this);
    this.getName = this.getName.bind(this);
    this.getContentCost = this.getContentCost.bind(this);
    this.getOwner = this.getOwner.bind(this);
    this.getMyRate = this.getMyRate.bind(this);
    this.customer = this.customer.bind(this);
    this.canRate = this.canRate.bind(this);
    this.publishContent = this.publishContent.bind(this);
    this.getBalance = this.getBalance.bind(this);
  }

  /* Make the asyncronous function of web3, new ES6 Promise */
  name2address(contentName){
    return new Promise((succ, rej) => {
      this.catalog.name2address(contentName, (err, res) => {if(!err){return succ(res)}else{rej(err);}});
    });
  }
  getAuthor(contentAddress){
    return new Promise((succ, rej) => {
      let content = this.web3.eth.contract(Content.abi).at(contentAddress);
      content.author((err, res) => {if(!err){return succ(res)}else{rej(err);}})
    })
  }
  getViews(contentAddress){
    return new Promise((succ, rej) => {
      let content = this.web3.eth.contract(Content.abi).at(contentAddress);
      content.views((err, res) => {if(!err){succ(res)}else{rej(err);}})
    })
  }
  checkAccess(contentAddress){
    return new Promise((succ, rej) => {
      this.catalog.isGranted(this.web3.eth.defaultAccount, contentAddress, (err, res) => {if(!err){return succ(res)}else{rej(err);}})
    })
  }
  getName(contentAddress){
    return new Promise((succ, rej) => {
      let content = this.web3.eth.contract(Content.abi).at(contentAddress);
      content.name((err, res) => {if(!err){succ(res)}else{rej(err);}})
    })
  }
  getContentCost(contentAddress){
    return new Promise((succ, rej) => {
      let content = this.web3.eth.contract(Content.abi).at(contentAddress);
      content.contentCost((err, res) => {if(!err){succ(res)}else{rej(err);}})
    })
  }
  getOwner(contentAddress){
    return new Promise((succ, rej) => {
      let content = this.web3.eth.contract(Content.abi).at(contentAddress);
      content.owner((err, res) => {if(!err){succ(res)}else{rej(err);}})
    })
  }
  getRatingMean(contentAddress){
    return new Promise((succ, rej) => {
      let content = this.web3.eth.contract(Content.abi).at(contentAddress);
      content.ratingMean((err, res) => {if(!err){succ(res)}else{rej(err);}})
    })
  }
  customer(contentAddress){
    return new Promise((succ, rej) => {
      let content = this.web3.eth.contract(Content.abi).at(contentAddress);
      content.customers(this.web3.eth.defaultAccount, (err, res) => {
        if(!err){ 
          succ(res);
        }else{
          rej(err);}})
    });
  }
  /* this function, if the user has not leaved a rating, returns (0,0,0) */
  getMyRate(contentAddress){
    return new Promise((succ, rej) => {
      let content = this.web3.eth.contract(Content.abi).at(contentAddress);
      content.cust2rate(this.web3.eth.defaultAccount, (err, res) =>{if(!err){succ(res);}else{rej(err);}});
    });
  }
  /* In order to understand if the user can rate checks:
    1. the user has consumed the content
    2. The user has already leaved a feedback
  */
  canRate(contentAddress){
    return new Promise(async(succ, rej) => {
      let customerInserted = await this.customer(contentAddress);
      if(customerInserted){
        let rate = await this.getMyRate(contentAddress);
        let result = rate.reduce((prev, curr) => {
          return prev && curr.toNumber() == 0;
        }, true);
        succ(result);
      }else{
        succ(false);
      }
    });
  }

  publishContent(contentAddress){
    return new Promise(async(succ, rej) => {
      this.catalog.publishContent(contentAddress, (err, res) => { 
        if(!err){
          alert("Content Published! Wait to be mined to see it into content grid");
          succ(res);
        }else{
          rej(err)
        }
      });
    })
  }
  
  getBalance(contentAddress){
    return new Promise((succ, rej) => {
      this.web3.eth.getBalance(contentAddress, (err, res) => {
        if(!err){
          succ(res);
        } else{
          rej(err);
        }
      });
    });
  }


  /* Get all the metadata for every content */
  getValues(contentAddressArray, index){
    if(index >= contentAddressArray.length){return;}
    let contentAddress = contentAddressArray[index];
    Promise.all([this.getAuthor(contentAddress), //0
                  this.getRatingMean(contentAddress),//1
                  this.getViews(contentAddress),//2
                  this.checkAccess(contentAddress), //3
                  this.getName(contentAddress), //4
                  this.getContentCost(contentAddress), //5
                  this.getOwner(contentAddress), //6
                  this.canRate(contentAddress), //7
                  this.getBalance(contentAddress)] //8
                  ).then(
                    values => 
                      {
                        let contents = [...this.state.contents];
                        let author = values[0];
                        let rating = values[1].map(e => e.toNumber()/51); /* divided by 51 since the range is 0-255 but we have only 5 star to show */
                        let views = values[2].toNumber();
                        let accessRight = values[3];
                        let name = this.web3.toAscii(values[4]);
                        let cost = this.web3.fromWei(values[5], "ether").toNumber();
                        let address = contentAddress;
                        let owner = values[6];
                        let canRate = values[7];
                        let balance = this.web3.fromWei(values[8], "ether").toNumber();
                        contents[index] = {author: author, rating: rating, views: views, 
                                            accessRight: accessRight, name: name, cost: cost, 
                                            address: address, owner: owner, canRate: canRate, balance: balance};
                        this.setState({contents}, () => this.getValues(contentAddressArray, index+1));
                      }
                  )
  }

  
  render() {
    let content;
    switch(this.state.menu){
      case 0:   // All content
        content = <ContentsGrid contents={this.state.contents} updateHandler={this.updateCatalogData} />;
        break;
      case 1: // Only content with access right
        let contentList = this.state.contents.filter(
          content => content.accessRight
        );
        if(contentList.length === 0){
          content = (<Jumbotron>
            <h1>Buy some access rights to view your accessible content!</h1>
            </Jumbotron>);
        }else{
          content = <ContentsGrid updateHandler={this.updateCatalogData} contents={contentList}/>;
        }
        break;
      case 2: // Only content deployed by the user
        content = <ContentsGrid updateHandler={this.updateCatalogData} contents={this.state.contents.filter(content => {
          return content.owner === this.web3.eth.defaultAccount;
        })}/>;
        break;
      default:
        content = <ContentsGrid contents={this.state.contents}/>;
    }
    return (
        <div className="App">
            <Menu onClick={this.menuClickHandler} selected={this.state.menu}/>
            <div className="container">
              { this.state.menu === 2 ? <AddNewContent publishContent={this.publishContent}/> : null }
              {content}
            </div>
        </div>
    );
  }
}

export default props => (
  <CatalogContext.Consumer>
    { cat => <App {...props} catalog={cat}/> }
  </CatalogContext.Consumer>
);
