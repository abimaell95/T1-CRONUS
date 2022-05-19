import { useState } from 'react';

const periods = [
    {id:0, label:"diario"},
    {id:1 ,label:"semanal"},
    {id:2, label:"mensual"},
    {id:3, label:"anual"}
]

function MaintenanceInput(){
    const [interval, setInterval] = useState(0);
    const [frequency, setFrequency]= useState(0);
    const [period,setPeriod] = useState(0);
    
    return(
        <div className='shadow p-6 rounded-lg '>
                        
            <div className='space-y-2'>
                <div className="flex space-x-5">
                    <div className="w-1/3 block w-full py-2 px-3">
                        <label htmlFor="interval" className="block text-sm font-medium text-gray-700">Intervalo</label>
                        <input 
                            type="number"
                            value={interval} 
                            name="interval" 
                            id="interval" 
                            className="mt-1 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-gray-500"
                            onChange={(e)=>setInterval(e.target.value)}
                            />
                    </div>
                    <div className="w-1/3 block w-full py-2 px-3">
                        <label htmlFor="frequency" className="block text-sm font-medium text-gray-700">Frecuencia</label>
                        <input 
                            type="number"
                            value={frequency} 
                            name="frequency" 
                            id="frequency" 
                            className="mt-1 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-gray-500"
                            onChange={(e)=>setFrequency(e.target.value)}
                            />
                    </div>
                    <div className="w-1/3 block w-full py-2 px-3">
                        <label htmlFor="period" className="block text-sm font-medium text-gray-700">Periodo</label>
                        <select 
                            name="period" 
                            id="priod"
                            value={period}
                            onChange={(e)=>setPeriod(e.target.value)} 
                            className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm">
                            {periods.map((period) => <option key={period.id} value={period.id}>{period.label}</option>)}
                        </select>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default MaintenanceInput;