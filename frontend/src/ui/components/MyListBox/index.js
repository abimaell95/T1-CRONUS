import { React, useState, Fragment } from 'react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import { Listbox, Transition } from '@headlessui/react';
import PropTypes from 'prop-types';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function MyListbox(props) {
  const { options, setSelectedId } = props;
  const [selected, setSelected] = useState(options ? options[0] : null);

  function onChange(e) {
    setSelected(e);
    setSelectedId(e.id);
  }

  return (
    <Listbox value={selected} onChange={(e) => onChange(e)}>
      {({ open }) => (
        <div className="mt-1 relative w-48">
          <Listbox.Button className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 sm:text-sm">
            <span className="block truncate text-gray-500">{selected ? selected.label : 'No hay horarios'}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>
          { options.length === 0 ? ''
            : (
              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                  {options.map((option) => (
                    <Listbox.Option
                      key={option.id}
                      className={({ active }) => classNames(
                        active ? 'text-gray-200 bg-gray-600' : 'text-gray-500',
                        'cursor-default select-none relative py-2 pl-3 pr-9',
                      )}
                      value={option}
                    >
                      {({ selectedItem, active }) => (
                        <>
                          <span className={classNames(selectedItem ? 'font-semibold' : 'font-normal', 'block truncate')}>
                            {option?.label}
                          </span>

                          {selectedItem ? (
                            <span
                              className={classNames(
                                active ? 'text-white' : 'text-gray-600',
                                'absolute inset-y-0 right-0 flex items-center pr-4',
                              )}
                            >
                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            )}
        </div>
      )}
    </Listbox>
  );
}

MyListbox.propTypes = {
  options: PropTypes.array.isRequired,
  setSelectedId: PropTypes.func.isRequired,
};

export default MyListbox;
