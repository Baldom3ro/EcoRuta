// Componente de íconos vectoriales SVG profesionales para sustituir emojis
import React from 'react';
import Svg, {Path, Circle, Rect, Polyline, Line, Polygon} from 'react-native-svg';

export type IconName =
  | 'map-pin'
  | 'bell'
  | 'truck'
  | 'alert'
  | 'warning'
  | 'file-text'
  | 'settings'
  | 'user'
  | 'trash'
  | 'camera'
  | 'clock'
  | 'lock'
  | 'log-out'
  | 'moon'
  | 'lightbulb'
  | 'check-circle'
  | 'chevron-right'
  | 'chevron-left'
  | 'arrow-left'
  | 'chevron-down'
  | 'chevron-up'
  | 'play'
  | 'pause'
  | 'wrench'
  | 'calendar'
  | 'barrier'
  | 'home'
  | 'history'
  | 'recycle'
  | 'edit'
  | 'x';

interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 20,
  color = '#2E7D32',
}) => {
  const commonProps = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: color,
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  switch (name) {
    case 'map-pin':
      return (
        <Svg {...commonProps}>
          <Path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <Circle cx="12" cy="10" r="3" />
        </Svg>
      );
    case 'bell':
      return (
        <Svg {...commonProps}>
          <Path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <Path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </Svg>
      );
    case 'truck':
      return (
        <Svg {...commonProps}>
          <Rect x="1" y="3" width="15" height="13" rx="2" />
          <Polyline points="16 8 20 8 23 11 23 16 16 16" />
          <Circle cx="5.5" cy="18.5" r="2.5" />
          <Circle cx="18.5" cy="18.5" r="2.5" />
        </Svg>
      );
    case 'alert':
      return (
        <Svg {...commonProps}>
          <Path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <Line x1="12" y1="9" x2="12" y2="13" />
          <Line x1="12" y1="17" x2="12.01" y2="17" />
        </Svg>
      );
    case 'warning':
      return (
        <Svg {...commonProps}>
          <Circle cx="12" cy="12" r="10" />
          <Line x1="12" y1="8" x2="12" y2="12" />
          <Line x1="12" y1="16" x2="12.01" y2="16" />
        </Svg>
      );
    case 'file-text':
      return (
        <Svg {...commonProps}>
          <Path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <Polyline points="14 2 14 8 20 8" />
          <Line x1="16" y1="13" x2="8" y2="13" />
          <Line x1="16" y1="17" x2="8" y2="17" />
          <Polyline points="10 9 9 9 8 9" />
        </Svg>
      );
    case 'settings':
      return (
        <Svg {...commonProps}>
          <Circle cx="12" cy="12" r="3" />
          <Path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </Svg>
      );
    case 'user':
      return (
        <Svg {...commonProps}>
          <Path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <Circle cx="12" cy="7" r="4" />
        </Svg>
      );
    case 'trash':
      return (
        <Svg {...commonProps}>
          <Polyline points="3 6 5 6 21 6" />
          <Path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        </Svg>
      );
    case 'camera':
      return (
        <Svg {...commonProps}>
          <Path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
          <Circle cx="12" cy="13" r="4" />
        </Svg>
      );
    case 'clock':
      return (
        <Svg {...commonProps}>
          <Circle cx="12" cy="12" r="10" />
          <Polyline points="12 6 12 12 16 14" />
        </Svg>
      );
    case 'lock':
      return (
        <Svg {...commonProps}>
          <Rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <Path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </Svg>
      );
    case 'log-out':
      return (
        <Svg {...commonProps}>
          <Path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <Polyline points="16 17 21 12 16 7" />
          <Line x1="21" y1="12" x2="9" y2="12" />
        </Svg>
      );
    case 'moon':
      return (
        <Svg {...commonProps}>
          <Path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </Svg>
      );
    case 'lightbulb':
      return (
        <Svg {...commonProps}>
          <Path d="M9 18h6" />
          <Path d="M10 22h4" />
          <Path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
        </Svg>
      );
    case 'check-circle':
      return (
        <Svg {...commonProps}>
          <Path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <Polyline points="22 4 12 14.01 9 11.01" />
        </Svg>
      );
    case 'chevron-right':
      return (
        <Svg {...commonProps}>
          <Polyline points="9 18 15 12 9 6" />
        </Svg>
      );
    case 'chevron-left':
      return (
        <Svg {...commonProps}>
          <Polyline points="15 18 9 12 15 6" />
        </Svg>
      );
    case 'arrow-left':
      return (
        <Svg {...commonProps}>
          <Line x1="19" y1="12" x2="5" y2="12" />
          <Polyline points="12 19 5 12 12 5" />
        </Svg>
      );
    case 'chevron-down':
      return (
        <Svg {...commonProps}>
          <Polyline points="6 9 12 15 18 9" />
        </Svg>
      );
    case 'chevron-up':
      return (
        <Svg {...commonProps}>
          <Polyline points="18 15 12 9 6 15" />
        </Svg>
      );
    case 'play':
      return (
        <Svg {...commonProps}>
          <Polygon points="5 3 19 12 5 21 5 3" fill={color} />
        </Svg>
      );
    case 'pause':
      return (
        <Svg {...commonProps}>
          <Rect x="6" y="4" width="4" height="16" fill={color} />
          <Rect x="14" y="4" width="4" height="16" fill={color} />
        </Svg>
      );
    case 'wrench':
      return (
        <Svg {...commonProps}>
          <Path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </Svg>
      );
    case 'calendar':
      return (
        <Svg {...commonProps}>
          <Rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <Line x1="16" y1="2" x2="16" y2="6" />
          <Line x1="8" y1="2" x2="8" y2="6" />
          <Line x1="3" y1="10" x2="21" y2="10" />
        </Svg>
      );
    case 'barrier':
      return (
        <Svg {...commonProps}>
          <Path d="M4 6h16M4 12h16M4 18h16" />
          <Line x1="8" y1="2" x2="8" y2="22" />
          <Line x1="16" y1="2" x2="16" y2="22" />
        </Svg>
      );
    case 'home':
      return (
        <Svg {...commonProps}>
          <Path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <Polyline points="9 22 9 12 15 12 15 22" />
        </Svg>
      );
    case 'history':
      return (
        <Svg {...commonProps}>
          <Path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
          <Path d="M3 3v5h5" />
          <Polyline points="12 7 12 12 15 15" />
        </Svg>
      );
    case 'recycle':
      return (
        <Svg {...commonProps}>
          <Path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.91 1.81 1.81 0 0 1-.09-1.81l3.24-5.69" />
          <Path d="M11 19h8.185a1.83 1.83 0 0 0 1.57-.91 1.81 1.81 0 0 0 .09-1.81l-3.24-5.69" />
          <Path d="M12 3l4.5 7.8a1.83 1.83 0 0 1-.1 1.82 1.81 1.81 0 0 1-1.58.88H9.18" />
        </Svg>
      );
    case 'edit':
      return (
        <Svg {...commonProps}>
          <Path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
          <Path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
        </Svg>
      );
    case 'x':
      return (
        <Svg {...commonProps}>
          <Line x1="18" y1="6" x2="6" y2="18" />
          <Line x1="6" y1="6" x2="18" y2="18" />
        </Svg>
      );
    default:
      return (
        <Svg {...commonProps}>
          <Circle cx="12" cy="12" r="10" />
        </Svg>
      );
  }
};
