import { useState } from 'react';

const priorities = [
    { id:0, label:"alta" },
    { id:1, label:"media" },
    { id:2, label:"baja" }
]
function Repair(){
    const [reason, setReason] = useState("");
    const [priority, setPriority ] = useState(0);

    return(
        <div className="shadow p-6 rounded-lg">        
            <div className="block w-full">
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700">Prioridad</label>
                <select 
                    name="priority" 
                    id="priod"
                    value={priority}
                    onChange={(e)=>setPriority(e.target.value)} 
                    className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm">
                    {priorities.map((p) => <option key={p.id} value={p.id}>{p.label}</option>)}
                </select>
            </div>

            <div className="rounded-md p-3 bg-white border border-gray-300 mt-4">
                <label className="text-sm">
                    Motivo
                </label>
                <div className="mt-1">
                    <textarea
                        id="reason"
                        name="reason"
                        rows={3}
                        className="focus:ring-0 focus:border-none mt-1 block w-full sm:text-sm border border-none rounded-md p-0 text-gray-700"
                        placeholder="Agregue el motivo de la reparación"
                        value={reason}
                        onChange={(e)=>setReason(e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
}
export default Repair;