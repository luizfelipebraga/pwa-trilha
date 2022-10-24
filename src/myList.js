import React from "react";

const MyList = () => {
  const listContentData = []; // List content data

  const renderedContent = listContentData.map((content) => {
    return <li key={content}>{content}</li>;
  });

  return <ul>{renderedContent}</ul>;
};

export default MyList;