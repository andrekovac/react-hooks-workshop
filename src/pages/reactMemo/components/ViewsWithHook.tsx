import React from "react";
import useViews from "./useViews";

type ViewsWithHookProps = {
  movieId: number;
};

const ViewsWithHook: React.FC<ViewsWithHookProps> = ({ movieId }) => {
  const views = useViews();
  console.log("[Views 👀] Component re-render");

  return <span>Views: {views[movieId]}</span>;
};

export default ViewsWithHook;
