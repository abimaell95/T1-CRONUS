import { useEffect, useState } from 'react';
import { MenuIcon, ChevronRightIcon, ChevronDownIcon} from '@heroicons/react/solid'
import {TasksHeader} from '../components/TaskList'
import CreateOrder from '../components/CreateOrder';


function BurgerButton(){
    return(
        <div className="">
         <MenuIcon className="h-8 w-8 text-gray-900"/>
        </div>
    );
}

function Tasks (){

    const getMonday = (date) => {
        const mondayDate = date.getDate() - date.getDay() + ( date.getDay() == 0 ? -6:1);
        return new Date(date.getFullYear(), date.getMonth(), mondayDate);
    }

     //get days of current week
    const generateDays= (date) => {
    
        const mondayDate = date.getDate() - date.getDay() + ( date.getDay() == 0 ? -6:1);
        const mondayOfWeek = new Date(date.getFullYear(), date.getMonth(), mondayDate);

        var days = []
        
        for(let i=0; i < 7; i++){
        let currentDay = new Date(mondayOfWeek.getFullYear(), mondayOfWeek.getMonth(), mondayOfWeek.getDate()+i);
            days.push(currentDay);
        }
        return days;
    }

    const [state, setState] = useState({
        loadingData : true,
        orders : {},
        selectedDate: getMonday(new Date()),
        currentDate:  new Date(),
        flagOrders: false,
        openCreationForm: false
    });

    const setSelectedDate = (date) => {
        setState({...state, selectedDate: date, flagOrders: !state.flagOrders})
    }

    const setOpenCreateEvent = () => {
        setState({...state, openCreationForm: !state.openCreationForm})
    }

    
    const orders_mock_data = [
        {
            "id": 1,
            "invoice_num": "100-5896",
            "client_name": "Carmen Pinto",
            "start_datetime": "2022-05-22",
            "end_datetime": "2022-02-23",
            "state": 1,
            "state_label": "No Iniciado",
            "employee": "0927643825",
            "type_label": "Corte"
        },
        {
            "id": 2,
            "invoice_num": "100-5897",
            "client_name": "Carmen Pinto",
            "start_datetime": "2022-05-23",
            "end_datetime": "2022-02-24",
            "state": 1,
            "state_label": "No Iniciado",
            "employee": "0927643825",
            "type_label": "Corte"
        },
        {
            "id": 3,
            "invoice_num": "100-5898",
            "client_name": "Carmen Pinto",
            "start_datetime": "2022-05-22",
            "end_datetime": "2022-02-23",
            "state": 1,
            "state_label": "No Iniciado",
            "employee": "0927643825",
            "type_label": "Corte"
        },
        {
            "id": 4,
            "invoice_num": "100-5899",
            "client_name": "Carmen Pinto",
            "start_datetime": "2022-05-22",
            "end_datetime": "2022-02-23",
            "state": 1,
            "state_label": "No Iniciado",
            "employee": "0927643825",
            "type_label": "Corte"
        },
        {
            "id": 5,
            "invoice_num": "100-5900",
            "client_name": "Carmen Pinto",
            "start_datetime": "2022-05-23",
            "end_datetime": "2022-02-23",
            "state": 1,
            "state_label": "No Iniciado",
            "employee": "0927643825",
            "type_label": "Corte"
        },
        {
            "id": 6,
            "invoice_num": "100-5901",
            "client_name": "Carmen Pinto",
            "start_datetime": "2022-05-22",
            "end_datetime": "2022-02-23",
            "state": 1,
            "state_label": "No Iniciado",
            "employee": "0927643825",
            "type_label": "Corte"
        },
        {
            "id": 7,
            "invoice_num": "100-5902",
            "client_name": "Carmen Pinto", 
            "start_datetime": "2022-05-24",
            "end_datetime": "2022-02-23",
            "state": 1,
            "state_label": "No Iniciado",
            "employee": "0927643825",
            "type_label": "Corte"
        }
    ]

    function dateToString(date){
        let year = date.getFullYear()
        let month = date.getMonth().toString().length > 1 ? date.getMonth() : `0${date.getMonth()}` 
        let day =date.getDate()
        return `${year}-${month}-${day}`
    }

    function loadOrdersData(){
        fetch(`http://localhost:8000/api/`)
        .then(response => response.json())
        .then(data => {
            setState({
                ...state,
                orders : data
            })
        }).catch((error)=>{
            let data = orders_mock_data.reduce((group, task) => {
                const { start_datetime } = task;
                group[start_datetime] = group[start_datetime] ?? [];
                group[start_datetime].push(task);
                return group;
            }, {})
            console.log(data)
            setState({
                ...state,
                loadingData: false,
                orders : Object.fromEntries(new Map(generateDays(state.selectedDate).map(date =>[dateToString(date),data[dateToString(date)] || []])))
            })
        });
    }


    useEffect(()=>{
        loadOrdersData()
    },[state.flagOrders])

    return(
        <div className="h-screen">
            <TasksHeader selectedView={0} selectedDate={state.selectedDate} setSelectedDate={setSelectedDate} setOpenCreateEvent={setOpenCreateEvent}/>
            <TaskList ordersList={state.orders} loadingData={state.loadingData} openCreateEvent={state.openCreationForm}  setOpenCreateEvent={setOpenCreateEvent}></TaskList>
        </div>
    );
}

function TaskList({ordersList, loadingData, openCreateEvent, setOpenCreateEvent }){

    if(loadingData){
        return(
          <div className="flex h-4/5 justify-center items-center">
            <svg className="animate-spin h-16 w-16 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        )
    }

    return(
        <div className="grid grid-cols-8 ">
            <div className={`${!openCreateEvent ? "col-span-8" : "col-span-5"}`}>
                <div className="flex flex-col">
                    <div className={`border-b border-gray-200 text-center text-gray-800 font-light grid ${!openCreateEvent?"grid-cols-8" :"grid-cols-5"}`}>
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
                        {!openCreateEvent && 
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
                        }
                    </div>
                    {Object.keys(ordersList).map((string_date)=>{
                        return(
                            <DateRow stringDate={string_date} tasks={ordersList[string_date]} openCreateEvent={openCreateEvent}/>
                        );
                    })}
                </div>
            </div>
            {openCreateEvent &&
            <div className="col-span-3 border-l border-gray-200">
                <CreateOrder setOpenCreateEvent={setOpenCreateEvent}/>
            </div>}
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

function DateRow({stringDate, tasks, openCreateEvent}){
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
                        <div className={`border-b border-gray-200 text-center text-gray-800 font-light grid ${openCreateEvent?"grid-cols-5" :"grid-cols-8"}`}>
                            <div className="col-span-2 py-2">
                                {task.invoice_num}
                            </div>
                            <div className="col-span-1 border-l border-gray-200 py-2">
                                {task.client_name}
                            </div>
                            <div className="col-span-1 border-l border-gray-200 py-2">
                                {task.start_datetime}
                            </div>
                            <div className="col-span-1 border-l border-gray-200 py-2">
                                {task.end_datetime}
                            </div>
                            {!openCreateEvent&&
                            <>
                                <div className="col-span-1 border-l border-gray-200 py-2">
                                {task.type_label}
                                </div>
                                <div className="col-span-1 border-l border-gray-200 py-2">
                                    <StateBagde state={{id:task.state, label: task.state_label}}/>
                                </div>
                                <div className="col-span-1 border-l border-gray-200 py-2">
                                    {task.employee}
                                </div>
                            </>}
                        </div>
                    );
                }
            })}
        </div>
    );
}

export {Tasks};