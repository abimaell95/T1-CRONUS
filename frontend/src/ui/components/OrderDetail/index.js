import { useState, useEffect } from 'react'
import { PencilIcon, TrashIcon, XIcon, CheckIcon, LinkIcon } from '@heroicons/react/solid'

const data_order = {
        "id": 1,
        "state": 1,
        "label": "No Iniciado",
        "description": "Pedido para puerta",
        "num_pieces": 100,
        "name": "Nicole",
        "surname": "Agila",
        "end_datetime": "2022-02-23T11:00:00Z",
        "client_name": "Carmen Pinto",
        "invoice_num": "100-5896",
        "file_url": "archivo.jpg"
    }


const data_workflow = [
    {
        "id": 1,
        "order_id": 1,
        "step_order": 1,
        "end_datetime": null,
        "state_id": 2,
        "step_activity": "Corte"
    },
    {
        "id": 3,
        "order_id": 1,
        "step_order": 2,
        "end_datetime": null,
        "state_id": 1,
        "step_activity": "Corte"
    }
]

function OrderDetail({selectedEvent}) {
    const [ dataOrder, setDataOrder ] = useState({
        isLoading: true,
        data: {},
        errorMsg: ''
    })
    const [ dataWorkflow, setDataWorkflow ] = useState({
        isLoading: true,
        data: [],
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
    
    const getOrderDetail = () => {
        fetch("http://localhost:8000/order/?id=1")
        .then((response) => response.json())
        .then((response) => {
            const data = response[0]
            setDataOrder({
                ...dataOrder,
                isLoading: false,
                data: {
                    description: data.description,
                    state_label: data.label,
                    pieces: data.num_pieces,
                    employee: data.name,
                    end_date: data.end_datetime,
                    client_name: data.client_name,
                    invoice_num: data.invoice_num,
                    file_url: data.file_url
                }
            });
        })
        .catch(() => {
            setDataOrder({
                ...dataOrder,
                data: {
                    description: data_order.description,
                    state_label: data_order.label,
                    pieces: data_order.num_pieces,
                    employee: data_order.name,
                    end_date: data_order.end_datetime,
                    client_name: data_order.client_name,
                    invoice_num: data_order.invoice_num,
                    file_url: data_order.file_url
                },
                isLoading: false,
                setErrorMsg: 'Ha ocurrido un problema cargando los datos del pedido'
            })
        })
    }

    const getWorkFlow = () => {
        fetch("http://localhost:8000/workflow/?id=1")
        .then((response) => response.json())
        .then((response) => {
            setDataWorkflow({
                ...dataWorkflow,
                isLoading: false,
                data: [...response]
            })
        })
        .catch(() => {
            setDataWorkflow({
                ...dataWorkflow,
                data: [...data_workflow],
                isLoading: false,
                setErrorMsg: 'Ha ocurrido un problema cargando los datos del pedido'
            })
        })
    }
    
    useEffect(() => {
        getOrderDetail();
        getWorkFlow();
    }, [selectedEvent])
        
            if (dataOrder.isLoading)
                return <div className='flex justify-center items-center h-screen'>
                    <svg className="animate-spin -ml-1 mr-3 h-12 w-12 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </div>
            else{
                const orderStatusColor = getStatusColor(dataOrder.data.state_id);
                const date = new Date(dataOrder.data.end_date);
                const orderdWorkflow = dataWorkflow.data.sort((step1, step2) => {
                    return step1.step_order - step2.step_order
                });
                return(
                <div className='p-6'>
                    <div className="flex justify-between mb-3">
                        <div className='flex space-x-4'>
                            <label className="text-2xl font-bold text-gray-900">Pedido #<span>{ selectedEvent}</span></label>
                            <span className={orderStatusColor.bg + orderStatusColor.text +"text-xs font-semibold mr-2 px-2.5 py-0.5 rounded self-center"}>{dataOrder.data.state_label}</span>
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
                                {dataOrder.data.description}
                                </div>
                            </div>
                            <div className='mb-1'>
                                <label className='text-lg font-bold text-gray-800'>Información del pedido</label>
                                <div>
                                    <div className='flex justify-between'>
                                        <label> Número de piezas </label>
                                        <label> {dataOrder.data.pieces} </label>
                                    </div>
                                    <div className='flex justify-between'>
                                        <label> Agendado por </label>
                                        <label> {dataOrder.data.employee} </label>
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
                                        <label> {dataOrder.data.client_name} </label>
                                    </div>
                                    <div className='flex justify-between'>
                                        <label> N° de factura </label>
                                        <label> {dataOrder.data.invoice_num } </label>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className='flex justify-between mb-2'>
                                    <label className='text-xl font-bold text-gray-800'>Flujo de trabajo</label>
                                    <span  className='bg-gray-600 rounded text-gray-100'> 
                                        <LinkIcon className='h-4 w-4 text-gray-100 inline mx-1'/>
                                    <label className='mr-2'><a href='/#'> Planificación</a></label>
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
                                                <label className={step.state_id === 2 ? 'font-bold' : ''}>
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