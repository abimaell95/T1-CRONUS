import { React, useEffect, useState } from 'react';
import { TasksHeader, TaskList } from '../components/TaskList';
import { DateUtils } from '../utils/DateUtils';
import { CalendarService } from '../../services/calendar.service';
import useUser from '../components/Hooks/useUser';
import {useNavigate } from 'react-router';

function Tasks() {
  const navigate = useNavigate();
  const { isLogged} = useUser();
  // get days of current week

  const [state, setState] = useState({
    loadingData: true,
    orders: {},
    selectedDate: DateUtils.getMonday(new Date()),
    currentDate: new Date(),
    flagEvents: false,
    openCreationForm: false,
  });

  const setSelectedDate = (date) => {
    setState({ ...state, selectedDate: date, flagEvents: !state.flagEvents });
  };

  const setOpenCreateEvent = (value, withLoadData, loadingKey) => {
    if (withLoadData) {
      setState({ ...state, openCreationForm: value, [loadingKey]: !state[loadingKey] });
    } else {
      setState({ ...state, openCreationForm: value });
    }
  };

  function loadOrdersData() {
    CalendarService.getOrders(state.selectedDate)
      .then(
        (response) => {
          const orders = response.status === 204 ? {} : response.data.reduce((group, task) => {
            const { start_datetime } = task;
            const stripedDatetime = start_datetime.split('T')[0];
            const actualGroup = group[stripedDatetime] ?? [];
            return {
              ...group,
              [stripedDatetime]: [...actualGroup, task],
            };
          }, {});
          setState({
            ...state,
            loadingData: false,
            orders: Object.fromEntries(
              new Map(DateUtils.generateDays(state.selectedDate).map(
                (date) => [
                  DateUtils.dateToString(date),
                  orders[DateUtils.dateToString(date)] || []],
              )),
            ),
          });
        },
      );
  }

  useEffect(() => {
    loadOrdersData();
  }, [state.flagEvents]);

  return (
    <div className="h-screen">
      <TasksHeader
        selectedView={0}
        selectedDate={state.selectedDate}
        setSelectedDate={setSelectedDate}
        setOpenCreateEvent={setOpenCreateEvent}
      />
      <TaskList
        ordersList={state.orders}
        loadingData={state.loadingData}
        openCreateEvent={state.openCreationForm}
        setOpenCreateEvent={setOpenCreateEvent}
      />
    </div>
  );
}

export { Tasks };
