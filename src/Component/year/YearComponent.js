import React,{Component} from 'react';
import '../Calendar/calendar.css';

class YearComponent extends Component{

    Years = new Date().getFullYear();
    YearList=()=>{
        return(
         Array.from( new Array(50), (v,i) =>
         <option key={i*555} value={this.Years+i}>{this.Years+i}</option>
              )
        )
    }
   
 render(){
        
        return(
            <span className="label-year">
            {this.props.year}
            
            <select onChange={this.props.changeYear}>
                 {this.YearList()}
                 </select>
        </span>
        )
    }
}

export default YearComponent;