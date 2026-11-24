"use client";

import { FiArrowRight } from "react-icons/fi";

const Button4 = () => {
  return (
    <button type="button" className="group inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
      Explore More
      <FiArrowRight className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-1 group-hover:scale-110" />
    </button>
  );
};

export default Button4;
