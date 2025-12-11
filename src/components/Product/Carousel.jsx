import { useState, useEffect, useRef } from "react";

import { Left, Right } from "neetoicons";
import { Button } from "neetoui";

const Carousel = ({ imageUrls, title }) => {
  const timerRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const handleNext = () =>
    setCurrentIndex(prevIndex => (prevIndex + 1) % imageUrls.length);

  const resetTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(handleNext, 3000);
  };

  const handlePrevious = () => {
    setCurrentIndex(
      prevIndex => (prevIndex - 1 + imageUrls.length) % imageUrls.length
    );
    resetTimer();
  };

  useEffect(() => {
    const interval = setInterval(handleNext, 3000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center">
        <Button
          className="shrink-0 focus-within:ring-0 hover:bg-transparent"
          icon={Left}
          style="text"
          onClick={handlePrevious}
        />
        <img
          alt={title}
          className="max-w-56 h-56 max-h-56 w-56 "
          src={imageUrls[currentIndex]}
        />
        <Button
          className="shrink-0 focus-within:ring-0 hover:bg-transparent"
          icon={Right}
          style="text"
          onClick={() => {
            handleNext();
            resetTimer();
          }}
        />
      </div>
      <div className="flex space-x-1 py-1">
        {imageUrls.map((_, index) => {
          const defaultClasses =
            "neeto-ui-border-black neeto-ui-rounded-full h-3 w-3 cursor-pointer border";

          const dotClassNames =
            index === currentIndex
              ? defaultClasses.concat(" neeto-ui-bg-black")
              : defaultClasses;

          return (
            <span
              className={dotClassNames}
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                resetTimer();
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Carousel;
