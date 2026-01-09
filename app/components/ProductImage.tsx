'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ProductImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  width?: number;
  height?: number;
}

function isValidImageUrl(url: string): boolean {
  if (!url) return false;
  // Check if it's a valid URL (http/https) or starts with /
  return url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/');
}

export default function ProductImage({ src, alt, fill, className, width, height }: ProductImageProps) {
  const [imageError, setImageError] = useState(false);

  // Use SVG placeholder if invalid URL or error (no external domain needed)
  const placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgZmlsbD0iI2YzZjRmNiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiM5Y2EzYWYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';
  
  if (!isValidImageUrl(src) || imageError) {
    return (
      <img
        src={placeholder}
        alt={alt}
        className={className}
        style={fill ? { width: '100%', height: '100%', objectFit: 'cover' } : undefined}
        width={width}
        height={height}
      />
    );
  }

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={className}
        onError={() => setImageError(true)}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width || 500}
      height={height || 500}
      className={className}
      onError={() => setImageError(true)}
    />
  );
}

