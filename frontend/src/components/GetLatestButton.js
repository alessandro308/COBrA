import React from "react"
import {Button, FormGroup, ControlLabel, FormControl, Collapse, Well} from "react-bootstrap";

export default class GetLatestButton extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selectedButton: 0,
            openResult: false,
            inputOpen: false,
            result: ""
        }
        this.getdata = (e) => {
            switch(this.state.selectedButton){
                case 1:
                    props.catalog.getLatestByGenre(this.state.currentValue, (err, res) => {
                        console.log(res);
                        this.setState({result: res, openResult: true, selectedButton: 0});
                    })
                    break;
                case 2:
                    props.catalog.getLatestByAuthor(this.state.currentValue, (err, res) => {
                        console.log(res);
                        this.setState({result: res, openResult: true, selectedButton: 0});
                    })
                    break;
                case 3:
                    props.catalog.getMostPopularByGenre(this.state.currentValue, (err, res) => {
                        console.log(res);
                        this.setState({result: res, openResult: true, selectedButton: 0});
                    })
                    break;
                case 4:
                    props.catalog.GetMostRated(this.state.currentValue, (err, res) => {
                        console.log(res);
                        this.setState({result: res, openResult: true, selectedButton: 0});
                    })
                    break;
                case 5:
                    props.catalog.GetMostRatedByGenre(this.state.currentValue, this.state.currentValue1, 
                        this.state.currentValue, (err, res) => {
                            console.log(res);
                            this.setState({result: res, openResult: true, selectedButton: 0});
                        }
                    )
                    break;
                case 6:
                    props.catalog.GetMostRatedByAuthor(this.state.currentValue1, this.state.currentValue, 
                        this.state.currentValue, (err, res) => {
                            console.log(res);
                            this.setState({result: res, openResult: true, selectedButton: 0});
                        }
                    )
                    break;
                default:
                    break;
            }
        }
    }
    
    render(){
        let form;
        let label = "";
        switch(this.state.selectedButton){
            case 1:
                label = "Insert Genre"; break;
            case 2:
                label = "Insert Author's Name"; break;
            case 3: 
                label = "Insert Genre"; break;
            case 4: 
                label = "Insert Category"; break;
            case 5:
                label = "Insert Genre and Category"; break;
            case 6: 
                label = "Insert Author's Name"; break;
            default:
                break;
        }
        if(this.state.selectedButton !== 0){
            let t = this.state.selectedButton;
                let input;
                if(t === 5 || t === 6){
                    input = (<FormGroup>
                        <ControlLabel>{label}</ControlLabel>
                        <FormControl type="text" placeholder="Genre" onChange={e => this.setState({currentValue: e.target.value})}/>
                        <FormControl type="text" onChange={e => this.setState({currentValue1: e.target.value})}/>
                    </FormGroup>) 
                }else{
                    input = (<FormGroup>
                        <ControlLabel>{label}</ControlLabel>
                        <FormControl type="text" onChange={e => this.setState({currentValue: e.target.value})}/>
                    </FormGroup>) 
                }     
                form = (
                    <div>
                        {input}
                        <Button style={{margin: "5px"}} bsStyle="success" 
                        onClick={e => {this.getdata(e); this.setState({inputOpen: false})} }>Submit</Button>
                    </div>
                )
        }
        let col;
        if(form){
            col = <Collapse in={this.state.inputOpen}>
                    {form}
                </Collapse>
        }
        return (
            <div style={{marginBottom: "5px"}}>
                <Button style={{margin: "5px"}} bsStyle="info" 
                    onClick={e => {this.setState({selectedButton: 1, inputOpen: true, openResult: false}); }}>Get Latest By Genre</Button>
                <Button style={{margin: "5px"}} bsStyle="info" 
                    onClick={e => this.setState({selectedButton: 2, inputOpen: true, openResult: false}) }>Get Latest By Author</Button>
                <Button style={{margin: "5px"}} bsStyle="info" 
                    onClick={e => this.setState({selectedButton: 3, inputOpen: true, openResult: false}) }>Get Most Popular By Genre</Button><br/>
                <Button style={{margin: "5px"}} bsStyle="success" 
                    onClick={e => this.setState({selectedButton: 4, inputOpen: true, openResult: false}) }>Get Most Rated</Button>
                <Button style={{margin: "5px"}} bsStyle="success" 
                    onClick={e => this.setState({selectedButton: 5, inputOpen: true, openResult: false}) }>Get Most Rated By Genre</Button>
                <Button style={{margin: "5px"}} bsStyle="success" 
                    onClick={e => this.setState({selectedButton: 6, inputOpen: true, openResult: false}) }>Get Most Rated By Author</Button>
                <br/>
                {col}
                    <Collapse in={this.state.openResult}>
                        <div>
                            <Well>
                                {this.props.web3.toAscii(this.state.result) !== "" ? <h1>{this.props.web3.toAscii(this.state.result)}</h1> : <h1>No result found!</h1>}
                                <br/>
                                <Button bsStyle="warning" onClick={e => this.setState({openResult: false})}>Close</Button>
                            </Well>
                        </div>
                    </Collapse>
            </div>
        );
    }
}