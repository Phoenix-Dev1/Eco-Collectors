import React, { useState, useEffect } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import axios from 'axios';
import ColumnChart from './GraphsStyles/ColumnChart';

const WelcomeManager = () => {
  const [totalPickedUpRequests, setTotalPickedUpRequests] = useState(0);
  const [totalRecycledBottles, setTotalRecycledBottles] = useState(0);
  const [avgClosingTime, setAvgClosingTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
  });

  useEffect(() => {
    const fetchManagerData = async () => {
      try {
        const res = await axios.get('/user/welcomeManager');
        setTotalPickedUpRequests(res.data.totalPickedUpRequests);
        setTotalRecycledBottles(res.data.totalRecycledBottles);
        setAvgClosingTime(res.data.avgClosingTime);
      } catch (error) {
        console.error('Error fetching manager data:', error);
        setTotalPickedUpRequests(-1);
        setTotalRecycledBottles(-1);
        setAvgClosingTime({
          days: -1,
          hours: -1,
          minutes: -1,
        });
      }
    };
    fetchManagerData();
  }, []);

  const renderMetricCards = () => {
    const metricStyles = [
      {
        title: 'Total Requests Picked Up (Recyclers Only)',
        cardStyle:
          'bg-gradient-to-b from-green-200 to-green-100 border-b-4 border-green-600',
        titleStyle: 'text-green-600',
        value: totalPickedUpRequests,
      },
      {
        title: "Total Bottle No' Recycled (Recyclers Only)",
        cardStyle:
          'bg-gradient-to-b from-indigo-200 to-indigo-100 border-b-4 border-indigo-500',
        titleStyle: 'text-indigo-500',
        value: totalRecycledBottles,
      },
      {
        title: 'Average Request Closing Time (Recyclers Only)',
        cardStyle:
          'bg-gradient-to-b from-red-200 to-red-100 border-b-4 border-red-500',
        titleStyle: 'text-red-500',
        value: `${avgClosingTime.days} days ${avgClosingTime.hours} hours ${avgClosingTime.minutes} minutes`,
      },
    ];

    return metricStyles.map((metric, index) => {
      const { title, cardStyle, titleStyle, value } = metric;

      return (
        <div
          className="w-full md:w-1/2 xl:w-1/3 p-6"
          key={`metric-card-${index}`}
        >
          <div className={`border rounded-lg shadow-xl p-5 ${cardStyle}`}>
            <h2 className={`text-lg font-semibold ${titleStyle}`}>{title}</h2>
            <p className="text-gray-600 mt-2">{value}</p>
          </div>
        </div>
      );
    });
  };

  const renderGraphCards = () => {
    const CanvasJS = CanvasJSReact.CanvasJS;
    const CanvasJSChart = CanvasJSReact.CanvasJSChart;

    const graphTitles = [
      'Quarterly Months Collected Review (Recyclers Only)',
      'TBA',
      'Half Yearly Completed Requests Numbers (Recyclers Only)',
    ];

    return graphTitles.map((title, index) => {
      if (title === 'Quarterly Months Collected Review (Recyclers Only)') {
        const dataPoints = [
          { x: 10, y: 71 },
          { x: 20, y: 55 },
          { x: 30, y: 50 },
          { x: 40, y: 65 },
        ];

        const options = {
          animationEnabled: true,
          exportEnabled: true,
          theme: 'light2',
          axisY: {
            includeZero: true,
          },
          data: [
            {
              type: 'column',
              indexLabelFontColor: '#5A5757',
              indexLabelPlacement: 'outside',
              dataPoints: dataPoints,
            },
          ],
        };

        return (
          <div
            className="w-full md:w-1/2 xl:w-1/3 p-6"
            key={`graph-card-${index}`}
          >
            <div className="bg-white border rounded-lg shadow p-4">
              <h2 className="text-lg font-semibold mb-2 text-gray-600">
                {title}
              </h2>
              <CanvasJSChart options={options} />
            </div>
          </div>
        );
      }

      return (
        <div
          className="w-full md:w-1/2 xl:w-1/3 p-6"
          key={`graph-card-${index}`}
        >
          <div className="bg-white border rounded-lg shadow p-4"></div>
        </div>
      );
    });
  };

  return (
    <div>
      <header>{/* ... */}</header>
      <main>
        <div className="flex flex-col md:flex-row">
          <nav aria-label="alternative nav">{/* ... */}</nav>
          <section>
            <div
              id="main"
              className="main-content flex-1 bg-gray-700 mt-12 md:mt-2 pb-24 md:pb-5"
            >
              <div className="bg-gray-800 pt-3">{/* ... */}</div>
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

export default WelcomeManager;
