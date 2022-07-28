import Card from "./Card";
import React, { useEffect } from "react";

export default function Game(props) {
  const [gameState, setGameState] = React.useState({ count: 0, flippedCards: 0 });
  const [cards, setCards] = React.useState([]);

  const handleCardClick = (index) => {
    // Flip card
    setCards(
      cards.map((card, i) => {
        if (i === index) {
          return { ...card, flipped: true };
        } else {
          return { ...card };
        }
      })
    );

    // Increment flipped cards
    setGameState({
      ...gameState,
      flippedCards: gameState.flippedCards + 1,
    });

    // Check chain validity
    if (gameState.flippedCards <= props.game.chainLength) {
      let validFlippedCards = 0;
      const flippedCardValue = cards[index].value;
      cards
      .filter((card) => card.flipped)
      .filter((card) => card.value === flippedCardValue)
      .forEach(() => { validFlippedCards++ });
      
      // Chain length reached, check if the cards match 
      if (validFlippedCards === props.game.chainLength) {
        console.log('Flipped cards match');
        // Reset the flipped cards
        setGameState({ ...gameState, flippedCards: 0 });

        // Disable the flipped cards
        setCards(cards.map((card) => ({ ...card, disabled: true })));
      }
      
      // If the cards don't match, flip them back
      if (validFlippedCards < gameState.flippedCards) {
        console.log(validFlippedCards);
        console.log(gameState.flippedCards);
        console.log('Flipped cards do not match');
        setCards(cards.map((card) => ({ ...card, disabled: true })));

        setTimeout(
          () => { 
            // Flip the cards back
            setCards(cards.map((card) => ({ ...card, flipped: false })));
          },
          3000
        );
      }
    }
  };

  const newGame = () => {
    setGameState({ ...gameState, count: gameState.count + 1, flippedCards: 0 });
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
          selected: false,
          value: cardValues[i],
        });
      }
      setCards(newCards);
    }, 800);
  }, [gameState.count]);

  return (
    <div className="game">
      <button onClick={newGame}>New game</button>
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
