import { useEffect, useState } from "react";

export type ViewsT = { [key: string]: number };

const initialViews: ViewsT = {
  "1": 3321235,
  "2": 2123211,
  "3": 654212,
  "4": 322356
};

const useViews = () => {
  const [views, setViews] = useState(initialViews);

  useEffect(() => {
    const interval = setInterval(() => {
      const newViews = Object.keys(views).reduce(
        (acc, cur) => {
          acc[cur] += Math.round(Math.random() * 100);
          return acc;
        },
        // Very important to spread the view here to create a NEW object
        { ...views }
      );
      setViews(newViews);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [views]);

  return views;
};

export default useViews;
