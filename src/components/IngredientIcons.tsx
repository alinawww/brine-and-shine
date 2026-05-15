import type { FC, ReactNode } from 'react';

interface IconProps {
  color?: string;
  size?: number;
}

function IconWrapper({ size = 96, children }: { size: number; children: ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 96 96"
      fill="none"
      aria-hidden="true"
      style={{ overflow: 'visible' }}
    >
      <g filter="url(#wobble)" strokeLinecap="round" strokeLinejoin="round">
        {children}
      </g>
    </svg>
  );
}

export function CucumberIcon({ color = '#2A1A4E', size = 96 }: IconProps) {
  return (
    <IconWrapper size={size}>
      <ellipse cx="48" cy="52" rx="16" ry="28" stroke={color} strokeWidth="2.4" />
      <path d="M48 24 Q52 18 48 12" stroke={color} strokeWidth="2.4" />
      <circle cx="42" cy="42" r="2" fill={color} />
      <circle cx="54" cy="52" r="2" fill={color} />
      <circle cx="44" cy="62" r="2" fill={color} />
      <path d="M36 48 Q48 44 60 48" stroke={color} strokeWidth="1.4" opacity="0.5" />
    </IconWrapper>
  );
}

export function CarrotIcon({ color = '#2A1A4E', size = 96 }: IconProps) {
  return (
    <IconWrapper size={size}>
      <path d="M48 20 L40 72 Q48 80 56 72 L48 20Z" stroke={color} strokeWidth="2.4" />
      <path d="M48 20 Q38 12 32 16" stroke={color} strokeWidth="2.4" />
      <path d="M48 20 Q52 10 58 12" stroke={color} strokeWidth="2.4" />
      <path d="M48 20 Q44 14 46 8" stroke={color} strokeWidth="2.4" />
      <path d="M42 36 Q48 32 54 36" stroke={color} strokeWidth="1.4" opacity="0.5" />
      <path d="M40 52 Q48 48 56 52" stroke={color} strokeWidth="1.4" opacity="0.5" />
    </IconWrapper>
  );
}

export function JalapenoIcon({ color = '#2A1A4E', size = 96 }: IconProps) {
  return (
    <IconWrapper size={size}>
      <path d="M44 18 Q28 32 30 56 Q32 72 48 76 Q56 60 52 40 Q48 24 44 18Z" stroke={color} strokeWidth="2.4" />
      <path d="M44 18 Q50 10 58 14" stroke={color} strokeWidth="2.4" />
      <path d="M52 40 Q62 36 64 44" stroke={color} strokeWidth="1.8" />
    </IconWrapper>
  );
}

export function RedOnionIcon({ color = '#2A1A4E', size = 96 }: IconProps) {
  return (
    <IconWrapper size={size}>
      <ellipse cx="48" cy="58" rx="22" ry="20" stroke={color} strokeWidth="2.4" />
      <path d="M36 50 Q48 28 60 50" stroke={color} strokeWidth="2.4" />
      <path d="M40 54 Q48 36 56 54" stroke={color} strokeWidth="1.4" opacity="0.5" />
      <path d="M48 28 Q50 18 48 12" stroke={color} strokeWidth="2.4" />
      <path d="M44 14 Q48 10 52 14" stroke={color} strokeWidth="2" />
    </IconWrapper>
  );
}

export function BeetIcon({ color = '#2A1A4E', size = 96 }: IconProps) {
  return (
    <IconWrapper size={size}>
      <ellipse cx="48" cy="56" rx="20" ry="22" stroke={color} strokeWidth="2.4" />
      <path d="M48 34 Q44 20 48 12" stroke={color} strokeWidth="2.4" />
      <path d="M48 16 Q56 12 60 20" stroke={color} strokeWidth="2" />
      <path d="M48 16 Q40 10 36 18" stroke={color} strokeWidth="2" />
      <path d="M34 58 Q48 52 62 58" stroke={color} strokeWidth="1.4" opacity="0.5" />
    </IconWrapper>
  );
}

export function GreenBeanIcon({ color = '#2A1A4E', size = 96 }: IconProps) {
  return (
    <IconWrapper size={size}>
      <path d="M24 72 Q36 40 48 28 Q60 40 72 72" stroke={color} strokeWidth="2.4" />
      <path d="M36 50 Q48 44 60 50" stroke={color} strokeWidth="1.4" opacity="0.5" />
      <path d="M48 28 Q52 18 50 12" stroke={color} strokeWidth="2.4" />
      <circle cx="34" cy="64" r="3" stroke={color} strokeWidth="1.8" />
      <circle cx="48" cy="58" r="3" stroke={color} strokeWidth="1.8" />
      <circle cx="62" cy="64" r="3" stroke={color} strokeWidth="1.8" />
    </IconWrapper>
  );
}

export function CauliflowerIcon({ color = '#2A1A4E', size = 96 }: IconProps) {
  return (
    <IconWrapper size={size}>
      <circle cx="48" cy="40" r="12" stroke={color} strokeWidth="2.4" />
      <circle cx="34" cy="46" r="10" stroke={color} strokeWidth="2.4" />
      <circle cx="62" cy="46" r="10" stroke={color} strokeWidth="2.4" />
      <circle cx="40" cy="56" r="9" stroke={color} strokeWidth="2.4" />
      <circle cx="56" cy="56" r="9" stroke={color} strokeWidth="2.4" />
      <path d="M32 62 Q48 68 64 62" stroke={color} strokeWidth="2.4" />
      <path d="M36 66 L36 76 Q48 80 60 76 L60 66" stroke={color} strokeWidth="2" />
    </IconWrapper>
  );
}

export function RadishIcon({ color = '#2A1A4E', size = 96 }: IconProps) {
  return (
    <IconWrapper size={size}>
      <circle cx="48" cy="52" r="20" stroke={color} strokeWidth="2.4" />
      <path d="M48 32 Q44 20 46 12" stroke={color} strokeWidth="2.4" />
      <path d="M40 16 Q46 10 54 14" stroke={color} strokeWidth="2" />
      <path d="M48 72 Q50 80 48 86" stroke={color} strokeWidth="2" />
      <path d="M38 58 Q48 52 58 58" stroke={color} strokeWidth="1.4" opacity="0.5" />
    </IconWrapper>
  );
}

export function CabbageIcon({ color = '#2A1A4E', size = 96 }: IconProps) {
  return (
    <IconWrapper size={size}>
      <circle cx="48" cy="50" r="24" stroke={color} strokeWidth="2.4" />
      <ellipse cx="48" cy="50" rx="16" ry="20" stroke={color} strokeWidth="1.4" opacity="0.5" />
      <ellipse cx="48" cy="50" rx="8" ry="12" stroke={color} strokeWidth="1.4" opacity="0.4" />
      <path d="M48 26 Q52 18 50 12" stroke={color} strokeWidth="2" />
    </IconWrapper>
  );
}

export function GarlicIcon({ color = '#2A1A4E', size = 96 }: IconProps) {
  return (
    <IconWrapper size={size}>
      <path d="M48 60 Q32 56 30 44 Q28 30 40 26 Q48 22 56 26 Q68 30 66 44 Q64 56 48 60Z" stroke={color} strokeWidth="2.4" />
      <path d="M42 26 Q44 16 48 12 Q52 16 54 26" stroke={color} strokeWidth="2" />
      <path d="M36 46 Q48 40 60 46" stroke={color} strokeWidth="1.4" opacity="0.5" />
      <path d="M42 36 Q48 32 54 36" stroke={color} strokeWidth="1.4" opacity="0.5" />
      <path d="M48 60 L48 72" stroke={color} strokeWidth="2" />
    </IconWrapper>
  );
}

export function AsparagusIcon({ color = '#2A1A4E', size = 96 }: IconProps) {
  return (
    <IconWrapper size={size}>
      <path d="M44 76 L44 28 Q44 18 48 14 Q52 18 52 28 L52 76" stroke={color} strokeWidth="2.4" />
      <path d="M38 76 L38 36 Q38 28 42 24" stroke={color} strokeWidth="2" opacity="0.7" />
      <path d="M58 76 L58 36 Q58 28 54 24" stroke={color} strokeWidth="2" opacity="0.7" />
      <path d="M36 76 Q48 72 60 76" stroke={color} strokeWidth="2" />
    </IconWrapper>
  );
}

export function BellPepperIcon({ color = '#2A1A4E', size = 96 }: IconProps) {
  return (
    <IconWrapper size={size}>
      <path d="M30 44 Q28 28 40 22 Q48 18 56 22 Q68 28 66 44 Q64 62 56 70 Q48 76 40 70 Q32 62 30 44Z" stroke={color} strokeWidth="2.4" />
      <path d="M40 22 Q44 14 48 10 Q52 14 56 22" stroke={color} strokeWidth="2.4" />
      <path d="M38 46 Q48 40 58 46" stroke={color} strokeWidth="1.4" opacity="0.5" />
      <path d="M36 56 Q48 50 60 56" stroke={color} strokeWidth="1.4" opacity="0.4" />
    </IconWrapper>
  );
}

const ICON_MAP: Record<string, FC<IconProps>> = {
  cucumber:    CucumberIcon,
  carrot:      CarrotIcon,
  jalapeno:    JalapenoIcon,
  redOnion:    RedOnionIcon,
  beet:        BeetIcon,
  greenBean:   GreenBeanIcon,
  cauliflower: CauliflowerIcon,
  radish:      RadishIcon,
  cabbage:     CabbageIcon,
  garlic:      GarlicIcon,
  asparagus:   AsparagusIcon,
  bellPepper:  BellPepperIcon,
};

export function IngredientIcon({ name, color, size }: { name: string } & IconProps) {
  const Icon = ICON_MAP[name];
  if (!Icon) return null;
  return <Icon color={color} size={size} />;
}
