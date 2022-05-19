import { useState } from 'react';

import AssignTask from '../AssignTask';
import TimesInput from '../TimesInput';
import Description from '../Description';
import MaintenanceInput from '../MaintenanceInput';
import Repair from '../Repair';

import { CheckIcon } from '@heroicons/react/solid'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
const steps_ = [
  { name: 0, status: 'complete', component: TimesInput, type:'event'},
  { name: 1, status: 'upcoming', component: AssignTask, type:'event' },
  { name: 2, status: 'upcoming', component: MaintenanceInput, type:'maintenance'},
  { name: 3, status: 'upcoming', component: Repair, type:'repair'},
  { name: 4, status: 'upcoming', component: Description, type:'event'},
];

 function Stepper (props) {
     const { eventType } = props;
     const [steps, setSteps] = useState(steps_);

  return (
    <nav aria-label="Progress">
      <ol role="list" className="overflow-hidden">
        {steps.map((step, stepIdx) => (
          (step.type === eventType || step.type ==='event') &&
          <li key={step.name} className={classNames(stepIdx !== steps.length - 1 ? 'pb-10' : '', 'relative')} onClick={()=>{
            setSteps(
              steps.map((_step,sIdx)=>{
                if(sIdx<stepIdx)
                  return {..._step, status:'complete'}
                else if(sIdx === stepIdx)
                  return {..._step, status:'current'}
                else
                  return {..._step, status:'upcoming'}
              })
            )
          }}>
            {step.status === 'complete' ? (
              <>
                {stepIdx !== steps.length - 1 ? (
                  <div className="-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full bg-gray-600" aria-hidden="true" />
                ) : null}
                <div className="relative flex items-start group">
                  <span className="h-9 flex items-center">
                    <span className="relative z-10 w-8 h-8 flex items-center justify-center bg-gray-600 rounded-full group-hover:bg-gray-800">
                      <CheckIcon className="w-5 h-5 text-white" aria-hidden="true" />
                    </span>
                  </span>
                  <span className="ml-4 min-w-0 flex flex-col w-full" style= {{pointerEvents: "none", opacity: "0.5"}}>
                    <step.component ></step.component>
                  </span>
                </div>
              </>
            ) : step.status === 'current' ? (
              <>
                {stepIdx !== steps.length - 1 ? (
                  <div className="-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full bg-gray-300" aria-hidden="true" />
                ) : null}
                <div className="relative flex items-start group" aria-current="step">
                  <span className="h-9 flex items-center" aria-hidden="true">
                    <span className="relative z-10 w-8 h-8 flex items-center justify-center bg-white border-2 border-gray-600 rounded-full">
                      <span className="h-2.5 w-2.5 bg-gray-600 rounded-full" />
                    </span>
                  </span>
                  <span className="ml-4 min-w-0 flex flex-col w-full">
                    <step.component ></step.component>
                  </span>
                </div>
              </>
            ) : (
              <>
                {stepIdx !== steps.length - 1 ? (
                  <div className="-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full bg-gray-300" aria-hidden="true" />
                ) : null}
                <div className="relative flex items-start group">
                  <span className="h-9 flex items-center" aria-hidden="true">
                    <span className="relative z-10 w-8 h-8 flex items-center justify-center bg-white border-2 border-gray-300 rounded-full group-hover:border-gray-400">
                      <span className="h-2.5 w-2.5 bg-transparent rounded-full group-hover:bg-gray-300" />
                    </span>
                  </span>
                  <span className="ml-4 min-w-0 flex flex-col w-full">
                    <step.component ></step.component>
                  </span>
                </div>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
 export default Stepper;