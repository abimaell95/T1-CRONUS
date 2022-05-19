import { useState } from 'react';

const machines = [
    {   
        "id": 0,
        "label":"Maquina 1" 
    },
    {
        "id":1,
        "label": "Maquina 2"
    },
    {
        "id":2,
        "label": "Maquina 3"
    }
]
const operators = [
    {   
        "id": 0,
        "label":"operator 1" 
    },
    {
        "id":1,
        "label": "operator 2"
    },
    {
        "id":2,
        "label": "operator 3"
    }
]

function AssignTask(){
    const [operatorId, setOperatorId] = useState(2);
    const [machineId, setMachineId] = useState(0);

    return(
    <div className='shadow p-6 rounded-lg '>
                        
        <div className='space-y-2'>
            <label className="block text-sm font-medium text-gray-700">
                Asignar a
            </label>
            <div className="flex space-x-5">
                <select
                    id="machines"
                    name="machines"
                    value={machineId}
                    className="w-1/2 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                    onChange={(e)=>setMachineId(e.target.value)}
                >
                    {machines.map((machine) => <option key={machine.id} value={machine.id}>{machine.label}</option>)}
                </select>

                <select
                    id="operators"
                    name="operators"
                    value={operatorId}
                    className="w-1/2 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                    onChange={(e) => setOperatorId(e.target.value)}
                >
                    {operators.map((operator) => <option key={operator.id} value={operator.id}>{operator.label}</option>)}
                </select>
            </div>
        </div>
    
        <div className='flex items-center justify-center mt-4'>
            <label
                    htmlFor="file-upload"
                    className="bg-gray-100 px-3 rounded-md shadow-sm text-sm  font-medium text-gray-700 hover:bg-gray-700 hover:text-white py-2"
            >
                 <span>Subir planificación</span>
                <input id="file-upload" name="file-upload" type="file" className="sr-only" />
            </label>
        </div>
    </div>
    );
}
export default AssignTask;