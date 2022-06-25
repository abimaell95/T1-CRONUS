/* This example requires Tailwind CSS v2.0+ */
import { useEffect, useRef, useState } from 'react'
import OrderDetail from '../OrderDetail'
import CreateOrder from '../CreateOrder';


function WeeklyView({currentDate, selectedDate, flagEvents, openCreateEvent, setOpenCreateEvent}) {
  const container = useRef(null)
  const containerNav = useRef(null)
  const containerOffset = useRef(null)

  const [state, setState]= useState(
    {
      selectedEvent: 0,
      openDetails: false,
      events: []
    }
  );

  function dateToString(date){
    let year = date.getFullYear()
    let month = date.getMonth().toString().length > 1 ? date.getMonth()+1 : `0${date.getMonth()+1}` 
    let day =date.getDate()
    return `${year}-${month}-${day}`
}

  const setEvents = () => {
      let [year, month, day] =  dateToString(selectedDate).split("-")
      fetch("/events/?day="+day+"&month="+month+"&year="+year+"&branch=1&period=0")
      .then((response)=>response.json())
      .then((data)=>{
        let events = data.map((event)=>{
          let start = event.start_datetime.slice(0, event.start_datetime.length -1)
          let end = event.end_datetime.slice(0, event.start_datetime.length -1)
          return {...event, start_datetime: new Date(start), end_datetime:new Date(end)}})
        setState({...state, events: events})
      })
      .catch((err) => {
          //Adds error state          
        })
  }

    useEffect(()=>{
      setEvents()
  },[flagEvents])

  const setSelectedEvent = (eventId) => {
    setState({...state, selectedEvent: eventId, openDetails: true})
  }

  const closeOrderDetails = () => {
    setState({...state, openDetails: false})
  }

  const strDayOfWeek = (date) => {
    const dayMap = {
      0: "Dom",
      1: "Lun",
      2: "Mar",
      3: "Mie",
      4: "Jue",
      5: "Vie",
      6: "Sab"
    }
    return `${dayMap[date.getDay()]}`
  }

  const eventTypeMap = {
    1: "Pedido",
    2: "Mantenimiento",
    3: "Reparación"
  }

  const stateColorMap = {
    1: "text-slate-700 bg-slate-100 hover:bg-slate-200",
    2: "text-amber-700 bg-amber-100 hover:bg-amber-200",
    3: "text-emerald-700 bg-emerald-100 hover:bg-emerald-200",
    4: "text-slate-700 bg-slate-100 hover:bg-slate-200",
    5: "text-slate-700 bg-slate-100 hover:bg-slate-200",
    6: "text-rose-700 bg-rose-100 hover:bg-rose-200"
  }
  
  const stateColorBadgeMap = {
    1: "bg-slate-200",
    2: "bg-amber-200",
    3: "bg-emerald-200",
    4: "bg-slate-200",
    5: "bg-slate-200",
    6: "bg-rose-200"
  }

  //get days of current week
  const generateDays= (date) => {
    
    const mondayDate = date.getDate() - date.getDay() + ( date.getDay() == 0 ? -6:1);
    const mondayOfWeek = new Date(date.getFullYear(), date.getMonth(), mondayDate);

    var days = []
    
    for(let i=0; i < 7; i++){
      let currentDay = new Date(mondayOfWeek.getFullYear(), mondayOfWeek.getMonth(), mondayOfWeek.getDate()+i);
      days.push(currentDay);
    }
    return days;
  }

  return (
    <div className="grid grid-cols-8">
      <div class={state.openDetails || openCreateEvent ? "col-span-5":"col-span-8"}>
        <div className="flex h-full flex-col">
          <div ref={container} className="flex flex-auto flex-col overflow-auto bg-white">
            <div style={{ width: '165%' }} className="flex max-w-full flex-none flex-col sm:max-w-none md:max-w-full">
              <div
                ref={containerNav}
                className="sticky top-0 z-30 flex-none bg-white shadow ring-1 ring-black ring-opacity-5 sm:pr-8"
              >
                {/* WE CAN ADD HERE THE HEADER  AND ITERATE THE VALUES FROM SELECTED DATE TO CREATE AN ARRAY WITH MONTH - DAY */}
                <div className="-mr-px hidden grid-cols-7 divide-x divide-gray-100 border-r border-gray-100 text-sm leading-6 text-gray-500 sm:grid">
                  <div className="col-end-1 w-14" />
                  {generateDays(selectedDate).map((date) => {
                    return (
                      <div className="flex items-center justify-center py-3"> 
                        {date.setHours(0,0,0,0) == currentDate.setHours(0,0,0,0)?
                          <span className="flex items-baseline"> {strDayOfWeek(date)}
                            <span className="ml-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-black font-semibold text-white">
                              {date.getDate()}
                            </span>
                          </span>
                        :
                          <span>
                              {strDayOfWeek(date)} <span className="items-center justify-center font-semibold text-gray-900">{date.getDate()}</span>
                          </span> 
                        }                  
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className="flex flex-auto">
                <div className="sticky left-0 z-10 w-14 flex-none bg-white ring-1 ring-gray-100" />
                <div className="grid flex-auto grid-cols-1 grid-rows-1">
                  {/* Horizontal lines */}
                  <div
                    className="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-100"
                    style={{ gridTemplateRows: 'repeat(24, minmax(3.5rem, 1fr))' }}
                  >
                    <div ref={containerOffset} className="row-end-1 h-7"></div>
                    {[...Array(12).keys()].map((value) => {
                      return (
                        <>
                          <div>
                            <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                              {value+6 > 9 ? `${value+6}h00` : `0${value+6}h00`}
                            </div>
                          </div>
                          <div />
                        </>
                      )
                    })}
                  </div>

                  {/* Vertical lines */}
                  <div className="col-start-1 col-end-2 row-start-1 hidden grid-cols-7 grid-rows-1 divide-x divide-gray-100 sm:grid sm:grid-cols-7">
                    <div className="col-start-1 row-span-full" />
                    <div className="col-start-2 row-span-full" />
                    <div className="col-start-3 row-span-full" />
                    <div className="col-start-4 row-span-full" />
                    <div className="col-start-5 row-span-full" />
                    <div className="col-start-6 row-span-full" />
                    <div className="col-start-7 row-span-full" />
                    <div className="col-start-8 row-span-full w-8" />
                  </div>

                  {/* Events */}
                  
                  <ol
                    className="col-start-1 col-end-2 row-start-1 grid grid-cols-1 sm:grid-cols-7 sm:pr-8"
                    style={{ gridTemplateRows: '1.75rem repeat(144, minmax(0, 1fr)) auto' }}
                  >
                    {/* 
                        - col-start-x represents the index for the day of the event 
                        - span x represents the duration of the event with an hour gap
                        - grid-row represents the position on y axis (hour of day), where y is the result of (12*x)-70
                        and x is the hour of day of the event (en función del endTime-startTime)
                      */}
                    {state.events.map(({id, start_datetime, end_datetime, state_id, label})=>{
                      return(
                        
                        <li className={"relative mt-px flex "+ `col-start-${start_datetime.getDay()}` } style={{ gridRow: `${(start_datetime.getHours()*12)-70} / span ${(end_datetime.getHours()-start_datetime.getHours())*12} ` }}>
                        <a
                          onClick={()=> {setSelectedEvent(id)}}
                          className={"group absolute inset-1 flex flex-col overflow-y-auto rounded-lg p-2 text-xs leading-5 cursor-pointer "+ stateColorMap[state_id]} 
                        >
                          <p className="order-1 text-sm font-semibold">{eventTypeMap[1] +" #"+ id} </p>
                          <span className={"absolute text-xs font-medium px-2 py-1 rounded-md bottom-2 right-2 "+stateColorBadgeMap[state_id]}>
                            {label}
                          </span>
                        </a>
                      </li> 
                      )
                    })}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {state.openDetails &&  
        <div class={state.openDetails ? "col-span-3 border-l border-gray-200":"hidden"}>
          <OrderDetail selectedEvent={state.selectedEvent} closeOrderDetails={closeOrderDetails}/>
        </div>}
        {openCreateEvent &&  
        <div class={openCreateEvent ? "col-span-3 border-l border-gray-200":"hidden"}>
          <CreateOrder setOpenCreateEvent={setOpenCreateEvent}/>
        </div>}

    </div>
  )
}

export {WeeklyView}