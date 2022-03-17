import React, {useState} from 'react';
import { BarChart, Bar, LabelList, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function SimpleDropDown ({data, label, setFilter}) {

  return( data.length?
      <>
      <label htmlFor={label}>{label}</label>
      <select name={label} id={label} onChange={(event)=>setFilter(event,label)}>
        <option key={`empty_${label}`} value={""}>{`Select a ${label}`}</option>
        {
          data.map((value)=> <option key={value} value={value}>{value}</option>)
        }
      </select>
      </>
      : null
  );
}

function SimpleBarChart ({data}) {

    const personTicket = [];
    const statusArr =[];
    const issue_typeArr = [];
    const priorityArr =[];
    const [ticketStatus, setTicketStatus]=useState();
    const [ticketIssueType, setTicketIssueType]=useState();
    const [ticketPriority, setTicketPriority]=useState();

    const setFilter = (event,key) =>{
      console.log(key);
      const selectedValue =event.currentTarget.value;
      switch(key) {
        case "Status":
          setTicketStatus(selectedValue);
          break;
        case "Issue Type":
          setTicketIssueType(selectedValue);
          break;
        case "Priority":
          setTicketPriority(selectedValue);
          break;
        default:
          return null;
      }
    }

    data.forEach((ticket) => {
      const {assignee, status, issue_type, priority} = ticket;
      // save values for status drop down
      if(statusArr.indexOf(status)===-1){
        statusArr.push(status);
      }

      // save values for status issue type
      if(issue_typeArr.indexOf(issue_type)===-1){
        issue_typeArr.push(issue_type);
      }

      // save values for status priority
      if(priorityArr.indexOf(priority)===-1){
        priorityArr.push(priority);
      }

      // check what filters are applied an accordingly build data.
      if(( !ticketStatus || status === ticketStatus) && ( !ticketIssueType || issue_type === ticketIssueType) && ( !ticketPriority || priority === ticketPriority)) {
        if(personTicket[assignee]) {
          personTicket[assignee].push(ticket);
        }else {
          personTicket[assignee]=[ticket];
        }
      }
    })

    // create the data object used by the cart.
    const chartData = Object.keys(personTicket).map((key)=>{
      const ticket =personTicket[key];
      return {
        name:key,
        count:ticket.length
      }
    })

    return (
      <>
      <div>
      <SimpleDropDown data={statusArr} label="Status" setFilter ={setFilter}/>
      <SimpleDropDown data={issue_typeArr} label="Issue Type" setFilter ={setFilter}/>
      <SimpleDropDown data={priorityArr} label="Priority" setFilter ={setFilter}/>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        {
          chartData.length? 
            <BarChart
              width={500}
              height={300}
              data={chartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" hide />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" >
                <LabelList dataKey="name" position="insideTop" angle={270} width={200}/>
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