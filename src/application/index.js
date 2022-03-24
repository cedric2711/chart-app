// Library 
import React, {useState, useEffect} from "react";

// Dependency
import { StyledHeader, StyledH1, StyledMain, StyledFooter, StyledFooterPara, StyledMainContainer } from "./style";
import Navigation from "./component/Navigation";
import chartInfoData from "./data/chart-data.json";
import dataSet from "./data/data-set.json";
import ChartBlock from "./component/ChartBlock";


function App() {
  const [chart, setChart] =useState();
  const [chartData, setChartData] =useState(null);
  const personTicket = [];
  const statusArr =[];
  const issue_typeArr = [];
  const priorityArr =[];
  const dateArr =[];
  const [ticketStatus, setTicketStatus]=useState();
  const [ticketIssueType, setTicketIssueType]=useState();
  const [ticketPriority, setTicketPriority]=useState();
  const [ticketDate, setTicketDate]=useState();
  const [chartHasFilter, setChartHasFilter]= useState();
  const [filterContent, setFilterContent]=useState();
  const [defaultData, setDefaultData]= useState([]);

  const setFilter = (event,key) =>{
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
      case "Date":
        setTicketDate(selectedValue);
        break;
      case "clear":
        setTicketStatus("");
        setTicketIssueType("");
        setTicketPriority("");
        setTicketDate("");
        break;
      default:
        return null;
    }
  }

  useEffect(() => {
    // Update the chart data after filters are applied
    const requiredData = processData(defaultData);
    setChartData(requiredData);
    setFilterContent({
      statusArr,
      issue_typeArr,
      dateArr,
      priorityArr,
      ticketStatus,
      ticketIssueType,
      ticketPriority,
      ticketDate
    });
    // eslint-disable-next-line 
  },[ticketStatus, ticketIssueType, ticketPriority, ticketDate]);

  const processData = (data,) => {
    data.forEach((ticket) => {
      const {assignee, status, issue_type, priority, issue_created_at} = ticket;
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
      const currDate = new Date();
      const difference = (currDate.getTime()/1000)- issue_created_at;
      const days = difference*1000 / (1000*60*60*24);
      
      // check what filters are applied an accordingly build data.
      if(( !ticketStatus || status === ticketStatus) && ( !ticketIssueType || issue_type === ticketIssueType) && ( !ticketPriority || priority === ticketPriority) && ( !ticketDate || days < parseInt(ticketDate))) {
        if(personTicket[assignee]) {
          personTicket[assignee].push(ticket);
        }else {
          personTicket[assignee]=[ticket];
        }
      }
    })
    dateArr.push("180");
    dateArr.push("365");


    // create the data object used by the cart.
    const chartData = Object.keys(personTicket).map((key)=>{
      const ticket =personTicket[key];
      const firstName = key.split(' ')[0];
      return {
        Name:firstName,
        'Ticket Count':ticket.length
      }
    })
    return chartData;
  }

  const chartType = (selectedChart, dataSetType, hasFilters) => {
    if(hasFilters) {
      setDefaultData(dataSet[dataSetType]);
      const requiredData = processData(dataSet[dataSetType]);
      setFilterContent({
        statusArr,
        issue_typeArr,
        priorityArr,
        dateArr,
        ticketStatus:"",
        ticketIssueType:"",
        ticketPriority:"",
        ticketDate:""

      })
      setChartHasFilter(true);
      setChartData(requiredData);
    }else {
      const requiredData = dataSet[dataSetType];
      setDefaultData(requiredData);
      setChartHasFilter(false);
      setChartData(requiredData);
      setFilterContent({});
    }
    setChart(selectedChart);
  }
  return (
    <StyledMainContainer>
      <StyledHeader>
        <StyledH1>Charting Application</StyledH1>
      </StyledHeader>
      <StyledMain>
        <Navigation chartData={chartInfoData} chartType= {chartType} chartHasFilter={chartHasFilter} filterContent={filterContent} setFilter={setFilter}/>
        <ChartBlock chartData={chartData} chart={chart} />
      </StyledMain>
      <StyledFooter>
        <StyledFooterPara>
          Created by Cedric
        </StyledFooterPara>
      </StyledFooter>
    </StyledMainContainer>
  );
}

export default App;
