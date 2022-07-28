export default function Card(props) {
  let flipCardInnerClass;
  flipCardInnerClass = "flip-card-inner";
  if (props.card.flipped) {
    flipCardInnerClass += " flip";
  }
  if (props.card.matched) {
    flipCardInnerClass += " matched";
  }

  const handleClick = () => {
    if (props.card.disabled || props.card.flipped) {
      console.log("Card is disabled");
    } else {
      props.onClick(props.index);
    }
  };

  return (
    <div className="flip-card" onClick={handleClick}>
      <div className={flipCardInnerClass}>
        <div className="flip-card-front">
          <svg
            width="50"
            height="50"
            viewBox="0 0 50 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="50" height="50" fill="red" />
          </svg>
        </div>
        <div className="flip-card-back">{props.card.value}</div>
      </div>
    </div>
  );
}
