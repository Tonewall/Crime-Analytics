import React, { Component } from 'react';
import "./Data.css";
import { MDBDataTable } from 'mdbreact';
import { Redirect } from 'react-router-dom';

class BuildingInformation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            buildingNum: null,
            zone1: {
                coulumns: [],
                rows: []
            },
            zone2: {
                coulumns: [],
                rows: []
            },
            zone3: {
                coulumns: [],
                rows: []
            },
            zone4: {
                coulumns: [],
                rows: []
            }
        }
        this.onClick = this.onClick.bind(this)
    }

    
    populateData = function (data) {
        var columns = [
            {label: 'Bldg #', field: 'Bldg #', width: 50, sort: 'asc'},
            {label: 'Area', field: 'Area', width: 100, sort: 'asc'},
            {label: 'Location Type', field: 'Location Type', width: 100, sort: 'asc'},
            {label: 'Address', field: 'Address', width: 200, sort: 'asc'},
            {label: 'Building Name', field: 'Building Name', width: 200, sort: 'asc'},
            {label: 'Location Code', field: 'Location Code', width: 100, sort: 'asc'},
        ]
        var zone1 = []
        var zone2 = []
        var zone3 = []
        var zone4 = []

        for(var i = 0; i < data.length; i++) {
            var bld = data[i]['Bldg #']
            data[i]['Bldg #'] = <div style={{color:'blue', cursor:'pointer'}}  ><u  onClick={this.onClick} data-name={bld}>{bld}</u></div>
            var k = 0;
            for(const value in data[i]) {
                if(value !== 'Bldg #') {
                    if(data[i][value] == null) {
                        data[i][value] = '-'
                    }
                }
                
            }
            for(const value in data[i]) {
                if(data[i][value] == null) {
                    data[i][value] = '-'
                }
            }
            if(data[i]['Patrol Zone'] === "Zone 1") {
                zone1.push(data[i])
            } else if(data[i]['Patrol Zone'] === "Zone 2") {
                zone2.push(data[i])
            } else if(data[i]['Patrol Zone'] === "Zone 3") {
                zone3.push(data[i])
            } else if(data[i]['Patrol Zone'] === "Zone 4") {
                zone4.push(data[i])
            }
        }    
        this.setState({
            zone1: {
                columns: columns,
                rows: zone1
            },
            zone2: {
                columns: columns,
                rows: zone2
            },
            zone3: {
                columns: columns,
                rows: zone3
            },
            zone4: {
                columns: columns,
                rows: zone4
            }
        })
    }
    onClick(event) {
        this.setState({buildingNum: event.target.dataset.name},
            function() {
                this.setState({redirected: true})
            });
    }
    

    componentDidMount() {
        this.getData();
    }

    getData() {
        fetch('/getBuildings')
            .then(results => {
                results.json().then(data => {
                console.log(data)
                this.populateData(data)
            })})
            .catch(err => console.error(err))
    }

    render() {
        return (
            <div className="main">
                {this.state.redirected ? <Redirect to={{pathname: '/Building-Result/'+this.state.buildingNum}}/> : null}
                <div className="card buildingCard">
                    <h2 className="card-header">Zone 1 Buildings</h2>
                    <div className="card-body">
                        <MDBDataTable
                            scrollX
                            striped
                            bordered
                            hover
                            entries={15}
                            data={this.state.zone1}
                        />
                    </div>
                </div>
                <div className="card buildingCard">
                    <h2 className="card-header">Zone 2 Buildings</h2>
                    <div className="card-body">
                        <MDBDataTable
                            scrollX
                            striped
                            bordered
                            hover
                            entries={15}
                            data={this.state.zone2}
                        />
                    </div>
                </div>
                <div className="card buildingCard">
                    <h2 className="card-header">Zone 3 Buildings</h2>
                    <div className="card-body">
                        <MDBDataTable
                            scrollX
                            striped
                            bordered
                            hover
                            entries={15}
                            data={this.state.zone3}
                        />
                    </div>
                </div>
                <div className="card buildingCard">
                    <h2 className="card-header">Zone 4 Buildings</h2>
                    <div className="card-body">
                        <MDBDataTable
                            scrollX
                            striped
                            bordered
                            hover
                            entries={15}
                            data={this.state.zone4}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default BuildingInformation;