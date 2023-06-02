// import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import classes from "./FilterButton.module.css";
const FilterButton = (props) => {
  return (
    <div className={classes.filter} onClick={props.onClick}>
      <FontAwesomeIcon icon={faFilter} size="lg" />
    </div>
  );
};

export default FilterButton;
