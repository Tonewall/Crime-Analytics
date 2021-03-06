import React, { Component }  from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import DataView from './components/Data';
import NavBar from './components/NavBar';
// import FullReport from './components/FullReport';
import GtpdFilter from './components/GtpdFilter';
import IncidentNumber from './components/IncidentNumber'
import FilterResult from './components/FilterResult'
import DateTimeFilter from './components/Statistics/DateTimeFilter'
import LocationStatsFilter from './components/Statistics/LocationStatsFilter'
import LocationStatistics from './components/Statistics/LocationStatistics'
import StatisticsRedirect from './components/Statistics/StatisticsRedirect'
import BuildingInformation from './components/BuildingInformation'
import BuildingResult from './components/BuildingResult'
import FullReportNew from './components/FullReportNew'
import RepeatOffender from './components/RepeatOffender'
import OffenderResult from './components/OffenderResult'
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
    render() {
        return (
            <div className="mainBody">
                <Router>
                        <NavBar />
                        <Route exact path="/" component={DataView} />
                        {/* <Route exact path="/full-report/:incidentNumber" component={FullReport} /> */}
                        <Route exact path="/GTPD-Incident-Search" component={IncidentNumber} />
                        <Route exact path="/Filter-Result" component={FilterResult} />
                        {/* For server debugging */}
                        <Route exact path="/GTPD-Filter" component={GtpdFilter} />
                        <Route exact path="/Statistics/" component={StatisticsRedirect} />
                        <Route exact path="/Date-Time-Filter/" component={DateTimeFilter} />
                        <Route exact path="/Location-Stats-Filter/" component={LocationStatsFilter} />
                        <Route exact path="/Location-Statistics/" component={LocationStatistics} />
                        <Route exact path="/Building-Information" component={BuildingInformation} />
                        <Route exact path="/full-report/:incidentNumber" component={FullReportNew} />
                        <Route exact path="/Repeat-Offenders" component={RepeatOffender} />
                        <Route exact path="/Offender-Result/:personID" component={OffenderResult} />
                        <Route exact path="/Building-Result/:buildingNum" component={BuildingResult} />
                </Router>
            </div>
        );
    }
}

export default App;
