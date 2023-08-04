import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WelcomeUser = () => {
  const [totalRequests, setTotalRequests] = useState(0);

  useEffect(() => {
    const fetchTotalRequests = async () => {
      try {
        const res = await axios.get('/user/welcome');
        setTotalRequests(res.data.totalRequests);
      } catch (error) {
        console.error('Error fetching total requests:', error);
        setTotalRequests(-1);
      }
    };
    fetchTotalRequests();
  }, []);
  const renderMetricCards = () => {
    const metricStyles = [
      {
        title: 'Total Requests Picked Up',
        cardStyle:
          'bg-gradient-to-b from-green-200 to-green-100 border-b-4 border-green-600',
        titleStyle: 'text-green-600',
      },
      {
        title: "Total Bottle No' Recycled",
        cardStyle:
          'bg-gradient-to-b from-indigo-200 to-indigo-100 border-b-4 border-indigo-500',
        titleStyle: 'text-indigo-500',
      },
      {
        title: 'Average Request Closing Time',
        cardStyle:
          'bg-gradient-to-b from-red-200 to-red-100 border-b-4 border-red-500',
        titleStyle: 'text-red-500',
      },
    ];

    return metricStyles.map((metric, index) => {
      const { title, cardStyle, titleStyle } = metric;

      return (
        <div
          className="w-full md:w-1/2 xl:w-1/3 p-6"
          key={`metric-card-${index}`}
        >
          <div className={`border rounded-lg shadow-xl p-5 ${cardStyle}`}>
            <h2 className={`text-lg font-semibold ${titleStyle}`}>{title}</h2>
            {title === 'Total Requests' && (
              <p className="text-gray-600 mt-2">{totalRequests}</p>
            )}
          </div>
        </div>
      );
    });
  };

  const renderGraphCards = () => {
    const graphTitles = [
      'Quarterly Months Picked Up Review',
      'List Of Users Collected From',
      'Half Yearly Completed Requests Numbers',
    ];

    return graphTitles.map((title, index) => (
      <div className="w-full md:w-1/2 xl:w-1/3 p-6" key={`graph-card-${index}`}>
        <div className="bg-white border rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-2 text-gray-600">{title}</h2>
          <p className="text-gray-600">Graph Card Content goes here.</p>
        </div>
      </div>
    ));
  };

  return (
    <div>
      <header>
        <nav
          aria-label="menu nav"
          className="bg-gray-800 pt-2 md:pt-1 pb-1 px-1 sticky top-0 z-20"
        >
          {/* ... */}
          {/* The content of the header goes here */}
          {/* ... */}
        </nav>
      </header>
      <main>
        <div className="flex flex-col md:flex-row">
          <nav aria-label="alternative nav">
            {/* ... */}
            {/* The content of the navigation goes here */}
            {/* ... */}
          </nav>
          <section>
            <div
              id="main"
              className="main-content flex-1 bg-gray-700 mt-12 md:mt-2 pb-24 md:pb-5"
            >
              <div className="bg-gray-800 pt-3">
                {/* ... */}
                {/* The content of the title section goes here */}
                {/* ... */}
              </div>
              <div className="flex flex-wrap ">{renderMetricCards()}</div>
              <div className="flex flex-row flex-wrap flex-grow mt-2">
                {renderGraphCards()}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default WelcomeUser;
