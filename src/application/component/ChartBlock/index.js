// Library 
import React from "react";

// Dependency
import { StyledSection } from "./style";
import SimpleLineChart from "../charts/SimpleLineChart";
import TinyLineChart from "../charts/TinyLineCart";
import SimpleAreaChart from "../charts/SimpleAreaChart";
import TinyAreaChart from "../charts/TinyAreaChart";

const selectChart = (chartData, chart) => {
    switch(chart) {
        case "Simple Line Chart":
            return <SimpleLineChart data = {chartData} />
        case "Tiny Line Chart":
            return <TinyLineChart data = {chartData} />
        case "Simple Area Chart":
            return <SimpleAreaChart data = {chartData} />
        case "Tiny Area Chart":
            return <TinyAreaChart data = {chartData} />    
        default:
            return null;
    }
}

function ChartBlock({chartData, chart}) {
    return (
        <StyledSection>
        {chart? 
            <>
                <p>{chart}</p>
            {
            selectChart(chartData, chart)
            }
            </>
            :
            <p>Please select a chart type</p>
        
        }
        </StyledSection>
    );
}

export default ChartBlock;
