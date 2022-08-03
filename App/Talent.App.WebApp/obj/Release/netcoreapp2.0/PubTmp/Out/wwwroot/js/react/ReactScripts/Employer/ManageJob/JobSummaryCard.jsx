import React from 'react';
import Cookies from 'js-cookie';
import { CardContent, CardGroup, CardHeader, Popup } from 'semantic-ui-react';
import moment from 'moment';
import {Card,Label,Icon,Button,Grid} from 'semantic-ui-react';

export class JobSummaryCard extends React.Component {
    constructor(props) {
        super(props);
        this.selectJob = this.selectJob.bind(this)
    }

    selectJob(id) {
        var cookies = Cookies.get('talentAuthToken');
        //url: 'http://localhost:51689/listing/listing/closeJob',
    }

    render() {    

        // console.log(moment())
        // console.log(this.props.expiryDate)
        // console.log(moment(this.props.expiryDate))
        // console.log(moment(this.props.expiryDate)<moment())
        return(
        <div>
            <Card.Content>
                <Card.Header>{this.props.jobTitle}</Card.Header>
                <Label as="a" color="black" ribbon="right">
                    <Icon name="user"/>
                        {this.props.noOfSuggestions}
                </Label>
                <Card.Meta>
                    {this.props.city}, {this.props.country}
                </Card.Meta>
                <Card.Description style={{height: "200px"}}>
                    {this.props.summary}
                </Card.Description>

            </Card.Content>
            <Card.Content extra>

                {moment(this.props.expiryDate)<moment() && <Button.Group size="tiny" floated='left'>
                    <Button color='red'>Expired</Button>
                </Button.Group>}
                <Button.Group size="tiny"floated='right'>
                    <Button basic color='blue'>
                        <Icon name="ban"/>
                        Close
                    </Button>
                    <Button basic color='blue'>
                        <Icon name="edit"/>
                        Edit
                    </Button>
                    <Button basic color='blue'>
                        <Icon name="copy outline"/>
                        Copy
                    </Button>
                </Button.Group>
                
            </Card.Content>
                   
        </div>


        )


    }
}