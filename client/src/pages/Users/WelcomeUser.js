import React from 'react';

const renderMetricCards = () => {
  const metricTitles = [
    'Total Requests',
    'Total Requests Completed',
    'Total Requests Cancelled',
    'Total Requests Pending',
    "Total Bottle No' Recycled",
    'Average Request Closing Time',
  ];

  const metricCards = [];
  for (let i = 0; i < metricTitles.length; i++) {
    let cardStyle = 'border-b-4 rounded-lg shadow-xl p-5';
    let titleStyle = 'text-gray-600';

    if (metricTitles[i] === 'Total Requests') {
      cardStyle +=
        ' bg-gradient-to-b from-green-200 to-green-100 border-green-600';
      titleStyle += ' text-green-600';
    } else if (metricTitles[i] === 'Total Requests Completed') {
      cardStyle +=
        ' bg-gradient-to-b from-pink-200 to-pink-100 border-pink-500';
      titleStyle += ' text-pink-500';
    }

    metricCards.push(
      <div className={`w-full md:w-1/2 xl:w-1/3 p-6`} key={`metric-card-${i}`}>
        <div className={`border ${cardStyle}`}>
          <h2 className={`text-lg font-semibold mb-2 ${titleStyle}`}>
            {metricTitles[i]}
          </h2>
          <p className="text-gray-600">Metric Card Content goes here.</p>
        </div>
      </div>
    );
  }
  return metricCards;
};

const renderGraphCards = () => {
  const graphTitles = [
    'Quarterly Months Collected Review',
    'List Of Recyclers Who Collected',
    'Half Yearly Completed Requests Numbers',
  ];

  const graphCards = [];
  for (let i = 0; i < graphTitles.length; i++) {
    graphCards.push(
      <div className="w-full md:w-1/2 xl:w-1/3 p-6" key={`graph-card-${i}`}>
        <div className="bg-white border rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-2 text-gray-600">
            {graphTitles[i]}
          </h2>
          <p className="text-gray-600">Graph Card Content goes here.</p>
        </div>
      </div>
    );
  }
  return graphCards;
};

const WelcomeUser = () => {
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
              className="main-content flex-1 bg-gray-100 mt-12 md:mt-2 pb-24 md:pb-5"
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
