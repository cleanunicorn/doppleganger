export default function Card(props) {
  const flipCardInnerClass = (props.card.flipped ? 'flip' : '') + ' flip-card-inner';

  const handleClick = () => {
    props.onClick(props.index);
  }

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
        <div className="flip-card-back">
          <svg
            width="50"
            height="50"
            viewBox="0 0 50 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="50" height="50" fill="black" />
          </svg>
        </div>
      </div>
    </div>
  );
}
