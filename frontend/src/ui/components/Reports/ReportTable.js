/* eslint-disable max-len */
import { React, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ChevronRightIcon, ChevronDownIcon, CheckIcon } from '@heroicons/react/solid';
import { DateUtils, CalendarUtils } from '../../utils';
import { ReportService } from '../../../services';

function BranchRow({ branchId, branchName, reports }) {
  const [state, setState] = useState({
    open: false,
  });

  const switchBranchRow = () => {
    setState({ ...state, open: !state.open });
  };

  return (
    <div className="flex flex-col">
      <div
        className="py-4 px-4 flex flex-row cursor-pointer hover:bg-gray-50 border-b border-gray-200"
        onClick={switchBranchRow}
        aria-hidden="true"
      >
        {state.open ? <ChevronDownIcon className="h-6 w-6" /> : <ChevronRightIcon className="h-6 w-6" />}
        <p className="text-xl text-gray-900 font-light">
          {branchName}
        </p>
      </div>
      { state.open
        ? (
          <div className="grid grid-cols-8 border-b border-gray-200 text-center text-gray-800 font-medium">
            <div className="col-span-1 border-l bg-slate-100 border-gray-200 py-2">
              Pedido
            </div>
            <div className="col-span-1 border-l bg-slate-100 border-gray-200 py-2">
              No. de Piezas
            </div>
            <div className="col-span-1 border-l bg-slate-100 border-gray-200 py-2">
              Servicio
            </div>
            <div className="col-span-1 border-l bg-slate-100 border-gray-200 py-2">
              Fecha de inicio
            </div>
            <div className="col-span-1 border-l bg-slate-100 border-gray-200 py-2">
              Fecha de fin
            </div>
            <div className="col-span-1 border-l bg-slate-100 border-gray-200 py-2">
              Horas de Trabajo
            </div>
            <div className="col-span-1 border-l bg-slate-100 border-gray-200 py-2">
              Estado
            </div>
            <div className="col-span-1 border-l bg-slate-100 border-gray-200 py-2">
              Pedido demorado
            </div>
          </div>
        )
        : <div />}
      { state.open && reports.map((report, id) => {
        if (Object.keys(report).length > 0 && report.branch_id === branchId) {
          return (
            <div
              key={`${report.branch_id}-${report.invoice_num}-${id}`}
              className="border-b border-gray-200 text-center text-gray-800 font-light grid grid-cols-8"
            >
              <div className="col-span-1 py-2">
                {report.invoice_num}
              </div>
              <div className="col-span-1 py-2">
                {report.range}
              </div>
              <div className="col-span-1 border-l border-gray-200 py-2">
                {`${report.type_label} ${report.type_id}`}
              </div>
              <div className="col-span-1 border-l border-gray-200 py-2">
                {DateUtils.dateToString(report.schedule_date)}
              </div>
              <div className="col-span-1 border-l border-gray-200 py-2">
                {DateUtils.dateToString(report.end_datetime)}
              </div>
              <div className="col-span-1 border-l border-gray-200 py-2">
                {(report.end_datetime - report.schedule_date) / 3600000}
              </div>
              <div className="col-span-1 border-l border-gray-200 py-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md font-medium ${CalendarUtils.getStateColor(report.state_id)}`}>
                  {report.state_label}
                </span>
              </div>
              <div className="flex col-span-1 justify-center border-l border-gray-200 py-2">
                {(report.state_id === 6) ? <CheckIcon className="h-6 w-6" /> : ''}
              </div>
            </div>
          );
        }
        return <div> </div>;
      })}
    </div>
  );
}

BranchRow.propTypes = {
  branchId: PropTypes.number.isRequired,
  branchName: PropTypes.string.isRequired,
  reports: PropTypes.array.isRequired,
};

function ReportTable({
  startDate, endDate, selectedBranches,
}) {
  const [reports, setReports] = useState({
    reports: [],
  });

  const [summaries, setSummaries] = useState({
    summaries: [],
  });

  const getReports = (start, end, branchOffices) => {
    ReportService.getProductivityReport(start, end, branchOffices)
      .then((response) => {
        const reportes = response.data.map((report) => {
          const date1 = report.schedule_date.slice(0, report.schedule_date.length - 1);
          const date2 = report.end_datetime.slice(0, report.end_datetime.length - 1);
          return {
            ...report,
            schedule_date: new Date(date1),
            end_datetime: new Date(date2),
          };
        });
        setReports({ ...reports, reports: reportes });
      })
      .catch(() => {
        setReports({
          ...reports,
          reports: [
            {
              invoice_num: 1,
              range: '0-99',
              type_id: 1,
              type_label: 'Corte',
              schedule_date: new Date('2022-08-10T10:00:00'),
              end_datetime: new Date('2022-08-10T10:00:00'),
              step_start: null,
              step_end: null,
              state_label: 'No Iniciado',
              state_id: 1,
              branch_id: 2,
            },
            {
              invoice_num: 2,
              range: '200-499',
              type_id: 1,
              type_label: 'Corte',
              schedule_date: new Date('2022-08-14T12:00:00'),
              end_datetime: new Date('2022-08-16T12:00:00'),
              step_start: null,
              step_end: null,
              state_label: 'Demorado',
              state_id: 6,
              branch_id: 2,
            },
            {
              invoice_num: 2,
              range: '200-499',
              type_id: 2,
              type_label: 'Enchape',
              schedule_date: new Date('2022-08-14T12:00:00'),
              end_datetime: new Date('2022-08-16T12:00:00'),
              step_start: null,
              step_end: null,
              state_label: 'No Iniciado',
              state_id: 1,
              branch_id: 1,
            },
            {
              invoice_num: 2,
              range: '200-499',
              type_id: 3,
              type_label: 'Perforacion',
              schedule_date: new Date('2022-08-14T12:00:00'),
              end_datetime: new Date('2022-08-16T12:00:00'),
              step_start: null,
              step_end: null,
              state_label: 'No Iniciado',
              state_id: 1,
              branch_id: 1,
            },
            {
              invoice_num: 2,
              range: '200-499',
              type_id: 4,
              type_label: 'Canales',
              schedule_date: new Date('2022-08-14T12:00:00'),
              end_datetime: new Date('2022-08-16T12:00:00'),
              step_start: null,
              step_end: null,
              state_label: 'No Iniciado',
              state_id: 1,
              branch_id: 1,
            },
          ],
        });
        // Adds error state
      });
  };

  // Revisar indices del response.data
  const getSummaries = (start, end, branchOffices) => {
    ReportService.getOrdersResume(start, end, branchOffices)
      .then((response) => {
        setSummaries({ ...summaries, summaries: response.data });
      })
      .catch(() => {
        setSummaries({
          ...summaries,
          summaries: {
            1: {
              branch_name: 'BranchOffice 001',
              completed: 0,
              delayed: 0,
              no_completed: 2,
            },
            2: {
              branch_name: 'BranchOffice 002',
              completed: 0,
              delayed: 0,
              no_completed: 2,
            },
          },
        });
        // Adds error state
      });
  };

  useEffect(() => {
    getReports(startDate, endDate, selectedBranches);
    getSummaries(startDate, endDate, selectedBranches);
  }, []);

  return (
    <>
      {Object.keys(summaries.summaries).map((branchId, index) => {
        const branch_id = parseInt(branchId, 10);
        return (
          <BranchRow
            branchId={branch_id}
            branchName={summaries.summaries[branchId].branch_name}
            reports={reports.reports}
            key={`${branchId}-${index}`}
          />
        );
      })}
    </>
  );
}

ReportTable.propTypes = {
  startDate: PropTypes.object.isRequired,
  endDate: PropTypes.object.isRequired,
  selectedBranches: PropTypes.array.isRequired,
};

export { ReportTable };
