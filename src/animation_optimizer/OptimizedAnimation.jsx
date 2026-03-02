import Lottie from "lottie-react";
import { memo } from "react";

export const OptimizedAnimation = memo(({ data }) => (
  <Lottie animationData={data} loop={true} />
));
