import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import InfoCard from '../components/Cards/InfoCard'
import PageTitle from '../components/Typography/PageTitle'
import { ChatIcon, MoneyIcon, PeopleIcon } from '../icons'
import RoundIcon from '../components/RoundIcon'
import { getStats } from '../actions/stat'

function Dashboard() {
  const statState = useSelector(state => state.stat)
  const noteState = useSelector(state => state.notes)
  const programState = useSelector(state => state.program)
  const dispatch = useDispatch()

  const totalStat = (stats) => {
    var total = 0;
    stats.map(item => total += item.reward)
    return total
  }

  const currentMonth = (stats) => {
    var total = 0;
    stats.forEach(item => {
      let date = new Date(item.report_date);
      let now = new Date();

      if (date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()) {
        total += item.reward
      } 
      
    })
    return total
  }

  useEffect(() => {
    dispatch(getStats())
  }, [])

  return (
    <>
      <PageTitle>Dashboard</PageTitle>

      {/* <!-- Cards --> */}
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        

        <InfoCard title="Total Bounties balance" value={`$ ${statState.stats ? totalStat(statState.stats) : 0}`}>
          <RoundIcon
            icon={MoneyIcon}
            iconColorClass="text-green-500 dark:text-green-100"
            bgColorClass="bg-green-100 dark:bg-green-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Current Month" value={`$ ${statState.stats ? currentMonth(statState.stats) : 0}`}>
          <RoundIcon
            icon={MoneyIcon}
            iconColorClass="text-green-500 dark:text-green-100"
            bgColorClass="bg-green-100 dark:bg-green-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Programs" value={programState.programs && programState.programs.length}>
          <RoundIcon
            icon={PeopleIcon}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Notes" value={noteState.notes && noteState.notes.length}>
          <RoundIcon
            icon={ChatIcon}
            iconColorClass="text-teal-500 dark:text-teal-100"
            bgColorClass="bg-teal-100 dark:bg-teal-500"
            className="mr-4"
          />
        </InfoCard>
      </div>
    </>
  )
}

export default Dashboard
