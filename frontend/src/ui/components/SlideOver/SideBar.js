import { React } from 'react';
import PropTypes from 'prop-types';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function SideBar(props) {
  const { setOpen, sidebarNavigation, setSidebarNavigation } = props;

  function updateCurrent(idx) {
    const sidebarNavigationUpt = sidebarNavigation.map((option, _idx) => ({
      ...option,
      current: idx === _idx,
    }));
    setOpen(false);
    setSidebarNavigation(sidebarNavigationUpt);
  }

  return (
    <div className="hidden w-28 bg-gray-700 overflow-y-auto md:block h-screen">
      <div className="w-full py-6 flex flex-col items-center">
        <div className="flex justify-between items-center py-2 md:justify-start md:space-x-10">
          <div className="mt-2 flex items-center text-sm">
            <div className="text-xl font-bold leading-7 text-gray-200">CRONUS</div>
          </div>
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

SideBar.propTypes = {
  setOpen: PropTypes.func.isRequired,
  sidebarNavigation: PropTypes.array.isRequired,
  setSidebarNavigation: PropTypes.func.isRequired,
};

export default SideBar;
