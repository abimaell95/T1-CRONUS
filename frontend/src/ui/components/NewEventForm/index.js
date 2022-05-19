import { useState } from 'react';
import Stepper from './Stepper';

const eventTypes = [
    {   
        "id": 0,
        "label":"Tarea de Corte",
        "type": 'task' 
    },
    {
        "id":1,
        "label": "Tarea de Abisagrado",
        "type": 'task' 
    },
    {
        "id":2,
        "label": "Tarea de Perforación",
        "type": 'task' 
    },
    {
        "id":3,
        "label": "Mantenimiento",
        "type": 'maintenance' 
    },
    {
        "id":4,
        "label": "Reparación",
        "type": 'repair' 
    }
];

function getEventType(id){
    for(let i=0; i<eventTypes.length; i++){
        if(eventTypes[i].id == id)
            return eventTypes[i].type
            
    }
}

function NewEventForm(){
    const [eventTypeId, seteventTypeId] = useState(0);

    return(
        <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
            <fieldset>
            <legend className="text-base font-medium text-gray-900 text-xl">Agendar un nuevo evento</legend>
            <form action="#" method="POST">                
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                    <div>
                        <label htmlFor="taskTypes" className="block text-sm font-medium text-gray-700">
                        Actividad a agedar
                        </label>
                        <select
                            id="taskTypes"
                            name="taskTypes"
                            autoComplete="taskTypes-name"
                            value={eventTypeId}
                            onChange={ (e) => seteventTypeId(e.target.value) }
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                        >
                            {eventTypes.map((taskType) => <option key={taskType.id} value={taskType.id}>{taskType.label}</option>)}
                        </select>
                    </div>
                    <Stepper eventType={getEventType(eventTypeId)} className="mb-4"></Stepper>
                    <div className="flex items-center justify-center space-x-10">
                        <span className="hidden sm:block ml-3">
                        <button
                            type="button"
                            className="bg-gray-100 inline-flex items-center px-4 py-2 border border-gray-100 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-600 hover:border-gray-600 hover:text-white focus:outline-none "
                        >
                            Cancelar
                        </button>
                        </span>

                        <span className="sm:ml-3">
                        <button
                            type="button"
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none "
                        >
                            Guardar
                        </button>
                    </span>
                    </div>
                </div>
            </form>
        </fieldset>
    </div>
      
    );
        
}


export default NewEventForm;