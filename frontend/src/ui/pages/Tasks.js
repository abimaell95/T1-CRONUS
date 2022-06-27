import { React, useEffect, useState } from 'react';
import { ChevronRightIcon, ChevronDownIcon } from '@heroicons/react/solid';
import PropTypes from 'prop-types';
import { TasksHeader } from '../components/TaskList';
import CreateOrder from '../components/CreateOrder';

function Tasks() {
  const getMonday = (date) => {
    const mondayDate = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
    return new Date(date.getFullYear(), date.getMonth(), mondayDate);
  };

  // get days of current week
  const generateDays = (date) => {
    const mondayDate = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
    const mondayOfWeek = new Date(date.getFullYear(), date.getMonth(), mondayDate);

    const days = [];

    for (let i = 0; i < 7; i += 1) {
      const currentDay = new Date(
        mondayOfWeek.getFullYear(),
        mondayOfWeek.getMonth(),
        mondayOfWeek.getDate() + i,
      );
      days.push(currentDay);
    }
    return days;
  };

  const [state, setState] = useState({
    loadingData: true,
    orders: {},
    selectedDate: getMonday(new Date()),
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

  const ordersMockData = [
    {
      id: 1,
      invoice_num: '100-5896',
      client_name: 'Carmen Pinto',
      start_datetime: '2022-05-22',
      end_datetime: '2022-02-23',
      state: 1,
      state_label: 'No Iniciado',
      employee: '0927643825',
      type_label: 'Corte',
    },
    {
      id: 2,
      invoice_num: '100-5897',
      client_name: 'Carmen Pinto',
      start_datetime: '2022-05-23',
      end_datetime: '2022-02-24',
      state: 1,
      state_label: 'No Iniciado',
      employee: '0927643825',
      type_label: 'Corte',
    },
    {
      id: 3,
      invoice_num: '100-5898',
      client_name: 'Carmen Pinto',
      start_datetime: '2022-05-22',
      end_datetime: '2022-02-23',
      state: 1,
      state_label: 'No Iniciado',
      employee: '0927643825',
      type_label: 'Corte',
    },
    {
      id: 4,
      invoice_num: '100-5899',
      client_name: 'Carmen Pinto',
      start_datetime: '2022-05-22',
      end_datetime: '2022-02-23',
      state: 1,
      state_label: 'No Iniciado',
      employee: '0927643825',
      type_label: 'Corte',
    },
    {
      id: 5,
      invoice_num: '100-5900',
      client_name: 'Carmen Pinto',
      start_datetime: '2022-05-23',
      end_datetime: '2022-02-23',
      state: 1,
      state_label: 'No Iniciado',
      employee: '0927643825',
      type_label: 'Corte',
    },
    {
      id: 6,
      invoice_num: '100-5901',
      client_name: 'Carmen Pinto',
      start_datetime: '2022-05-22',
      end_datetime: '2022-02-23',
      state: 1,
      state_label: 'No Iniciado',
      employee: '0927643825',
      type_label: 'Corte',
    },
    {
      id: 7,
      invoice_num: '100-5902',
      client_name: 'Carmen Pinto',
      start_datetime: '2022-05-24',
      end_datetime: '2022-02-23',
      state: 1,
      state_label: 'No Iniciado',
      employee: '0927643825',
      type_label: 'Corte',
    },
  ];

  function dateToString(date) {
    const year = date.getFullYear();
    const month = date.getMonth().toString().length > 1 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
    const day = date.getDate();
    return `${year}-${month}-${day}`;
  }

  function loadOrdersData() {
    const strDate = dateToString(state.selectedDate);
    const [year, month, day] = strDate.split('-');
    fetch(`/orders/?year=${year}&month=${month}&day=${day}`)
      .then((response) => response.json())
      .then((data) => {
        const orders = data.reduce((group, task) => {
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
            new Map(generateDays(state.selectedDate).map(
              (date) => [dateToString(date), orders[dateToString(date)] || []],
            )),
          ),
        });
      }).catch(() => {
        const data = ordersMockData.reduce((group, task) => {
          const { start_datetime } = task;
          const actualGroup = group[start_datetime] ?? [];
          return {
            ...group,
            [start_datetime]: [...actualGroup, task],
          };
        }, {});
        setState({
          ...state,
          loadingData: false,
          orders: Object.fromEntries(
            new Map(generateDays(state.selectedDate).map(
              (date) => [dateToString(date), data[dateToString(date)] || []],
            )),
          ),
        });
      });
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

function TaskList({
  ordersList, loadingData, openCreateEvent, setOpenCreateEvent,
}) {
  if (loadingData) {
    return (
      <div className="flex h-4/5 justify-center items-center">
        <svg className="animate-spin h-16 w-16 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-8 ">
      <div className={`${!openCreateEvent ? 'col-span-8' : 'col-span-5'}`}>
        <div className="flex flex-col">
          <div className={`border-b border-gray-200 text-center text-gray-800 font-light grid ${!openCreateEvent ? 'grid-cols-8' : 'grid-cols-5'}`}>
            <div className="col-span-2 py-4" />
            <div className="col-span-1 border-l border-gray-200 py-2">
              Cliente
            </div>
            <div className="col-span-1 border-l border-gray-200 py-2">
              Fecha de creación
            </div>
            <div className="col-span-1 border-l border-gray-200 py-2">
              Fecha de entrega
            </div>
            {!openCreateEvent
                        && (
                        <>
                          <div className="col-span-1 border-l border-gray-200 py-2">
                            Etapa actual
                          </div>
                          <div className="col-span-1 border-l border-gray-200 py-2">
                            Estado
                          </div>
                          <div className="col-span-1 border-l border-gray-200 py-2">
                            Agendado por
                          </div>
                        </>
                        )}
          </div>
          {Object.keys(ordersList).map((string_date) => (
            <DateRow
              stringDate={string_date}
              tasks={ordersList[string_date]}
              openCreateEvent={openCreateEvent}
              key={string_date}
            />
          ))}
        </div>
      </div>
      {openCreateEvent
            && (
            <div className="col-span-3 border-l border-gray-200">
              <CreateOrder setOpenCreateEvent={setOpenCreateEvent} />
            </div>
            )}
    </div>

  );
}

TaskList.propTypes = {
  ordersList: PropTypes.object.isRequired,
  loadingData: PropTypes.bool.isRequired,
  openCreateEvent: PropTypes.bool.isRequired,
  setOpenCreateEvent: PropTypes.func.isRequired,
};

function StateBagde({ state }) {
  const stateMap = {
    1: 'text-slate-700 bg-slate-100 hover:bg-slate-200',
    2: 'text-amber-700 bg-amber-100 hover:bg-amber-200',
    3: 'text-emerald-700 bg-emerald-100 hover:bg-emerald-200',
    4: 'text-slate-700 bg-slate-100 hover:bg-slate-200',
    5: 'text-slate-700 bg-slate-100 hover:bg-slate-200',
    6: 'text-rose-700 bg-rose-100 hover:bg-rose-200',
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md font-medium ${stateMap[state.id]}`}>
      {state.label}
    </span>
  );
}

StateBagde.propTypes = {
  state: PropTypes.object.isRequired,
};

function DateRow({ stringDate, tasks, openCreateEvent }) {
  const [state, setState] = useState({
    open: false,
  });

  const switchDay = () => {
    setState({
      ...state, open: !state.open,
    });
  };

  return (
    <div className="flex flex-col">
      <div
        className="py-4 px-4 flex flex-row cursor-pointer hover:bg-gray-50 border-b border-gray-200"
        onClick={switchDay}
        aria-hidden="true"
      >
        {state.open ? <ChevronDownIcon className="h-6 w-6" /> : <ChevronRightIcon className="h-6 w-6" />}
        <p className="text-xl text-gray-900 font-light">
          {stringDate}
        </p>
      </div>
      {state.open && tasks.map((task) => {
        if (Object.keys(task).length > 0) {
          return (
            <div
              key={task.invoice_num}
              className={`border-b border-gray-200 text-center text-gray-800 font-light grid ${openCreateEvent ? 'grid-cols-5' : 'grid-cols-8'}`}
            >
              <div className="col-span-2 py-2">
                {task.invoice_num}
              </div>
              <div className="col-span-1 border-l border-gray-200 py-2">
                {task.client_name}
              </div>
              <div className="col-span-1 border-l border-gray-200 py-2">
                {task.start_datetime.split('T')[0]}
              </div>
              <div className="col-span-1 border-l border-gray-200 py-2">
                {task.end_datetime.split('T')[0]}
              </div>
              {!openCreateEvent
                            && (
                            <>
                              <div className="col-span-1 border-l border-gray-200 py-2">
                                {task.type_label}
                              </div>
                              <div className="col-span-1 border-l border-gray-200 py-2">
                                <StateBagde state={{ id: task.state, label: task.state_label }} />
                              </div>
                              <div className="col-span-1 border-l border-gray-200 py-2">
                                {task.employee}
                              </div>
                            </>
                            )}
            </div>
          );
        }
        return <div> </div>;
      })}
    </div>
  );
}

DateRow.propTypes = {
  stringDate: PropTypes.string.isRequired,
  tasks: PropTypes.array.isRequired,
  openCreateEvent: PropTypes.bool.isRequired,
};

export { Tasks };
