import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getStats, reloadStats } from "../actions/stat";
import PageTitle from "../components/Typography/PageTitle";
import ChartCard from "../components/Chart/ChartCard";
import InfoCard from "../components/Cards/InfoCard";
import { Doughnut, Bar } from "react-chartjs-2";
import ChartLegend from "../components/Chart/ChartLegend";
import { MoneyIcon, PeopleIcon } from "../icons";
import RoundIcon from "../components/RoundIcon";
import { Button } from "@windmill/react-ui";
import { getPrograms } from "../actions/program";
import ClipLoader from "react-spinners/ClipLoader";

function Stat() {
  const dispatch = useDispatch();
  const statState = useSelector((state) => state.stat);
  const [nReports, setNReports] = useState([]);
  const [bountyPerMonth, setBountyPerMonth] = useState([]);
  const [critical, setCritical] = useState([]);

  useEffect(() => {
    dispatch(getPrograms());
    dispatch(getStats());
  }, []);

  useEffect(() => {
    if (statState.stats) {
      let nReports = [];
      let bountyPerMonth = [];
      let critical = [];
      for (let i = 0; i < 12; i++) {
        nReports.push(0);
        bountyPerMonth.push(0);
      }
      for (let i = 0; i < 4; i++) {
        critical.push(0);
      }
      statState.stats.forEach((item) => {
        let date = new Date(item.report_date);
        if (date.getFullYear() === new Date().getFullYear()) {
          nReports[date.getMonth()] += 1;
          bountyPerMonth[date.getMonth()] += item.reward;
          if (item.severity === "C") {
            critical[3] += 1;
          }
          if (item.severity === "H") {
            critical[2] += 1;
          }
          if (item.severity === "M") {
            critical[1] += 1;
          }
          if (item.severity === "L") {
            critical[0] += 1;
          }
        }
      });
      setNReports(nReports);
      setBountyPerMonth(bountyPerMonth);
      setCritical(critical);
    }
  }, [statState.stats]);

  const totalStat = (stats) => {
    var total = 0;
    stats.map((item) => (total += item.reward));
    return total;
  };

  const currentMonth = (stats) => {
    var total = 0;
    stats.forEach((item) => {
      let date = new Date(item.report_date);
      let now = new Date();

      if (
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
      ) {
        total += item.reward;
      }
      return;
    });
    return total;
  };

  const handleReloadStats = () => {
    dispatch(reloadStats());
  };

  const reportsBarLegends = [
    { title: "Number of reports", color: "bg-teal-600" },
  ];

  const bountyBarLegends = [
    { title: "Bounty per month", color: "bg-teal-600" },
  ];

  const reportsBarOptions = {
    data: {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          label: "Reports per month",
          backgroundColor: "#0694a2",
          borderWidth: 1,
          data: nReports,
        },
      ],
    },
    options: {
      responsive: true,
    },
    legend: {
      display: false,
    },
  };

  const bountyBarOptions = {
    data: {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          label: "Bounty per month",
          backgroundColor: "#0694a2",
          borderWidth: 1,
          data: bountyPerMonth,
        },
      ],
    },
    options: {
      responsive: true,
    },
    legend: {
      display: false,
    },
  };

  const criticityLegends = [
    { title: "Low", color: "bg-green-700" },
    { title: "Medium", color: "bg-orange-400" },
    { title: "High", color: "bg-red-700" },
    { title: "Critical", color: "bg-black" },
  ];

  const criticityOptions = {
    data: {
      datasets: [
        {
          data: critical,
          backgroundColor: ["green", "orange", "red", "black"],
          label: "Criticity",
        },
      ],
      labels: ["Low", "Medium", "High", "Critical"],
    },
    options: {
      responsive: true,
      cutoutPercentage: 80,
    },
    legend: {
      display: false,
    },
  };

  return (
    <>
      <PageTitle>Stats</PageTitle>

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="py-3">
          {statState.loading ? (
            <ClipLoader
              color={"#355dad"}
              loading={true}
              size={30}
              aria-label="Loading"
              data-testid="loader"
            />
          ) : (
            <Button onClick={() => handleReloadStats()}>Reload Stats</Button>
          )}
        </div>

        <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
          <InfoCard
            title="Numbers of Rapports"
            value={`${statState.stats ? statState.stats.length : 0}`}
          >
            <RoundIcon
              icon={PeopleIcon}
              iconColorClass="text-orange-500 dark:text-orange-100"
              bgColorClass="bg-orange-100 dark:bg-orange-500"
              className="mr-4"
            />
          </InfoCard>

          <InfoCard
            title="Current Month"
            value={`$ ${statState.stats ? currentMonth(statState.stats) : 0}`}
          >
            <RoundIcon
              icon={MoneyIcon}
              iconColorClass="text-green-500 dark:text-green-100"
              bgColorClass="bg-green-100 dark:bg-green-500"
              className="mr-4"
            />
          </InfoCard>

          <InfoCard
            title="Total Bounties balance"
            value={`$ ${statState.stats ? totalStat(statState.stats) : 0}`}
          >
            <RoundIcon
              icon={MoneyIcon}
              iconColorClass="text-green-500 dark:text-green-100"
              bgColorClass="bg-green-100 dark:bg-green-500"
              className="mr-4"
            />
          </InfoCard>
        </div>

        <div className="grid gap-6 mb-8 md:grid-cols-2">
          <ChartCard title="Number of Reports">
            <Bar {...reportsBarOptions} />
            <ChartLegend legends={reportsBarLegends} />
          </ChartCard>

          <ChartCard title="Bounty per month">
            <Bar {...bountyBarOptions} />
            <ChartLegend legends={bountyBarLegends} />
          </ChartCard>

          <ChartCard title="Criticity">
            <Doughnut {...criticityOptions} />
            <ChartLegend legends={criticityLegends} />
          </ChartCard>
        </div>
      </div>
    </>
  );
}

export default Stat;
