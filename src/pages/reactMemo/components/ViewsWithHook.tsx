import React from "react";
import useViews from "./useViews";

type ViewsWithHookProps = {
  movieId: number;
};

const ViewsWithHook: React.FC<ViewsWithHookProps> = ({ movieId }) => {
  const views = useViews();
  console.log("[Views] Component re-render");

  return (
    <div className="views-counter">
      <span className="views-label">Views</span>
      <span className="views-number">{views[movieId].toLocaleString()}</span>
    </div>
  );
};

export default ViewsWithHook;
