import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Hearts from "../assets/hearts.png";
import Clubs from "../assets/clubs.png";
import Spades from "../assets/spades.png";
import Diamonds from "../assets/diamonds.png";
import Joker from "../assets/joker.png";
import { Flex, Button } from "@chakra-ui/react";
import "./componentCSS.css";


const OutterContainer = styled.div`  
  display: inline-block;
  position: relative;
  margin-left:  -60px;  
  z-index: ${props=> props.zIndex? props.zIndex: "0"};
  transform: ${props => props.selected? "translateY(-50px)": "unset"};
  `;
  
const Container = styled.div`
cursor: pointer;
&:hover{
   background-color: lightgreen;
}
  background-color: white;
  width: 100px;
  height: 150px;
  border: 1px solid black;
  border-radius: 10px;
  display: flex;
  flex-direction: ${(props) => props.flexDir || "column"};
  justify-content: space-between;
  visibility: ${(props) => (props.visibility ? props.visibility : "visible")};
  transition: 1s;
`;


const VerticalWord = styled.div`
  writing-mode: vertical-rl;
  text-orientation: upright;
  color: ${(props) => props.color || "black"};
`;

const HEART = styled.div`
  font-size: 100px;
  margin-bottom: -25px;
  margin-top: -40px;
  color: #f44336;
`;

const DIAMOND = styled.div`
  font-size: 100px;
  margin-bottom: -25px;
  margin-top: -40px;
  color: #f44336;
`;

const SMALL_HEART = styled.div`
  font-size: 20px;
  margin-bottom: -10px;
  margin-top: -10px;
  color: #f44336;
`;

const SMALL_DIAMOND = styled.div`
font-size: 20px;
margin-bottom: -10px;
margin-top: -10px;
color: #f44336;
`;


const SPADE = styled.div`
  font-size: 100px;
  margin-bottom: -25px;
  margin-top: -40px;
`;

const SMALL_SPADE = styled.div`
  font-size: 20px;
  margin-bottom: -10px;
  margin-top: -10px;
`;

const CLUB = styled.div`
  font-size: 100px;
  margin-bottom: -25px;
  margin-top: -40px;
`;

const SMALL_CLUB = styled.div`
  font-size: 20px;
  margin-bottom: -10px;
  margin-top: -10px;
`;

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: this.props.number,
      color: this.props.color,
      visibility: this.props.visibility,
      isJoker: false,
      isRedJoker: false,
      firstCard: this.props.firstCard,      
      zIndex   : this.props.zIndex,
      selected: false,      
      textColor: "black",
      
      selectedCards : this.props.selectedCards,
    };
    this.getCardsArray= this.props.getCardsArray;
  }

  componentDidMount() {      
    setTimeout(()=>{   
         this.setState({
        ...this.state,
        bottomZIndex: -1
      }); }, 500);

    if (this.state.color === "RedJoker") {
      this.setState({
        ...this.state,
        isRedJoker: true,
        isJoker: true,
      });
    } else if (this.state.color === "BlackJoker") {
      this.setState({
        ...this.state,
        isRedJoker: false,
        isJoker: true,
      });
    }

    if(this.state.color === "diamonds" || this.state.color === "hearts" ){
      this.setState({
        ...this.state,
        textColor:"red"
      });
    }
  }

  renderOption = () => {
    if (this.state.color === "hearts") {
      return <HEART>&#9829;</HEART>;
    } else if (this.state.color === "diamonds") {
      return <DIAMOND>	&#9830;</DIAMOND>;
    } else if (this.state.color === "clubs") {
      return <CLUB>&#9827;</CLUB>;
    } else if (this.state.color === "spades") {
      return <SPADE>&#9824;</SPADE>;
    } else if (this.state.color === "RedJoker" || "BlackJoker") {
      return <img src={Joker} alt="logo" width="120px" />;
    }
  };

  renderSmallIcon = () => {
    if (this.state.color === "hearts") {
      return <SMALL_HEART>&#9829;</SMALL_HEART>;
    } else if (this.state.color === "diamonds") {
      return <SMALL_DIAMOND>	&#9830;</SMALL_DIAMOND>;
    } else if (this.state.color === "clubs") {
      return <SMALL_CLUB>&#9827;</SMALL_CLUB>;
    } else if (this.state.color === "spades") {
      return <SMALL_SPADE>&#9824;</SMALL_SPADE>;
    }
  };



  toggle=()=>{
    let currentCard = {color: this.props.color, number: this.props.number};
    
    this.setState({
        ...this.state,
        selected: !this.state.selected
      })
      let tempSelected = !this.state.selected;
 //     console.log(currentCard, tempSelected);
      this.getCardsArray(currentCard, tempSelected);
  }
  

  render() {
    return (
      <OutterContainer 
      zIndex={this.props.zIndex}
      selected={this.state.selected}
      onClick={this.toggle}>
        <Container flexDir={this.state.isJoker && "row"}>
          <Flex marginLeft={!this.state.isJoker && "5px"}>
            <Flex
              flexDir={this.state.isJoker ? "row" : "column"}
              alignItems="start"
            >
              {this.state.isJoker ? (
                <Flex
                  flexDir="column"
                  color={this.state.isRedJoker && "red"}
                  marginLeft="5px"
                >
                  <div>&nbsp;J</div>
                  <div>O</div>
                  <div>K</div>
                  <div>E</div>
                  <div>R</div>
                </Flex>
              ) : (
                <>
                  <div style={{color:`${this.state.textColor}`, fontWeight: 700}}>{this.state.number}</div>
                  {this.renderSmallIcon()}
                </>
              )}
            </Flex>
          </Flex>

          <Flex justifyContent="center" alignItems="center">
            {this.renderOption()}
          </Flex>

          <Flex
            justifyContent="flex-end"
            marginLeft={!this.state.isJoker && "-5px"}
          >
            <Flex
              flexDir={this.state.isJoker ? "row" : "column"}
              transform="scaleY(-1)"
            >
              {this.state.isJoker ? (
                <Flex
                  flexDir="column"
                  color={this.state.isRedJoker && "red"}
                  marginRight="5px"
                >
                  <div>&nbsp;J</div>
                  <div>O</div>
                  <div>K</div>
                  <div>E</div>
                  <div>R</div>
                </Flex>
              ) : (
                <Flex flexDir="column" marginRight="5px">
                  <div>{this.state.number}</div>
                  {this.renderSmallIcon()}
                </Flex>
              )}
            </Flex>
          </Flex>
        </Container>
      </OutterContainer>
    );
  }
}

export default Card;
