import { TableIcon, CalendarIcon , ChevronLeftIcon, ChevronRightIcon} from '@heroicons/react/solid'

const getNextMonday = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate()+7);
}

const getPreviousMonday = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate()-7);
}

const getWeekLabel = (date) => {
    const monthMap = {
        0 : "Ene",
        1 : "Febr",
        2 : "Mar",
        3 : "Abril",
        4 : "Mayo",
        5 : "Junio",
        6 : "Julio",
        7 : "Ago",
        8 : "Sept",
        9 : "Oct",
        10 : "Nov",
        11 : "Dic"
      }

    const date2 = new Date(date.getFullYear(),date.getMonth(),date.getDate()+6)
    
    if(date.getMonth() == date2.getMonth()){
        return date.getFullYear() +", "+monthMap[date.getMonth()]+" "+date.getDate()+" - "+date2.getDate();
    } else {
        return date.getFullYear() +", "+monthMap[date.getMonth()]+" "+date.getDate()+" - "+monthMap[date2.getMonth()]+" "+date2.getDate();
    }
    
}

function TasksHeader({selectedView, selectedDate, setSelectedDate}){
    return(
        <>
         <header className="">
                <div className="flex flex-row px-4 pt-4 justify-center border-b border-gray-200">
                    <nav class="-mb-px flex space-x-8" aria-label="Tabs">
                        <a href="#" class={selectedView ==0 ? "border-gray-500 text-gray-600 group inline-flex items-center pb-2 px-1 border-b-2 font-medium text-sm" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 group inline-flex items-center pb-2 px-1 border-b-2 font-medium text-sm"}>
                            <TableIcon className={selectedView == 0 ?  "text-gray-500 -ml-0.5 mr-2 h-5 w-5" : "text-gray-400 group-hover:text-gray-500 -ml-0.5 mr-2 h-5 w-5" }/>
                            <span>Lista</span>
                        </a>
                        <a href="#" class={selectedView == 1 ? "border-gray-500 text-gray-600 group inline-flex items-center pb-2 px-1 border-b-2 font-medium text-sm" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 group inline-flex items-center pb-2 px-1 border-b-2 font-medium text-sm"}>
                            <CalendarIcon className={selectedView == 1 ?  "text-gray-500 -ml-0.5 mr-2 h-5 w-5" : "text-gray-400 group-hover:text-gray-500 -ml-0.5 mr-2 h-5 w-5" }/>
                            <span>Calendario</span>
                        </a>          
                    </nav>

                </div>
            </header>
            <div className="w-full py-6 flex items-center justify-between px-8">
                <span class="relative z-0 inline-flex shadow-sm rounded-md">
                    <div type="button" onClick= {()=>{ setSelectedDate(getPreviousMonday(selectedDate))}} class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 cursor-pointer">
                        <ChevronLeftIcon className="h-5 w-5"/>
                    </div>
                    <div className="-ml-px relative inline-flex items-center px-2 py-2  border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500">
                    {getWeekLabel(selectedDate)}
                    </div>
                    <div type="button" onClick= {()=>{ setSelectedDate(getNextMonday(selectedDate))}}class="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 cursor-pointer">
                        <ChevronRightIcon className="h-5 w-5"/>
                    </div>
                </span>
                <div type="button" onClick= {()=>{}}  class="relative inline-flex items-center px-4 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 cursor-pointer">
                    <CalendarIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400"/>
                    Agendar
                </div>
            </div>
        </>
    )
}

export {TasksHeader}