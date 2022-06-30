import { React, useState } from 'react';
import { WeeklyView } from '../components/Calendar';
import { TasksHeader } from '../components/TaskList';
import { DateUtils } from '../../utils';

function Calendar() {
  
  const [state, setState] = useState(
    {
      selectedDate: DateUtils.getMonday(new Date()),
      currentDate: new Date(),
      flagEvents: false,
      openCreationForm: false,
    },
  );
  const setSelectedDate = (date) => {
    setState({ ...state, selectedDate: date, flagEvents: !state.flagEvents });
  };

  const setOpenCreateEvent = (value, withLoadData) => {
    if (withLoadData) {
      setState({ ...state, openCreationForm: value, flagEvents: !state.flagEvents });
    } else {
      setState({ ...state, openCreationForm: value });
    }
  };

  return (
    <div className="">
      <TasksHeader
        selectedView={1}
        selectedDate={state.selectedDate}
        setSelectedDate={setSelectedDate}
        setOpenCreateEvent={setOpenCreateEvent}
      />
      <WeeklyView
        currentDate={state.currentDate}
        selectedDate={state.selectedDate}
        flagEvents={state.flagEvents}
        openCreateEvent={state.openCreationForm}
        setOpenCreateEvent={setOpenCreateEvent}
      />
    </div>
  );
}

export { Calendar };
