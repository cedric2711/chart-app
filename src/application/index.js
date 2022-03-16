// Library 
import React, {useState} from "react";

// Dependency
import { StyledHeader, StyledH1, StyledMain, StyledFooter, StyledFooterPara, StyledMainContainer } from "./style";
import Navigation from "./component/Navigation";
import chartInfoData from "./data/chart-data.json";
import dataSet from "./data/data-set.json";
import SimpleLineChart from "./component/charts/SimpleLineChart";
import ChartBlock from "./component/ChartBlock";


function App() {
  const [chart, setChart] =useState();
  const [chartData, setChartData] =useState(null);

  const chartType = (selectedChart, dataSetType) => {
    console.log(selectedChart);
    const requiredData = dataSet[dataSetType];
    setChartData(requiredData);
    setChart(selectedChart);
  }
  return (
    <StyledMainContainer>
      <StyledHeader>
        <StyledH1>Charting Application</StyledH1>
      </StyledHeader>
      <StyledMain>
        <Navigation chartData={chartInfoData} chartType= {chartType}/>
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
