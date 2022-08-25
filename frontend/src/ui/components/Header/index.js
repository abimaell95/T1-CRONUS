import { React, useState, useCallback } from 'react';
import { MenuIcon } from '@heroicons/react/solid';
import SlideOver from '../SlideOver';

function Header() {
  const [openSlide, setOpenSlide] = useState(false);
  const setOpen = useCallback(() => {
    setOpenSlide(true);
  }, [setOpenSlide]);

  return (
    <div className="relative bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
          <div className="mt-2 flex items-center text-sm">
            <MenuIcon className="h-8 w-auto sm:h-10 flex-shrink-0 mr-1.5 text-gray-800" onClick={setOpen} />
            <div className="text-4xl font-bold leading-7 text-gray-800">CRONUS</div>
          </div>
        </div>
      </div>
      <SlideOver open={openSlide} setOpen={setOpenSlide} />
    </div>

  );
}

export default Header;
