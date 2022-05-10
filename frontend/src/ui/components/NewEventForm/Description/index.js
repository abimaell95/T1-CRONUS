import { useState } from 'react';

function Description(){
    const [description, setDescription] = useState("");
    return(
        <div className="shadow p-6 rounded-lg mb-4">
            <div className="rounded-md p-3 bg-white border border-gray-300">
                <label className="text-sm">
                    Descripción
                </label>
                <div className="mt-1">
                    <textarea
                        id="about"
                        name="about"
                        rows={3}
                        className="focus:ring-0 focus:border-none mt-1 block w-full sm:text-sm border border-none rounded-md p-0 text-gray-700"
                        placeholder="Agregue la descripción de la tarea"
                        value={description}
                        onChange={(e)=>setDescription(e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
}
export default Description;