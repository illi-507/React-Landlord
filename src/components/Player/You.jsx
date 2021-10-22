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
export function alertFun(){
        alert ("WDNMD");
}


export class You extends React.Component {
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

    this.wrapper = createRef();
    this.state = {
      cardDeck: [],      
      array: [...this.props.you],
      selectedCards: [],
    };
    this.parentCallBack = this.props.parentCallBack;
   // this.getCardsArray=this.props.getCardsArray;
  }

  componentDidUpdate(prevProps, prevState) {
    /*if (prevState.array !== this.state.array) {
      console.log("pokemons state has changed.");
    }*/
  }
  alertFun2(){
    alert ("WDNMD2");
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

  spreadCard() {
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
        }, 400);
        clearInterval(timer);
      }
    }, 300);
  }

  getCardsArray = (card, selected) => {
    let temp = this.state.selectedCards;
    
    if (selected) {
      //this.parentCallBack([...temp, card]);  
      this.setState({
        ...this.state,
        selectedCards: [...temp, card],
      });
    }
    else{
      temp = temp.filter(item => {
        if(item.color!==card.color || item.number!==card.number){
          return true;
        }
        return false;
      });
     // this.parentCallBack([...temp]);  
      
      this.setState({
        ...this.state,
        selectedCards: [...temp],
      });
    }
  };

  render() {
    //console.log("selectedCards: ", this.state.selectedCards);

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
                this.spreadCard();
              }}
            >
              Deal Cards
            </Button>
            <Button
              colorScheme="teal"
              variant="solid"
              onClick={() => {                
                
                  this.parentCallBack([...this.state.selectedCards]);  
                  let selected = this.state.selectedCards;
                  
                  let tempAll = this.state.cardDeck;
                  let filteredAll = [];
                  for(let item of tempAll){
                    let counter =0;
                    for(let innerItem of selected){
                      if(item.color == innerItem.color && item.number == innerItem.number ){
                        counter ++;
                      }
                    }
                     if(counter ===0){ 
                      filteredAll.push(item);
                    }
                  }
                  //console.log(tempAll);
                  console.log("filteredAll",filteredAll);
                  this.setState({
                    ...this.state,
                    cardDeck: [...filteredAll]
                  })
              }}
            >
              Throw Cards
            </Button>
            {/*<Button
              colorScheme="teal"
              variant="solid"
              onClick={() => this.addCardToArray()}
            >
              addCardToArray
            </Button>*/}
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
              {this.state.cardDeck
              .map((item, index) => (
                <CardDiv ref={this.wrapper} key={item.number + "" + item.color}>
                  <Card
                    firstCard={index === 0 ? true : false}
                    color={item.color}
                    number={item.number}
                    getCardsArray={this.getCardsArray}
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


