import React, { useState } from "react";
import Class2 from "./Class2";
import Class3 from "./Class3";
import Card from "./Card";
import RedCard from "./RedCard";
import GreenCard from "./GreenCard";
import styled from 'styled-components';

const Ele1 = styled.div`
    height: 150px; 
    width: 200px;
    display: inline-block;
    border: 1px solid black;
    background-color : ${props=>props.color};
    position: absolute;
    left: ${props=>props.left};
    z-index: ${props=>props.zIndex};
`;

function Class1() {
  const [array, setArray] = useState([1, 2, 3, 4, 5]);

  return (
    <>
      {/*<button
        onClick={() => {
          let temp = array;
          temp.push("W");
          setArray([...temp]);
        }}
      >
        change array
      </button>
      <Class2 array={array}></Class2>
      <Class3 array={array}></Class3>*/}
      <div style={{marginLeft:"50px"}}>

      {/*<Card color="diamonds" number={9} zIndex={1}></Card>
      <Card color="clubs" number="Q" zIndex={2}></Card>
      <Card color="diamonds" number={5} zIndex={3}></Card>
      <Card color="clubs" number="K" zIndex={4}></Card>*/}

      <div>
          {/**  <Ele1 color="pink" ></Ele1> */}
            <Ele1 color="yellow"  zIndex="2"></Ele1>
            <Ele1 color="blue" left="150px"  zIndex="3"></Ele1>
            <Ele1 color="green" left="250px"  zIndex="3"></Ele1>
            <Ele1 color="pink" left="350px"  zIndex="3"></Ele1>
            
      </div>
      </div>
    </>
  );
}

export default Class1;
