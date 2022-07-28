import Card from "./Card";
import React, { useEffect } from "react";

export default function Game(props) {
  const [gameState, setGameState] = React.useState({
    count: 0,
    flippedCards: 0,
    moves: 0,
    totalMoves: 0,
    finalizedGames: 0,
    averageMoves: 0,
  });
  const [cards, setCards] = React.useState([]);

  const handleCardClick = (index) => {
    // Load current state
    let newCards = [...cards];
    let newGameState = {
      ...gameState,
      moves: gameState.moves + 1,
      totalMoves: gameState.totalMoves + 1,
    };

    // Flip card
    newCards[index].flipped = true;
    newCards[index].disabled = true;

    // Increment flipped cards
    newGameState = {
      ...newGameState,
      flippedCards: newGameState.flippedCards + 1,
    };

    // Count matching cards
    let validFlippedCards = 0;
    const flippedCardValue = newCards[index].value;
    newCards
      .filter((card) => card.flipped)
      .filter((card) => card.value === flippedCardValue)
      .forEach(() => {
        validFlippedCards++;
      });

    // If the cards don't match, flip them back
    console.log(newGameState);
    console.log("Matching cards: " + validFlippedCards);
    if (validFlippedCards < newGameState.flippedCards) {
      console.log(newGameState.flippedCards);
      console.log("Flipped cards do not match");
      newCards = newCards.map((card) => ({ ...card, disabled: true }));

      setTimeout(() => {
        // Flip the cards back
        setCards(
          newCards.map((card) => {
            if (!card.matched) {
              card.flipped = false;
              card.disabled = false;
            }
            return card;
          })
        );

        // Reset flipped cards
        setGameState({
          ...newGameState,
          flippedCards: 0,
        });
      }, 1000);
    }

    // Full match chain reached
    if (validFlippedCards === props.game.chainLength) {
      console.log("Chain reached");

      newGameState = { ...newGameState, flippedCards: 0 };
      newCards = newCards.map((card) => {
        if (card.flipped) {
          card.disabled = true;
          card.matched = true;
        }
        return card;
      });

      // Check if game is over
      let gameOver = true;
      newCards.forEach((card) => {
        if (!card.matched) {
          gameOver = false;
        }
      });
      if (gameOver) {
        newGameState = {
          ...newGameState,
          finalizedGames: newGameState.finalizedGames + 1,
          averageMoves: (newGameState.totalMoves / (newGameState.finalizedGames + 1)).toFixed(2),
        };
      }
    }

    setCards(newCards);
    setGameState(newGameState);
  };

  const newGame = () => {
    setGameState({
      ...gameState,
      count: gameState.count + 1,
      flippedCards: 0,
      moves: 0,
    });
  };

  // Shuffle function copied from StackOverflow
  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  // Start game
  useEffect(() => {
    const chainLength = props.game.chainLength;
    const squareCount = props.game.squareCount;

    // Flip cards to hide them
    let newCards = [];
    for (let i = 0; i < squareCount; i++) {
      newCards.push({
        ...cards[i],
        flipped: false,
      });
    }
    setCards(newCards);

    // Shuffle cards
    setTimeout(() => {
      let cardValues = [];
      for (let i = 0; i < squareCount / chainLength; i++) {
        for (let j = 0; j < chainLength; j++) {
          cardValues.push(i);
        }
      }
      cardValues = shuffle(cardValues);

      let newCards = [];
      for (let i = 0; i < squareCount; i++) {
        newCards.push({
          key: i,
          flipped: false,
          matched: false,
          disabled: false,
          value: cardValues[i],
        });
      }
      setCards(newCards);
    }, 800);
  }, [gameState.count]);

  return (
    <div className="game">
      <button onClick={newGame}>New game</button>
      <br />
      <div className="moves">Moves: {gameState.moves}</div>
      <div className="total-moves">Total moves: {gameState.totalMoves}</div>
      <div className="average-moves">
        Average moves: {gameState.averageMoves}
      </div>
      <div className="board">
        {cards.map((card, index) => {
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
