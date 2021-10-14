import { parseCookies } from "nookies";
import { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import CountUp from "react-countup";

const Statistics = () => {
  const [statistics, setStatistics] = useState<any[]>([]);
  const [statisticsAccumulative, setStatisticsAccumulative] = useState<any[]>(
    []
  );
  const [statisticsPerProvince, setStatisticsPerProvince] = useState<any[]>([]);
  // const [total, setTotal] = useState(0);
  const cookies = parseCookies();

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/tracker/graph-total`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${cookies.access_token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error("Error get statistics total");
        }

        const json = await res.json();
        setStatistics(json.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchStatistics();
  }, [cookies.access_token]);

  useEffect(() => {
    const fetchStatisticsPerProvince = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/tracker/graph-province`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${cookies.access_token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error("Error get statistics per province");
        }

        const json = await res.json();
        setStatisticsPerProvince(json.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchStatisticsPerProvince();
  }, [cookies.access_token]);

  useEffect(() => {
    const fetchStatisticsAccumulative = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/tracker/graph-accumulative`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${cookies.access_token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error("Error get statistics accumulative");
        }

        const json = await res.json();
        setStatisticsAccumulative(json.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchStatisticsAccumulative();
  }, [cookies.access_token]);

  const series = [
    {
      name: "Visitor",
      data: statistics.map((statistic) => statistic.total),
    },
  ];

  const series2 = [
    {
      name: "Visitor Accumulative",
      data: statisticsAccumulative.map((statistic) => statistic.total),
    },
  ];

  const totalVisitor = statistics.reduce((acc, cur) => {
    return acc + cur.total;
  }, 0);

  return (
    <>
      <div className="grid grid-cols-2 gap-6">
        <div className="mb-6 p-6 bg-white rounded-md shadow">
          <div className="text-xl text-center mb-2">Total Visitor</div>
          <div className="text-4xl font-bold text-center">
            <CountUp end={totalVisitor} duration={1} />
          </div>
        </div>
        <div className="mb-6 p-6 bg-white rounded-md shadow">
          <div className="text-xl text-center mb-2">Total Unique Visitor</div>
          <div className="text-4xl font-bold text-center">
            <CountUp
              end={
                statisticsAccumulative.map((statistic) => statistic.total)[
                  statisticsAccumulative.length - 1
                ]
              }
              duration={1}
            />
          </div>
        </div>
      </div>
      {statistics.length &&
      statisticsPerProvince.length &&
      setStatisticsAccumulative.length ? (
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white p-3 shadow rounded-md">
            <Chart
              options={{
                chart: {
                  height: 350,
                  type: "area",
                },
                dataLabels: {
                  enabled: false,
                },
                stroke: {
                  curve: "smooth",
                },
                xaxis: {
                  type: "datetime",
                  categories: statistics.map((statistic) => statistic.date),
                },
                yaxis: {
                  min: 0,
                  // max: 240,
                  title: {
                    text: "Visitor",
                  },
                },
                tooltip: {
                  x: {
                    format: "dd/MM/yy HH:mm",
                  },
                },

                title: {
                  text: "Total Visitor",
                  align: "left",
                },
              }}
              series={series}
              type="area"
              width="100%"
            />
          </div>
          <div className="bg-white p-3 shadow rounded-md">
            <Chart
              options={{
                chart: {
                  height: 350,
                  type: "area",
                },
                dataLabels: {
                  enabled: false,
                },
                stroke: {
                  curve: "smooth",
                },
                xaxis: {
                  type: "datetime",
                  categories: statisticsAccumulative.map(
                    (statistic) => statistic.date
                  ),
                },
                yaxis: {
                  min: 0,
                  // max: 240,
                  title: {
                    text: "Visitor Accumulative",
                  },
                },
                tooltip: {
                  x: {
                    format: "dd/MM/yy HH:mm",
                  },
                },

                title: {
                  text: "Visitor Accumulative",
                  align: "left",
                },
              }}
              series={series2}
              type="area"
              width="100%"
            />
          </div>
          <div className="bg-white p-3 shadow rounded-md">
            <Chart
              type="donut"
              series={statisticsPerProvince.map((statistic) => statistic.total)}
              options={{
                labels: statisticsPerProvince.map((statistic) => {
                  if (statistic.province === "") {
                    return "Unknown";
                  }
                  if (!statistic.province) {
                    return "Lainnya";
                  }
                  return statistic.province;
                }),
                title: {
                  text: "Visitor / Provinsi",
                  align: "left",
                },
              }}
              width="100%"
            />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Statistics;
