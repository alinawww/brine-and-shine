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
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
      style={{ overflow: 'visible' }}
    >
      {children}
    </svg>
  );
}

function s(c: string) {
  return { fill: 'none' as const, stroke: c, strokeWidth: 2.2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
}
function st(c: string) {
  return { fill: 'none' as const, stroke: c, strokeWidth: 1.4, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
}

export function AsparagusIcon({ color = '#2A1A4E', size = 96 }: IconProps) {
  return (
    <IconWrapper size={size}>
      <path d="M38 82 Q40 50 44 22 Q47 14 50 16" {...s(color)} />
      <path d="M44 22 Q41 24 39 22" {...s(color)} />
      <path d="M46 30 Q43 32 41 30" {...s(color)} />
      <path d="M48 38 Q45 40 43 38" {...s(color)} />
      <path d="M50 18 L52 12" {...s(color)} />
      <path d="M54 84 Q56 50 60 22 Q63 14 66 16" {...s(color)} />
      <path d="M60 22 Q57 24 55 22" {...s(color)} />
      <path d="M62 30 Q59 32 57 30" {...s(color)} />
      <path d="M64 38 Q61 40 59 38" {...s(color)} />
      <path d="M66 18 L68 12" {...s(color)} />
      <path d="M70 82 Q72 56 76 32 Q79 24 82 26" {...s(color)} />
      <path d="M76 32 Q73 34 71 32" {...s(color)} />
      <path d="M78 40 Q75 42 73 40" {...s(color)} />
      <path d="M82 28 L84 22" {...s(color)} />
      <path d="M34 74 Q60 70 86 74 Q85 80 84 82 Q60 86 36 82 Z" {...s(color)} />
      <path d="M40 77 L82 77" {...st(color)} />
    </IconWrapper>
  );
}

export function BeetIcon({ color = '#2A1A4E', size = 96 }: IconProps) {
  return (
    <IconWrapper size={size}>
      <path d="M50 36 Q42 18 32 18 Q34 30 44 36" {...s(color)} />
      <path d="M50 36 Q50 14 56 10 Q60 24 56 36" {...s(color)} />
      <path d="M50 36 Q62 20 72 22 Q68 32 58 38" {...s(color)} />
      <path d="M38 22 L44 30 M55 16 L55 28 M66 24 L60 32" {...st(color)} />
      <path d="M28 56 Q28 40 50 38 Q72 40 72 56 Q72 80 50 86 Q28 80 28 56 Z" {...s(color)} />
      <path d="M50 86 Q49 92 47 96" {...s(color)} />
      <path d="M38 56 Q44 60 38 64 M58 50 Q62 56 56 60" {...st(color)} />
    </IconWrapper>
  );
}

export function BellPepperIcon({ color = '#2A1A4E', size = 96 }: IconProps) {
  return (
    <IconWrapper size={size}>
      <path d="M50 14 L50 22 M44 20 Q50 16 56 20" {...s(color)} />
      <path d="M22 36 Q18 70 36 86 Q50 92 64 86 Q82 70 78 36 Q72 26 64 30 Q58 22 50 30 Q42 22 36 30 Q28 26 22 36 Z" {...s(color)} />
      <path d="M36 30 Q34 58 38 86" {...st(color)} />
      <path d="M64 30 Q66 58 62 86" {...st(color)} />
    </IconWrapper>
  );
}

export function CabbageIcon({ color = '#2A1A4E', size = 96 }: IconProps) {
  return (
    <IconWrapper size={size}>
      <path d="M18 56 Q14 30 38 18 Q62 14 78 28 Q88 50 82 70 Q60 92 36 88 Q18 78 18 56 Z" {...s(color)} />
      <path d="M50 24 Q48 50 42 80" {...st(color)} />
      <path d="M30 34 Q40 52 42 80" {...st(color)} />
      <path d="M72 32 Q60 54 60 84" {...st(color)} />
      <path d="M82 50 Q66 60 60 84" {...st(color)} />
      <path d="M22 60 Q34 66 42 80" {...st(color)} />
    </IconWrapper>
  );
}

export function CarrotIcon({ color = '#2A1A4E', size = 96 }: IconProps) {
  return (
    <IconWrapper size={size}>
      <path d="M44 22 Q36 10 28 14 Q32 22 40 26" {...s(color)} />
      <path d="M50 18 Q50 6 58 8 Q58 18 54 24" {...s(color)} />
      <path d="M56 22 Q66 12 72 18 Q66 24 58 26" {...s(color)} />
      <path d="M36 30 Q38 26 50 26 Q62 26 64 30 Q60 56 56 80 Q52 92 50 92 Q48 92 44 80 Q40 56 36 30 Z" {...s(color)} />
      <path d="M42 40 L58 40 M44 54 L56 54 M46 68 L54 68" {...st(color)} />
    </IconWrapper>
  );
}

export function CauliflowerIcon({ color = '#2A1A4E', size = 96 }: IconProps) {
  return (
    <IconWrapper size={size}>
      <path d="M16 60 Q14 38 30 36 Q34 50 28 64" {...s(color)} />
      <path d="M84 60 Q86 38 70 36 Q66 50 72 64" {...s(color)} />
      <circle cx="36" cy="46" r="10" {...s(color)} />
      <circle cx="50" cy="38" r="11" {...s(color)} />
      <circle cx="64" cy="46" r="10" {...s(color)} />
      <circle cx="42" cy="58" r="10" {...s(color)} />
      <circle cx="58" cy="58" r="10" {...s(color)} />
      <circle cx="50" cy="66" r="9" {...s(color)} />
      <path d="M36 70 Q50 84 64 70" {...s(color)} />
    </IconWrapper>
  );
}

export function CucumberIcon({ color = '#2A1A4E', size = 96 }: IconProps) {
  return (
    <IconWrapper size={size}>
      <path d="M22 58 Q14 38 28 26 Q44 18 64 28 Q86 44 80 64 Q72 84 52 84 Q30 80 22 58 Z" {...s(color)} />
      <circle cx="34" cy="40" r="1.6" fill={color} />
      <circle cx="46" cy="32" r="1.6" fill={color} />
      <circle cx="58" cy="38" r="1.6" fill={color} />
      <circle cx="68" cy="52" r="1.6" fill={color} />
      <circle cx="42" cy="58" r="1.6" fill={color} />
      <circle cx="56" cy="64" r="1.6" fill={color} />
      <circle cx="34" cy="68" r="1.6" fill={color} />
      <path d="M28 28 L24 22" {...s(color)} />
    </IconWrapper>
  );
}

export function GarlicIcon({ color = '#2A1A4E', size = 96 }: IconProps) {
  return (
    <IconWrapper size={size}>
      <path d="M26 56 Q24 36 38 28 Q50 22 62 28 Q76 36 74 56 Q74 80 50 86 Q26 80 26 56 Z" {...s(color)} />
      <path d="M50 24 Q50 56 50 86" {...st(color)} />
      <path d="M38 28 Q36 56 42 86" {...st(color)} />
      <path d="M62 28 Q64 56 58 86" {...st(color)} />
      <path d="M50 24 Q46 14 50 8 Q54 14 50 24" {...s(color)} />
    </IconWrapper>
  );
}

export function GreenBeanIcon({ color = '#2A1A4E', size = 96 }: IconProps) {
  return (
    <IconWrapper size={size}>
      <path d="M24 30 Q20 60 36 84 Q40 88 44 84 Q34 56 36 28 Q32 24 24 30 Z" {...s(color)} />
      <circle cx="30" cy="44" r="2" fill={color} />
      <circle cx="34" cy="58" r="2" fill={color} />
      <circle cx="38" cy="72" r="2" fill={color} />
      <path d="M44 22 Q44 56 56 84 Q60 88 64 84 Q54 56 56 22 Q52 18 44 22 Z" {...s(color)} />
      <circle cx="50" cy="36" r="2" fill={color} />
      <circle cx="52" cy="50" r="2" fill={color} />
      <circle cx="56" cy="64" r="2" fill={color} />
      <circle cx="60" cy="76" r="2" fill={color} />
      <path d="M64 28 Q68 56 76 80 Q80 84 84 80 Q74 56 76 26 Q72 24 64 28 Z" {...s(color)} />
      <circle cx="70" cy="44" r="2" fill={color} />
      <circle cx="74" cy="58" r="2" fill={color} />
      <circle cx="78" cy="70" r="2" fill={color} />
    </IconWrapper>
  );
}

export function JalapenoIcon({ color = '#2A1A4E', size = 96 }: IconProps) {
  return (
    <IconWrapper size={size}>
      <path d="M30 18 L36 26 M34 16 Q40 22 42 30" {...s(color)} />
      <path d="M28 20 Q34 26 40 30 Q44 26 40 22 Q34 16 28 20 Z" {...s(color)} />
      <path d="M40 30 Q70 26 84 50 Q88 70 72 84 Q56 90 50 78 Q56 76 60 70 Q72 66 74 52 Q70 40 40 38 Z" {...s(color)} />
    </IconWrapper>
  );
}

export function OgorkiIcon({ color = '#2A1A4E', size = 96 }: IconProps) {
  return (
    <IconWrapper size={size}>
      <path d="M28 60 Q22 42 34 30 Q50 22 68 32 Q84 46 78 64 Q70 82 52 82 Q34 80 28 60 Z" {...s(color)} />
      <circle cx="38" cy="44" r="1.6" fill={color} />
      <circle cx="50" cy="38" r="1.6" fill={color} />
      <circle cx="60" cy="46" r="1.6" fill={color} />
      <circle cx="46" cy="58" r="1.6" fill={color} />
      <circle cx="58" cy="60" r="1.6" fill={color} />
      <path d="M74 22 Q72 32 76 38" {...s(color)} />
      <path d="M74 22 L68 16 M74 22 L80 16 M74 22 L66 22 M74 22 L82 24 M76 30 L70 28 M76 30 L82 32" {...st(color)} />
    </IconWrapper>
  );
}

export function RadishIcon({ color = '#2A1A4E', size = 96 }: IconProps) {
  return (
    <IconWrapper size={size}>
      <path d="M50 30 Q44 14 32 14 Q34 24 42 30" {...s(color)} />
      <path d="M50 30 Q52 12 60 10 Q62 22 56 30" {...s(color)} />
      <path d="M50 30 Q60 18 72 22 Q68 30 60 32" {...s(color)} />
      <path d="M28 54 Q28 32 50 32 Q72 32 72 54 Q72 74 50 78 Q28 74 28 54 Z" {...s(color)} />
      <path d="M50 78 Q48 86 46 92 M50 78 Q52 86 54 90" {...s(color)} />
    </IconWrapper>
  );
}

export function RedOnionIcon({ color = '#2A1A4E', size = 96 }: IconProps) {
  return (
    <IconWrapper size={size}>
      <path d="M48 18 Q44 8 50 4 Q56 8 52 18" {...s(color)} />
      <path d="M50 18 L50 26" {...s(color)} />
      <path d="M22 52 Q22 28 50 26 Q78 28 78 52 Q78 80 50 88 Q22 80 22 52 Z" {...s(color)} />
      <path d="M34 36 Q30 56 38 82" {...st(color)} />
      <path d="M50 28 Q50 56 50 88" {...st(color)} />
      <path d="M66 36 Q70 56 62 82" {...st(color)} />
      <path d="M44 88 L42 96 M50 90 L50 96 M56 88 L58 96" {...st(color)} />
    </IconWrapper>
  );
}

export function RomanianCauliflowerIcon({ color = '#2A1A4E', size = 96 }: IconProps) {
  return (
    <IconWrapper size={size}>
      <path d="M16 60 Q14 38 30 36 Q34 50 28 64" {...s(color)} />
      <path d="M84 60 Q86 38 70 36 Q66 50 72 64" {...s(color)} />
      <circle cx="36" cy="46" r="10" {...s(color)} />
      <circle cx="50" cy="38" r="11" {...s(color)} />
      <circle cx="64" cy="46" r="10" {...s(color)} />
      <circle cx="42" cy="58" r="10" {...s(color)} />
      <circle cx="58" cy="58" r="10" {...s(color)} />
      <circle cx="50" cy="66" r="9" {...s(color)} />
      <path d="M36 70 Q50 84 64 70" {...s(color)} />
    </IconWrapper>
  );
}

export function CurtidoIcon({ color = '#2A1A4E', size = 96 }: IconProps) {
  return (
    <IconWrapper size={size}>
      <path d="M18 56 Q50 50 82 56 Q80 76 50 84 Q20 76 18 56 Z" {...s(color)} />
      <path d="M18 56 Q50 60 82 56" {...st(color)} />
      <path d="M28 62 L36 70 M34 60 L42 68 M44 62 L52 70 M54 60 L62 68 M64 62 L72 70 M70 64 L78 70" {...st(color)} />
      <path d="M30 70 L38 76 M44 70 L52 76 M58 70 L66 76" {...st(color)} />
      <path d="M50 50 Q48 38 50 26" {...s(color)} />
      <path d="M50 30 Q44 28 42 32 Q46 34 50 32" {...st(color)} />
      <path d="M50 36 Q56 34 58 38 Q54 40 50 38" {...st(color)} />
      <path d="M50 42 Q44 40 42 44 Q46 46 50 44" {...st(color)} />
      <circle cx="38" cy="22" r="1.4" fill={color} />
      <circle cx="64" cy="20" r="1.4" fill={color} />
    </IconWrapper>
  );
}

export function GajarGobhiIcon({ color = '#2A1A4E', size = 96 }: IconProps) {
  return (
    <IconWrapper size={size}>
      <path d="M20 28 Q18 22 22 22 Q26 24 26 26 Q28 38 30 50 Q32 64 28 70 Q22 68 22 60 Q22 46 20 28 Z" {...s(color)} />
      <path d="M22 30 Q20 24 16 22 M24 26 Q22 18 26 16" {...st(color)} />
      <path d="M22 40 L26 40 M24 50 L28 50" {...st(color)} />
      <circle cx="46" cy="46" r="6" {...s(color)} />
      <circle cx="54" cy="42" r="6" {...s(color)} />
      <circle cx="58" cy="50" r="6" {...s(color)} />
      <circle cx="50" cy="54" r="6" {...s(color)} />
      <path d="M48 58 Q54 64 60 58" {...s(color)} />
      <path d="M52 36 Q50 32 54 30 M50 34 Q48 30 46 30" {...st(color)} />
      <path d="M76 50 Q70 50 70 58 Q70 70 80 74 Q90 70 88 58 Q88 50 82 50 Q80 52 76 50 Z" {...s(color)} />
      <path d="M80 50 Q78 44 76 40 Q74 44 78 50 M82 50 Q86 44 90 42" {...st(color)} />
      <path d="M76 60 Q80 62 84 60" {...st(color)} />
      <circle cx="38" cy="80" r="1.5" fill={color} />
      <circle cx="62" cy="82" r="1.5" fill={color} />
      <circle cx="50" cy="86" r="1.2" fill={color} />
    </IconWrapper>
  );
}

export function KimchiIcon({ color = '#2A1A4E', size = 96 }: IconProps) {
  return (
    <IconWrapper size={size}>
      <path d="M28 86 Q22 70 24 50 Q26 32 32 22 Q40 14 50 14 Q60 14 68 22 Q74 32 76 50 Q78 70 72 86 Q60 90 50 90 Q40 90 28 86 Z" {...s(color)} />
      <path d="M32 22 Q34 16 38 18 Q42 14 46 16 Q50 12 54 16 Q58 14 62 18 Q66 16 68 22" {...s(color)} />
      <path d="M50 14 L50 90" {...st(color)} />
      <path d="M40 18 Q38 50 40 86" {...st(color)} />
      <path d="M60 18 Q62 50 60 86" {...st(color)} />
      <path d="M32 26 Q30 50 30 80" {...st(color)} />
      <path d="M68 26 Q70 50 70 80" {...st(color)} />
      <circle cx="40" cy="42" r="1.6" fill={color} />
      <circle cx="56" cy="48" r="1.6" fill={color} />
      <circle cx="46" cy="62" r="1.6" fill={color} />
      <circle cx="60" cy="68" r="1.6" fill={color} />
      <circle cx="36" cy="72" r="1.4" fill={color} />
    </IconWrapper>
  );
}

export function PaoCaiIcon({ color = '#2A1A4E', size = 96 }: IconProps) {
  return (
    <IconWrapper size={size}>
      <path d="M40 14 Q40 10 50 10 Q60 10 60 14 L60 18 Q60 20 50 20 Q40 20 40 18 Z" {...s(color)} />
      <path d="M32 22 Q32 18 50 18 Q68 18 68 22 Q68 26 50 26 Q32 26 32 22 Z" {...s(color)} />
      <path d="M34 28 Q22 30 18 50 Q14 78 30 88 Q50 92 70 88 Q86 78 82 50 Q78 30 66 28 Z" {...s(color)} />
      <path d="M34 28 Q34 26 38 26 L62 26 Q66 26 66 28" {...s(color)} />
      <path d="M24 48 Q22 64 28 80" {...st(color)} />
      <path d="M20 56 Q50 60 80 56" {...st(color)} />
      <circle cx="42" cy="12" r="1.6" {...s(color)} />
      <circle cx="58" cy="8" r="1.4" {...s(color)} />
    </IconWrapper>
  );
}

export function SauerkrautIcon({ color = '#2A1A4E', size = 96 }: IconProps) {
  return (
    <IconWrapper size={size}>
      <path d="M22 30 L22 78 Q22 86 30 88 L70 88 Q78 86 78 78 L78 30 Z" {...s(color)} />
      <path d="M18 28 Q18 24 22 24 L78 24 Q82 24 82 28 Q82 32 78 32 L22 32 Q18 32 18 28 Z" {...s(color)} />
      <path d="M18 36 Q12 38 12 44 Q12 50 18 50" {...s(color)} />
      <path d="M82 36 Q88 38 88 44 Q88 50 82 50" {...s(color)} />
      <path d="M30 26 Q32 18 36 22 Q40 16 44 22 Q48 18 52 24" {...st(color)} />
      <path d="M52 24 Q56 16 60 22 Q64 18 70 22" {...st(color)} />
      <ellipse cx="50" cy="40" rx="14" ry="3.5" {...s(color)} />
      <path d="M28 52 L36 56 M40 50 L48 54 M54 52 L62 56 M30 64 L38 68 M44 62 L52 66 M58 64 L66 68" {...st(color)} />
    </IconWrapper>
  );
}

export function ShibazukeIcon({ color = '#2A1A4E', size = 96 }: IconProps) {
  return (
    <IconWrapper size={size}>
      <path d="M22 48 Q18 38 28 32 Q40 28 46 40 Q50 56 40 68 Q26 72 22 60 Q20 54 22 48 Z" {...s(color)} />
      <path d="M30 32 Q28 26 32 22 Q36 24 36 30 Q40 26 42 30 Q42 34 38 34" {...s(color)} />
      <path d="M30 46 Q28 56 32 64" {...st(color)} />
      <circle cx="64" cy="32" r="9" {...s(color)} />
      <circle cx="64" cy="32" r="5" {...st(color)} />
      <circle cx="64" cy="32" r="1.6" fill={color} />
      <circle cx="80" cy="46" r="8" {...s(color)} />
      <circle cx="80" cy="46" r="4.5" {...st(color)} />
      <circle cx="80" cy="46" r="1.4" fill={color} />
      <path d="M58 64 Q62 56 72 56 Q86 60 82 76 Q72 86 60 82 Q56 76 58 64 Z" {...s(color)} />
      <path d="M62 64 Q60 66 58 64 M66 60 Q64 62 62 60 M74 58 Q72 60 70 58 M82 64 Q80 66 78 64 M82 72 Q80 74 78 72 M76 80 Q74 82 72 80" {...st(color)} />
      <path d="M62 76 Q70 70 80 64" {...st(color)} />
    </IconWrapper>
  );
}

export function TakuanIcon({ color = '#2A1A4E', size = 96 }: IconProps) {
  return (
    <IconWrapper size={size}>
      <path d="M30 22 Q22 12 16 16 Q20 24 28 28" {...s(color)} />
      <path d="M32 22 Q30 12 34 8 Q40 12 38 22" {...s(color)} />
      <path d="M40 22 Q48 14 56 18 Q50 24 42 28" {...s(color)} />
      <path d="M22 18 L28 26 M34 14 L34 24 M50 18 L44 26" {...st(color)} />
      <path d="M26 32 Q26 28 32 28 Q42 28 44 32 Q48 50 50 68 Q50 82 46 88 Q40 90 36 86 Q32 72 28 56 Q26 42 26 32 Z" {...s(color)} />
      <path d="M30 40 L40 40 M32 52 L42 52 M34 64 L44 64" {...st(color)} />
      <ellipse cx="74" cy="74" rx="14" ry="6" {...s(color)} />
      <ellipse cx="74" cy="72" rx="14" ry="6" {...s(color)} />
      <ellipse cx="74" cy="72" rx="10" ry="4" {...st(color)} />
      <circle cx="74" cy="72" r="1.4" fill={color} />
    </IconWrapper>
  );
}

export function TorshiIcon({ color = '#2A1A4E', size = 96 }: IconProps) {
  return (
    <IconWrapper size={size}>
      <path d="M42 12 L58 12 L60 20 L40 20 Z" {...s(color)} />
      <path d="M40 20 L40 28 Q40 30 42 30 L58 30 Q60 30 60 28 L60 20" {...s(color)} />
      <path d="M40 30 Q22 32 18 56 Q16 80 30 88 Q50 92 70 88 Q84 80 82 56 Q78 32 60 30 Z" {...s(color)} />
      <path d="M22 42 Q14 46 16 56 Q18 64 24 64" {...s(color)} />
      <path d="M78 42 Q86 46 84 56 Q82 64 76 64" {...s(color)} />
      <circle cx="38" cy="58" r="4" {...st(color)} />
      <circle cx="50" cy="54" r="4.5" {...st(color)} />
      <circle cx="62" cy="60" r="4" {...st(color)} />
      <path d="M34 70 Q40 72 46 70" {...st(color)} />
      <path d="M52 72 Q58 74 64 72" {...st(color)} />
      <circle cx="44" cy="74" r="1.4" fill={color} />
      <circle cx="56" cy="78" r="1.4" fill={color} />
      <path d="M24 38 Q50 42 76 38" {...st(color)} />
    </IconWrapper>
  );
}

const ICON_MAP: Record<string, FC<IconProps>> = {
  // Custom ingredients
  asparagus:     AsparagusIcon,
  beet:          BeetIcon,
  bellPepper:    BellPepperIcon,
  cabbage:       CabbageIcon,
  carrot:        CarrotIcon,
  cauliflower:   CauliflowerIcon,
  cucumber:      CucumberIcon,
  garlic:        GarlicIcon,
  greenBean:     GreenBeanIcon,
  jalapeno:      JalapenoIcon,
  radish:        RadishIcon,
  redOnion:      RedOnionIcon,
  // Classic recipes (READY_MADE ids)
  curtido:                   CurtidoIcon,
  'gajar-gobhi-shalgam':     GajarGobhiIcon,
  kimchi:                    KimchiIcon,
  'ogorki-kiszone':          OgorkiIcon,
  'pao-cai':                 PaoCaiIcon,
  'romanian-pink-cauliflower': RomanianCauliflowerIcon,
  sauerkraut:                SauerkrautIcon,
  shibazuke:                 ShibazukeIcon,
  takuan:                    TakuanIcon,
  torshi:                    TorshiIcon,
  // camelCase aliases kept for backward compatibility
  ogorki:        OgorkiIcon,
  romanianCauli: RomanianCauliflowerIcon,
};

export function IngredientIcon({ name, color, size }: { name: string } & IconProps) {
  const Icon = ICON_MAP[name];
  if (!Icon) return null;
  return <Icon color={color} size={size} />;
}
