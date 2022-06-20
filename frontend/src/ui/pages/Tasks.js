import { useEffect, useState } from 'react';
import { MenuIcon, TableIcon, CalendarIcon , ChevronLeftIcon, ChevronRightIcon, ChevronDownIcon} from '@heroicons/react/solid'


function BurgerButton(){
    return(
        <div className="">
         <MenuIcon className="h-8 w-8 text-gray-900"/>
        </div>
    );
}

function Tasks (){
    return(
        <div className="">
            <header className="">
                <div className="flex flex-row px-4 pt-4 justify-center border-b border-gray-200">
                    <nav class="-mb-px flex space-x-8" aria-label="Tabs">
                        <a href="#" class="border-indigo-500 text-indigo-600 group inline-flex items-center pb-2 px-1 border-b-2 font-medium text-sm">
                            <TableIcon className="text-indigo-500 -ml-0.5 mr-2 h-5 w-5"/>
                            <span>Lista</span>
                        </a>
                        <a href="#" class="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 group inline-flex items-center pb-2 px-1 border-b-2 font-medium text-sm">
                            <CalendarIcon className="text-gray-400 group-hover:text-gray-500 -ml-0.5 mr-2 h-5 w-5"/>
                            <span>Calendario</span>
                        </a>          
                    </nav>

                </div>
            </header>
            <div className="w-full py-6 flex items-center justify-between px-8">
                <span class="relative z-0 inline-flex shadow-sm rounded-md">
                    <div type="button" class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer">
                        <ChevronLeftIcon className="h-5 w-5"/>
                    </div>
                    <div className="-ml-px relative inline-flex items-center px-2 py-2  border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
                    2022, Junio 13 - 19
                    </div>
                    <div type="button" class="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer">
                        <ChevronRightIcon className="h-5 w-5"/>
                    </div>
                </span>
                <div type="button" class="relative inline-flex items-center px-4 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer">
                    <CalendarIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400"/>
                    Agendar
                </div>
            </div>
            <TaskList></TaskList>
        </div>
    );
}

function TaskList(){
    const [state, setState] = useState({
        tasks:{
            "13/05/2022" : [
                {
                    invoice_id:"001-001-0000000011",
                    client_name: "Juanito Pereza",
                    start_date : "13 de Junio del 2022",
                    end_date : "Entregado",
                    current_step : "Finalizado",
                    state : { 
                        id: 4,
                        label: "Finalizado"
                    },
                    scheduler : "Juanito Perez"
                },
                {
                    invoice_id:"001-001-0000000012",
                    client_name: "Juanito Pereza",
                    start_date : "13 de Junio del 2022",
                    end_date : "Hoy",
                    current_step : "Corte",
                    state : { 
                        id: 3,
                        label: "En curso"
                    },
                    scheduler : "Juanito Perez"
                },
                {
                    invoice_id:"001-001-0000000013",
                    client_name: "Juanito Pereza",
                    start_date : "13 de Junio del 2022",
                    end_date : "Hoy",
                    current_step : "No iniciado",
                    state : { 
                        id: 1,
                        label: "No iniciado"
                    },
                    scheduler : "Juanito Perez"
                }
            ],
            "14/05/2022" : [
                {
                    invoice_id:"001-001-0000000015",
                    client_name: "Juanito Pereza",
                    start_date : "14 de Junio del 2022",
                    end_date : "Hoy",
                    current_step : "Finalizado",
                    state : { 
                        id: 4,
                        label: "Finalizado"
                    },
                    scheduler : "Juanito Perez"
                },
                {
                    invoice_id:"001-001-0000000016",
                    client_name: "Juanito Pereza",
                    start_date : "14 de Junio del 2022",
                    end_date : "Hoy",
                    current_step : "Corte",
                    state : { 
                        id: 3,
                        label: "En curso"
                    },
                    scheduler : "Juanito Perez"
                },
                {
                    invoice_id:"001-001-0000000017",
                    client_name: "Juanito Pereza",
                    start_date : "14 de Junio del 2022",
                    end_date : "Hoy",
                    current_step : "No iniciado",
                    state : { 
                        id: 1,
                        label: "No iniciado"
                    },
                    scheduler : "Juanito Perez"
                }
            ],
            "15/05/2022" : [{}],
            "16/05/2022" : [{}],
            "17/05/2022" : [{}],
            "18/05/2022" : [{}],
            "19/05/2022" : [{}],
        }
    })

    useEffect(()=>{
        console.log("Hey")
    },[])

    return(
        <div className="flex flex-col">
            <div className="grid grid-cols-8 border-y border-gray-200 text-center text-gray-800 font-medium">
                <div className="col-span-2 py-4">
                    {""}
                </div>
                <div className="col-span-1 border-l border-gray-200 py-2">
                    Cliente
                </div>
                <div className="col-span-1 border-l border-gray-200 py-2">
                    Fecha de creación
                </div>
                <div className="col-span-1 border-l border-gray-200 py-2">
                    Fecha de entrega
                </div>
                <div className="col-span-1 border-l border-gray-200 py-2">
                    Etapa actual
                </div>
                <div className="col-span-1 border-l border-gray-200 py-2">
                    Estado
                </div>
                <div className="col-span-1 border-l border-gray-200 py-2">
                    Agendado por
                </div>
            </div>
            {Object.keys(state.tasks).map((string_date)=>{
                return(
                    <DateRow stringDate={string_date} tasks={state.tasks[string_date]}/>
                );
            })}
        </div>
    )
}


function StateBagde({state}){
    const stateMap = {
        1 : "bg-gray-100 text-gray-800",
        3 : "bg-yellow-100 text-yellow-800",
        4 : "bg-green-100 text-green-800"
    }
    return(
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md font-medium ${stateMap[state.id]}`}>
            {state.label}
        </span>
    );
}

function DateRow({stringDate, tasks}){
    const [state, setState] = useState({
        open : false
    });
    
    const switchDay = () =>{
        setState({
            ...state, open: !state.open
        })
    }

    return(
        <div className="flex flex-col">
            <div 
                className="py-4 px-4 flex flex-row cursor-pointer hover:bg-gray-50 border-b border-gray-200"
                onClick={switchDay}
            >
                {state.open ? <ChevronDownIcon className="h-8 w-8"/> : <ChevronRightIcon className="h-8 w-8"/>}
                <p className="text-2xl text-gray-900 font-semibold">
                    {stringDate}
                </p>
            </div>
            {state.open && tasks.map((task)=>{
                if(Object.keys(task).length > 0){
                    return(
                        <div className="grid grid-cols-8 border-b border-gray-200 text-center text-gray-800 font-light">
                            <div className="col-span-2 py-2">
                                {task.invoice_id}
                            </div>
                            <div className="col-span-1 border-l border-gray-200 py-2">
                                {task.client_name}
                            </div>
                            <div className="col-span-1 border-l border-gray-200 py-2">
                                {task.start_date}
                            </div>
                            <div className="col-span-1 border-l border-gray-200 py-2">
                                {task.end_date}
                            </div>
                            <div className="col-span-1 border-l border-gray-200 py-2">
                                {task.current_step}
                            </div>
                            <div className="col-span-1 border-l border-gray-200 py-2">
                                <StateBagde state={task.state}/>
                            </div>
                            <div className="col-span-1 border-l border-gray-200 py-2">
                                {task.scheduler}
                            </div>
                        </div>
                    );
                }
            })}
        </div>
    );
}

export {Tasks};