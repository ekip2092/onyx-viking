/* Thin, sharp inline icons (1.7px stroke) — hand-drawn to match the
   Corsa system's precision feel. Pure presentational, no client JS. */
import type { CSSProperties, ReactNode } from "react";

type IconProps = {
  size?: number;
  stroke?: number;
  fill?: string;
  style?: CSSProperties;
};

function Icon({
  d,
  size = 20,
  stroke = 1.7,
  fill = "none",
  style,
}: IconProps & { d: ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
      aria-hidden="true"
    >
      {d}
    </svg>
  );
}

export const PhoneIcon = (p: IconProps) => (
  <Icon
    {...p}
    d={
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
    }
  />
);

export const CheckIcon = (p: IconProps) => (
  <Icon {...p} d={<polyline points="20 6 9 17 4 12" />} />
);

export const ArrowIcon = (p: IconProps) => (
  <Icon
    {...p}
    d={
      <g>
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </g>
    }
  />
);

export const ClockIcon = (p: IconProps) => (
  <Icon
    {...p}
    d={
      <g>
        <circle cx="12" cy="12" r="9" />
        <polyline points="12 7 12 12 15 14" />
      </g>
    }
  />
);

export const ShieldIcon = (p: IconProps) => (
  <Icon
    {...p}
    d={
      <g>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
        <polyline points="9 12 11 14 15 10" />
      </g>
    }
  />
);
