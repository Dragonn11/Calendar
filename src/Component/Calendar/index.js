import React,{Component} from 'react';
import moment from 'moment';
import './calendar.css';
class Calender extends Component{

    constructor(props){
        super(props)
        this.state={
            momentText:moment(),
            curr_day:moment(),
            showMonth:false,
            showYear:false
        }
        
    }
    Days=moment.weekdaysShort();
    Months=moment.months();
    Years = new Date().getFullYear();

    UNSAFE_componentWillMount(){
        //page refresh and reload logic
        if (window.performance) {
            if (performance.navigation.type === 1) {
               
                let month=window.location.href.substring(window.location.href.indexOf("#")+1);
                let momentText=Object.assign({},this.state.momentText);
                momentText=moment(momentText).set("month",month);
                if(month!==this.state.momentText.format("MMMM")){
                    this.setState({ momentText:momentText})
                }
            }
          }

      }

    year = () => {
        return this.state.momentText.format("Y");
    }
    month = () => {
        return this.state.momentText.format("MMMM");
    }
    monthDays = () => {
        return this.state.momentText.daysInMonth();
    }
    currentDate = () => {
        console.log("currentDate: ", this.state.momentText.get("date"));
        return this.state.momentText.get("date");
    }
    currentDay = () => {
        return this.state.momentText.format("D");
    }
////////////////////showing the hidden dates of the month//////////////////
    firstday=()=>{
        let earlyDays=[];
        let firstday=moment(this.state.momentText).startOf('month').format('d');
        let dateFrom = moment(this.state.momentText).subtract(1, 'months');
        let prevDays=dateFrom.daysInMonth();

        for(let i=0;i<firstday;i++){
            earlyDays.unshift(prevDays-i)
        }
        return earlyDays;
    }

    lastday=()=>{
        let lastDays=[];
        let firstday=moment(this.state.momentText).startOf('month').format('d');
        let totaldays=parseInt(firstday,10)+parseInt(this.monthDays(),10) ;
        let extraDays= (7-(totaldays%7));
        for(let i=1;i<=extraDays;i++){
            lastDays.push(i);
        }
        return lastDays;
    }
/////////////////////////////Month Dropdown list logic//////////////////////////////////////////////
    setMonth=(month)=>{
        let momentText=Object.assign({},this.state.momentText);
        let currMonth=this.Months.indexOf(month);
        momentText=moment(momentText).set("month",currMonth);
        this.setState({
            momentText:momentText
        })
       
    }
    selectMonth=(e,month)=>{
        this.setMonth(month); 
    }  
    MonthList=(props)=>{
        let pop=props.data.map(d=>{
            return(
                <div key={d*34}> <a href={'#'+d} onClick={(e)=>{this.selectMonth(e,d)}}>{d}</a></div>
            )
        })
        return(
            <div className="month-popup">{pop}</div>
        )
    }

//////////////////////////////////action on month change logic/////////////////////////////////////
   


     NavigateMonth= () =>{
         //////////////////// Navigate month component//////////////////////
        return(
            <span className="label-month" onClick={(e)=>{this.changeMonth(e,this.month())}}>
                {this.month()}
                {this.state.showMonth && 
                <this.MonthList data={this.Months}/>}
            </span>
        )
    }

    changeMonth=(e,month)=>{
        this.setState({
            showMonth:!this.state.showMonth
        })

    }

////////////////////////////////Year drop down logic////////////////////////////////////////////////
    changeYear=(e)=>{

        let momentText=Object.assign({},this.state.momentText);
        // let currMonth=this.Months.indexOf(month);
        momentText=moment(momentText).set("year",e.target.value);
        this.setState({
            momentText:momentText
        })

    }

    YearList=()=>{
           return(
            Array.from( new Array(50), (v,i) =>
            <option key={i*89} value={this.Years+i}>{this.Years+i}</option>
           )
           )
    }

    NavigateYear=()=>{
     ////////////////navigate year component///////////////////////////////
        return(
            <span className="label-year">
                {this.year()}
                
                <select onChange={this.changeYear}>
                     {this.YearList()}
                     </select>
            </span>
        )
    }
//////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////Navigation arrow logic left and right////////////////////////////

    nxtMonth = () => {
        let Context = Object.assign({}, this.state.momentText);
        Context = moment(Context).add(1, "month");
        console.log(Context.format("MMMM"))
        window.location.href='#'+Context.format("MMMM");
        this.setState({
            momentText: Context
        });
    }

    prevMonth = () => {
        let Context = Object.assign({}, this.state.momentText);
        Context = moment(Context).subtract(1, "month");
        this.setState({
            momentText: Context
        });
       
    }

  /////////////////////////////////////////////////////////////////////////////////////


    render(){
       
        let days=this.Days.map(d=>{
            return(
                <td key={d*50} className="week-day">{d}</td>
            )
        })

        let hiddenDates=[];
        for(let i=0;i<this.firstday().length;i++){
            hiddenDates.push(<td key={i*45} style={{color:'grey'}}>{this.firstday()[i]}</td>)
        }

        let lastHiddenDates=[];
        for(let i=0;i<this.lastday().length;i++){
            lastHiddenDates.push(<td key={i*65} style={{color:'grey'}}>{this.lastday()[i]}</td>)
        }

        let monthDays=[];
        for(let i=1;i<=this.monthDays();i++){
            let className=(i===this.currentDay()?"day current-day":"day")
            monthDays.push(<td key={i*80} className={className}><span>{i}</span></td>)
        }

        let totalCells=[...hiddenDates,...monthDays,...lastHiddenDates];
        let rows=[];
        let elements=[];

        totalCells.forEach((r,i)=>{
    
            if(i%7!==0) elements.push(r);
            else {
                let insertRow=elements.slice();
                rows.push(insertRow);
                elements=[];
                elements.push(r)
            }
            if(i===totalCells.length-1){
                let insert=elements.slice();
                rows.push(insert);
            }

        })

        let actualDays=rows.map((d,i)=>{

            return (
                <tr key={i*9}>{d}</tr>
            )
        })

       
        return(
            <div className="calendar-container"  style={{position:'relative', margin:'50px auto' ,width:'350px'}}>
                <table className="calendar">

                <thead>
                    <tr className="calendar-header">
                    <td colSpan='5'>
                        <this.NavigateMonth />
                        {" "}
                        <this.NavigateYear/>
                    </td>
                    <td colSpan="2" className="nav-month">
                        <i className="prev fa fa-fw fa-chevron-left" onClick={(e)=>{this.prevMonth(e)}}></i>
                        <i className="prev fa fa-fw fa-chevron-right" onClick={(e)=>{this.nxtMonth(e)}}></i>
                    </td>
                    
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    {days}
                    </tr>
                    {actualDays}
                </tbody>
                
                </table>
            </div>
        )
    }
}
export default Calender;