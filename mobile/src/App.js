import React from 'react';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { LockClosedIcon } from '@heroicons/react/solid'
import { Fragment, useState } from 'react'
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
function getMonday(date) {
  if (date != null) {
    const mondayDate = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
    return new Date(date.getFullYear(), date.getMonth(), mondayDate);
  }
  return null;
}

function generateDays(date) {
  const days = [];
  if (date != null) {
    const mondayOfWeek = getMonday(date);
    for (let i = 0; i < 7; i += 1) {
      const currentDay = new Date(
        mondayOfWeek.getFullYear(),
        mondayOfWeek.getMonth(),
        mondayOfWeek.getDate() + i,
      );
      days.push(currentDay);
    }
  }
  return days;
}


function MainHeader(){
  return(
    <div className="flex px-4 flex flex-row-reverse justify-between px-6 py-4 bg-gray-900">
        <div className="ml-4 flex items-center md:ml-6">
          {/* Profile dropdown */}
          <Menu as="div" className="ml-3 relative">
            <div>
              <Menu.Button className="max-w-xs bg-gray-900 rounded-full flex items-center text-sm focus:outline-none p-2 focus:ring-gray-500 rounded-md hover:bg-gray-800">
                <div className="h-8 w-8 rounded-full bg-gray-500"></div>
                <span className="ml-3 text-white text-sm font-medium">
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
  );
}

function OrderTab({invoiceNum, clientName, orderState}){

  const stateMap = {
    1: 'text-slate-700 bg-slate-100 hover:bg-slate-200',
    2: 'text-amber-700 bg-amber-100 hover:bg-amber-200',
    3: 'text-emerald-700 bg-emerald-100 hover:bg-emerald-200',
    4: 'text-slate-700 bg-slate-100 hover:bg-slate-200',
    5: 'text-slate-700 bg-slate-100 hover:bg-slate-200',
    6: 'text-rose-700 bg-rose-100 hover:bg-rose-200',
  };
  

  const getOrderStateColor = (orderState) =>{
    return stateMap[orderState]
  }

  return(
    <div className={`w-full bg-green-100 px-4 py-2 rounded-lg ${getOrderStateColor(orderState)}`}>
      <p className="font-semibold">
        {"No. " + invoiceNum}
      </p>
      <p className="font-ligth">
        {clientName}
      </p>
    </div>
  )
}

function OrdersTable({orders}){
  return(
    <div className="px-4 py-4 overflow-scroll flex flex-col gap-4 h-96">
      {orders.map(()=> <OrderTab invoiceNum={"No. 100-100-1000"} clientName={"Yor Forger"} orderState={1}/>)}
    </div>
  )
}


function DateSelector({selectedDate}){

  return(
    <div className="grid grid-cols-5 gap-4 px-4">
      {<div className="col-span-1 rounded-lg py-2 hover:bg-gray-200">
        <div className="span text-center font-semibold text-gray-500">
          L
        </div>
        <div className="span text-center font-semibold text-gray-800">
          22
        </div>
      </div>}
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
    </div>)
}

function Main(){

  
  const [mainState, setMainState] = useState({
    selectedDate: getMonday(new Date()),
    machineDetails: {
      operatorName:"Juan Pepe",
      machineSeries:"XLR8",
      machineType: 1
    },
    orders:[{
      "type" : "order",
      "description" : "Una descripción",
      "pieces_number" : 100,
      "start_date" : "2022-06-12",
      "end_date" : "2022-06-12",
      "start_time":10,
      "end_time" :11,
      "workflow": {
          "id":"workflow-1",
          "steps" : [ 
              {
                  "machine":{
                      "id" : "001",
                      "name":"Maquina de corte"
                  },
                  "order" : 1 
              },
              {
                  "machine":{
                      "id" : "002",
                      "name":"Maquina de pegado"
                  },
                  "order" : 2
              },
              {
                  "machine":{
                      "id" : "003",
                      "name":"Maquina de enchape"
                  },
                  "order" : 3
              }
          ]
      },
      "plan_file" : "Aquí va un Objeto JS"
  
  }]})

  return(
    <div className="h-screen bg-gray-800 flex flex-col">
      <MainHeader/>
      <div className="px-12 py-6">
        <p className="text-2xl font-semibold text-white">Maquina (XLR8)</p>
      </div>
      <div className="bg-white rounded-t-3xl flex-1 flex flex-col">
        <div className="px-6 py-4">
          <p className="text-xl text-gray-900 font-semibold">
            Octubre 22
          </p>
        </div>
        <OrdersTable orders={mainState.orders}/>
      </div>
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
