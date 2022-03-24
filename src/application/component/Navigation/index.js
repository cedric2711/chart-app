// Library 
import React from "react";

// Dependency
import { StyledNav, StyledUl, StyledLi } from "./style";
import DropDowns from "../DropDowns";

function Navigation({ chartData, chartType, chartHasFilter,filterContent={}, setFilter }) {
    const { statusArr, issue_typeArr, priorityArr, dateArr, ticketStatus, ticketIssueType, ticketPriority, ticketDate} =filterContent;
    return (
        <StyledNav>
            <StyledUl>
                {
                    Object.keys(chartData).map((chartKey) => {
                        const chartInfo = chartData[chartKey];
                        const { name, types } = chartInfo;

                        return (
                            <StyledLi key={name}>
                                <div>{name}</div>
                                <StyledUl>
                                    {
                                        types.map(({ name, data, hasFilters }) => {
                                            return (
                                                <StyledLi key={name} onClick={()=>chartType(name, data, hasFilters)}>{name}</StyledLi>
                                            )
                                        })
                                    }
                                </StyledUl>
                            </StyledLi>
                        )
                    })
                }
            </StyledUl>
            {
                // Filter section
                chartHasFilter? 
                <StyledUl>
                    <StyledLi>
                        <h2>Filters</h2>
                    </StyledLi>
                    <StyledLi>
                        <DropDowns data={statusArr} label="Status" curValue = {ticketStatus} setFilter ={setFilter}/>
                    </StyledLi>
                    <StyledLi>
                        <DropDowns data={issue_typeArr} label="Issue Type" curValue = {ticketIssueType} setFilter ={setFilter}/>
                    </StyledLi>
                    <StyledLi>
                        <DropDowns data={priorityArr} label="Priority" curValue = {ticketPriority} setFilter ={setFilter}/>
                    </StyledLi>
                    <StyledLi>
                        <DropDowns data={dateArr} label="Date" curValue = {ticketDate} setFilter ={setFilter}/>
                    </StyledLi>
                    <StyledLi>
                        <button onClick={(event)=>setFilter(event,"clear")}>Clear All</button>
                    </StyledLi>
                </StyledUl>
                :
                null
            }
            
        </StyledNav>
    );
}

export default Navigation;
