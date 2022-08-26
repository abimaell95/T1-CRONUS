import { React, useState } from 'react';
import { WeeklyView } from '../components/Calendar';
import { TasksHeader } from '../components/TaskList';
import Header from '../components/Header';
import { DateUtils } from '../utils';

function Calendar() {
  const [state, setState] = useState(
    {
      selectedDate: DateUtils.getMonday(new Date()),
      branchOffice: 1,
      selectedService: -1,
      currentDate: new Date(),
      flagEvents: false,
      openCreationForm: false,
    },
  );

  const setBranchOffice = (branchID) => {
    setState({ ...state, branchOffice: branchID, flagEvents: !state.flagEvents });
  };

  const setSelectedService = (service) => {
    setState({ ...state, selectedService: service, flagEvents: !state.flagEvents });
  };

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
      <Header />
      <TasksHeader
        selectedView={1}
        selectedDate={state.selectedDate}
        setSelectedDate={setSelectedDate}
        setOpenCreateEvent={setOpenCreateEvent}
        setBranchOffice={setBranchOffice}
        setSelectedService={setSelectedService}
      />
      <WeeklyView
        currentDate={state.currentDate}
        selectedDate={state.selectedDate}
        flagEvents={state.flagEvents}
        branchOffice={state.branchOffice}
        selectedService={state.selectedService}
        openCreateEvent={state.openCreationForm}
        setOpenCreateEvent={setOpenCreateEvent}
      />
    </div>
  );
}

export { Calendar };
