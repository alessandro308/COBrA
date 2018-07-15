import React, { Component } from 'react';
import {Navbar, Nav, NavItem, Jumbotron} from 'react-bootstrap';
import Web3 from 'web3';
import './App.css';
import {CatalogContext, Content} from "./Global";
import ContentsGrid from './components/ContentsGrid';
import AddNewContent from './components/AddNewContent';
import GiftModal from './components/GiftContentModal';
import GiftPremiumModal from './components/GiftPremiumModal';
import GetLatestButton from "./components/GetLatestButton";
const Menu = (props => <Navbar inverse>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="#home">COBrA</a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
   <Navbar.Collapse>
    <Nav>
    <NavItem eventKey={0} active={props.selected===0} onClick={e => props.onClick(0)} selected={props.selected===0}>
      {props.selected===0 ? <b>All contents</b> : "All contents"}
    </NavItem>
    <NavItem eventKey={1} onClick={e => props.onClick(1)} selected={props.selected===1}>
      {props.selected===1 ? <b>Accessible Contents</b> : "Accessible Contents"}
    </NavItem>
    <NavItem eventKey={2} onClick={e => props.onClick(2)} selected={props.selected===2}>
      {props.selected===2 ? <b>Your content</b> : "Your content"}
    </NavItem>
    <NavItem eventKey={3} onClick={e => props.onClick(3)} selected={props.selected===3}>
      {props.selected===3 ? <b>Rate a content</b> : "Rate a content"}
    </NavItem>
  </Nav>
  </Navbar.Collapse>
  </Navbar>);
const BottomBar = (props => 
<Navbar fixedBottom inverse>
    <Nav>
    {props.isPremium ? 
    <NavItem>
      <b><font color="#ff9a5b">Your are a premium user!</font></b>
    </NavItem> :
    <NavItem onClick={e => props.buyPremium()}>
      <b><font color="#ff9a5b">Buy premium ({props.premiumCost} ETH)</font></b>
    </NavItem>}
    <NavItem onClick={e => props.showGiftPremium()}>
      Gift Premium!
    </NavItem>
    </Nav>
    <Navbar.Text pullRight>Developed by Alessandro Pagiaro</Navbar.Text>
</Navbar>);

class App extends Component {
  constructor(props){
    super(props);
    this.web3 = new Web3(window.web3.currentProvider); //"http://127.0.0.1:7545"); 
    this.web3.eth.defaultAccount = window.web3.eth.accounts[0];
    this.catalog = (this.web3.eth.contract(props.catalog.abi)).at(props.catalog.address);
    this.state = {
      contents: [],
      menu: 0,
      premiumCost: 0,
      isPremium: false,
      giftPremiumModalShow: false,
      isLoadingContent: true
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
    this.getPremiumCost().then(
      res => {
        this.setState({premiumCost: res});
      }
    )

    /* Set the event listerner for grantingAccess and contentConsuming */
    const ContentBought = this.catalog.ContentBought({_user: this.web3.eth.defaultAccount});
    ContentBought.watch(
        async (err, res)=>{
            if(res.args._user === this.web3.eth.defaultAccount){ /* Should be always true */
              let contents = [...this.state.contents];
              for(let i = 0; i<contents.length; i++){
                if(contents[i].name === this.web3.toAscii(res.args._content)){
                  contents[i].accessRight = await this.checkAccess(contents[i].address);
                  this.setState({contents});
                  return;
                }
              }
            }
        }
    );

    const ContentConsumed = this.catalog.ContentConsumed({_user: this.web3.eth.defaultAccount}); /* BUG: this is not fired*/
    ContentConsumed.watch(
        async (err, res) => {
            if(res.args._user === this.web3.eth.defaultAccount){ /* Should be always true but not*/
                /* Check if the user lost the access right or if he bought the content another time */
                let contents = [...this.state.contents];
                for(let i = 0; i<contents.length; i++){
                  if(contents[i].name === this.web3.toAscii(res.args._content)){
                    contents[i].accessRight = await this.checkAccess(contents[i].address);
                    contents[i].canRate = await this.canRate(contents[i].address);
                    this.setState({contents});
                    return;
                  }
                }
            }
        }
    )

    const GiftContentBought = this.catalog.GiftContentBought({_to: this.web3.eth.defaultAccount});
    GiftContentBought.watch(
      async (err, res) => {
        if(res.args._user === this.web3.eth.defaultAccount){
          let contents = [...this.state.contents];
          for(let i = 0; i<contents.length; i++){
            if(contents[i].name === this.web3.toAscii(res.args._content)){
              contents[i].accessRight = await this.checkAccess(contents[i].address);
              alert(`Ei! Someone (${res.args._from}) gave you ${this.web3.toAscii(res.args._content)}!`);
              this.setState({contents});
              return;
            }
          }
        }
      }
    )

    const PremiumSubscriptionBought = this.catalog.PremiumSubscriptionBought({_user: this.web3.eth.defaultAccount});
    PremiumSubscriptionBought.watch(
      async (err, res) => {
        if(res.args._user === this.web3.eth.defaultAccount){
          this.setState({
            isPremium: true
          })
          this.checkingPremium = setInterval(() => {
            this.checkPremium().then(
              res =>{
                if(res === false){
                  this.setState({
                    isPremium: false
                  });
                  clearInterval(this.checkingPremium);
                }
              }
            )
          })
        }
      }
    );

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
    this.hasConsumed = this.hasConsumed.bind(this);
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

  getPremiumCost = () => {
    return new Promise((succ, rej) => {
      this.catalog.premiumCost( (err, res) => {if(!err) succ(res); else rej(err)}) ;
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
  hasConsumed(contentAddress){
    return new Promise((succ, rej) => {
      let content = this.web3.eth.contract(Content.abi).at(contentAddress);
      content.hasConsumed(this.web3.eth.defaultAccount, (err, res) => {
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
      let customerInserted = await this.hasConsumed(contentAddress);
      if(customerInserted){
        let rate = await this.getMyRate(contentAddress);
        let result = rate.reduce((prev, curr) => {
          return prev && curr.toNumber() === 0;
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

  buyPremium = () => {
    return new Promise((succ, rej) => {
      this.catalog.buyPremium({value: this.state.premiumCost}, (err, res) => {if(!err) succ(res); else rej(err)});
    })
  }

  checkPremium = () => {
    return new Promise((succ, rej) => {
      this.catalog.isPremium(this.web3.eth.defaultAccount, (err, res) => {if (!err) succ(res); else rej(err)})
    })
  }

  updateRates = (contentName) => {
    let contents = this.state.contents;
    for(let i = 0; i<this.state.contents.length; i++){
      if(contents[i].name === contentName){
        contents[i].canRate = false;
        this.setState({contents});
        return;
      }
    }
  } 


  /* Get all the metadata for every content */
  getValues(contentAddressArray, index){
    if(index >= contentAddressArray.length){
      this.setState({isLoadingContent: false}); 
      return;
    }
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

  triggerModal = (contentName, contentCost) => {
    this.setState({
      giftContentModalShow: true,
      giftContent: contentName,
      giftContentCost: contentCost
    })
  }

  handleCloseModal = () => {
    this.setState({ giftContentModalShow: false });
  }

  waitForAddress = (hash) => {
    this.web3.eth.getTransactionReceipt(hash, (err, res)=>{
      if(res == null || res.contractAddress == null){
        setTimeout(() => {
          this.waitForAddress(hash);
        }, 1000);
      }else{
        console.log(res);
        this.publishContent(res.contractAddress).then(
          res =>
            console.log(res)
        );
      }
    });
  }

  deployContent = (name, author, genre, cost) => {
    return new Promise((succ, rej) => {
      this.web3.eth.contract(Content.abi).new(
        name, author, genre, cost, 
        {data: Content.data, gas: '4700000'}, 
        (err, res) => {if(!err)succ(res); else rej(err);});
    });
  }

  deployAndPublish = async (name, author, genre, cost) => {
    let contRes = await this.deployContent(name, author, genre, cost);
    this.waitForAddress(contRes.transactionHash); //Then deploy it internally
  }
  
  render() {
    let contentProp = this.state.contents;
    let showJumbutron = false;
    let text = "";
    switch(this.state.menu){
      case 1: // Only content with access right
        contentProp = this.state.contents.filter(
          content => content.accessRight
        );
        if(contentProp.length === 0){
          showJumbutron = true;
          text = "Buy some access rights to view your accessible content!";
        }
        break;
      case 2: // Only content deployed by the user
        contentProp= this.state.contents.filter(content => {
          return content.owner === this.web3.eth.defaultAccount;
        });
        break;
      case 3: //rateble content
        contentProp = this.state.contents.filter(content => {
          return content.canRate;
        });
        if(contentProp.length === 0){
          showJumbutron = true;
          text="You have to consume some content before to rate it!"
        }
        break;
      default:
        break;
    }
    let content = showJumbutron ? 
                    <Jumbotron>
                      <h1>{text}</h1>
                    </Jumbotron> :
                    <ContentsGrid contents={contentProp} updateHandler={this.updateCatalogData} 
                    triggerModal={this.triggerModal} isPremium={this.state.isPremium} updateRates={this.updateRates}/>;

    let cost = this.web3.fromWei(this.state.premiumCost, "ether").toNumber ?  // this if will be false only before first setState
                  this.web3.fromWei(this.state.premiumCost, "ether").toNumber() : 0;
    return (
        <div className="App">
            <GiftModal show={this.state.giftContentModalShow} onHide={this.handleCloseModal} 
                contentName={this.state.giftContent} contentCost={this.state.giftContentCost}/>
            <GiftPremiumModal show={this.state.giftPremiumModalShow} onHide={e => this.setState({giftPremiumModalShow: false})}
                premiumCost={cost} />
            <Menu onClick={this.menuClickHandler} 
              selected={this.state.menu} 
               />
            <div className="container">
              {this.state.menu === 0 ? <GetLatestButton catalog={this.catalog} web3={this.web3}/> : null}
              { this.state.menu === 2 ? <AddNewContent publishContent={this.publishContent} deployAndPublish={this.deployAndPublish}/> : null }
              {content}
            </div>
            <BottomBar 
              showGiftPremium={e => this.setState({giftPremiumModalShow: true})} 
              premiumCost={cost}
              buyPremium={this.buyPremium} 
              isPremium={this.state.isPremium}
            />
        </div>
    );
  }
}

export default props => (
  <CatalogContext.Consumer>
    { cat => <App {...props} catalog={cat}/> }
  </CatalogContext.Consumer>
);
