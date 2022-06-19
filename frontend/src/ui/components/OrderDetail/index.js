import { useState, useEffect } from 'react'
import { PencilIcon, TrashIcon, XIcon, CheckIcon, LinkIcon } from '@heroicons/react/solid'

const data_order = {
    id_order: 2 ,
    state_id: 2,
    state_label:"En curso",
    description: "Construcción de una puerta con ruedas de acero inoxidable utilizando 100 piezas de madera barnizadas y enchapado de oro.",
    pieces: 100,
    employee: "Juanito alcachofa",
    end_date: "2022-06-13T12:30:00Z",
    client_name: "Pepito Adrián Romero Pérez",
    invoice_num: "001-001-000000042",
    file_url: "/#"
}

const data_workflow = [
    {
        state_id: 3,
        step_order: 1,
        step_activity: "Corte",
        end_time: "11:05",
    },
    {
        state_id: 1,
        step_order: 3,
        step_activity: "Corte",
        end_time: null,
    },
    {
        state_id: 2,
        step_order: 2,
        step_activity: "Enchapado",
        end_time: null,
    }
]

function OrderDetail({selectedEvent}) {
    const [ state, setState ] = useState({
        isLoading: true,
        dataOrder: {},
        dataWorkflow: [],
        errorMsg: ''
    })
    function getStatusColor (status_id){
        switch(status_id){
            case 2:
                return {
                    bg: 'bg-yellow-100 ',
                    text: 'text-yellow-800 '
                }
            case 3:
                return {
                    bg: 'bg-green-100 ',
                    text: 'text-green-800 '
                }
            case 6:
                return {
                    bg: 'bg-red-100 ',
                    text: 'text-red-800 '
                }
            default:
                return {
                    bg: 'bg-gray-100 ',
                    text: 'text-gray-800 '
                }
        }
    }
    
    const handleFetch = () => {
        fetch("https://appi/get/order/123456")
        .then((response) => response.json())
        .then((response) => {
            setState({
                ...state,
                isLoading: false,
                dataOrder: data_order
            })
        })
        .catch(() => {
            setState({
                ...state,
                isLoading: false,
                setErrorMsg: 'Ha ocurrido un problema cargando los datos del pedido',
                dataOrder: data_order//remove
            })
        })
    }
    
    useEffect(() => {
        handleFetch();
    }, [selectedEvent])
        
            if (state.isLoading)
                return <div className='flex justify-center items-center h-screen'>
                    <svg className="animate-spin -ml-1 mr-3 h-12 w-12 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </div>
            else{
                const orderStatusColor = getStatusColor(state.dataOrder.state_id);
                const date = new Date(state.dataOrder.end_date);
                const orderdWorkflow = data_workflow.sort((step1, step2) => {
                    return step1.step_order - step2.step_order
                });
                return(
                <div className='p-6'>
                    <div className="flex justify-between mb-3">
                        <div className='flex space-x-4'>
                            <label className="text-2xl font-bold text-gray-900">Pedido #<span>{ selectedEvent}</span></label>
                            <span className={orderStatusColor.bg + orderStatusColor.text +"text-xs font-semibold mr-2 px-2.5 py-0.5 rounded self-center"}>{state.dataOrder.state_label}</span>
                        </div>
                        <div className='flex justify-end space-x-3'>
                            <div className='p-2 rounded bg-gray-100'>
                                <PencilIcon className="h-5 w-5 text-gray-500"/>
                            </div>
                            <div className='p-2 rounded bg-gray-100'>
                                <TrashIcon className="h-5 w-5 text-gray-500"/>
                            </div>
                            <div className='p-2 rounded bg-gray-100'>
                                <XIcon className="h-5 w-5 text-gray-500"/>
                            </div>
                        </div>
                        
                    </div>
                    <div>
                        <div className='mb-2'>
                            <div className='mb-1'>
                                <label className='text-lg font-bold text-gray-800'>Descripción</label>
                                <div className='text-base'>
                                {state.dataOrder.description}
                                </div>
                            </div>
                            <div className='mb-1'>
                                <label className='text-lg font-bold text-gray-800'>Información del pedido</label>
                                <div>
                                    <div className='flex justify-between'>
                                        <label> Número de piezas </label>
                                        <label> {state.dataOrder.pieces} </label>
                                    </div>
                                    <div className='flex justify-between'>
                                        <label> Agendado por </label>
                                        <label> {state.dataOrder.employee} </label>
                                    </div>
                                    <div className='flex justify-between'>
                                        <label> Fecha de entrega </label>
                                        <label> {date.getDate() +" de " + new Intl.DateTimeFormat('es-US', {month: "long"}).format(date) +" del "+ date.getFullYear()}</label>
                                    </div>
                                </div>
                            </div>
                            <div className='mb-3'>
                                <label className='text-lg font-bold text-gray-800'>Información del cliente</label>
                                <div>
                                    <div className='flex justify-between'>
                                        <label> Nombre </label>
                                        <label> {state.dataOrder.client_name} </label>
                                    </div>
                                    <div className='flex justify-between'>
                                        <label> N° de factura </label>
                                        <label> {state.dataOrder.invoice_num } </label>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className='flex justify-between mb-2'>
                                    <label className='text-xl font-bold text-gray-800'>Flujo de trabajo</label>
                                    <span  className='bg-gray-600 rounded text-gray-100'> 
                                        <LinkIcon className='h-4 w-4 text-gray-100 inline mx-1'/>
                                        <label className='mr-2'>Planificación</label>
                                    </span>
                                </div>
                                <div className='mt-2'>
                                    {
                                        orderdWorkflow.map(step => {
                                            function getColor(){
                                                switch(step.state_id){
                                                    case 2:
                                                        return {
                                                            bg: 'bg-yellow-100 ',
                                                            text: 'text-yellow-800 '
                                                        }
                                                    case 3:
                                                        return {
                                                            bg: 'bg-green-100 ',
                                                            text: 'text-green-800 '
                                                        }
                                                    default:
                                                        return {
                                                            bg: 'bg-gray-100 ',
                                                            text: 'text-gray-800 '
                                                        }
                                                }
                                            }
                                            const color = getColor();
                                            return <div className='flex justify-between mb-2' key={step.step_order}>
                                                <span className={color.bg+'rounded-full p-2'}>
                                                    <CheckIcon className={"h-5 w-5 "+ color.text}/>
                                                </span>
                                                <label className={step.step_order === 2 ? 'font-bold' : ''}>
                                                    {step.step_activity}
                                                </label>
                                                <label>
                                                    {step.end_time ? step.end_time : '-- : --'}
                                                </label>
                                            </div>
                                        })
                                    }
                                
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        )
            }
                
        
}

export default OrderDetail;