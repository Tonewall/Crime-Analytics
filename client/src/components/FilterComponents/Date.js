import React, { Component } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const dateOptions = [
    {value: 'week', label: 'Past Week'},
    {value: 'month', label: 'Past Month'},
    {value: 'halfYear', label: 'Past Half Year'},
    {value: 'year', label: 'Past Year'},
];


class date extends Component {
    state = {
        startDate: new Date(),
        endDate: new Date(),
        selectedDate: null,
    };

    //changing the date based on the date range chosen
    setDate = selectedDate => {
        this.setState({selectedDate});
        //for the dropdown date ranges
        var date = new Date()
        var newDate = new Date()
        if(selectedDate.value === "week") {
            newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7);
        } else if(selectedDate.value === "month") {
            var newMonth = newDate.getMonth() - 1;
            newDate.setMonth(newMonth);
        }else if(selectedDate.value === "halfYear") {
            newDate = new Date(date.getFullYear(), date.getMonth() - 6, date.getDate());
        }else if(selectedDate.value === "year") {
            var newYear = newDate.getFullYear() - 1;
            newDate.setYear(newYear);
        }
        this.setState({startDate: newDate},
        function() {
            this.props.dateHandler(this.state)
        });
    }
    handleStartChange = date => {
        this.setState({startDate: date},
        function() {
            this.props.dateHandler(this.state)
        });
    };
    handleEndChange = date => {
        this.setState({endDate: date},
        function() {
            this.props.dateHandler(this.state)
        });
    };

    render() {
        const { selectedDate } = this.state;
        return(
            <div className="main">
                <div className="card filterTypeCards dateCard">
                    <h4 className="card-header">Date</h4>
                    <div className="card-body">
                        <div className="col-12 dateFilters">
                            <label className="col-12 col-form-label">
                                Date Range
                            </label>
                            <div>
                                <Select 
                                value={selectedDate} 
                                onChange={this.setDate} 
                                options={dateOptions} 
                                placeholder={"Custom"}
                                />
                            </div>
                        </div>
                        
                        <div className="col-12">
                            <label className="dateLabel">From:</label>
                        </div>
                        <div className="col-12 dateFilters">
                            <DatePicker
                                selected={this.state.startDate}
                                onChange={this.handleStartChange}
                            />
                        </div>
                        <div className="col-12">
                            <label className="dateLabel">To:</label>
                        </div>
                        <div className="col-12 dateFilters">
                            <DatePicker
                                selected={this.state.endDate}
                                onChange={this.handleEndChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default date;

