import Card from "./Card";
import React from "react";

export default function Game(props) {
  // const [gameState, setGameState] = React.useState({});
  const [cards, setCards] = React.useState([]);

  const handleCardClick = (index) => {
    console.log("=> handleCardClick", index);

    setCards(
      cards.map((card, i) => {
        console.log(card, i);
        if (i === index) {
          return { ...card, flipped: !card.flipped };
        } else {
          return { ...card };
        }
      })
    );
  };

  let squares = [];
  for (let i = 0; i < props.squareCount; i++) {
    squares.push({
      key: i,
      flipped: false,
      matched: false,
      selected: false,
    });
  }

  return (
    <div className="game">
      Game
      <div className="board">
        {squares.map((card, index) => {
          return (
            <Card
              key={index}
              card={card}
              index={index}
              onClick={handleCardClick}
            />
          );
        })}
      </div>
    </div>
  );
}
