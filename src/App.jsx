import logo from './logo.svg';
import './App.css';
import Card from './components/Card';
import styled from 'styled-components';
import {Flex} from '@chakra-ui/react';
import You from './components/Player/You';
import {useState, useEffect} from 'react';
import {Shuffle} from './components/Shuffle';
import { Button, ButtonGroup } from "@chakra-ui/react"

import Class1  from './components/Class1'


function allCards(){
  const colors = ["hearts", "clubs","spades", "diamonds"];
  const numbers = ["A",2,3,4,5,6,7,8,9,10, "J", "Q","K"];
  const addition = ["RedJoker","BlackJoker"];
  
  let result = [];
  
  for(let i = 0; i < colors.length; i++){
        for(let j = 0; j < numbers.length; j++){
             let object = {color: colors[i], number: numbers[j]};
             result.push(object);    
        }     
  }
  result.push({color: addition[0], number:addition[0]})
  result.push({color: addition[1], number:addition[1]})

  let Shuffled = Shuffle(result);
  return Shuffled;
}


function App() {

  const [currentAllCards, setCurrentAllCards] = useState();

  const [you, setYou] = useState([]);
  const [opponent1, setOpponent1] = useState();
  const [opponent2, setOpponent2] = useState();
  const [addition, setAddition] = useState();

  const [name, setName] = useState();
  

  useEffect(()=>{
  },[])

   function DealCards(){     
    let Temp = allCards();
    setYou(Temp.slice(0,17));
    setOpponent1(Temp.slice(17,34));
    setOpponent2(Temp.slice(34,51));
    setAddition(Temp.slice(51,55));
   }


   console.log(you);

   const   handleCallback = (childData) =>{
    setName( childData);
}


  

  return (
    <Flex h="100vh" flexDir="column">
      <Flex h="60%" flexDir="column">
       
         <Button onClick={DealCards} w="300px" bgColor="aquamarine">Shuffle Cards</Button>
         {/*<Button onClick={spreadCardsToYou} w="300px" bgColor="aquamarine">Get your cards</Button>*/}

      </Flex>
      
      <Flex h="40%">
          <You  you={you} parentCallBack = {handleCallback} />
      </Flex> 

    </Flex>
  );
}

export default App; 
