import { DateUtils } from '../ui/utils';

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    return data;
  });
}

async function createOrder(order) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(order),
  };
  return fetch('http://localhost:8000/api/order/', requestOptions).then(handleResponse);
}

async function getAvailableHours(date, branchId) {
  const dateString = DateUtils.dateToString(date);
  const requestOptions = {
    method: 'GET',
  };
  return fetch(`http://localhost:8000/api/available_hours/?date=${dateString}&branch=${branchId}`, requestOptions).then(handleResponse);
}

async function getEvents(date, branch = 1, period = 0) {
  const [year, month, day] = DateUtils.dateToString(date).split('-');
  const requestOptions = {
    method: 'GET',
  };
  return fetch(`http://localhost:8000/api/events/?day=${day}&month=${month}&year=${year}&branch=${branch}&period=${period}`, requestOptions).then(handleResponse);
}

async function getOrderDetails(orderId) {
  const requestOptions = {
    method: 'GET',
  };
  return fetch(`http://localhost:8000/api/order/?id=${orderId}`, requestOptions).then(handleResponse);
}

async function getOrderWorkFlow(orderId) {
  const requestOptions = {
    method: 'GET',
  };
  return fetch(`http://localhost:8000/api/workflow/?id=${orderId}`, requestOptions).then(handleResponse);
}

async function getOrders(date) {
  const [year, month, day] = DateUtils.dateToString(date).split('-');
  const requestOptions = {
    method: 'GET',
  };
  return fetch(`http://localhost:8000/api/orders/?year=${year}&month=${month}&day=${day}`, requestOptions).then(handleResponse);
}

async function getWorkFlowSteps() {
  const requestOptions = {
    method: 'GET',
  };
  return fetch('http://localhost:8000/api/workflows/', requestOptions).then(handleResponse);
}

export const CalendarService = {
  createOrder,
  getAvailableHours,
  getEvents,
  getOrderDetails,
  getOrderWorkFlow,
  getOrders,
  getWorkFlowSteps,
};
