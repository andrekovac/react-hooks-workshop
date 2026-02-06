import React from "react";

type ViewsProps = {
  views: number;
};

const ViewsBasic: React.FC<ViewsProps> = ({ views }) => {
  console.log("[Views] Component re-render");

  return (
    <div className="views-counter">
      <span className="views-label">Views</span>
      <span className="views-number">{views.toLocaleString()}</span>
    </div>
  );
};

export default ViewsBasic;
