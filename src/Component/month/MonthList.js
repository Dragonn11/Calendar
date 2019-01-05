import React,{Component} from 'react';
import moment from 'moment';
import '../Calendar/calendar.css';

class MonthList extends Component{

    // constructor(props){
    //     super(props)

        

    // }
    Months=moment.months();
    
    render(){
        console.log(this.props.data)
        let pop=this.props.data.map(d=>{
            return(
                <div key={d*34}> <a href={'#'+d} onClick={(e)=>{this.props.selectMonth(e,d)}}>{d}</a></div>
            )
        })
        return(
            <div className="month-popup">{pop}</div>
        )
    }
}

export default MonthList;