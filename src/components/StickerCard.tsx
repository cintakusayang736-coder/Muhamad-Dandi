import React, { useState } from 'react';
import { Download, Eye, Sparkles, Image as ImageIcon } from 'lucide-react';
import { StickerStyleConfig } from '../types/sticker';
import { COLOR_THEMES, GOLD_FINISHES } from '../data/initialData';
import { downloadStickerPng, downloadStickerSvg } from '../utils/exportUtils';

interface StickerCardProps {
  aromaName: string;
  aromaNumber: number;
  sizeValue: string;
  config: StickerStyleConfig;
  onPreviewBottle?: (aromaName: string, sizeValue: string) => void;
  onInspect?: (aromaName: string, sizeValue: string) => void;
}

export const StickerCard: React.FC<StickerCardProps> = ({
  aromaName,
  aromaNumber,
  sizeValue,
  config,
  onPreviewBottle,
  onInspect,
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const theme = COLOR_THEMES[config.theme] || COLOR_THEMES['onyx-black'];
  const gold = GOLD_FINISHES[config.goldFinish] || GOLD_FINISHES['royal-gold'];

  // Font CSS classes based on choice
  const getAromaFontClass = () => {
    switch (config.aromaFont) {
      case 'graffiti-sedgwick':
        return 'font-graffiti-sedgwick';
      case 'graffiti-marker':
        return 'font-graffiti-marker';
      case 'graffiti-rock':
        return 'font-graffiti-rock';
      case 'aesthetic-kaushan':
        return 'font-aesthetic-script';
      case 'aesthetic-caveat':
        return 'font-aesthetic-caveat font-bold';
      case 'luxury-playfair':
        return 'font-serif-playfair italic';
      case 'luxury-cinzel':
        return 'font-serif-cinzel font-semibold';
      case 'luxury-bodoni':
      default:
        return 'font-serif-luxury font-medium';
    }
  };

  const getBrandFontClass = () => {
    switch (config.brandFont) {
      case 'luxury-cinzel':
        return 'font-serif-cinzel font-bold';
      case 'luxury-playfair':
        return 'font-serif-playfair font-bold';
      case 'sans-clean':
        return 'font-sans-clean font-extrabold';
      case 'graffiti-marker':
        return 'font-graffiti-marker';
      case 'luxury-bodoni':
      default:
        return 'font-serif-luxury font-bold';
    }
  };

  const handleDownloadPng = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExporting(true);
    try {
      await downloadStickerPng(aromaName, sizeValue, config);
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownloadSvg = (e: React.MouseEvent) => {
    e.stopPropagation();
    downloadStickerSvg(aromaName, sizeValue, config);
  };

  return (
    <div className="group relative flex flex-col bg-neutral-900/60 rounded-xl border border-neutral-800/80 p-3 hover:border-amber-500/40 transition-all duration-200 hover:shadow-xl hover:shadow-amber-500/5">
      {/* Visual Sticker Box - 2:3 aspect ratio matching perfume bottles */}
      <div 
        onClick={() => onInspect?.(aromaName, sizeValue)}
        className="relative w-full aspect-[2/3] rounded-lg overflow-hidden cursor-pointer select-none transition-transform duration-200 group-hover:scale-[1.01]"
        style={{
          backgroundColor: theme.bg,
          boxShadow: 'inset 0 0 25px rgba(0,0,0,0.85), 0 4px 12px rgba(0,0,0,0.5)',
        }}
      >
        {/* Subtle Radial Ambient Lighting */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            background: 'radial-gradient(circle at 50% 40%, rgba(255, 230, 160, 0.12) 0%, transparent 70%)',
          }}
        />

        {/* Outer Gold Border */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            border: '6px solid transparent',
            borderImage: `${gold.gradient} 1`,
          }}
        />

        {/* Inner Gold Frame */}
        <div 
          className="absolute inset-[13px] pointer-events-none"
          style={{
            border: '1.5px solid transparent',
            borderImage: `${gold.gradient} 1`,
          }}
        />

        {/* Sticker Content Flow */}
        <div className="absolute inset-[14px] flex flex-col items-center justify-between py-6 px-3 text-center">
          {/* Top: Brand Name (Enlarged as requested) */}
          <div className="pt-1">
            <h3 
              className={`tracking-wider leading-tight text-white transition-all ${getBrandFontClass()}`}
              style={{
                fontSize: `${config.brandFontSize * 0.72}px`,
                letterSpacing: `${config.brandTracking}em`,
                textShadow: '0 1px 3px rgba(0,0,0,0.8)',
              }}
            >
              {config.brandName}
            </h3>
          </div>

          {/* Center: Aroma Name (Graffiti Estetik, scaled down relative to brand as requested) */}
          <div className="my-auto py-2 w-full px-1">
            <p 
              className={`transition-all text-neutral-100 ${getAromaFontClass()}`}
              style={{
                fontSize: `${config.aromaFontSize * 0.88}px`,
                letterSpacing: `${config.aromaTracking}em`,
                textShadow: '0 2px 8px rgba(0,0,0,0.9), 0 0 10px rgba(223, 176, 81, 0.25)',
                wordBreak: 'break-word',
              }}
            >
              {aromaName}
            </p>
          </div>

          {/* Bottom Lockup: ML + Eau De Parfum + Gold Divider */}
          <div className="pb-1 w-full flex flex-col items-center">
            {/* Volume Size */}
            <span 
              className="font-sans-clean font-bold text-white tracking-widest block mb-1"
              style={{
                fontSize: `${config.mlFontSize * 0.8}px`,
                letterSpacing: `${config.mlTracking}em`,
              }}
            >
              {sizeValue}
            </span>

            {/* Subtext */}
            <span 
              className="font-sans-clean font-medium text-neutral-300 uppercase tracking-widest block"
              style={{
                fontSize: '9px',
                letterSpacing: `${config.subtextTracking}em`,
              }}
            >
              {config.subtext}
            </span>

            {/* Gold Divider Line */}
            {config.showDivider && (
              <div 
                className="w-14 h-[1.5px] mt-2 rounded-full"
                style={{
                  background: gold.gradient,
                }}
              />
            )}
          </div>
        </div>

        {/* Hover Quick Overlay Actions */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-2 p-3">
          <button
            onClick={() => onInspect?.(aromaName, sizeValue)}
            className="w-full py-1.5 px-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-semibold rounded flex items-center justify-center gap-1.5 shadow-md transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            Detail & Perbesar
          </button>
          
          <button
            onClick={() => onPreviewBottle?.(aromaName, sizeValue)}
            className="w-full py-1.5 px-3 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-medium rounded flex items-center justify-center gap-1.5 border border-neutral-700 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Mockup Botol
          </button>

          <div className="flex gap-1.5 w-full mt-1">
            <button
              disabled={isExporting}
              onClick={handleDownloadPng}
              className="flex-1 py-1 px-2 bg-neutral-900/90 hover:bg-neutral-950 text-neutral-200 text-[11px] font-medium rounded border border-neutral-700/80 flex items-center justify-center gap-1 transition-colors"
              title="Download PNG Resolusi Tinggi (300 DPI)"
            >
              <Download className="w-3 h-3 text-amber-400" />
              {isExporting ? '...' : 'PNG'}
            </button>
            <button
              onClick={handleDownloadSvg}
              className="flex-1 py-1 px-2 bg-neutral-900/90 hover:bg-neutral-950 text-neutral-200 text-[11px] font-medium rounded border border-neutral-700/80 flex items-center justify-center gap-1 transition-colors"
              title="Download Format Vektor SVG"
            >
              <Download className="w-3 h-3 text-sky-400" />
              SVG
            </button>
          </div>
        </div>
      </div>

      {/* Card Footer Info */}
      <div className="mt-2.5 flex items-center justify-between text-xs px-0.5">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="text-amber-500/80 font-mono text-[11px] font-semibold shrink-0">
            #{aromaNumber}
          </span>
          <span className="font-medium text-neutral-200 truncate">
            {aromaName}
          </span>
        </div>
        <span className="text-[11px] font-bold text-amber-400/90 bg-neutral-800 px-1.5 py-0.5 rounded shrink-0">
          {sizeValue}
        </span>
      </div>
    </div>
  );
};
