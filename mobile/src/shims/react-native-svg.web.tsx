// Shim para react-native-svg en React Native Web + Vite
import React from 'react';

export const Svg = ({
  children,
  width,
  height,
  viewBox,
  fill,
  stroke,
  strokeWidth,
  strokeLinecap,
  strokeLinejoin,
  style,
  ...props
}: any) => (
  <svg
    width={width}
    height={height}
    viewBox={viewBox}
    fill={fill || 'none'}
    stroke={stroke || 'currentColor'}
    strokeWidth={strokeWidth}
    strokeLinecap={strokeLinecap}
    strokeLinejoin={strokeLinejoin}
    style={style}
    {...props}>
    {children}
  </svg>
);

export const Path = (props: any) => <path {...props} />;
export const Circle = (props: any) => <circle {...props} />;
export const Rect = (props: any) => <rect {...props} />;
export const Polyline = (props: any) => <polyline {...props} />;
export const Line = (props: any) => <line {...props} />;
export const Polygon = (props: any) => <polygon {...props} />;

export default Svg;
