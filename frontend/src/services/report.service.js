import { DateUtils } from '../ui/utils';

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    return { ...data, status: response.status };
  });
}

async function getProductivityReport(startDate, endDate, branches) {
  const start = DateUtils.dateToString(startDate);
  const end = DateUtils.dateToString(endDate);
  const requestOptions = {
    method: 'GET',
  };
  return fetch(`/dev/api/productivity_report/?branch=${branches.toString()}&date_start=${start}&date_end=${end}`, requestOptions).then(handleResponse);
}

async function getOrdersResume(startDate, endDate, branches) {
  const start = DateUtils.dateToString(startDate);
  const end = DateUtils.dateToString(endDate);
  const requestOptions = {
    method: 'GET',
  };
  return fetch(`/dev/api/orders_resume/?branch=${branches.toString()}&date_start=${start}&date_end=${end}`, requestOptions).then(handleResponse);
}

export const ReportService = {
  getProductivityReport,
  getOrdersResume,
};
