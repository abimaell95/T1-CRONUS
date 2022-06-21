import { useEffect, useState } from 'react';
import {WeeklyView} from '../components/Calendar';
import {TasksHeader} from '../components/TaskList'

function Calendar(){


    const getMonday = (date) => {
        const mondayDate = date.getDate() - date.getDay() + ( date.getDay() == 0 ? -6:1);
        return new Date(date.getFullYear(), date.getMonth(), mondayDate);
    }

    const [state, setState ] = useState(
        {
          selectedDate: getMonday(new Date()),
          currentDate:  new Date(),
          flagEvents: false
        }
    );


    const setSelectedDate = (date) => {
        setState({...state, selectedDate: date, flagEvents: !state.flagEvents})
    }


    return(
        <div className="">
            <TasksHeader selectedView={1} selectedDate={state.selectedDate} setSelectedDate={setSelectedDate}/>
            <WeeklyView currentDate={state.currentDate} selectedDate={state.selectedDate} flagEvents={state.flagEvents}/>
            
        </div>
    );
}

export {Calendar};