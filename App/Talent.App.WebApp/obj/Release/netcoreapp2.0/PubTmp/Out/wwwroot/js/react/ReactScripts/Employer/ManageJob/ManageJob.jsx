import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie';
import LoggedInBanner from '../../Layout/Banner/LoggedInBanner.jsx';
import { LoggedInNavigation } from '../../Layout/LoggedInNavigation.jsx';
import { JobSummaryCard } from './JobSummaryCard.jsx';
import { BodyWrapper, loaderData } from '../../Layout/BodyWrapper.jsx';
import { Pagination, Icon, Dropdown, Checkbox, Accordion, Form, Segment, Card, CardGroup } from 'semantic-ui-react';
// import "./ManageJob.css";

export default class ManageJob extends React.Component {
    constructor(props) {
        super(props);
        let loader = loaderData
        loader.allowedUsers.push("Employer");
        loader.allowedUsers.push("Recruiter");
        //console.log(loader)
        this.state = {
            loadJobs: [],
            loaderData: loader,
            activePage: 1,
            sortBy: {
                date: "desc"
            },
            filter: {
                showActive: true,
                showClosed: false,
                showDraft: true,
                showExpired: true,
                showUnexpired: true
            },
            totalPages: 1,
            activeIndex: ""
        }
        this.loadData = this.loadData.bind(this);
        this.init = this.init.bind(this);
        this.loadNewData = this.loadNewData.bind(this);
        //your functions go here
        this.handlePaginationChange=this.handlePaginationChange.bind(this);
    };

    init() {
        let loaderData = TalentUtil.deepCopy(this.state.loaderData)
        loaderData.isLoading = false;
        this.setState({ loaderData });//comment this
        console.log(loaderData)

        //set loaderData.isLoading to false after getting data
        //this.loadData(() =>
        //    this.setState({ loaderData })
        //)

        //console.log(this.state.loaderData)

    //     var link = 'http://localhost:51689/listing/listing/getEmployerJobs';
    //     var cookies = Cookies.get('talentAuthToken');
    //     console.log(cookies)
    //    // your ajax call and other logic goes here
    //    $.ajax({
    //     url: link,
    //     headers: {
    //         'Authorization': 'Bearer ' + cookies,
    //         'Content-Type': 'application/json'
    //     },
    //     type: "GET",
    //     contentType: "application/json",
    //     dataType: "json",
    //     success: (res) => {
    //         console.log(res)
    //         console.log(res.myJobs)
    //         console.log(res.myJobs.length)
    //         this.setState({totalPages: (res.myJobs.length/6)+1})
    //         console.log(this.state.totalPages)
    //     },
    //     error: function(res){
    //         console.log(res.status)
    //     }

    //    })

    }

    componentDidMount() {
        this.init();
        this.loadData();
    };

    // loadData(callback) {
    //     var link = 'http://localhost:51689/listing/listing/getSortedEmployerJobs';
    //     var cookies = Cookies.get('talentAuthToken');
    //    // your ajax call and other logic goes here
    // }

    loadData(callback) {
        var link = 'http://localhost:51689/listing/listing/getSortedEmployerJobs';
        var cookies = Cookies.get('talentAuthToken');

       // your ajax call and other logic goes here
       $.ajax({
        url: link,
        headers: {
            'Authorization': 'Bearer ' + cookies,
            'Content-Type': 'application/json'
        },
        type: "GET",
        contentType: "application/json",
        data: {
            sortbyDate: 'desc',
            showActive: true,
            showClosed: false,
            showDraft: true,
            showExpired: true,
            showUnexpired: true,
            activePage: callback,

        },
        dataType: "json",
        success: (res) => {
            console.log(res)
            console.log(res.totalCount)
            this.setState({
                loadJobs: res.myJobs,
                totalPages: this.state.totalPages===1?Math.ceil(res.totalCount/res.myJobs.length):this.state.totalPages,
            })
            console.log(this.state.loadJobs)
            console.log(Math.ceil(res.totalCount/res.myJobs.length))
            console.log(this.state.totalPages)

        },
        error: function(res){
            console.log(res.status)
        }

       })

    }

    loadNewData(data) {
        var loader = this.state.loaderData;
        loader.isLoading = true;
        data[loaderData] = loader;
        this.setState(data, () => {
            this.loadData(() => {
                loader.isLoading = false;
                this.setState({
                    loadData: loader
                })
            })
        });
    }

    handlePaginationChange(e,{activePage}) {
        this.setState({activePage})
        this.loadData(activePage)
        console.log(e)
        console.log(activePage)
    }

    render() {
        let jobData = this.state.loadJobs
        // this.state.totalPages = Math.ceil(jobData.length/6)

        return (
            <BodyWrapper reload={this.init} loaderData={this.state.loaderData}>
               <div className ="ui container">
                <h1>List of Jobs</h1>
                    <span>
                        <Icon name="filter"/>
                        Filter: Choose filter
                        <Dropdown
                            inline
                        />
                        <Icon name="calendar outline"/>
                        Sort by date: Newest First
                        <Dropdown
                            inline
                            // options ={[{key: 'Newest First',text: 'Newest First',value: 'Newest First',}]}
                            // defaultValue ={[{key: 'Newest First',text: 'Newest First',value: 'Newest First',}]}
                        />
                    </span>
                    <br />
                    <p>{jobData.length===0? "No Jobs Found":""}</p>

                    <CardGroup style={{align: "center"}}>
                            {jobData.map(j =>(
                                <Card style={{width:"350px",padding:"5px",margin:"20px"}} key = {j.id}>
                                {/* <Card className='card-style'> */}
                                    <JobSummaryCard
                                    jobTitle={j.title}
                                    noOfSuggestions = {j.noOfSuggestions}
                                    city={j.location.city}
                                    country={j.location.country}
                                    summary={j.summary}
                                    expiryDate ={j.expiryDate}
                                    />
                                </Card>

                            ))}
                    </CardGroup>
                    <Pagination

                    activePage={this.state.activePage}
                    totalPages={this.state.totalPages}
                    siblingRange ={0}
                    boundaryRange={1}
                    onPageChange={this.handlePaginationChange}

                    />

               </div>
            </BodyWrapper>
        )
    }
}