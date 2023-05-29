import classes from "./Card.module.css";

const Card = (props) => {
  const cardClass = props.className
    ? `${props.className} ${classes.card}`
    : `${classes.card}`;
  return (
    <div className={cardClass} style={props.style}>
      {props.children}
    </div>
  );
};

export default Card;
