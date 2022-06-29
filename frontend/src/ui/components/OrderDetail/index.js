import { React, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  PencilIcon, TrashIcon, XIcon, CheckIcon, LinkIcon,
} from '@heroicons/react/solid';
import { DateUtils, CalendarUtils } from '../../utils';

const dataOrderDummy = {
  id: 1,
  state: 1,
  label: 'No Iniciado',
  description: 'Pedido para puerta',
  num_pieces: 100,
  name: 'Nicole',
  surname: 'Agila',
  end_datetime: '2022-02-23T11:00:00Z',
  client_name: 'Carmen Pinto',
  invoice_num: '100-5896',
  file_url: 'archivo.jpg',
};

const dataWorkflowDummy = [
  {
    id: 1,
    order_id: 1,
    step_order: 1,
    end_datetime: null,
    state_id: 2,
    step_activity: 'Corte',
  },
  {
    id: 3,
    order_id: 1,
    step_order: 2,
    end_datetime: null,
    state_id: 1,
    step_activity: 'Corte',
  },
];

function OrderDetail({ selectedEvent, closeOrderDetails }) {
  const [dataOrder, setDataOrder] = useState({
    isLoading: true,
    data: {},
    errorMsg: '',
  });
  const [dataWorkflow, setDataWorkflow] = useState({
    isLoading: true,
    data: [],
    errorMsg: '',
  });

  const getOrderDetail = () => {
    fetch(`/order/?id=${selectedEvent}`)
      .then((response) => response.json())
      .then((response) => {
        const data = response[0];
        setDataOrder({
          ...dataOrder,
          isLoading: false,
          data: {
            description: data.description,
            state_label: data.label,
            pieces: data.num_pieces,
            employee: data.name,
            end_date: data.end_datetime,
            client_name: data.client_name,
            invoice_num: data.invoice_num,
            file_url: data.file_url,
            state_id: data.state,
          },
        });
      })
      .catch(() => {
        setDataOrder({
          ...dataOrder,
          data: {
            description: dataOrderDummy.description,
            state_label: dataOrderDummy.label,
            pieces: dataOrderDummy.num_pieces,
            employee: dataOrderDummy.name,
            end_date: dataOrderDummy.end_datetime,
            client_name: dataOrderDummy.client_name,
            invoice_num: dataOrderDummy.invoice_num,
            file_url: dataOrderDummy.file_url,
          },
          isLoading: false,
          setErrorMsg: 'Ha ocurrido un problema cargando los datos del pedido',
        });
      });
  };

  const getWorkFlow = () => {
    fetch(`/workflow/?id=${selectedEvent}`)
      .then((response) => response.json())
      .then((response) => {
        setDataWorkflow({
          ...dataWorkflow,
          isLoading: false,
          data: [...response],
        });
      })
      .catch(() => {
        setDataWorkflow({
          ...dataWorkflow,
          data: [...dataWorkflowDummy],
          isLoading: false,
          setErrorMsg: 'Ha ocurrido un problema cargando los datos del pedido',
        });
      });
  };

  useEffect(() => {
    getOrderDetail();
    getWorkFlow();
  }, [selectedEvent]);

  if (dataOrder.isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <svg className="animate-spin -ml-1 mr-3 h-12 w-12 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      </div>
    );
  }

  const date = new Date(dataOrder.data.end_date);
  const orderdWorkflow = dataWorkflow.data.sort(
    (step1, step2) => step1.step_order - step2.step_order,
  );
  return (
    <div className="p-6">
      <div className="flex justify-between mb-3">
        <div className="flex space-x-4">
          <span className="text-2xl font-bold text-gray-900">
            Pedido #
            <span>{ selectedEvent}</span>
          </span>
          <span className={`${CalendarUtils.getStateColor(dataOrder.data.state_id)}text-xs font-semibold mr-2 px-2.5 py-0.5 rounded self-center`}>{dataOrder.data.state_label}</span>
        </div>
        <div className="flex justify-end space-x-3">
          <div className="p-2 rounded bg-gray-100">
            <PencilIcon className="h-5 w-5 text-gray-500" />
          </div>
          <div className="p-2 rounded bg-gray-100">
            <TrashIcon className="h-5 w-5 text-gray-500" />
          </div>
          <div aria-hidden className="p-2 rounded bg-gray-100 cursor-pointer" onClick={() => { closeOrderDetails(); }}>
            <XIcon className="h-5 w-5 text-gray-500" />
          </div>
        </div>

      </div>
      <div>
        <div className="mb-2">
          <div className="mb-1">
            <span className="text-lg font-bold text-gray-800">Descripción</span>
            <div className="text-base">
              {dataOrder.data.description}
            </div>
          </div>
          <div className="mb-1">
            <span className="text-lg font-bold text-gray-800">Información del pedido</span>
            <div>
              <div className="flex justify-between">
                <span> Número de piezas </span>
                <span>
                  {dataOrder.data.pieces}
                </span>
              </div>
              <div className="flex justify-between">
                <span> Agendado por </span>
                <span>
                  {dataOrder.data.employee}
                </span>
              </div>
              <div className="flex justify-between">
                <span> Fecha de entrega </span>
                <span>
                  {DateUtils.fullDatetoString(date)}
                </span>
              </div>
            </div>
          </div>
          <div className="mb-3">
            <span className="text-lg font-bold text-gray-800">Información del cliente</span>
            <div>
              <div className="flex justify-between">
                <span> Nombre </span>
                <span>
                  {dataOrder.data.client_name}
                </span>
              </div>
              <div className="flex justify-between">
                <span> N° de factura </span>
                <span>
                  {dataOrder.data.invoice_num }
                </span>
              </div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-xl font-bold text-gray-800">Flujo de trabajo</span>
              <span className="bg-gray-600 rounded text-gray-100">
                <LinkIcon className="h-4 w-4 text-gray-100 inline mx-1" />
                <span className="mr-2"><a href="/#"> Planificación</a></span>
              </span>
            </div>
            <div className="mt-2">
              {
                orderdWorkflow.map((step) => {
                  const color = CalendarUtils.getStepColor(step.state_id);
                  return (
                    <div className="flex justify-between mb-2" key={step.step_order}>
                      <span className={`${color.bg}rounded-full p-2`}>
                        <CheckIcon className={`h-5 w-5 ${color.text}`} />
                      </span>
                      <span className={step.state_id === 2 ? 'font-bold' : ''}>
                        {step.step_activity}
                      </span>
                      <span>
                        {step.end_datetime ? step.end_datetime.slice(0, step.end_datetime.length - 1).split('T')[1].slice(0.0) : '-- : --'}
                      </span>
                    </div>
                  );
                })
              }

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
OrderDetail.propTypes = {
  selectedEvent: PropTypes.number.isRequired,
  closeOrderDetails: PropTypes.func.isRequired,
};
export default OrderDetail;
