import React, { useState } from 'react';
import { X, Download, Copy, Check, Sparkles, Printer } from 'lucide-react';
import { StickerStyleConfig } from '../types/sticker';
import { COLOR_THEMES, GOLD_FINISHES } from '../data/initialData';
import { downloadStickerPng, downloadStickerSvg, generateStickerSvgString } from '../utils/exportUtils';

interface StickerDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  aromaName: string;
  sizeValue: string;
  config: StickerStyleConfig;
  onOpenMockup?: () => void;
}

export const StickerDetailModal: React.FC<StickerDetailModalProps> = ({
  isOpen,
  onClose,
  aromaName,
  sizeValue,
  config,
  onOpenMockup,
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const [copiedSvg, setCopiedSvg] = useState(false);

  if (!isOpen) return null;

  const theme = COLOR_THEMES[config.theme] || COLOR_THEMES['onyx-black'];
  const gold = GOLD_FINISHES[config.goldFinish] || GOLD_FINISHES['royal-gold'];

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

  const handleDownloadPng = async () => {
    setIsExporting(true);
    try {
      await downloadStickerPng(aromaName, sizeValue, config);
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopySvg = () => {
    const svgStr = generateStickerSvgString(aromaName, sizeValue, config, 600, 900);
    navigator.clipboard.writeText(svgStr);
    setCopiedSvg(true);
    setTimeout(() => setCopiedSvg(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950">
          <div>
            <h3 className="text-base font-semibold text-white">
              Pratinjau Resolusi Tinggi Stiker
            </h3>
            <p className="text-xs text-neutral-400">
              {aromaName} · {sizeValue} · {config.brandName}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 flex flex-col items-center justify-center bg-neutral-950/60">
          {/* Zoomed Sticker */}
          <div 
            className="relative w-72 aspect-[2/3] rounded-lg overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.9)]"
            style={{
              backgroundColor: theme.bg,
            }}
          >
            {/* Outer Gold Border */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                border: '7px solid transparent',
                borderImage: `${gold.gradient} 1`,
              }}
            />

            {/* Inner Gold Frame */}
            <div 
              className="absolute inset-[14px] pointer-events-none"
              style={{
                border: '1.5px solid transparent',
                borderImage: `${gold.gradient} 1`,
              }}
            />

            {/* Content */}
            <div className="absolute inset-[15px] flex flex-col items-center justify-between py-8 px-4 text-center">
              {/* Brand Name */}
              <div className="pt-2">
                <h2 
                  className={`text-white leading-tight ${getBrandFontClass()}`}
                  style={{
                    fontSize: `${config.brandFontSize * 0.95}px`,
                    letterSpacing: `${config.brandTracking}em`,
                    textShadow: '0 2px 4px rgba(0,0,0,0.9)',
                  }}
                >
                  {config.brandName}
                </h2>
              </div>

              {/* Aroma */}
              <div className="my-auto py-3">
                <h1 
                  className={`text-neutral-100 ${getAromaFontClass()}`}
                  style={{
                    fontSize: `${config.aromaFontSize * 1.15}px`,
                    letterSpacing: `${config.aromaTracking}em`,
                    textShadow: '0 2px 10px rgba(0,0,0,0.9), 0 0 12px rgba(223, 176, 81, 0.3)',
                  }}
                >
                  {aromaName}
                </h1>
              </div>

              {/* ML + Subtext */}
              <div className="pb-2 flex flex-col items-center">
                <span 
                  className="font-sans-clean font-bold text-white tracking-widest block mb-1"
                  style={{
                    fontSize: `${config.mlFontSize}px`,
                    letterSpacing: `${config.mlTracking}em`,
                  }}
                >
                  {sizeValue}
                </span>
                <span 
                  className="font-sans-clean font-medium text-neutral-300 uppercase tracking-widest block text-[10px]"
                  style={{ letterSpacing: `${config.subtextTracking}em` }}
                >
                  {config.subtext}
                </span>
                {config.showDivider && (
                  <div 
                    className="w-16 h-[1.5px] mt-2 rounded-full"
                    style={{ background: gold.gradient }}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Quick Specifications */}
          <div className="mt-6 flex flex-wrap gap-4 text-xs text-neutral-400">
            <span className="bg-neutral-900 border border-neutral-800 px-3 py-1 rounded-md">
              Rasio Botol: <strong className="text-white">2:3 (Standar Parfum)</strong>
            </span>
            <span className="bg-neutral-900 border border-neutral-800 px-3 py-1 rounded-md">
              Resolusi Cetak: <strong className="text-white">300 DPI Ultra Clear</strong>
            </span>
            <span className="bg-neutral-900 border border-neutral-800 px-3 py-1 rounded-md">
              Aroma: <strong className="text-amber-400">{aromaName}</strong>
            </span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-neutral-900 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-2">
            <button
              onClick={handleCopySvg}
              className="py-2 px-3 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-medium rounded-lg flex items-center gap-1.5 transition-colors border border-neutral-700"
            >
              {copiedSvg ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedSvg ? 'SVG Tersalin!' : 'Salin Kode SVG'}
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenMockup?.();
              }}
              className="py-2 px-3 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-medium rounded-lg flex items-center gap-1.5 transition-colors border border-neutral-700"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Simulasi Botol
            </button>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => downloadStickerSvg(aromaName, sizeValue, config)}
              className="py-2 px-3 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-medium rounded-lg flex items-center gap-1.5 transition-colors border border-neutral-700"
            >
              <Download className="w-3.5 h-3.5 text-sky-400" />
              Download SVG
            </button>
            <button
              disabled={isExporting}
              onClick={handleDownloadPng}
              className="py-2 px-4 bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-md shadow-amber-500/10 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              {isExporting ? 'Memproses...' : 'Download PNG 300 DPI'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
