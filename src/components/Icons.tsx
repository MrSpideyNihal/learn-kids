import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export const CoinIcon: React.FC<IconProps> = ({ size = 24, className, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <circle cx="12" cy="12" r="10" fill="#FFDE4D" stroke="black" strokeWidth="2.5" />
    <circle cx="12" cy="12" r="6" fill="#F4B400" stroke="black" strokeWidth="1.5" />
    <path d="M12 9V15M10 12H14" stroke="black" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const GuessIcon: React.FC<IconProps> = ({ size = 24, className, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <rect x="2" y="2" width="20" height="20" rx="6" fill="#FF6B6B" stroke="black" strokeWidth="2.5" />
    <path
      d="M12 17V15M12 12.5C13.5 12.5 14.5 11.5 14.5 10C14.5 8.5 13.2 7.2 11.7 7.2C10.2 7.2 9.5 8.2 9.2 9M12 12.5V13"
      stroke="white"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="16.5" r="1.5" fill="white" />
  </svg>
);

export const MatchIcon: React.FC<IconProps> = ({ size = 24, className, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <rect
      x="3"
      y="5"
      width="8"
      height="12"
      rx="2"
      fill="#4EAD5B"
      stroke="black"
      strokeWidth="2.5"
      transform="rotate(-10 3 5)"
    />
    <rect
      x="12"
      y="7"
      width="8"
      height="12"
      rx="2"
      fill="#38BDF8"
      stroke="black"
      strokeWidth="2.5"
      transform="rotate(10 12 7)"
    />
    <circle cx="7" cy="11" r="1.5" fill="white" />
    <circle cx="16" cy="13" r="1.5" fill="white" />
  </svg>
);

export const StudioIcon: React.FC<IconProps> = ({ size = 24, className, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path
      d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C13.5 22 14.5 21 14.5 19.5C14.5 18.8 14.2 18.2 13.8 17.7C13.7 17.6 13.6 17.4 13.6 17.3C13.6 17 13.9 16.7 14.2 16.7H16C19.3 16.7 22 14 22 10.7C22 5.9 17.5 2 12 2Z"
      fill="#FF9F29"
      stroke="black"
      strokeWidth="2.5"
    />
    <circle cx="6.5" cy="11.5" r="1.5" fill="#FF6B6B" />
    <circle cx="9.5" cy="7.5" r="1.5" fill="#FFDE4D" />
    <circle cx="14.5" cy="7.5" r="1.5" fill="#38BDF8" />
    <circle cx="17.5" cy="11.5" r="1.5" fill="#9B5DE5" />
  </svg>
);

export const LeaderboardIcon: React.FC<IconProps> = ({ size = 24, className, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path
      d="M12 2L15 8.5L22 9L17 13.5L18.5 20.5L12 17L5.5 20.5L7 13.5L2 9L9 8.5L12 2Z"
      fill="#9B5DE5"
      stroke="black"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
  </svg>
);

export const SoundOnIcon: React.FC<IconProps> = ({ size = 24, className, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path
      d="M11 5L6 9H2V15H6L11 19V5Z"
      fill="white"
      stroke="black"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15.54 8.46C16.48 9.4 17.06 10.7 17.06 12C17.06 13.3 16.48 14.6 15.54 15.54M19.07 4.93C20.95 6.81 22.12 9.41 22.12 12C22.12 14.59 20.95 17.19 19.07 19.07"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const SoundOffIcon: React.FC<IconProps> = ({ size = 24, className, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path
      d="M11 5L6 9H2V15H6L11 19V5Z"
      fill="#777777"
      stroke="black"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M22 9L16 15M16 9L22 15" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

export const MusicOnIcon: React.FC<IconProps> = ({ size = 24, className, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path
      d="M9 18V5L21 3V16"
      stroke="black"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="6" cy="18" r="3" fill="white" stroke="black" strokeWidth="2.5" />
    <circle cx="18" cy="16" r="3" fill="white" stroke="black" strokeWidth="2.5" />
  </svg>
);

export const MusicOffIcon: React.FC<IconProps> = ({ size = 24, className, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path
      d="M9 18V5L21 3V16"
      stroke="black"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="6" cy="18" r="3" fill="#777777" stroke="black" strokeWidth="2.5" />
    <circle cx="18" cy="16" r="3" fill="#777777" stroke="black" strokeWidth="2.5" />
    <path d="M22 4L2 20" stroke="red" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

export const CloseIcon: React.FC<IconProps> = ({ size = 24, className, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path d="M18 6L6 18M6 6L18 18" stroke="black" strokeWidth="3" strokeLinecap="round" />
  </svg>
);
