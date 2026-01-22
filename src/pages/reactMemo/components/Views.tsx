import React from "react";

type ViewsProps = {
  views: number;
};

const Views: React.FC<ViewsProps> = ({ views }) => {
  console.log("[Views 👀] Component re-render");

  return <span>Views: {views}</span>;
};

export default React.memo(Views);
