import "./App.css";
import Card from "./components/Card";
import styled from "styled-components";
import { Flex } from "@chakra-ui/react";
import { You, alertFun } from "./components/Player/You";
import { useState, useEffect, createRef } from "react";
import { Shuffle } from "./components/Shuffle";
import { Button, ButtonGroup } from "@chakra-ui/react";
import FlipMove from "react-flip-move";
import Class1 from "./components/Class1";

function allCards() {
  const colors = ["hearts", "clubs", "spades", "diamonds"];
  const numbers = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];
  const addition = ["RedJoker", "BlackJoker"];

  let result = [];

  for (let i = 0; i < colors.length; i++) {
    for (let j = 0; j < numbers.length; j++) {
      let object = { color: colors[i], number: numbers[j] };
      result.push(object);
    }
  }
  result.push({ color: addition[0], number: addition[0] });
  result.push({ color: addition[1], number: addition[1] });

  let Shuffled = Shuffle(result);
  return Shuffled;
}

function App() {
  const [currentAllCards, setCurrentAllCards] = useState();

  const [you, setYou] = useState([]);
  const [opponent1, setOpponent1] = useState([]);
  const [opponent2, setOpponent2] = useState([]);
  const [addition, setAddition] = useState();

  const [yourCards, setYourCards] = useState([]);

  const wrapper = createRef();
  const [name, setName] = useState("Default name");

  useEffect(() => {}, []);
  /**
   * 洗牌
   */
  function DealCards() {
    let Temp = allCards();
    setYou(Temp.slice(0, 17));
    setOpponent1(Temp.slice(17, 34));
    setOpponent2(Temp.slice(34, 51));
    setAddition(Temp.slice(51, 55));
  }

  const handleCallback = (childData) => {
    console.log("Childdata", childData);
    setName(childData);
  };

  function callback(childData) {
    setYourCards([...childData]);
  }

  const ticketNotVisibleState = {
    transform: "translateX(-100%)",
    opacity: 0.1,
  };
  const customEnterAnimation = {
    from: { transform: "scale(1, 0)" },
    to: { transform: "scale(1, 1)" },
  };
  const CardDiv = styled.div`
    display: inline-block;
  `;
  console.log("yourCards:", you);
  console.log("opponent1:", opponent1);
  

  return (
    <Flex h="100vh" flexDir="column">
      <Flex h="60%" flexDir="column">
        <Button onClick={DealCards} w="300px" bgColor="aquamarine">
          Shuffle Cards
        </Button>
        <Button
          onClick={() => {
            console.log("data from child", name);
          }}
          w="300px"
          bgColor="aquamarine"
        >
          Get data from child
        </Button>

        <Flex
          h="300px"
          w="800px"
          border="1px solid red"
          justify="center"
          alignItems="center"
        >
          <FlipMove
            enterAnimation={customEnterAnimation}
            leaveAnimation={customEnterAnimation}
          >
            {yourCards.map((item, index) => (
              <CardDiv ref={wrapper} key={item.number + "" + item.color}>
                <Card
                  firstCard={index === 0 ? true : false}
                  color={item.color}
                  number={item.number}
                ></Card>
              </CardDiv>
            ))}
          </FlipMove>
        </Flex>
        <Button w="200px" onClick={()=>{You.alertFun2();}} colorScheme="teal" variant="solid">
          Alert 1
        </Button>
        {/*<Class1/>*/}
      </Flex>

      <Flex h="40%">
        <You you={[...you]} opponent1={[...opponent1]} opponent2={[...opponent2]} parentCallBack={callback} />
      </Flex>
    </Flex>
  );
}

export default App;
