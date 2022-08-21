import { React, useState } from 'react';
import {
  CalendarIcon,
  DocumentReportIcon,
  DatabaseIcon,
} from '@heroicons/react/solid';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function SideBar() {
  const [sidebarNavigation, setSidebarNavigation] = useState([
    {
      name: 'Agenda', href: '/tasks', icon: CalendarIcon, current: false,
    },
    {
      name: 'Reportes', href: '#', icon: DocumentReportIcon, current: false,
    },
    {
      name: 'Administrador', href: '#', icon: DatabaseIcon, current: false,
    },
  ]);

  function updateCurrent(idx) {
    const sidebarNavigationUpt = sidebarNavigation.map((option, _idx) => ({
      ...option,
      current: idx === _idx,
    }));
    setSidebarNavigation(sidebarNavigationUpt);
  }

  return (
    <div className="hidden w-28 bg-gray-700 overflow-y-auto md:block h-screen">
      <div className="w-full py-6 flex flex-col items-center">
        <div className="flex-shrink-0 flex items-center">
          <img
            className="h-8 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark.svg?color=white"
            alt="Workflow"
          />
        </div>
        <div className="flex-1 mt-6 w-full px-2 space-y-1">
          {sidebarNavigation.map((item, idx) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => updateCurrent(idx)}
              className={classNames(
                item.current ? 'bg-gray-800 text-white' : 'text-gray-100 hover:bg-gray-800 hover:text-white',
                'group w-full p-3 rounded-md flex flex-col items-center text-xs font-medium',
              )}
              aria-current={item.current ? 'page' : undefined}
            >
              <item.icon
                className={classNames(
                  item.current ? 'text-white' : 'text-gray-300 group-hover:text-white',
                  'h-6 w-6',
                )}
                aria-hidden="true"
              />
              <span className="mt-2">{item.name}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SideBar;
