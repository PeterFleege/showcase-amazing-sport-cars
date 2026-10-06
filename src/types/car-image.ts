// src/types/car-image.ts

interface CarImageProps {
  src: string;
  alt: string;
  accentFrom: string;
  accentTo: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  imageClassName?: string;
}

export default CarImageProps;
