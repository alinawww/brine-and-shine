// Timeline step illustrations

import type { ReactElement } from 'react';

const C    = '#2A1A4E';
const P    = '#FDF4E3';
const LIME = '#D4E842';
const SAGE = '#A8D8A8';
const TANG = '#F4845A';
const BLUSH = '#E8A2C8';
const LAV  = '#C4A8E8';

const TS = { fill: 'none', stroke: C, strokeWidth: 2.4, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
const TSthin = { ...TS, strokeWidth: 1.6 };

function PickProduce() {
  return (
    <g>
      <path d="M16 52 Q14 50 18 50 L82 50 Q86 50 84 52 L76 86 Q74 90 70 90 L30 90 Q26 90 24 86 Z" {...TS} fill={LIME} />
      <path d="M24 60 L76 60 M26 70 L74 70 M28 80 L72 80" {...TSthin} />
      <path d="M36 52 L34 88 M52 52 L52 90 M68 52 L70 88" {...TSthin} />
      <path d="M28 50 Q30 36 50 36 Q70 36 72 50" {...TS} />
      <path d="M44 24 Q42 18 46 16 Q50 18 48 26" {...TS} fill={SAGE} />
      <path d="M48 22 Q50 12 56 10 Q56 22 52 26" {...TS} fill={SAGE} />
      <path d="M40 50 Q42 36 50 30 Q58 36 54 50 Z" {...TS} fill={TANG} />
      <path d="M64 48 Q70 30 82 28 Q88 36 82 46" {...TS} fill={SAGE} />
      <circle cx="74" cy="36" r="1.4" fill={C} />
      <circle cx="78" cy="40" r="1.4" fill={C} />
    </g>
  );
}

function ChooseBrine() {
  return (
    <g>
      <rect x="22" y="14" width="56" height="12" rx="3" {...TS} fill={LIME} />
      <path d="M28 18 L40 18" {...TSthin} />
      <path d="M20 28 Q20 26 22 26 L78 26 Q80 26 80 28 L80 86 Q80 90 76 90 L24 90 Q20 90 20 86 Z" {...TS} fill={P} />
      <path d="M22 52 Q35 48 50 52 Q65 56 78 52 L78 86 Q78 88 76 88 L24 88 Q22 88 22 86 Z" {...TS} fill={LAV} opacity={0.6} />
      <path d="M22 52 Q35 48 50 52 Q65 56 78 52" {...TS} />
      <circle cx="32" cy="64" r="3" {...TSthin} fill={P} />
      <circle cx="44" cy="76" r="2.4" {...TSthin} fill={P} />
      <circle cx="60" cy="68" r="2.6" {...TSthin} fill={P} />
      <circle cx="68" cy="80" r="2" {...TSthin} fill={P} />
      <g fill={C}>
        <circle cx="36" cy="8" r="1.2" />
        <circle cx="50" cy="6" r="1.2" />
        <circle cx="64" cy="9" r="1.2" />
        <circle cx="42" cy="11" r="1" />
        <circle cx="58" cy="11" r="1" />
      </g>
    </g>
  );
}

function PickAromatics() {
  return (
    <g>
      <path d="M22 20 Q26 38 30 56" {...TS} />
      <path d="M22 22 L14 18 M22 22 L30 16 M24 30 L16 28 M24 30 L32 26 M26 40 L18 40 M26 40 L34 38 M28 50 L20 52 M28 50 L36 48" fill="none" stroke={SAGE} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M40 58 Q38 50 46 48 Q54 46 58 52 Q60 60 56 70 Q50 78 44 74 Q38 68 40 58 Z" {...TS} fill={P} />
      <path d="M49 48 Q49 62 50 76" {...TSthin} />
      <path d="M44 50 Q42 64 46 76" {...TSthin} />
      <path d="M56 52 Q58 64 54 76" {...TSthin} />
      <path d="M48 48 Q46 42 50 38 Q52 42 50 48" {...TS} fill={SAGE} />
      <circle cx="74" cy="40" r="4" {...TS} fill={C} />
      <circle cx="82" cy="48" r="3.6" {...TS} fill={C} />
      <circle cx="72" cy="54" r="3.4" {...TS} fill={C} />
      <circle cx="80" cy="62" r="3.8" {...TS} fill={C} />
      <circle cx="86" cy="38" r="2.8" {...TS} fill={C} />
      <path d="M76 38 L77 39 M82 60 L83 61" fill="none" stroke={P} strokeWidth={1.6} strokeLinecap="round" />
    </g>
  );
}

function Wait() {
  return (
    <g>
      <path d="M22 16 L78 16" {...TS} />
      <path d="M22 88 L78 88" {...TS} />
      <path d="M28 16 Q30 36 50 50 Q70 64 72 88" {...TS} fill={P} />
      <path d="M72 16 Q70 36 50 50 Q30 64 28 88" {...TS} fill={P} />
      <path d="M30 18 L70 18 L52 46 Q50 48 48 46 Z" fill={LIME} stroke={C} strokeWidth={1.4} />
      <path d="M32 86 Q40 72 50 70 Q60 72 68 86 Z" fill={LIME} stroke={C} strokeWidth={1.4} />
      <circle cx="50" cy="54" r="1.2" fill={C} />
      <circle cx="50" cy="60" r="1" fill={C} />
      <circle cx="50" cy="66" r="0.9" fill={C} />
      <path d="M14 30 L18 30 M16 28 L16 32" fill="none" stroke={TANG} strokeWidth={2.2} strokeLinecap="round" />
      <path d="M82 60 L86 60 M84 58 L84 62" fill="none" stroke={TANG} strokeWidth={2.2} strokeLinecap="round" />
      <path d="M82 24 L84 24 M83 23 L83 25" fill="none" stroke={BLUSH} strokeWidth={2} strokeLinecap="round" />
    </g>
  );
}

function EatEnjoy() {
  return (
    <g>
      <ellipse cx="50" cy="78" rx="36" ry="6" {...TS} fill={P} />
      <ellipse cx="50" cy="76" rx="36" ry="6" {...TS} fill={P} />
      <ellipse cx="50" cy="74" rx="28" ry="4" {...TSthin} />
      <path d="M64 18 L66 38 M70 18 L70 38 M76 18 L74 38" {...TS} />
      <path d="M62 38 Q70 44 78 38 L76 50 Q70 54 64 50 Z" {...TS} fill={LIME} />
      <path d="M70 54 L70 72" {...TS} />
      <path d="M26 52 Q22 40 36 36 Q52 34 58 46 Q60 60 50 62 Q34 62 26 52 Z" {...TS} fill={SAGE} />
      <circle cx="36" cy="46" r="1.3" fill={C} />
      <circle cx="46" cy="44" r="1.3" fill={C} />
      <circle cx="42" cy="54" r="1.3" fill={C} />
      <circle cx="52" cy="54" r="1.3" fill={C} />
      <circle cx="34" cy="48" r="0.9" fill={C} />
      <circle cx="50" cy="48" r="0.9" fill={C} />
      <path d="M38 54 Q42 58 46 54" {...TSthin} />
    </g>
  );
}

const ILLUS: Record<string, () => ReactElement> = {
  pickProduce:   PickProduce,
  chooseBrine:   ChooseBrine,
  pickAromatics: PickAromatics,
  wait:          Wait,
  eatEnjoy:      EatEnjoy,
};

export function StepIllustration({ id }: { id: string }) {
  const Illus = ILLUS[id];
  if (!Illus) return null;
  return (
    <svg viewBox="0 0 100 100" width="76" height="76" aria-hidden="true" style={{ overflow: 'visible' }}>
      <Illus />
    </svg>
  );
}
