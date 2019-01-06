import React,{Component} from 'react';
import moment from 'moment';
import MonthList from './MonthList';
import '../Calendar/calendar.css';

class MonthComponent extends Component{

    constructor(props){
        super(props)

        this.state={
            showMonth:false
        }

    }
    Months=moment.months();
    changeMonth=(e,month)=>{
        this.setState({
            showMonth:!this.state.showMonth
        })

    }
    
    render(){
        
        return(
            <span className="label-month" onClick={(e)=>{this.changeMonth(e,this.props.month)}}>
                {this.props.month}
                {this.state.showMonth && 
                <MonthList data={this.Months} selectMonth={this.props.handleSelectMonth}/>}
            </span>
        )
    }
}

export default MonthComponent;