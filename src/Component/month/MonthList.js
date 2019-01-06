import React from 'react';
import '../Calendar/calendar.css';


const MonthList=(props)=>{
    let pop=props.data.map(d=>{
        return(
            <div key={d*432}> <a href={'#'+d} onClick={(e)=>{props.selectMonth(e,d)}}>{d}</a></div>
        )
    })
    return(

        <div className="month-popup">{pop}</div>
    )
}



export default MonthList;