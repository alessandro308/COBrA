import React from 'react';
import {Col, Row} from 'react-bootstrap';
import ContentCard from './ContentCard';

class ContentsGrid extends React.Component{
    render(){
        let rows = [];
        for(let i = 0; i<this.props.contents.length; i=i+3){
            let columns = [];
            let key = "";
            for(let j=0; j<3 && j+i<this.props.contents.length; j++){
                let content = this.props.contents[i+j];
                key += content.name;
                columns.push(<Col key={this.props.contents[i+j].name} xs={6} md={4}>
                    <ContentCard 
                        author={content.author}
                        address={content.address}
                        accessRight={content.accessRight}
                        balance={content.balance}
                        canRate={content.canRate}
                        cost={content.cost}
                        name={content.name}
                        views={content.views}
                        rating={content.rating}
                        owner={content.owner}
                        updateHandler={this.props.updateHandler}
                        triggerModal={this.props.triggerModal}
                        isPremium={this.props.isPremium}/>
                </Col>);
            }
            rows.push(<Row key={key}>{columns}</Row>);
        }
        return (
            <div>
                {rows}
            </div>);
    }
}

export default ContentsGrid;