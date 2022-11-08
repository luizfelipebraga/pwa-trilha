/* src/TagList/tagList.js */

import React from "react";
import Tag from "./tag";

import classes from "./tagList.css";

const TagList = (props) => {
  // Destructures the props object into variables
  const { categoriesListData } = props;

  const { categories } = categoriesListData;

  // Returns nothing if there are no categories
  if (!categories) {
    return null;
  }

  // Converts the array of tag strings into an array of Tag components
  const tagList = categories.map((category) => {
    return <Tag key={category.name} value={category} />;
  });

  // Returns the list of Tag components inside a div container
  return <div className={classes.root}>{tagList}</div>;
};

export default TagList;