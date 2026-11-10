export interface AromaItem {
  id: string;
  number: number;
  name: string;
  character?: string;
}

export interface SizeItem {
  id: string;
  value: string; // e.g. "3 ML"
  numericValue: number;
  bottleType: 'vial' | 'roller' | 'spray-compact' | 'flacon';
}

export interface StickerItemData {
  id: string;
  aromaId: string;
  aromaName: string;
  aromaNumber: number;
  sizeId: string;
  sizeValue: string;
  brandName: string;
  subtext: string;
}

export type AromaFontKey = 
  | 'graffiti-sedgwick' 
  | 'graffiti-marker' 
  | 'graffiti-rock' 
  | 'aesthetic-kaushan' 
  | 'aesthetic-caveat' 
  | 'luxury-playfair'
  | 'luxury-cinzel'
  | 'luxury-bodoni';

export type BrandFontKey = 
  | 'luxury-bodoni' 
  | 'luxury-cinzel' 
  | 'luxury-playfair' 
  | 'sans-clean' 
  | 'graffiti-marker';

export interface StickerStyleConfig {
  brandName: string;
  brandFont: BrandFontKey;
  brandFontSize: number; // in relative units / px scale (e.g., 28)
  brandTracking: number; // letter spacing in em or px
  
  aromaFont: AromaFontKey;
  aromaFontSize: number; // relative (e.g., 22)
  aromaTracking: number; // letter spacing
  
  subtext: string; // "EAU DE PARFUM"
  subtextTracking: number;
  
  mlFontSize: number;
  mlTracking: number;
  
  verticalSpacing: 'compact' | 'balanced' | 'spacious';
  goldFinish: 'royal-gold' | 'champagne-gold' | 'antique-gold' | 'rose-gold' | 'pure-silver';
  theme: 'onyx-black' | 'deep-navy' | 'emerald-luxury' | 'matte-charcoal' | 'luxury-white';
  borderStyle: 'double-luxury' | 'single-bold' | 'beveled-frame' | 'minimal-fine';
  showDivider: boolean;
  aspectRatio: '2:3' | '3:4' | '1:2';
}
