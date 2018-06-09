import React from "react";
import {Panel, Button} from "react-bootstrap";
import Rating from "react-rating";

const SVGIcon = (props) =>
  <svg className={props.className}>
    <use xlinkHref={props.href} />
  </svg>;

export class ContentCard extends React.Component{
    
    render(){
        return (
                <Panel>
                    <Panel.Heading>
                        <h4>{this.props.title}</h4> 
                        {this.props.author}
                    </Panel.Heading>
                    <Panel.Body>
                        <Button bsSize="xsmall" bsStyle="info">Buy it!</Button>
                    </Panel.Body>
                    <Panel.Footer><h6>Rating:</h6> <Rating initialRating={3} readonly={!this.props.notReadonly} />
                    </Panel.Footer>
                </Panel>
            );
    }
}