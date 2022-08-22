import React from 'react';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { LockClosedIcon } from '@heroicons/react/solid'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'

import {
  ChevronDownIcon,
} from '@heroicons/react/solid'




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function Main(){

  return(
    <div className="h-screen bg-gray-800 flex flex-col">
      <div className="flex px-4 flex flex-row-reverse justify-between px-6 py-4 bg-gray-900">
          <div className="ml-4 flex items-center md:ml-6">
            {/* Profile dropdown */}
            <Menu as="div" className="ml-3 relative">
              <div>
                <Menu.Button className="max-w-xs bg-white rounded-full flex items-center text-sm focus:outline-none  focus:ring-gray-500 lg:p-2 lg:rounded-md lg:hover:bg-gray-50">
                  <div className="h-8 w-8 rounded-full bg-gray-500"></div>
                  <span className="hidden ml-3 text-gray-700 text-sm font-medium lg:block">
                    <span className="sr-only">Open user menu for </span>Emilia Birch
                  </span>
                  <ChevronDownIcon
                    className="hidden flex-shrink-0 ml-1 h-5 w-5 text-gray-400 lg:block"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="_#"
                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                      >
                        Your Profile
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="_#"
                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                      >
                        Settings
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="/login"
                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                      >
                        Logout
                      </a>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
        <div className="px-12 py-6">
          <p className="text-2xl font-semibold text-white">Maquina (XLR8)</p>
        </div>
        <div className="bg-white rounded-t-3xl flex-1 flex flex-col">
          <div className="px-6 py-4">
            <p className="text-xl text-gray-900 font-semibold">
              Octubre 22
            </p>
          </div>
          <div className="grid grid-cols-5 gap-4 px-4">
            <div className="col-span-1 rounded-lg py-2 hover:bg-gray-200">
              <div className="span text-center font-semibold text-gray-500">
                L
              </div>
              <div className="span text-center font-semibold text-gray-800">
                22
              </div>
            </div>
            <div className="col-span-1 py-2 rounded-lg hover:bg-gray-200 ">
              <div className="span text-center font-semibold text-gray-500">
                M
              </div>
              <div className="span text-center font-semibold text-gray-800">
                23
              </div>
            </div>
            <div className="col-span-1 py-2 rounded-lg hover:bg-gray-200">
              <div className="span text-center font-semibold text-gray-500">
                X
              </div>
              <div className="span text-center font-semibold text-gray-800">
                24
              </div>
            </div>
            <div className="col-span-1 py-2 rounded-lg hover:bg-gray-200">
              <div className="span text-center font-semibold text-gray-500">
                J
              </div>
              <div className="span text-center font-semibold text-gray-800">
                25
              </div>
            </div>
            <div className="col-span-1 py-2 rounded-lg hover:bg-gray-200">
              <div className="span text-center font-semibold text-gray-500">
                V
              </div>
              <div className="span text-center font-semibold text-gray-800">
                26
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-4 overflow-scroll flex flex-col gap-4 h-96">
            <div className="w-full bg-green-100 px-4 py-2 rounded-lg">
              <p className="text-green-700 font-semibold">
                No. 100-100-1000
              </p>
              <p className="text-green-700 font-ligth">
                Yor Forger
              </p>
            </div>
            <div className="w-full bg-green-100 px-4 py-2 rounded-lg">
              <p className="text-green-700 font-semibold">
                No. 100-100-1000
              </p>
              <p className="text-green-700 font-ligth">
                Yor Forger
              </p>
            </div>
            <div className="w-full bg-green-100 px-4 py-2 rounded-lg">
              <p className="text-green-700 font-semibold">
                No. 100-100-1000
              </p>
              <p className="text-green-700 font-ligth">
                Yor Forger
              </p>
            </div>
            <div className="w-full bg-green-100 px-4 py-2 rounded-lg">
              <p className="text-green-700 font-semibold">
                No. 100-100-1000
              </p>
              <p className="text-green-700 font-ligth">
                Yor Forger
              </p>
            </div>
            <div className="w-full bg-green-100 px-4 py-2 rounded-lg">
              <p className="text-green-700 font-semibold">
                No. 100-100-1000
              </p>
              <p className="text-green-700 font-ligth">
                Yor Forger
              </p>
            </div>
            <div className="w-full bg-green-100 px-4 py-2 rounded-lg">
              <p className="text-green-700 font-semibold">
                No. 100-100-1000
              </p>
              <p className="text-green-700 font-ligth">
                Yor Forger
              </p>
            </div>
            <OrderTab invoiceNum={"No. 100-100-1000"} clientName={"Yor Forger"} orderState={0}/>
          </div>
        </div>
    </div>
  )
}



function OrderTab({invoiceNum, clientName, orderState}){

  const getOrderStateColor = (orderState) =>{
    
  }

  return(
    <div className="w-full bg-green-100 px-4 py-2 rounded-lg">
      <p className="text-green-700 font-semibold">
        {"No. " + invoiceNum}
      </p>
      <p className="text-green-700 font-ligth">
        {clientName}
      </p>
    </div>
  )
}

function Login(){
  return (
    <>
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark.svg?color=gray&shade=600"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl tracking-tight font-bold text-gray-900">
              Inicia sesión en CRONUS
            </h2>
          </div>
          <div className="mt-8 space-y-6">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
                  placeholder="Usuario"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
                  placeholder="Contraseña"
                />
              </div>
            </div>

            <div>
              <a
                type="submit"
                href="/"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-gray-500 group-hover:text-gray-400" aria-hidden="true" />
                </span>
                Inicia Sesión
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App;
