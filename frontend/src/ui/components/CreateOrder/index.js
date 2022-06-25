import { useState, Fragment, useEffect } from 'react'
import { XIcon, CheckIcon } from '@heroicons/react/solid'
import MyListbox from '../MyListBox'

const schedule = [
  {
    start_time : 10,
    end_time: 11
  },
  {
    start_time: 11,
    end_time: 12
  },
  {
      start_time: 12,
      end_time: 13
  }
]

const workflowSteps_ = [
    {
        id: 1,
        label: "Workflow 1",
        step_id: 1,
        step_order: 1,
        type_label: "corte"
    },
    {
        id: 2,
        label: "Workflow 2",
        step_id: 4,
        step_order: 2,
        type_label: "abisagrado"
    },
    {
        id: 2,
        label: "Workflow 2",
        step_id: 3,
        step_order: 1,
        type_label: "corte"
    },
    {
        id: 1,
        label: "Workflow 1",
        step_id: 2,
        step_order: 2,
        type_label: "abisagrado"
    },
    {
        id: 2,
        label: "Workflow 2",
        step_id: 5,
        step_order: 3,
        type_label: "enchapado"
    },
]


  function getEndDate(pieces, date){
    let totalDays;
    if(pieces<=100){
        totalDays = 0
    }else if(pieces<=200){
        totalDays = 1
    }else if(pieces<=500){
        totalDays = 2
    }else{
        totalDays = 4
    }
    const endDate = new Date().setDate(date.getDate()+totalDays);
    return new Date(endDate);
}
function getStringDate(date){
    return date.getDate() +" de " + new Intl.DateTimeFormat('es-US', {month: "long"}).format(date) +" del "+ date.getFullYear()
}

function getFormatStringDate(date){
    return date.toISOString().split('T')[0]
}

function CreateOrder({setOpenCreateEvent}) {
    const [state,setState] = useState({
            isStartDateSelected : false,
            activityId: 1,
            description: '',
            pieces: 0,
            client_name:'',
            invoice_num:'',
            startDate: new Date(),
            time: {
                start_time: 0,
                end_time: 0
            },
            endDate: new Date(),
            file: null,
            isLoading: false,
            workflowSelected: 1,
            timeSelected: 1,
            schedules: {}

    });

    const [schedules, setSchedules] = useState({
        data: schedule,
        dataToString: null,
        isLoading: true
    })

    const [workflowSteps, setWorkflowSteps] = useState({
        data: workflowSteps_,
        orderedData: getWorkflowOrdered(workflowSteps_),
        isLoading: true
    })

    function getSchedules(date){
        fetch("/available_hours/")
        .then((response) => response.json())
        .then((response) => {
            updateState({
                isLoading: false,
                startDate: date,
                isStartDateSelected: true,
                endDate: getEndDate(state.pieces, date),
                schedules: {
                    data: [...response.message],
                    dataToString: getAvalibleSchedule(response.message)
                }
            })

        })
        .catch(() => {
            setSchedules({
                ...schedules,
                isLoading: false,
                data: [...schedule],
                setErrorMsg: 'Ha ocurrido un problema cargando los horarios disponibles'
            });
        })
    }

    function getWorkFlowSteps (){
        fetch("/workflows/")
        .then((response) => response.json())
        .then((response) => {
            setWorkflowSteps({
                ...workflowSteps,
                isLoading: false,
                data: [...response],
                orderedData: getWorkflowOrdered(response)
                
            });
        })
        .catch(() => {
            setWorkflowSteps({
                ...workflowSteps,
                isLoading: false,
                data: [...workflowSteps_],
                setErrorMsg: 'Ha ocurrido un problema cargando los horarios disponibles'
            });
        })
    }
    
    function createEvent(){
        updateState({isLoading: true})
        fetch('/order/', {
            method: 'POST',
            body: JSON.stringify({
                description: state.description,
                start_date: getFormatStringDate(state.startDate),
                end_date: getFormatStringDate(state.endDate),
                start_time: state.schedules.data[state.timeSelected].start,
                end_time: state.schedules.data[state.timeSelected].end,
                type: 1,
                client_name: state.client_name,
                invoice_num: state.invoice_num,
                pieces_number: state.pieces,
                plan_file: '',
                workflow: {
                    id: state.workflowSelected,
                    steps: workflowSteps.orderedData[state.workflowSelected].steps.map((step) => {
                        return {
                            workflowstep_id: step.id,
                            order: step.order
                        }
                    })
                }
            })
        })
        .then((response) => response.json())
        .then((response) => {
            setOpenCreateEvent(false,true)
        })
        .catch(() => {
            updateState({
                isLoading: false,
                setErrorMsg: 'Ha ocurrido un problema creando el pedido',
            })
        })
    }

    function updateState(stateUpdated){
        setState(
            {
                ...state,
                ...stateUpdated
            }
        )
    }

    function getAvalibleSchedule(schedules) {
        return schedules.map((time, idx) => {
            return {
                label: time.start + ":00-" + time.end + ":00",
                id: idx
            }
        })
    }

    function getWorkflowOrdered(workflowSteps){
        return workflowSteps.reduce((acc, workflow) =>{
            const step = {
                id: workflow.step_id,
                order: workflow.step_order,
                activity: workflow.type_label
            }
            let steps = acc[workflow.id]?.steps || []
            steps = [...steps, step]
            return{
                ...acc,
                [workflow.id] : {
                    label: workflow.label,
                    steps: steps.sort((s1,s2) => s1.order - s2.order)
                }
            }
        },{})
    }
    useEffect(() => {
        getWorkFlowSteps();
    },[])
    if (state.isLoading)
        return <div className='flex justify-center items-center h-screen'>
            <svg className="animate-spin -ml-1 mr-3 h-12 w-12 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
        </div>
    else{
        return(

            <div className='p-6'>
                <div className='flex justify-between mb-3'>
                    <label className="text-2xl font-bold text-gray-900">Agendar</label>
                    <div className='flex justify-end space-x-3'>
                        <div className='p-2 rounded bg-gray-100 cursor-pointer hover:bg-gray-50'>
                            <CheckIcon className="h-5 w-5 text-gray-500" onClick={createEvent}/>
                        </div>
                        <div className='p-2 rounded bg-gray-100 cursor-pointer hover:bg-gray-50'
                            onClick={()=>setOpenCreateEvent(false, false)}>
                            <XIcon className="h-5 w-5 text-gray-500"/>
                        </div>
                    </div>
                </div>
                
                <div className='p-2'>
                    <div className='mb-2'>
                        <label className='font-bold'>Actividad</label>
                        <select
                            id="activity"
                            name="activity"
                            autoComplete="activity-name"
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                          >
                            <option>Pedido</option>
                          </select>
                    </div>
                    <div className='mb-2'>
                        <label className='font-bold'>Descripción</label>
                        <div className="mt-1">
                          <textarea
                            id="about"
                            name="about"
                            rows={3}
                            className="text-gray-500 shadow-sm focus:ring-gray-500 focus:border-gray-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                            defaultValue={''}
                            onChange={(e) => {
                                updateState({description:e.target.value});
    
                            }}
                          />
                        </div>
                    </div>
                    <div className='flex justify-between mb-2 items-center'>
                        <label className='font-bold'>Número de piezas</label>
                        <input
                            type="number"
                            name="pieces"
                            id="pieces"
                            className="text-gray-500 mt-1 focus:ring-gray-500 focus:border-gray-500 block shadow-sm sm:text-sm border-gray-300 rounded-md w-48"
                            onChange={(e) => {
                                updateState({pieces: parseInt(e.target.value), endDate: getEndDate(e.target.value,state.startDate)});
                            }}
                          />
                    </div>
                    <div className='flex justify-between mb-2 items-center'>
                        <label className='font-bold'>Factura</label>
                        <input
                            type="text"
                            name="invoice"
                            id="invoice"
                            className="text-gray-500 mt-1 focus:ring-gray-500 focus:border-gray-500 block shadow-sm sm:text-sm border-gray-300 rounded-md w-48"
                            onChange={(e) => {
                                updateState({invoice_num: e.target.value});
                            }}
                          />
                    </div>
                    <div className='flex justify-between mb-2 items-center'>
                        <label className='font-bold'>Nombre del cliente</label>
                        <input
                            type="text"
                            name="client_name"
                            id="client_name"
                            className="text-gray-500 mt-1 focus:ring-gray-500 focus:border-gray-500 block shadow-sm sm:text-sm border-gray-300 rounded-md w-48"
                            onChange={(e) => {
                                updateState({client_name: e.target.value});
                            }}
                          />
                    </div>
                    <div className='flex justify-between mb-2 items-center'>
                        <label className='font-bold'>Fecha de agendamiento</label>
                        <input 
                            className='text-gray-500 mt-1 focus:ring-gray-500 focus:border-gray-500 block shadow-sm sm:text-sm border-gray-300 rounded-md w-48' 
                            type='date' 
                            onChange={(e) => {
                                const date = new Date(e.target.value+"T00:00:00");
                                getSchedules(date);
                                
                            
                            }}
                        />
                    </div>
                    {
                        state.isStartDateSelected && 
                       
                        <Fragment>
                            <div className='flex justify-between mb-2 items-center'>
                                <label className='font-bold'>Horario</label>
                                <MyListbox options={state.schedules.dataToString}
                                setSelectedId = {(id) => updateState({timeSelected: id})}
                                />
                            </div>
                            <div className='flex justify-between mb-2 items-center'>
                                <label className='font-bold'>Fecha de entrega</label>
                                <label className='text-gray-500'>{getStringDate(state.endDate)}</label>
                            </div>
                            <div className='flex justify-between mb-2 items-center'>
                                <label className='font-bold'>Flujo de trabajo</label>
                                <MyListbox options={
                                    Object.keys(workflowSteps.orderedData).map((key)=>{
                                        return {
                                            id: key,
                                            label: workflowSteps.orderedData[key].label
                                        }
                                    })
                                }
                                setSelectedId = {(id) => updateState({workflowSelected: id})}
                                />
                            </div>
                            {
                                state.workflowSelected &&
                                <div className='flex justify-between mt-6 ml-4'>
                                    {
                                        workflowSteps.orderedData[state.workflowSelected].steps.map((step) => {
                                            return <div className='relative h-9' key={step.order}>
                                                <span className="absolute -left-3 -top-3 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-gray-100 bg-gray-700 rounded-full">
                                                {step.order}
                                                </span>
                                                <span className='border border-gray-300 text-gray-700 font-semibold mr-2 px-2.5 py-0.5 rounded self-center'>
                                                    {step.activity}
                                                </span>
                                            </div>
                                        })
                                    }
                                </div>
                            }
                            <div className='flex justify-center items-center mt-5'>
                                <label className=" bg-gray-200 rounded px-3 py-1 w-36">
                                    <span className="text-gray-700 text-sm">Subir planificación</span>
                                    <input type="file"
                                    className="invisible w-0" 
                                    onChange={(e) => {
                                        const files = e.target.files
                                        const formData = new FormData()
                                        formData.append('planning', files[0])
                                        updateState({file: formData})
                                    }}
                                    />
                                </label>
                            </div>
                            
                        </Fragment> 
                    }
    
                </div>
            </div>
        );
    }
    
}

export default CreateOrder;