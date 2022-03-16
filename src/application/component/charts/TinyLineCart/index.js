import React from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

function TinyLineChart ({data}) {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart width={300} height={100} data={data}>
          <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    );
}

export default TinyLineChart;