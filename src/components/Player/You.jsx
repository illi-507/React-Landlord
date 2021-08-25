import React, { useState, useEffect, createRef } from "react";
import Card from "../Card";
import { Flex, Stack, Button } from "@chakra-ui/react";
import styled from "styled-components";
import FlipMove from "react-flip-move";

const CardContainer = styled.div`
  border: 1px solid green;
  padding-top: 50px;
  padding-left: 60px;
`;

const CardDiv = styled.div`
  display: inline-block;
`;

class You extends React.Component {
  constructor(props) {
    super(props);
    this.colorNumberToCode = {
      3: 3,
      4: 4,
      5: 5,
      6: 6,
      7: 7,
      8: 8,
      9: 9,
      10: 10,
      J: 11,
      Q: 12,
      K: 13,
      A: 14,
      2: 15,
      BlackJoker: 16,
      RedJoker: 17,
    };

    /*[
            { color: "diamonds", number: 7, visibility: "visible" },
            { color: "spades", number: 10, visibility: "visible" },
            { color: "RedJoker", number: "RedJoker", visibility: "visible" },
            { color: "clubs", number: 6, visibility: "visible" },
            { color: "hearts", number: 9, visibility: "visible" },
            { color: "hearts", number: 4, visibility: "visible" },
            { color: "spades", number: "Q", visibility: "visible" },
        
            { color: "spades", number: 2 },
            { color: "clubs", number: "J" },
            { color: "hearts", number: 7 },
            { color: "clubs", number: 4 },
            { color: "hearts", number: 10 },
            { color: "hearts", number: 2 },
            { color: "diamonds", number: 10 },
            { color: "spades", number: "A" },
            { color: "diamonds", number: 5 },
            { color: "BlackJoker", number: "BlackJoker" },
          ];*/
    this.wrapper = createRef();
    this.state = {
      cardDeck: [],
      array: this.props.you,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.array !== this.state.array) {
      console.log("pokemons state has changed.");
    }
  }
  sortCards() {
    let temp = this.props.you;
    temp.sort((a, b) =>
      this.colorNumberToCode[a.number] > this.colorNumberToCode[b.number]
        ? 1
        : -1
    );

    for (let i = 0; i < temp.length; i++) {
      temp.cardZIndex = i;
    }
    console.log(temp);
    this.setState({
      ...this.state,
      cardDeck: [...temp],
    });
  }

  addCard() {
    let i = 0;

    let timer = setInterval(() => {
      let temp = this.state.cardDeck;
      temp.push(this.props.you[i]);

      this.setState({
        ...this.state,
        cardDeck: [...temp],
      });
      i++;
      if (i === this.props.you.length) {
        let timer2 = setInterval(() => {
          this.sortCards();
          clearInterval(timer2);
        }, 1500);
        clearInterval(timer);
      }
    }, 300);
  }

  render() {
    const ticketNotVisibleState = {
      transform: "translateX(-100%)",
      opacity: 0.1,
    };

    const customEnterAnimation = {
      from: { transform: "scale(0.5, 1)" },
      to: { transform: "scale(1, 1)" },
    };
    return (
      <div>
        <Flex flexDir="column">
          <Flex flexDir="row">
            <Button
              colorScheme="teal"
              variant="solid"
              onClick={() => {
                this.addCard();
              }}
            >
              Deal Cards
            </Button>
            <Button
              colorScheme="teal"
              variant="solid"
              onClick={() => this.sortCards()}
            >
              Sort Cards
            </Button>
            <Button
              colorScheme="teal"
              variant="solid"
              onClick={() => {
                this.setState({
                  ...this.state,
                  cardDeck: [],
                });
              }}
            >
              Clear Cards
            </Button>
          </Flex>

          <CardContainer>
            <FlipMove
              enterAnimation={{
                from: ticketNotVisibleState,
                to: {},
              }}
              leaveAnimation={{
                from: {},
                to: ticketNotVisibleState,
              }}
            >
              {this.state.cardDeck.map((item, index) => (
                <CardDiv ref={this.wrapper} key={item.number + "" + item.color}>
                  <Card
                    firstCard={index === 0 ? true : false}
                    color={item.color}
                    number={item.number}
                    visibility={item.visibility}
                    cardIndex={item.cardIndex}
                  ></Card>
                </CardDiv>
              ))}
            </FlipMove>
          </CardContainer>
        </Flex>
      </div>
    );
  }
}

export default You;
