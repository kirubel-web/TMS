import React, { useState, useEffect } from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const Statistics = () => {
  const [stats, setStats] = useState({
    customers: {
      total: 0,
      list: [],
      cityCount: {},
      departmentCount: {},
    },
    dispatchers: {
      total: 0,
      list: [],
      roleCount: {},
    },
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Fetch customer data
      const customersResponse = await fetch(
        "http://localhost:5000/api/customers",
      );
      const customersData = await customersResponse.json();
      const customerCount = await fetch(
        "http://localhost:5000/api/customers/count",
      );
      const customerCountData = await customerCount.json();

      // Fetch dispatcher data
      const dispatchersResponse = await fetch(
        "http://localhost:5000/api/dispatchers",
      );
      const dispatchersData = await dispatchersResponse.json();
      const dispatcherCount = await fetch(
        "http://localhost:5000/api/dispatchers/count",
      );
      const dispatcherCountData = await dispatcherCount.json();

      // Process customer cities
      const cityCount = {};
      customersData.customers.forEach((customer) => {
        if (customer.city) {
          cityCount[customer.city] = (cityCount[customer.city] || 0) + 1;
        }
      });

      // Process customer department
      const departmentCount = {};
      customersData.customers.forEach((customer) => {
        if (customer.department) {
          departmentCount[customer.department] =
            (departmentCount[customer.department] || 0) + 1;
        }
      });

      // Process dispatcher roles
      const roleCount = {};
      dispatchersData.forEach((dispatcher) => {
        if (dispatcher.role) {
          roleCount[dispatcher.role] = (roleCount[dispatcher.role] || 0) + 1;
        }
      });

      setStats({
        customers: {
          total: customerCountData.count,
          list: customersData.customers,
          cityCount,
          departmentCount,
        },
        dispatchers: {
          total: dispatcherCountData.count,
          list: dispatchersData,
          roleCount,
        },
      });
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const cityChartData = {
    labels: Object.keys(stats.customers.cityCount),
    datasets: [
      {
        data: Object.values(stats.customers.cityCount),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  const departmentChartData = {
    labels: Object.keys(stats.customers.departmentCount),
    datasets: [
      {
        label: "Customers by Department",
        data: Object.values(stats.customers.departmentCount),
        backgroundColor: ["#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
      },
    ],
  };

  const roleChartData = {
    labels: Object.keys(stats.dispatchers.roleCount),
    datasets: [
      {
        label: "Dispatchers by Role",
        data: Object.values(stats.dispatchers.roleCount),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded-md">{error}</div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Customer Statistics Section */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Customer Statistics
        </h2>

        <div className="mb-8">
          <div className="bg-blue-500 rounded-lg shadow-lg p-6 text-white transform transition-transform hover:scale-105">
            <h3 className="text-lg font-semibold mb-2">Total Customers</h3>
            <p className="text-3xl font-bold">{stats.customers.total}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Customers by City</h3>
            <div className="h-[300px]">
              <Pie
                data={cityChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: "right",
                    },
                  },
                }}
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">
              Customers by Department
            </h3>
            <div className="h-[300px]">
              <Bar
                data={departmentChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: "top",
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
                }}
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg col-span-2">
            <h3 className="text-lg font-semibold mb-4">Recent Customers</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-left">City</th>
                    <th className="px-4 py-2 text-left">Department</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.customers.list
                    .slice(-5)
                    .reverse()
                    .map((customer) => (
                      <tr
                        key={customer._id}
                        className="border-b hover:bg-gray-50"
                      >
                        <td className="px-4 py-2">{`${customer.firstName} ${customer.lastName}`}</td>
                        <td className="px-4 py-2">{customer.city}</td>
                        <td className="px-4 py-2">{customer.department}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Dispatcher Statistics Section */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Dispatcher Statistics
        </h2>

        <div className="mb-8">
          <div className="bg-green-500 rounded-lg shadow-lg p-6 text-white transform transition-transform hover:scale-105">
            <h3 className="text-lg font-semibold mb-2">Total Dispatchers</h3>
            <p className="text-3xl font-bold">{stats.dispatchers.total}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Dispatchers by Role</h3>
            <div className="h-[300px]">
              <Bar
                data={roleChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: "top",
                    },
                  },
                }}
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Recent Dispatchers</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-left">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.dispatchers.list
                    .slice(-5)
                    .reverse()
                    .map((dispatcher) => (
                      <tr
                        key={dispatcher._id}
                        className="border-b hover:bg-gray-50"
                      >
                        <td className="px-4 py-2">{`${dispatcher.firstName} ${dispatcher.lastName}`}</td>
                        <td className="px-4 py-2">{dispatcher.role}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Statistics;
