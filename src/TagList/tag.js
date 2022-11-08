/* src/TagList/tag.js */

import React from "react";
import Button from "@magento/venia-ui/lib/components/Button";
import { Link } from "@magento/venia-ui/lib/drivers";

import classes from "./tag.css";

const categoryUrlSuffix = ".html";

// This is a component responsible for rendering a single tag
const Tag = (props) => {
  // Destructures the props object into variables
  const { value } = props;

  const { name, url_path } = value;
  const url = `/${url_path}${categoryUrlSuffix}`;

  const buttonClasses = {
    root_lowPriority: classes.root,
    content: classes.content,
  };

  return (
    <Link className={classes.link} to={url}>
      <Button classes={buttonClasses} priority="low" type="button">
        {name}
      </Button>
    </Link>
  );
};

// Make this function the default exported of this module
export default Tag;