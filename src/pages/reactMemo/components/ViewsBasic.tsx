import React from "react";

type ViewsProps = {
  views: number;
};

const ViewsBasic: React.FC<ViewsProps> = ({ views }) => {
  console.log("[Views 👀] Component re-render");

  return <span>Views: {views}</span>;
};

export default ViewsBasic;
