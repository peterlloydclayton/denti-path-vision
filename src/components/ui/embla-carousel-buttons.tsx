import React, { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const usePrevNextButtons = (emblaApi: any, onButtonClick?: (emblaApi: any) => void) => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
    if (onButtonClick) onButtonClick(emblaApi);
  }, [emblaApi, onButtonClick]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
    if (onButtonClick) onButtonClick(emblaApi);
  }, [emblaApi, onButtonClick]);

  const onSelect = useCallback((emblaApi: any) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on('reInit', onSelect).on('select', onSelect);
  }, [emblaApi, onSelect]);

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  };
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export const PrevButton: React.FC<ButtonProps> = ({ children, ...restProps }) => {
  return (
    <button
      className="relative z-20 p-3 text-gray-600 hover:text-gray-800 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
      type="button"
      {...restProps}
    >
      <ChevronLeft size={24} />
      {children}
    </button>
  );
};

export const NextButton: React.FC<ButtonProps> = ({ children, ...restProps }) => {
  return (
    <button
      className="relative z-20 p-3 text-gray-600 hover:text-gray-800 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
      type="button"
      {...restProps}
    >
      <ChevronRight size={24} />
      {children}
    </button>
  );
};