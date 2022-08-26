/* eslint-disable no-nested-ternary */
import React, { useState, useCallback } from 'react';
import ReactSelect, { components } from 'react-select';
import PropTypes from 'prop-types';
import './index.css';
/*
const colourOptions = [
  {
    value: 'ocean1', label: 'Corte-abc123', id: 1, type: 'corte',
  },
  {
    value: 'blue', label: 'Corte-cde456', id: 2, type: 'corte',
  },
  {
    value: 'purple', label: 'Enchapado-efg789', id: 3, type: 'encapado',
  },
  {
    value: 'red', label: 'Abisagrado-rty852', id: 4, type: 'abisagrado',
  },
  {
    value: 'orange', label: 'Pegado-okl963', id: 5, type: 'pegado',
  },
];
*/
function Option(props) {
  const { label, isSelected, value } = props;
  const checkboxClassName = `${isSelected ? ' ring-2 ring-gray-200 ' : ''} h-4 w-4 mr-2 text-gray-600 focus:ring-gray-500 border-gray-300 rounded`;
  return (
    <div>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */ }
      <components.Option {...props}>
        <input
          id={value}
          name={value}
          type="checkbox"
          className={checkboxClassName}
          checked={isSelected}
          onChange={() => null}
        />
        {' '}
        <label
          htmlFor={value}
          className={isSelected ? 'text-gray-200' : 'text-gray-500'}
        >
          {label}
        </label>
      </components.Option>
    </div>
  );
}

Option.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  isSelected: PropTypes.bool,
};

Option.defaultProps = {
  isSelected: false,
};

function SelectorCheckbox(props) {
  const { setSelectedOptions, options } = props;
  const [state, setState] = useState({});

  const handleChange = useCallback((selected) => {
    const last = selected[selected.length - 1];
    const filter = selected.filter((option) => option.id === last.id || option.type !== last.type);
    setSelectedOptions(filter);
    setState({ ...state, optionSelected: filter });
  }, [setState]);

  return (
    <span
      className=" w-52 shadow-sm rounded-md text-left sm:text-sm"
      data-toggle="popover"
      data-content="Please select option"
    >
      <ReactSelect
        className="border-none"
        classNamePrefix="react-select"
        options={options}
        isMulti
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        components={{
          Option,
        }}
        placeholder="--Seleccionar--"
        onChange={handleChange}
        allowSelectAll
        value={state.optionSelected}
        theme={(theme) => ({
          ...theme,
          borderRadius: '0.375rem',
          colors: {
            ...theme.colors,
            primary25: '#e2e8f0',
            primary: '#475569',
          },
        })}
      />
    </span>
  );
}

SelectorCheckbox.propTypes = {
  setSelectedOptions: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
};

export default SelectorCheckbox;
