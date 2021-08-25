import React from 'react'
import styled from 'styled-components'
import { Flex } from '@chakra-ui/react'

const Square = styled.div`
    display: inline-block;
    width: 100px;
    height: 100px;
    background-color: #f5f6fa;
    
`

function RedCard() {
    return (

            <Square>
                  <Flex align="flex-end" justify="flex-end" h="100%" w="100%" border="1px solid red">
                         123
                  </Flex>
            </Square>

    )
}

export default RedCard
