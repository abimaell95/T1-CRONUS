function dateToString(date) {
  const year = date.getFullYear();
  const month = date.getMonth().toString().length > 1 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
  const day = date.getDate();
  return `${year}-${month}-${day}`;
}

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
  return fetch('/order/', requestOptions).then(handleResponse);
}

async function getAvailableHours(date, branchId) {
  const dateString = dateToString(date);
  const requestOptions = {
    method: 'GET',
  };
  return fetch(`/available_hours/?date=${dateString}&branch=${branchId}`, requestOptions).then(handleResponse);
}

async function getEvents(date, branch = 1, period = 0) {
  const [year, month, day] = dateToString(date).split('-');
  const requestOptions = {
    method: 'GET',
  };
  return fetch(`/events/?day=${day}&month=${month}&year=${year}&branch=${branch}&period=${period}`, requestOptions).then(handleResponse);
}

async function getOrderDetails(orderId) {
  const requestOptions = {
    method: 'GET',
  };
  return fetch(`/order/?id=${orderId}`, requestOptions).then(handleResponse);
}

async function getOrderWorkFlow(orderId) {
  const requestOptions = {
    method: 'GET',
  };
  return fetch(`/workflow/?id=${orderId}`, requestOptions).then(handleResponse);
}

async function getOrders(date) {
  const [year, month, day] = dateToString(date).split('-');
  const requestOptions = {
    method: 'GET',
  };
  return fetch(`/orders/?year=${year}&month=${month}&day=${day}`, requestOptions).then(handleResponse);
}

async function getWorkFlowSteps() {
  const requestOptions = {
    method: 'GET',
  };
  return fetch('/workflows/', requestOptions).then(handleResponse);
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
