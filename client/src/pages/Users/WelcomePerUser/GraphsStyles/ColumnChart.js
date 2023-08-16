import React from 'react';
import CanvasJSReact from '@canvasjs/react-charts';

const ColumnChart = ({ dataPoints }) => {
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

  return <CanvasJSReact.CanvasJSChart options={options} />;
};

export default ColumnChart;
