import React from 'react';
import {Grid, Col, Row} from 'react-bootstrap';
import ContentCard from './ContentCard';

class ContentsGrid extends React.Component{
    render(){
        let rows = [];
        for(let i = 0; i<this.props.contents.length; i=i+3){
            let columns = [];
            for(let j=0; j<3 && j+i<this.props.contents.length; j++){
                let content = this.props.contents[i+j];
                columns.push(<Col key={this.props.contents[i+j].name} xs={6} md={4}>
                    <ContentCard name={content.name}
                        address={content.address}
                        views={content.views}
                        author={content.author}
                        cost={content.cost}
                        rating={content.rating}
                        accessRight={content.accessRight}
                        canRate={content.canRate}
                        rating={content.rating}
                        owner={content.owner}
                        balance={content.balance}
                        updateHandler={this.props.updateHandler}/>
                </Col>);
            }
            rows.push(<Row key={i}>{columns}</Row>);
        }
        return (
            <div>
                {rows}
            </div>);
    }
}

export default ContentsGrid;