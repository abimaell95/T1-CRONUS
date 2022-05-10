import { useState } from 'react';

function TimesInput(){
    return(
        <div className='flex space-x-5 shadow p-6 rounded-lg '>
            <TimeInput label={"Hora inicio"}></TimeInput>
            <TimeInput label={"Hora fin"}></TimeInput>
        </div>
    );
}
function TimeInput(props){
    const [time, setTime] = useState("00:00");
    return(
        <div className="rounded-md p-3 bg-white border border-gray-300 w-1/2">
                <label htmlFor="floatingInput" className="text-sm font-medium tracking-wide px-1.5">{props.label}</label>
                <input type="time"
                className="form-control block border-none rounded transition mx-none p-1.5 focus:ring-0 focus:border-none"
                placeholder="Select a date" 
                data-mdb-toggle="input-toggle-timepicker" 
                value={time}
                onChange={(e)=>{
                   setTime(e.target.value);
                }}/>
                
        </div>
    );
}

export default TimesInput;