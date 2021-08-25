import React from 'react'
import styled from 'styled-components'
const Square = styled.div`
  display: inline-block;
    width: 100px;
    height: 100px;
    background-color: green;
    left: -50px;

`

function GreenCard() {
    return (

            <Square></Square>

    )
}

export default GreenCard
