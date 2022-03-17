import React from 'react';
import { BarChart, Bar, LabelList, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function SimpleBarChart ({data}) {

    return (
      <>
      <ResponsiveContainer width="100%" height="100%">
        {
          data.length? 
            <BarChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Name" hide />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Ticket Count" fill="#8884d8" >
                <LabelList dataKey="Name" position="top" angle={270} width={100} offset={40}/>
              </Bar>
            </BarChart>
            :
            <p>Data is not available for this selection of filters</p>
        }
        
      </ResponsiveContainer>
      </>
    );
}

export default SimpleBarChart;