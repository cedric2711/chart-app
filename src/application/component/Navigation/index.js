// Library 
import React from "react";

// Dependency
import { StyledNav, StyledUl, StyledLi } from "./style";

function Navigation({ chartData, chartType }) {
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
                                        types.map(({ name, data }) => {
                                            return (
                                                <StyledLi key={name} onClick={()=>chartType(name, data)}>{name}</StyledLi>
                                            )
                                        })
                                    }
                                </StyledUl>
                            </StyledLi>
                        )
                    })
                }
            </StyledUl>
        </StyledNav>
    );
}

export default Navigation;
