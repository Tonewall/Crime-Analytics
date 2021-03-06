import React, { Component } from 'react';
import Chart from "chart.js";
import "./Statistics.css";



class TimeStatistics extends Component {
    bothChart = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            bothData: [],
            bothDayData: [],
            bothCrimeTimeRecord: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            year: null,
        }
        this.createBothTime = this.createBothTime.bind(this);
    };

    componentDidMount() {
        if(this.props.data) {
            var year = this.props.data.selectedYear;
            if (year === null) {
                var date = new Date();
                year = date.getFullYear();
            }
            this.props.data.selectedYear = {value: year, label: year};
            this.setState({year});
            this.getTimeCount(year);
        }

    }

    getTimeCount() {
        fetch('/getTimeCount',
                {
                    headers:{'Content-Type' : 'application/json'},
                    method: 'post',
                    body: JSON.stringify(this.props.data)
                }
            )
            .then(function(response) {
                if(!response.ok) {
                    throw Error(response.statusText);
                }
                return response
            })
            .then(results => {
                results.json().then(data => {
                this.createBothTime(data)
            })})
            .catch(err => console.error(err))
    }

    createBothTime(data) {
        var hourArray=[];
        this.setState({ bothData: data });
        for(var i = 0; i < data.length; i++) {
            hourArray[i] = data[i]['Count'];
        }
        this.setState({bothCrimeTimeRecord: hourArray})
        this.createbothChart();
    }


    createbothChart() {
        
         const mybothChart = this.bothChart.current.getContext("2d");
         
        
         new Chart(mybothChart, {
             type: "bar",
             data: {
                 labels: ['12 am', '1 am', '2 am', '3 am', '4 am', '5 am', '6 am', '7 am', '8 am', '9 am', '10 am', '11 am',
                 '12 pm', '1 pm', '2 pm', '3 pm', '4 pm', '5 pm', '6 pm', '7 pm', '8 pm', '9 pm', '10 pm', '11 pm'],
                 datasets: [
                     {
                        label: 'Incidents',
                        backgroundColor: 'rgba(97, 144, 255,0.5)',
                        borderColor: 'rgba(97, 144, 255,1)',
                        borderWidth: 2,
                        hoverBackgroundColor: 'rgba(15, 87, 255,0.4)',
                        hoverBorderColor: 'rgba(15, 87, 255,1)',
                        data: this.state.bothCrimeTimeRecord
                     }
                 ]
             },
             options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
         });
    }


    render() {
        return (
            <div className="regularChartMain">
                <div className="row">
                    <div className="col-12">
                        <button style={{marginLeft:'3%', marginBottom:'10px', fontSize:'150%'}}className="btn btn-lg btn-primary"> <a style={{color:'white'}}href="/Date-Time-Filter">Filter</a></button>
                    </div>
                </div>
                <div className="row">
                    <div className=" col-lg-12">
                        <div className="card dataCard shadow p-3 mb-5 bg-white rounded">
                            <div className="card-body">
                            <h5 className="card-title">Incidents by Hours for {this.state.year}</h5>
                                <canvas
                                    id="myChart"
                                    ref={this.bothChart}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TimeStatistics;