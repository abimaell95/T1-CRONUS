import { useState } from "react"
import { Link, useNavigate} from "react-router-dom";

function Login({setUser}) {
    const navigate = useNavigate();
    const [state, setState] = useState({
        username: "",
        password: ""
    })

    function onChangeInput(e){
        setState({
            ...state,
            [e.target.name] : e.target.value
        })
    }

    function login(){
      fetch('/accounts/login/', {
      method: 'POST',
      body: JSON.stringify(state),
      headers: { 'Content-Type': 'application/json'}
      })
      .then(response => response.json())
      .then(result => {
        setUser(state)
        navigate('/tasks')
      })
      .catch(error => {
      });
    }
    
    return (
      <>
        <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark.svg"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Inicia sesión en tu cuenta</h2>
          </div>
  
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 flex flex-col gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Usuario
                  </label>
                  <div className="mt-1">
                    <input
                      id="username"
                      name="username"
                      type="text"
                      value={state.username}
                      onChange={onChangeInput}
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                    />
                  </div>
                </div>
  
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Contraseña
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      onChange={onChangeInput}
                      value={state.password}
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                    />
                  </div>
                </div>
  
  
                <div>
                  <button
                    onClick={login}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  >
                    Iniciar sesión
                  </button>
                </div>
            </div>
          </div>
        </div>
      </>
    )
  }
  

export {Login}