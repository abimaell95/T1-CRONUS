/* eslint-disable max-len */
import { React, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CalendarService } from '../../../services';
import SelectorCheckbox from '../SelectorCheckbox';

function ReportHeader({
  setStartDate, setEndDate, setSelectedBranches,
}) {
  const [state, setState] = useState({
    branches: [],
  });

  const getBranches = () => {
    CalendarService.getBranchOffices()
      .then((response) => {
        const branchOffices = response.data.map((branch) => ({
          id: branch.id,
          label: branch.name,
          value: branch.name,
          type: branch.name,
        }));
        setState({ ...state, branches: branchOffices });
      })
      .catch(() => {
        setState({
          ...state,
          branches: [
            {
              id: 1, label: 'BranchOffice 001', value: 'BranchOffice 001', type: 'BranchOffice 001',
            },
            {
              id: 2, label: 'BranchOffice 002', value: 'BranchOffice 002', type: 'BranchOffice 002',
            },
            {
              id: 3, label: 'BranchOffice 003', value: 'BranchOffice 003', type: 'BranchOffice 003',
            },
            {
              id: 4, label: 'BranchOffice 004', value: 'BranchOffice 004', type: 'BranchOffice 004',
            },
          ],
        });
      });
  };

  useEffect(() => {
    getBranches();
  }, []);

  return (
    <>
      <div className="flex flex-row px-4 py-4 justify-center border-b border-gray-200">
        <p className="text-3xl text-gray-900 font-medium ">
          Reporte de Productividad
        </p>
      </div>

      <div className="w-full flex flex-row items-center px-8 py-6 space-x-8 justify-left border-gray-200 border-b">
        <div className="flex content-center items-center space-x-3 justify-between">
          <span className="font-medium">Inicio</span>
          <input
            className="text-gray-500 mt-1 focus:ring-gray-500 focus:border-gray-500 block shadow-sm sm:text-sm border-gray-300 rounded-md w-40"
            type="date"
            name="startDate"
            onChange={(e) => {
              const date = new Date(`${e.target.value}T00:00:00`);
              setStartDate(date);
            }}
          />
        </div>
        <div className="flex content-center items-center space-x-3 justify-between">
          <span className="font-medium">Fin</span>
          <input
            className="text-gray-500 mt-1 focus:ring-gray-500 focus:border-gray-500 block shadow-sm sm:text-sm border-gray-300 rounded-md w-40"
            type="date"
            name="endDate"
            onChange={(e) => {
              const date = new Date(`${e.target.value}T00:00:00`);
              setEndDate(date);
            }}
          />
        </div>
        <div className="flex content-center items-center space-x-3 justify-between">
          <span className="font-medium">Sucursales</span>
          <SelectorCheckbox
            setSelectedOptions={(_branches) => setSelectedBranches(_branches)}
            options={state.branches}
          />
        </div>
      </div>
    </>
  );
}

ReportHeader.propTypes = {
  setStartDate: PropTypes.func.isRequired,
  setEndDate: PropTypes.func.isRequired,
  setSelectedBranches: PropTypes.func.isRequired,
};

export { ReportHeader };
