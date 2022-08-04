import { React, useState, useEffect } from 'react';
import { XIcon, CheckIcon } from '@heroicons/react/solid';
import PropTypes from 'prop-types';
import MyListbox from '../MyListBox';
import { DateUtils, OrderUtils } from '../../utils';
import { CalendarService } from '../../../services';

const schedule = [
  {
    start_time: 10,
    end_time: 11,
  },
  {
    start_time: 11,
    end_time: 12,
  },
  {
    start_time: 12,
    end_time: 13,
  },
];

const workflowStepsDummy = [
  {
    id: 1,
    label: 'Workflow 1',
    step_id: 1,
    step_order: 1,
    type_label: 'corte',
  },
  {
    id: 2,
    label: 'Workflow 2',
    step_id: 4,
    step_order: 2,
    type_label: 'abisagrado',
  },
  {
    id: 2,
    label: 'Workflow 2',
    step_id: 3,
    step_order: 1,
    type_label: 'corte',
  },
  {
    id: 1,
    label: 'Workflow 1',
    step_id: 2,
    step_order: 2,
    type_label: 'abisagrado',
  },
  {
    id: 2,
    label: 'Workflow 2',
    step_id: 5,
    step_order: 3,
    type_label: 'enchapado',
  },
];

const piecesRangeDummy = [
  {
    id: 1,
    duration: 0, // hoy
    range: '0-99',
  },
  {
    id: 2,
    duration: 1, // 1 dias +
    range: '100-199',
  },
  {
    id: 3,
    duration: 2, // 2 dias +
    range: '200-499',
  },
  {
    id: 4,
    duration: 4,
    range: '500+', // 4 dias +
  },
];

function CreateOrder({ setOpenCreateEvent }) {
  const [state, setState] = useState({
    isStartDateSelected: false,
    activityId: 1,
    description: '',
    piecesSelected: 1,
    client_name: '',
    invoice_num: '',
    startDate: new Date(),
    time: {
      start_time: 0,
      end_time: 0,
    },
    endDate: new Date(),
    file: null,
    isLoading: false,
    workflowSelected: 1,
    timeSelected: 1,
    schedules: {},

  });

  const [piecesRange, setpiecesRange] = useState({
    isLoading: false,
    data: [],
  });

  function getUpdatedState(currentState, stateUpdated) {
    return {
      ...currentState,
      ...stateUpdated,
    };
  }

  function setFormData(name, value) {
    setState({
      ...state,
      [name]: value,
    });
  }

  function setWorkflowSelectedId(id) {
    setState({ ...state, workflowSelected: id });
  }

  function getPiecesRangeById(id) {
    return piecesRange.data.find(
      (pieceRange) => pieceRange.id === id,
    );
  }

  function setPiecesSelected(piecesSelected) {
    const pieceRangeSelected = getPiecesRangeById(piecesSelected);
    setState({
      ...state,
      piecesSelected,
      endDate: OrderUtils.getEndDate(pieceRangeSelected.duration, state.startDate),
    });
  }

  function isLoading(value) {
    setState({ ...state, isLoading: value });
  }

  function setTimeSelectedId(id) {
    setState({ ...state, timeSelected: id });
  }

  const [workflowSteps, setWorkflowSteps] = useState({
    data: workflowStepsDummy,
    orderedData: OrderUtils.getWorkflowOrdered(workflowStepsDummy),
    isLoading: true,
  });

  function getSchedules(date) {
    CalendarService.getAvailableHours(date, 1)
      .then((response) => {
        const pieceRangeSelected = getPiecesRangeById(state.piecesSelected);
        const updatedState = getUpdatedState(
          state,
          {
            isLoading: false,
            startDate: date,
            isStartDateSelected: true,
            endDate: OrderUtils.getEndDate(pieceRangeSelected.duration, date),
            schedules: {
              data: [...response.data],
              dataToString: DateUtils.getScheduleListFormat(response.data),
            },
          },
        );
        setState(updatedState);
      })
      .catch(() => {
        const pieceRangeSelected = getPiecesRangeById(state.piecesSelected);
        const updatedState = getUpdatedState(state, {
          isLoading: false,
          startDate: date,
          isStartDateSelected: true,
          endDate: OrderUtils.getEndDate(pieceRangeSelected.duration, date),
          schedules: {
            data: [...schedule],
            dataToString: DateUtils.getScheduleListFormat(schedule),
          },
        });
        setState(updatedState);
      });
  }

  function getWorkFlowSteps() {
    CalendarService.getWorkFlowSteps()
      .then((response) => {
        const workflowStepUpdated = getUpdatedState(workflowSteps, {
          isLoading: false,
          data: [...response.data],
          orderedData: OrderUtils.getWorkflowOrdered(response.data),
        });
        setWorkflowSteps(workflowStepUpdated);
      })
      .catch(() => {
        const workflowStepUpdated = getUpdatedState(workflowSteps, {
          ...workflowSteps,
          isLoading: false,
          data: [...workflowStepsDummy],
          setErrorMsg: 'Ha ocurrido un problema cargando los horarios disponibles',
        });
        setWorkflowSteps(workflowStepUpdated);
      });
  }

  function getPiecesRange() {
    CalendarService.getPiecesRange()
      .then((response) => {
        const piecesRangeUpdated = getUpdatedState(piecesRange, {
          isLoading: false,
          data: response.data.map((pieceRange) => ({
            id: pieceRange.id,
            label: pieceRange.range,
            duration: pieceRange.duration,
          })),
        });
        setpiecesRange(piecesRangeUpdated);
      })
      .catch(() => {
        const piecesRangeUpdated = getUpdatedState(piecesRange, {
          ...piecesRange,
          isLoading: false,
          data: piecesRangeDummy.map((pieceRange) => ({
            id: pieceRange.id,
            label: pieceRange.range,
            duration: pieceRange.duration,
          })),
          setErrorMsg: 'Ha ocurrido un problema cargando los horarios disponibles',
        });
        setpiecesRange(piecesRangeUpdated);
      });
  }

  function createEvent() {
    isLoading(true);
    CalendarService.createOrder({
      description: state.description,
      start_date: DateUtils.getFormatStringDate(state.startDate),
      end_date: DateUtils.getFormatStringDate(state.endDate),
      start_time: state.schedules.data[state.timeSelected].start,
      end_time: state.schedules.data[state.timeSelected].end,
      type: 1,
      client_name: state.client_name,
      invoice_num: state.invoice_num,
      pieces_range_id: state.piecesSelected,
      plan_file: '',
      workflow: state.workflowSelected,
    })
      .then(() => {
        setOpenCreateEvent(false, true);
      })
      .catch(() => {
        const updatedState = getUpdatedState(
          state,
          {
            isLoading: false,
            setErrorMsg: 'Ha ocurrido un problema creando el pedido',
          },
        );
        setState(updatedState);
      });
  }

  useEffect(() => {
    getWorkFlowSteps();
    getPiecesRange();
  }, []);

  if (state.isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <svg className="animate-spin -ml-1 mr-3 h-12 w-12 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      </div>
    );
  }

  return (

    <div className="p-6">
      <div className="flex justify-between mb-3">
        <span className="text-2xl font-bold text-gray-900">Agendar</span>
        <div className="flex justify-end space-x-3">
          <div className="p-2 rounded bg-gray-100 cursor-pointer hover:bg-gray-50">
            <CheckIcon className="h-5 w-5 text-gray-500" onClick={() => createEvent()} />
          </div>
          <div
            className="p-2 rounded bg-gray-100 cursor-pointer hover:bg-gray-50"
            onClick={() => setOpenCreateEvent(false, false)}
            aria-hidden="true"
          >
            <XIcon className="h-5 w-5 text-gray-500" />
          </div>
        </div>
      </div>

      <div className="p-2">
        <div className="mb-2">
          <span className="font-bold">Actividad</span>
          <select
            id="activity"
            name="activity"
            autoComplete="activity-name"
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
          >
            <option>Pedido</option>
          </select>
        </div>
        <div className="mb-2">
          <span className="font-bold">Descripción</span>
          <div className="mt-1">
            <textarea
              id="description"
              name="description"
              rows={3}
              className="text-gray-500 shadow-sm focus:ring-gray-500 focus:border-gray-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
              defaultValue=""
              onChange={(e) => setFormData(e.target.name, e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-between mb-2 items-center">
          <span className="font-bold">Número de piezas</span>
          <MyListbox
            options={piecesRange.data}
            setSelectedId={(id) => setPiecesSelected(id)}
          />
        </div>
        <div className="flex justify-between mb-2 items-center">
          <span className="font-bold">Factura</span>
          <input
            type="text"
            name="invoice_num"
            id="invoice_num"
            className="text-gray-500 mt-1 focus:ring-gray-500 focus:border-gray-500 block shadow-sm sm:text-sm border-gray-300 rounded-md w-48"
            onChange={(e) => setFormData(e.target.name, e.target.value)}
          />
        </div>
        <div className="flex justify-between mb-2 items-center">
          <span className="font-bold">Nombre del cliente</span>
          <input
            type="text"
            name="client_name"
            id="client_name"
            className="text-gray-500 mt-1 focus:ring-gray-500 focus:border-gray-500 block shadow-sm sm:text-sm border-gray-300 rounded-md w-48"
            onChange={(e) => setFormData(e.target.name, e.target.value)}
          />
        </div>
        <div className="flex justify-between mb-2 items-center">
          <span className="font-bold">Fecha de agendamiento</span>
          <input
            className="text-gray-500 mt-1 focus:ring-gray-500 focus:border-gray-500 block shadow-sm sm:text-sm border-gray-300 rounded-md w-48"
            type="date"
            name="startDate"
            onChange={(e) => {
              const date = new Date(`${e.target.value}T00:00:00`);
              getSchedules(date);
            }}
          />
        </div>
        {
          state.isStartDateSelected

          && (
          <>
            <div className="flex justify-between mb-2 items-center">
              <span className="font-bold">Horario</span>
              <MyListbox
                options={state.schedules.dataToString}
                setSelectedId={(id) => setTimeSelectedId(id)}
              />
            </div>
            <div className="flex justify-between mb-2 items-center">
              <span className="font-bold">Fecha de entrega</span>
              <span className="text-gray-500">{DateUtils.fullDatetoString(state.endDate)}</span>
            </div>
            <div className="flex justify-between mb-2 items-center">
              <span className="font-bold">Flujo de trabajo</span>
              <MyListbox
                options={
                      Object.keys(workflowSteps.orderedData).map((key) => ({
                        id: key,
                        label: workflowSteps.orderedData[key].label,
                      }))
                  }
                setSelectedId={(id) => setWorkflowSelectedId(id)}
              />
            </div>
            {
                  state.workflowSelected
                  && (
                  <div className="flex justify-between mt-6 ml-4">
                    {
                          workflowSteps.orderedData[state.workflowSelected].steps.map(
                            (step) => (
                              <div className="relative h-9" key={step.order}>
                                <span className="absolute -left-3 -top-3 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-gray-100 bg-gray-700 rounded-full">
                                  {step.order}
                                </span>
                                <span className="border border-gray-300 text-gray-700 font-semibold mr-2 px-2.5 py-0.5 rounded self-center">
                                  {step.activity}
                                </span>
                              </div>
                            ),
                          )
                      }
                  </div>
                  )
              }
            <div className="flex justify-center items-center mt-5">
              <span className=" bg-gray-200 rounded px-3 py-1 w-36">
                <span className="text-gray-700 text-sm">Subir planificación</span>
                <input
                  type="file"
                  className="invisible w-0"
                  name="file"
                  onChange={(e) => {
                    const { files } = e.target;
                    const formData = new FormData();
                    formData.append('planning', files[0]);
                    setFormData(e.target.name, formData);
                  }}
                />
              </span>
            </div>

          </>
          )
        }

      </div>
    </div>
  );
}

CreateOrder.propTypes = {
  setOpenCreateEvent: PropTypes.func.isRequired,
};

export default CreateOrder;
