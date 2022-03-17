// Library 
import React from "react";

// Dependency
import { StyledLabel, StyledSelect } from "./style";

function SimpleDropDown ({data, label, setFilter, curValue}) {

    return( data.length?
        <>
        <StyledLabel htmlFor={label}>{label}</StyledLabel>
        <StyledSelect name={label} id={label} value={curValue} onChange={(event)=>setFilter(event,label)}>
          <option key={`empty_${label}`} value={""}>{`Select a ${label}`}</option>
          {
            data.map((value)=> <option key={value} value={value}>{value}</option>)
          }
        </StyledSelect>
        </>
        : null
    );
  }

export default SimpleDropDown;
