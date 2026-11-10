import JSZip from 'jszip';
import { StickerStyleConfig, AromaItem, SizeItem } from '../types/sticker';
import { GOLD_FINISHES, COLOR_THEMES } from '../data/initialData';

// Map font keys to actual CSS font-family strings
export function getFontFamilyString(fontKey: string): string {
  switch (fontKey) {
    case 'graffiti-sedgwick':
      return "'Sedgwick Ave', cursive";
    case 'graffiti-marker':
      return "'Permanent Marker', cursive";
    case 'graffiti-rock':
      return "'Rock Salt', cursive";
    case 'aesthetic-kaushan':
      return "'Kaushan Script', cursive";
    case 'aesthetic-caveat':
      return "'Caveat', cursive";
    case 'luxury-playfair':
      return "'Playfair Display', serif";
    case 'luxury-cinzel':
      return "'Cinzel', serif";
    case 'luxury-bodoni':
    default:
      return "'Bodoni Moda', 'Playfair Display', serif";
    case 'sans-clean':
      return "'Montserrat', sans-serif";
  }
}

/**
 * Generate a standalone, ultra-sharp vector SVG string for the sticker
 */
export function generateStickerSvgString(
  aromaName: string,
  sizeValue: string,
  config: StickerStyleConfig,
  width = 600,
  height = 900
): string {
  const theme = COLOR_THEMES[config.theme] || COLOR_THEMES['onyx-black'];
  const gold = GOLD_FINISHES[config.goldFinish] || GOLD_FINISHES['royal-gold'];

  // Border calculations
  const outerBorderWidth = 14;
  const innerInset = 28;
  const innerBorderWidth = 3;

  // Font families
  const brandFontFamily = getFontFamilyString(config.brandFont);
  const aromaFontFamily = getFontFamilyString(config.aromaFont);
  const sansFontFamily = "'Montserrat', sans-serif";

  // Vertical positions
  const brandY = height * 0.19;
  const aromaY = height * 0.51;
  const mlY = height * 0.72;
  const subtextY = height * 0.81;
  const dividerY = height * 0.84;

  // Gold gradient stops
  let stopColors = ['#fceda2', '#d8a73f', '#fae092', '#a37218'];
  if (config.goldFinish === 'pure-silver') {
    stopColors = ['#ffffff', '#c4cbd4', '#e2e8f0', '#8792a2'];
  } else if (config.goldFinish === 'rose-gold') {
    stopColors = ['#fedbd0', '#e89885', '#fedbd0', '#af5a49'];
  } else if (config.goldFinish === 'antique-gold') {
    stopColors = ['#edd07d', '#b8860b', '#dfb051', '#7d5705'];
  } else if (config.goldFinish === 'champagne-gold') {
    stopColors = ['#fcf4d9', '#e2c275', '#fcf4d9', '#b8974a'];
  }

  const isAromaItalic = config.aromaFont === 'luxury-playfair';

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <defs>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${stopColors[0]}" />
      <stop offset="40%" stop-color="${stopColors[1]}" />
      <stop offset="70%" stop-color="${stopColors[2]}" />
      <stop offset="100%" stop-color="${stopColors[3]}" />
    </linearGradient>
    <radialGradient id="cardGlow" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stop-color="#1c1c1f" stop-opacity="0.4" />
      <stop offset="100%" stop-color="${theme.bg}" stop-opacity="1" />
    </radialGradient>
    <filter id="goldShine" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="1" stdDeviation="1.5" flood-color="#000000" flood-opacity="0.6"/>
    </filter>
  </defs>

  <!-- Background Base -->
  <rect width="${width}" height="${height}" fill="${theme.bg}" />
  <rect width="${width}" height="${height}" fill="url(#cardGlow)" />

  <!-- Outer Gold Frame -->
  <rect 
    x="${outerBorderWidth / 2}" 
    y="${outerBorderWidth / 2}" 
    width="${width - outerBorderWidth}" 
    height="${height - outerBorderWidth}" 
    fill="none" 
    stroke="url(#goldGrad)" 
    stroke-width="${outerBorderWidth}" 
  />

  <!-- Inner Thin Gold Frame -->
  <rect 
    x="${innerInset}" 
    y="${innerInset}" 
    width="${width - innerInset * 2}" 
    height="${height - innerInset * 2}" 
    fill="none" 
    stroke="url(#goldGrad)" 
    stroke-width="${innerBorderWidth}" 
  />

  <!-- Brand Name (LifeStruggel - Enlarged) -->
  <text 
    x="${width / 2}" 
    y="${brandY}" 
    text-anchor="middle" 
    dominant-baseline="central"
    fill="${theme.textMain}" 
    font-family="${brandFontFamily}" 
    font-size="${config.brandFontSize * 1.5}px" 
    font-weight="bold" 
    letter-spacing="${config.brandTracking * 30}px"
  >
    ${config.brandName}
  </text>

  <!-- Aroma Name (Graffiti / Estetik - Smaller than brand, spaced) -->
  <text 
    x="${width / 2}" 
    y="${aromaY}" 
    text-anchor="middle" 
    dominant-baseline="central"
    fill="${theme.textMain}" 
    font-family="${aromaFontFamily}" 
    font-size="${config.aromaFontSize * 1.65}px" 
    font-style="${isAromaItalic ? 'italic' : 'normal'}"
    letter-spacing="${config.aromaTracking * 25}px"
    filter="url(#goldShine)"
  >
    ${aromaName}
  </text>

  <!-- ML Takaran -->
  <text 
    x="${width / 2}" 
    y="${mlY}" 
    text-anchor="middle" 
    dominant-baseline="central"
    fill="${theme.textMain}" 
    font-family="${sansFontFamily}" 
    font-size="${config.mlFontSize * 1.4}px" 
    font-weight="700" 
    letter-spacing="${config.mlTracking * 35}px"
  >
    ${sizeValue}
  </text>

  <!-- Subtext (EAU DE PARFUM) -->
  <text 
    x="${width / 2}" 
    y="${subtextY}" 
    text-anchor="middle" 
    dominant-baseline="central"
    fill="${theme.textMain}" 
    font-family="${sansFontFamily}" 
    font-size="13px" 
    font-weight="600" 
    letter-spacing="${config.subtextTracking * 30}px"
    opacity="0.95"
  >
    ${config.subtext}
  </text>

  <!-- Gold Accent Line Underneath Subtext -->
  ${config.showDivider ? `
  <line 
    x1="${width / 2 - 70}" 
    y1="${dividerY}" 
    x2="${width / 2 + 70}" 
    y2="${dividerY}" 
    stroke="url(#goldGrad)" 
    stroke-width="2.5" 
    stroke-linecap="round"
  />` : ''}
</svg>`;
}

/**
 * Render SVG to HTML Canvas at 300 DPI for ultra sharp PNG export
 */
export async function svgToCanvas(
  svgString: string,
  width = 1200,
  height = 1800
): Promise<HTMLCanvasElement> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      reject(new Error('Canvas context could not be created'));
      return;
    }

    const img = new Image();
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      ctx.drawImage(img, 0, 0, width, height);
      URL.revokeObjectURL(url);
      resolve(canvas);
    };

    img.onerror = (err) => {
      URL.revokeObjectURL(url);
      reject(err);
    };

    img.src = url;
  });
}

/**
 * Download a single sticker as high-res PNG (300 DPI)
 */
export async function downloadStickerPng(
  aromaName: string,
  sizeValue: string,
  config: StickerStyleConfig
) {
  const svg = generateStickerSvgString(aromaName, sizeValue, config, 600, 900);
  const canvas = await svgToCanvas(svg, 1200, 1800);
  
  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob((b) => resolve(b), 'image/png', 1.0)
  );

  if (!blob) return;

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const safeAroma = aromaName.replace(/[\s\W]+/g, '_');
  const safeSize = sizeValue.replace(/[\s\W]+/g, '');
  a.href = url;
  a.download = `${config.brandName}_${safeAroma}_${safeSize}.png`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Download single sticker as clean SVG
 */
export function downloadStickerSvg(
  aromaName: string,
  sizeValue: string,
  config: StickerStyleConfig
) {
  const svg = generateStickerSvgString(aromaName, sizeValue, config, 600, 900);
  const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const safeAroma = aromaName.replace(/[\s\W]+/g, '_');
  const safeSize = sizeValue.replace(/[\s\W]+/g, '');
  a.href = url;
  a.download = `${config.brandName}_${safeAroma}_${safeSize}.svg`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Download all 80 stickers in a ZIP file with real progress tracking
 */
export async function downloadAllStickersZip(
  aromas: AromaItem[],
  sizes: SizeItem[],
  config: StickerStyleConfig,
  onProgress?: (current: number, total: number, message: string) => void
) {
  const zip = new JSZip();
  const folder = zip.folder(`${config.brandName}_Stickers_80_Desain`);
  
  const total = aromas.length * sizes.length;
  let count = 0;

  for (const aroma of aromas) {
    // Create subfolder per aroma for tidy organization
    const safeAroma = aroma.name.replace(/[\s\W]+/g, '_');
    const aromaFolder = folder?.folder(`${aroma.number.toString().padStart(2, '0')}_${safeAroma}`);

    for (const size of sizes) {
      count++;
      if (onProgress) {
        onProgress(count, total, `Membuat stiker: ${aroma.name} - ${size.value} (${count}/${total})...`);
      }

      const svgString = generateStickerSvgString(aroma.name, size.value, config, 600, 900);
      const canvas = await svgToCanvas(svgString, 1000, 1500);

      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob((b) => resolve(b), 'image/png', 0.95)
      );

      if (blob && aromaFolder) {
        const safeSize = size.value.replace(/[\s\W]+/g, '');
        aromaFolder.file(`${config.brandName}_${safeAroma}_${safeSize}.png`, blob);
      }
    }
  }

  if (onProgress) {
    onProgress(total, total, 'Mengompresi file ZIP (80 stiker)...');
  }

  const content = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(content);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${config.brandName}_Koleksi_80_Stiker_Parfum.zip`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
