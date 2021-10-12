import { parseCookies } from "nookies";
import { useState, useEffect } from "react";
import Chart from "react-apexcharts";

const Statistics = () => {
  const [statistics, setStatistics] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const cookies = parseCookies();

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tracker`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${cookies.access_token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Error get statistics");
        }

        const json = await res.json();
        setTotal(json.data.total);
        setStatistics(json.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchStatistics();
  }, [cookies.access_token]);

  // Data Total
  const data = statistics.reduce(function (map, obj) {
    const date = obj.date || "2021-10-07";
    if (!map[date]) {
      map[date] = 0;
    }
    map[date] = map[date] + obj.total;
    return map;
  }, {});

  const orderedData = Object.keys(data)
    .sort()
    .reduce((obj: any, key) => {
      obj[key] = data[key];
      return obj;
    }, {});

  // Data / province
  const provinceStatistics = statistics.reduce(function (map, obj) {
    const province = !obj.province
      ? "Lainnya"
      : obj.province === "-"
      ? "Lainnya"
      : obj.province;
    if (!map[province]) {
      map[province] = 0;
    }
    map[province] = map[province] + obj.total;
    return map;
  }, {});

  const series = [
    {
      name: "Visitor",
      data: Object.values(orderedData),
    },
  ];

  return (
    <>
      <div className="mb-6 p-6 bg-white rounded-md shadow">
        <div className="text-xl text-center mb-2">Total Visitor</div>
        <div className="text-4xl font-bold text-center">{total}</div>
      </div>
      {statistics.length ? (
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
                  categories: Object.keys(orderedData),
                },
                yaxis: {
                  min: 0,
                  max: 240,
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
              type="donut"
              series={Object.values(provinceStatistics)}
              options={{
                labels: Object.keys(provinceStatistics),
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
