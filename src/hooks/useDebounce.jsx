import { useEffect, useState } from "react";

const useDebounce = (input, delay) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setValue(input), delay);

    return () => {
      clearTimeout(timer);
    };
  }, [input, delay]);

  return value;
};
export default useDebounce;
