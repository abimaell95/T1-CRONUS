/* eslint-disable max-len */
/* This example requires Tailwind CSS v2.0+ */
import {
  React, useState, useEffect, useRef, Fragment,
} from 'react';
import {
  ClockIcon,
} from '@heroicons/react/outline';
import PropTypes from 'prop-types';
import OrderDetail from '../OrderDetail';
import CreateOrder from '../CreateOrder';
import { DateUtils, CalendarUtils } from '../../utils';
import { CalendarService } from '../../../services';

function WeeklyView({
  currentDate, selectedDate, flagEvents, branchOffice, selectedService, openCreateEvent, setOpenCreateEvent,
}) {
  const container = useRef(null);
  const containerNav = useRef(null);
  const containerOffset = useRef(null);

  const [state, setState] = useState(
    {
      selectedEvent: 0,
      openDetails: false,
      events: [],
    },
  );

  const setEvents = (date) => {
    CalendarService.getEvents(date, selectedService, branchOffice)
      .then((response) => {
        const events = response.data.map((event) => {
          const start = event.start_datetime.slice(0, event.start_datetime.length - 1);
          const end = event.end_datetime.slice(0, event.end_datetime.length - 1);
          return { ...event, start_datetime: new Date(start), end_datetime: new Date(end) };
        });
        setState({ ...state, events });
      })
      .catch(() => {
        setState({
          ...state,
          events: [
            {
              id: 3,
              start_datetime: new Date('2022-06-30T07:00:00'),
              end_datetime: new Date('2022-06-30T08:00:00'),
              state_id: 1,
              label: 'No Iniciado',
              client: 'Rosita Intriago',
              invoice_number: '001-001-1000',
            },
            {
              id: 4,
              start_datetime: new Date('2022-06-30T08:00:00'),
              end_datetime: new Date('2022-06-30T09:00:00'),
              state_id: 2,
              label: 'En Curso',
              client: 'Loid Forger',
              invoice_number: '001-001-1001',
            },
            {
              id: 5,
              start_datetime: new Date('2022-06-30T06:00:00'),
              end_datetime: new Date('2022-07-02T07:00:00'),
              state_id: 3,
              label: 'Finalizado',
              client: 'Anya Forger',
              invoice_number: '001-001-1002',
            },
            {
              id: 9,
              start_datetime: new Date('2022-06-28T07:00:00'),
              end_datetime: new Date('2022-06-28T08:00:00'),
              state_id: 1,
              label: 'No Iniciado',
              client: 'Yor Forger',
              invoice_number: '001-001-1003',
            },
          ],
        });
        // Adds error state
      });
  };

  useEffect(() => {
    setEvents(selectedDate);
  }, [flagEvents]);

  const setSelectedEvent = (eventId) => {
    setState({ ...state, selectedEvent: eventId, openDetails: true });
  };

  const closeOrderDetails = () => {
    setState({ ...state, openDetails: false });
  };

  /* const eventTypeMap = {
    1: 'Pedido',
    2: 'Mantenimiento',
    3: 'Reparación',
  }; */

  return (
    <div className="grid grid-cols-8">
      <div className={state.openDetails || openCreateEvent ? 'col-span-5' : 'col-span-8'}>
        <div className="flex h-full flex-col">
          <div ref={container} className="flex flex-auto flex-col overflow-auto bg-white">
            <div style={{ width: '165%' }} className="flex max-w-full flex-none flex-col sm:max-w-none md:max-w-full">
              <div
                ref={containerNav}
                className=" top-0 flex-none bg-white shadow ring-1 ring-black ring-opacity-5 sm:pr-8"
              >
                {/* WE CAN ADD HERE THE HEADER  AND ITERATE THE VALUES FROM SELECTED DATE TO CREATE AN ARRAY WITH MONTH - DAY */}
                <div className="-mr-px hidden grid-cols-7 divide-x divide-gray-100 border-r border-gray-100 text-sm leading-6 text-gray-500 sm:grid">
                  <div className="col-end-1 w-14" />
                  {DateUtils.generateDays(selectedDate).map((date, idx) => (
                    <div className="flex items-center justify-center py-3" key={idx}>
                      {date.setHours(0, 0, 0, 0) === currentDate.setHours(0, 0, 0, 0)
                        ? (
                          <span className="flex items-baseline">
                            {' '}
                            {CalendarUtils.strDayOfWeek(date)}
                            <span className="ml-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-black font-semibold text-white">
                              {date.getDate()}
                            </span>
                          </span>
                        )
                        : (
                          <span>
                            {CalendarUtils.strDayOfWeek(date)}
                            {' '}
                            <span className="items-center justify-center font-semibold text-gray-900">{date.getDate()}</span>
                          </span>
                        )}
                    </div>
                  ))}
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
                    <div ref={containerOffset} className="row-end-1 h-7" />
                    {[...Array(12).keys()].map((value, idx) => (
                      // eslint-disable-next-line react/jsx-fragments
                      <Fragment key={idx}>
                        <div>
                          <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                            {value + 6 > 9 ? `${value + 6}h00` : `0${value + 6}h00`}
                          </div>
                        </div>
                        <div />
                      </Fragment>
                    ))}
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
                      - grid-row represents the position on y axis (hour of day),
                        where y is the result of (12*x)-70
                        and x is the hour of day of the event (en función del endTime-startTime)
                      */}
                    {state.events.map(({
                      id, start_datetime, end_datetime, state_id, label, client, invoice_number,
                    }) => {
                      const row = CalendarUtils.getCalendarRow(start_datetime);
                      const span = CalendarUtils.getCalendarSpan(start_datetime, end_datetime);
                      if (row > -1 && span > -1) {
                        return (
                          <li
                            key={id}
                            className={`relative mt-px flex col-start-${start_datetime.getDay()}`}
                            data-bs-toggle="tooltip"
                            title={label}
                            style={{ gridRow: `${row} / span ${span}` }}
                          >
                            <a
                              onClick={() => { setSelectedEvent(id); }}
                              className={`group absolute inset-1 flex flex-col overflow-y-auto rounded-lg p-2 text-xs leading-5 cursor-pointer ${CalendarUtils.getStateColor(state_id)}`}
                              href="#/"
                            >
                              <p className="order-1 text-sm font-bold">
                                {`No. ${invoice_number}`}
                                {' '}
                              </p>
                              <p className="order-2 text-sm font-medium">
                                {`${client}`}
                                {' '}
                              </p>
                              <div className="absolute flex flex-wrap items-center text-sm font-medium px-2 py-1 bottom-2 right-2">
                                <ClockIcon className="h-5 w-5" />
                                <span className="pl-1">
                                  {CalendarUtils.getTileDate(end_datetime)}
                                </span>
                              </div>
                            </a>
                          </li>
                        );
                      }
                      return <> </>;
                    })}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {state.openDetails
        && (
        <div className={state.openDetails ? 'col-span-3 border-l border-gray-200' : 'hidden'}>
          <OrderDetail selectedEvent={state.selectedEvent} closeOrderDetails={closeOrderDetails} />
        </div>
        )}
      {openCreateEvent
        && (
        <div className={openCreateEvent ? 'col-span-3 border-l border-gray-200' : 'hidden'}>
          <CreateOrder setOpenCreateEvent={setOpenCreateEvent} />
        </div>
        )}

    </div>
  );
}

WeeklyView.propTypes = {
  currentDate: PropTypes.object.isRequired,
  selectedDate: PropTypes.object.isRequired,
  flagEvents: PropTypes.bool.isRequired,
  branchOffice: PropTypes.number.isRequired,
  selectedService: PropTypes.number.isRequired,
  openCreateEvent: PropTypes.bool.isRequired,
  setOpenCreateEvent: PropTypes.func.isRequired,
};

export { WeeklyView };
