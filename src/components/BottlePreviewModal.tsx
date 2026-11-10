import React, { useState } from 'react';
import { X, Sparkles, Download, Check } from 'lucide-react';
import { StickerStyleConfig } from '../types/sticker';
import { COLOR_THEMES, GOLD_FINISHES } from '../data/initialData';
import { downloadStickerPng } from '../utils/exportUtils';

interface BottlePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  aromaName: string;
  sizeValue: string;
  config: StickerStyleConfig;
}

export const BottlePreviewModal: React.FC<BottlePreviewModalProps> = ({
  isOpen,
  onClose,
  aromaName,
  sizeValue,
  config,
}) => {
  const [bottleStyle, setBottleStyle] = useState<'amber' | 'black' | 'clear'>('black');
  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen) return null;

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

  const handleDownload = async () => {
    setIsExporting(true);
    try {
      await downloadStickerPng(aromaName, sizeValue, config);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-3xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950/60">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-semibold text-white">
              Simulasi Mockup Botol Parfum
            </h3>
            <span className="text-xs text-neutral-400">
              · {aromaName} ({sizeValue})
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto flex-1 flex flex-col md:flex-row gap-8 items-center justify-center bg-gradient-to-b from-neutral-900 to-neutral-950">
          {/* Bottle Display Stage */}
          <div className="relative w-72 h-96 flex items-center justify-center">
            {/* Ambient Background Pedestal Glow */}
            <div className="absolute inset-0 bg-amber-500/5 rounded-full filter blur-3xl pointer-events-none" />

            {/* Base Pedestal Ellipse */}
            <div className="absolute bottom-4 w-52 h-10 bg-neutral-950 rounded-full border border-neutral-800/80 shadow-[0_10px_30px_rgba(0,0,0,0.9)]" />

            {/* The Perfume Bottle Cylinder / Cube */}
            <div 
              className={`relative w-44 h-72 rounded-2xl transition-all duration-300 flex flex-col items-center justify-center ${
                bottleStyle === 'black'
                  ? 'bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 border border-neutral-700/60 shadow-[0_20px_50px_rgba(0,0,0,0.9)]'
                  : bottleStyle === 'amber'
                  ? 'bg-gradient-to-b from-amber-950/90 via-amber-900/60 to-amber-950/90 border border-amber-600/30 shadow-[0_20px_50px_rgba(217,119,6,0.2)]'
                  : 'bg-gradient-to-b from-white/10 via-neutral-200/5 to-white/15 border border-white/20 backdrop-blur-sm shadow-[0_20px_50px_rgba(255,255,255,0.05)]'
              }`}
            >
              {/* Bottle Cap (Metallic Gold) */}
              <div 
                className="absolute -top-12 w-20 h-14 rounded-t-lg shadow-md"
                style={{
                  background: gold.gradient,
                  boxShadow: '0 4px 15px rgba(0,0,0,0.6)',
                }}
              >
                {/* Cap ridges / luxury shine */}
                <div className="absolute inset-0 bg-white/20 opacity-30 rounded-t-lg" />
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/40" />
              </div>

              {/* Atomizer Neck Collar */}
              <div 
                className="absolute -top-3 w-10 h-3 rounded-t-sm"
                style={{ background: gold.gradient }}
              />

              {/* Glass Reflection Highlight Stripe */}
              <div className="absolute top-2 left-3 bottom-2 w-2.5 bg-gradient-to-b from-white/30 via-white/10 to-transparent rounded-full pointer-events-none" />

              {/* STIKER DITEMPEL PADA BOTOL */}
              <div 
                className="relative w-32 aspect-[2/3] rounded shadow-[0_4px_16px_rgba(0,0,0,0.85)] overflow-hidden transition-transform duration-300 hover:scale-105"
                style={{
                  backgroundColor: theme.bg,
                }}
              >
                {/* Sticker Outer Gold Frame */}
                <div 
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    border: '3.5px solid transparent',
                    borderImage: `${gold.gradient} 1`,
                  }}
                />

                {/* Sticker Inner Gold Frame */}
                <div 
                  className="absolute inset-[7px] pointer-events-none"
                  style={{
                    border: '1px solid transparent',
                    borderImage: `${gold.gradient} 1`,
                  }}
                />

                {/* Sticker Content Flow */}
                <div className="absolute inset-[8px] flex flex-col items-center justify-between py-2.5 px-1.5 text-center">
                  {/* Brand */}
                  <span 
                    className={`text-white leading-tight ${getBrandFontClass()}`}
                    style={{
                      fontSize: `${Math.max(10, config.brandFontSize * 0.42)}px`,
                      letterSpacing: `${config.brandTracking}em`,
                    }}
                  >
                    {config.brandName}
                  </span>

                  {/* Aroma */}
                  <span 
                    className={`text-neutral-100 ${getAromaFontClass()}`}
                    style={{
                      fontSize: `${Math.max(9, config.aromaFontSize * 0.48)}px`,
                      letterSpacing: `${config.aromaTracking}em`,
                    }}
                  >
                    {aromaName}
                  </span>

                  {/* Bottom */}
                  <div className="flex flex-col items-center">
                    <span 
                      className="font-sans-clean font-bold text-white tracking-widest text-[8px]"
                      style={{ letterSpacing: `${config.mlTracking}em` }}
                    >
                      {sizeValue}
                    </span>
                    <span className="font-sans-clean text-neutral-300 tracking-wider text-[5px] uppercase">
                      {config.subtext}
                    </span>
                    {config.showDivider && (
                      <div 
                        className="w-7 h-[1px] mt-1"
                        style={{ background: gold.gradient }}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Controls & Details */}
          <div className="w-full md:w-80 space-y-5">
            <div>
              <h4 className="text-sm font-semibold text-white mb-1">
                Pilih Tipe Botol Parfum
              </h4>
              <p className="text-xs text-neutral-400">
                Lihat keserasian stiker dengan berbagai warna kaca botol.
              </p>
              
              <div className="grid grid-cols-3 gap-2 mt-3">
                <button
                  type="button"
                  onClick={() => setBottleStyle('black')}
                  className={`p-2 rounded-xl text-center border transition-all ${
                    bottleStyle === 'black'
                      ? 'border-amber-500 bg-neutral-900 text-white'
                      : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:border-neutral-700'
                  }`}
                >
                  <div className="w-6 h-6 rounded-full bg-neutral-950 border border-neutral-700 mx-auto mb-1" />
                  <span className="text-[11px] font-medium">Matte Black</span>
                </button>

                <button
                  type="button"
                  onClick={() => setBottleStyle('amber')}
                  className={`p-2 rounded-xl text-center border transition-all ${
                    bottleStyle === 'amber'
                      ? 'border-amber-500 bg-neutral-900 text-white'
                      : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:border-neutral-700'
                  }`}
                >
                  <div className="w-6 h-6 rounded-full bg-amber-900 border border-amber-600 mx-auto mb-1" />
                  <span className="text-[11px] font-medium">Warm Amber</span>
                </button>

                <button
                  type="button"
                  onClick={() => setBottleStyle('clear')}
                  className={`p-2 rounded-xl text-center border transition-all ${
                    bottleStyle === 'clear'
                      ? 'border-amber-500 bg-neutral-900 text-white'
                      : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:border-neutral-700'
                  }`}
                >
                  <div className="w-6 h-6 rounded-full bg-white/20 border border-white/40 mx-auto mb-1" />
                  <span className="text-[11px] font-medium">Clear Crystal</span>
                </button>
              </div>
            </div>

            <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 space-y-2 text-xs">
              <div className="flex justify-between text-neutral-300">
                <span className="text-neutral-500">Merek Toko:</span>
                <span className="font-semibold text-white">{config.brandName}</span>
              </div>
              <div className="flex justify-between text-neutral-300">
                <span className="text-neutral-500">Varian Aroma:</span>
                <span className="font-semibold text-amber-300">{aromaName}</span>
              </div>
              <div className="flex justify-between text-neutral-300">
                <span className="text-neutral-500">Kapasitas Botol:</span>
                <span className="font-bold text-white bg-neutral-800 px-1.5 py-0.5 rounded">{sizeValue}</span>
              </div>
              <div className="flex justify-between text-neutral-300">
                <span className="text-neutral-500">Gaya Font Aroma:</span>
                <span className="capitalize text-neutral-300">{config.aromaFont.replace('-', ' ')}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                disabled={isExporting}
                onClick={handleDownload}
                className="w-full py-2.5 px-4 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-semibold text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-amber-500/10 transition-colors"
              >
                <Download className="w-4 h-4" />
                {isExporting ? 'Memproses Cetak...' : `Download Stiker Ini (${sizeValue})`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
