import { AromaItem, SizeItem, StickerStyleConfig } from '../types/sticker';

export const INITIAL_AROMAS: AromaItem[] = [
  { id: 'aroma-1', number: 1, name: 'Ciel Doré', character: 'Amber, Bergamot & Golden Vanilla' },
  { id: 'aroma-2', number: 2, name: 'Or Prestige', character: 'Rare Oud, Royal Rose & Saffron' },
  { id: 'aroma-3', number: 3, name: 'Jardin Noble', character: 'White Florals, Jasmine & Iris' },
  { id: 'aroma-4', number: 4, name: 'Brise Noble', character: 'Oceanic Salt, Mint & Cedarwood' },
  { id: 'aroma-5', number: 5, name: 'Rêve Bleu', character: 'Blue Iris, Lavender & Tonka Bean' },
  { id: 'aroma-6', number: 6, name: 'Soir Prestige', character: 'Smoked Vanilla, Patchouli & Leather' },
  { id: 'aroma-7', number: 7, name: 'Vague Royale', character: 'Fresh Aquatic, Citrus & Driftwood' },
  { id: 'aroma-8', number: 8, name: 'Héritage', character: 'French Oakmoss, Vetiver & Tobacco' },
  { id: 'aroma-9', number: 9, name: 'Lueur Céleste', character: 'Sparkling Aldehydes & Musk' },
  { id: 'aroma-10', number: 10, name: 'Pure Éclat', character: 'Crisp Pear, Peony & White Woods' },
];

export const INITIAL_SIZES: SizeItem[] = [
  { id: 'size-3ml', value: '3 ML', numericValue: 3, bottleType: 'vial' },
  { id: 'size-8ml', value: '8 ML', numericValue: 8, bottleType: 'roller' },
  { id: 'size-10ml', value: '10 ML', numericValue: 10, bottleType: 'roller' },
  { id: 'size-15ml', value: '15 ML', numericValue: 15, bottleType: 'spray-compact' },
  { id: 'size-20ml', value: '20 ML', numericValue: 20, bottleType: 'spray-compact' },
  { id: 'size-30ml', value: '30 ML', numericValue: 30, bottleType: 'flacon' },
  { id: 'size-50ml', value: '50 ML', numericValue: 50, bottleType: 'flacon' },
  { id: 'size-100ml', value: '100 ML', numericValue: 100, bottleType: 'flacon' },
];

export const DEFAULT_STYLE_CONFIG: StickerStyleConfig = {
  brandName: 'LifeStruggel',
  brandFont: 'luxury-bodoni',
  brandFontSize: 28, // Perbesar nama toko
  brandTracking: 0.08, // tracking rapih
  
  aromaFont: 'graffiti-sedgwick', // Font Estetik Grafiti sesuai permintaan user
  aromaFontSize: 20, // Nama aroma diperkecil sesuai permintaan
  aromaTracking: 0.04, // Jarak diperdengarkan / renggang rapih
  
  subtext: 'EAU DE PARFUM',
  subtextTracking: 0.32,
  
  mlFontSize: 15,
  mlTracking: 0.22,
  
  verticalSpacing: 'balanced',
  goldFinish: 'royal-gold',
  theme: 'onyx-black',
  borderStyle: 'double-luxury',
  showDivider: true,
  aspectRatio: '2:3',
};

export const FONT_OPTIONS = {
  aroma: [
    { key: 'graffiti-sedgwick', name: 'Sedgwick Graffiti', category: 'Grafiti Estetik', cssClass: 'font-graffiti-sedgwick' },
    { key: 'graffiti-marker', name: 'Permanent Marker', category: 'Grafiti Estetik', cssClass: 'font-graffiti-marker' },
    { key: 'graffiti-rock', name: 'Rock Salt Street', category: 'Grafiti Estetik', cssClass: 'font-graffiti-rock' },
    { key: 'aesthetic-kaushan', name: 'Kaushan Brush Script', category: 'Brush Estetik', cssClass: 'font-aesthetic-script' },
    { key: 'aesthetic-caveat', name: 'Caveat Handletter', category: 'Handmade Estetik', cssClass: 'font-aesthetic-caveat' },
    { key: 'luxury-playfair', name: 'Playfair Display Italic', category: 'Klasik Parfum (Foto Asli)', cssClass: 'font-serif-playfair italic' },
    { key: 'luxury-cinzel', name: 'Cinzel Serif Royal', category: 'Klasik Mewah', cssClass: 'font-serif-cinzel' },
    { key: 'luxury-bodoni', name: 'Bodoni Moda Luxury', category: 'Klasik Mewah', cssClass: 'font-serif-luxury' },
  ],
  brand: [
    { key: 'luxury-bodoni', name: 'Bodoni Moda (Elegan Mewah)', cssClass: 'font-serif-luxury font-bold' },
    { key: 'luxury-cinzel', name: 'Cinzel Serif (Royal Brand)', cssClass: 'font-serif-cinzel font-bold' },
    { key: 'luxury-playfair', name: 'Playfair Display (Klasik)', cssClass: 'font-serif-playfair font-bold' },
    { key: 'sans-clean', name: 'Montserrat Bold (Modern Clean)', cssClass: 'font-sans-clean font-extrabold' },
    { key: 'graffiti-marker', name: 'Permanent Marker (Streetwear)', cssClass: 'font-graffiti-marker' },
  ]
};

export const COLOR_THEMES = {
  'onyx-black': {
    name: 'Onyx Black (Asli Foto)',
    bg: '#0a0a0a',
    cardBg: 'bg-black',
    borderOuter: '#dfb051',
    textMain: '#ffffff',
  },
  'matte-charcoal': {
    name: 'Matte Charcoal Grey',
    bg: '#141417',
    cardBg: 'bg-zinc-900',
    borderOuter: '#e2ba64',
    textMain: '#f8fafc',
  },
  'deep-navy': {
    name: 'Midnight Royal Navy',
    bg: '#060d1a',
    cardBg: 'bg-[#060d1a]',
    borderOuter: '#dfb051',
    textMain: '#ffffff',
  },
  'emerald-luxury': {
    name: 'Imperial Emerald',
    bg: '#041710',
    cardBg: 'bg-[#041710]',
    borderOuter: '#e5c06a',
    textMain: '#ffffff',
  },
  'luxury-white': {
    name: 'Ivory White & Gold',
    bg: '#fcfcfb',
    cardBg: 'bg-[#faf8f5]',
    borderOuter: '#c6922b',
    textMain: '#171717',
  },
};

export const GOLD_FINISHES = {
  'royal-gold': {
    name: 'Royal Mirror Gold',
    gradient: 'linear-gradient(135deg, #fceda2 0%, #d8a73f 40%, #fae092 65%, #a37218 100%)',
    foilColor: '#dfb051',
    accentLine: '#d8a73f',
  },
  'champagne-gold': {
    name: 'Champagne Warm Gold',
    gradient: 'linear-gradient(135deg, #fcf4d9 0%, #e2c275 50%, #b8974a 100%)',
    foilColor: '#e2c275',
    accentLine: '#cbb06a',
  },
  'antique-gold': {
    name: 'Antique Baroque Gold',
    gradient: 'linear-gradient(135deg, #edd07d 0%, #b8860b 60%, #7d5705 100%)',
    foilColor: '#b8860b',
    accentLine: '#a3770e',
  },
  'rose-gold': {
    name: 'Rose Gold Metallic',
    gradient: 'linear-gradient(135deg, #fedbd0 0%, #e89885 50%, #af5a49 100%)',
    foilColor: '#e89885',
    accentLine: '#d37d68',
  },
  'pure-silver': {
    name: 'Platinum Silver Foil',
    gradient: 'linear-gradient(135deg, #ffffff 0%, #c4cbd4 40%, #e2e8f0 70%, #8792a2 100%)',
    foilColor: '#c4cbd4',
    accentLine: '#a0aec0',
  },
};
