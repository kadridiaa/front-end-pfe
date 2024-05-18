import React from 'react'
import LineChart from './LineChart'
import PieChart from './PercentageCircle'
import WebSiteTable from './WebSiteTable'
import ContactTable from './ContactTable'

function TableBoard() {
  return (
    <div className='w-full p-4'>
      <div className='flex w-full'>
      <LineChart/>
      <PieChart/>
      </div>
      <div className='flex'>
        <WebSiteTable/>
        <ContactTable/>
      </div>

    </div>
  )
}

export default TableBoard
