import React, { useState } from 'react';
import { X, Printer, LayoutGrid, Check, Info } from 'lucide-react';
import { AromaItem, SizeItem, StickerStyleConfig } from '../types/sticker';
import { COLOR_THEMES, GOLD_FINISHES } from '../data/initialData';

interface PrintSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  aromas: AromaItem[];
  sizes: SizeItem[];
  config: StickerStyleConfig;
}

export const PrintSheetModal: React.FC<PrintSheetModalProps> = ({
  isOpen,
  onClose,
  aromas,
  sizes,
  config,
}) => {
  const [filterAromaId, setFilterAromaId] = useState<string>('all');
  const [filterSizeId, setFilterSizeId] = useState<string>('all');
  const [stickersPerSheet, setStickersPerSheet] = useState<number>(24); // 24 per A4 (3x8)
  const [showCropMarks, setShowCropMarks] = useState<boolean>(true);

  if (!isOpen) return null;

  const theme = COLOR_THEMES[config.theme] || COLOR_THEMES['onyx-black'];
  const gold = GOLD_FINISHES[config.goldFinish] || GOLD_FINISHES['royal-gold'];

  // Calculate filtered list
  const filteredList: { aroma: AromaItem; size: SizeItem }[] = [];
  aromas.forEach((aroma) => {
    if (filterAromaId !== 'all' && aroma.id !== filterAromaId) return;
    sizes.forEach((size) => {
      if (filterSizeId !== 'all' && size.id !== filterSizeId) return;
      filteredList.push({ aroma, size });
    });
  });

  // Split into pages based on stickers per sheet
  const pages: { aroma: AromaItem; size: SizeItem }[][] = [];
  for (let i = 0; i < filteredList.length; i += stickersPerSheet) {
    pages.push(filteredList.slice(i, i + stickersPerSheet));
  }

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

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-5xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
        {/* Header (Hidden when printing via print stylesheet) */}
        <div className="no-print flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950">
          <div className="flex items-center gap-2.5">
            <Printer className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="text-base font-semibold text-white">
                Tata Letak Lembar Cetak A4 (Sticker Sheet)
              </h3>
              <p className="text-xs text-neutral-400">
                Total {filteredList.length} stiker · {pages.length} lembar A4 siap dicetak atau disimpan PDF
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar Controls (Hidden during actual print) */}
        <div className="no-print p-4 bg-neutral-950/80 border-b border-neutral-800 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-3">
            {/* Filter Aroma */}
            <div>
              <span className="text-neutral-400 mr-2">Filter Aroma:</span>
              <select
                value={filterAromaId}
                onChange={(e) => setFilterAromaId(e.target.value)}
                className="bg-neutral-900 border border-neutral-700 rounded-md px-2 py-1 text-white focus:outline-none focus:border-amber-500"
              >
                <option value="all">Semua 10 Aroma ({sizes.length * 10} Stiker)</option>
                {aromas.map((a) => (
                  <option key={a.id} value={a.id}>
                    #{a.number} {a.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Filter Size */}
            <div>
              <span className="text-neutral-400 mr-2">Filter Ukuran ML:</span>
              <select
                value={filterSizeId}
                onChange={(e) => setFilterSizeId(e.target.value)}
                className="bg-neutral-900 border border-neutral-700 rounded-md px-2 py-1 text-white focus:outline-none focus:border-amber-500"
              >
                <option value="all">Semua Ukuran (3ML - 100ML)</option>
                {sizes.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.value}
                  </option>
                ))}
              </select>
            </div>

            {/* Grid density */}
            <div>
              <span className="text-neutral-400 mr-2">Jumlah per A4:</span>
              <select
                value={stickersPerSheet}
                onChange={(e) => setStickersPerSheet(Number(e.target.value))}
                className="bg-neutral-900 border border-neutral-700 rounded-md px-2 py-1 text-white focus:outline-none focus:border-amber-500"
              >
                <option value={12}>12 Stiker per Lembar (Ukuran Sedang 4x6 cm)</option>
                <option value={20}>20 Stiker per Lembar (Ukuran Kompak 3.5x5.2 cm)</option>
                <option value={24}>24 Stiker per Lembar (Ukuran Mini 3x4.5 cm)</option>
                <option value={8}>8 Stiker per Lembar (Ukuran Besar 5x7.5 cm)</option>
              </select>
            </div>

            <label className="flex items-center gap-1.5 text-neutral-300 cursor-pointer">
              <input
                type="checkbox"
                checked={showCropMarks}
                onChange={(e) => setShowCropMarks(e.target.checked)}
                className="rounded border-neutral-700 text-amber-500"
              />
              <span>Garis Potong (Crop Marks)</span>
            </label>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="py-2 px-4 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-semibold rounded-lg flex items-center gap-1.5 shadow-md shadow-amber-500/10 transition-colors"
            >
              <Printer className="w-4 h-4" />
              Cetak / Simpan PDF
            </button>
          </div>
        </div>

        {/* Printable Sheets Preview Area */}
        <div className="p-6 overflow-y-auto flex-1 bg-neutral-950/40 space-y-8">
          <div className="no-print flex items-center gap-2 p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-200/90 text-xs">
            <Info className="w-4 h-4 shrink-0 text-amber-400" />
            <span>
              Tips Cetak: Pilih ukuran kertas <strong>A4</strong>, aktifkan <strong>"Grafis Latar Belakang / Background Graphics"</strong> pada dialog cetak browser agar warna hitam dan border emas tercetak sempurna.
            </span>
          </div>

          {pages.map((pageItems, pageIdx) => (
            <div 
              key={pageIdx}
              className="print-sheet-page bg-neutral-900 mx-auto rounded-xl border border-neutral-800 p-6 shadow-xl max-w-4xl"
              style={{
                aspectRatio: '210/297', // A4 Ratio
                minHeight: '650px',
              }}
            >
              {/* Sheet Header */}
              <div className="no-print flex justify-between items-center mb-4 pb-2 border-b border-neutral-800 text-xs text-neutral-400">
                <span className="font-semibold text-neutral-200">
                  {config.brandName} - Lembar #{pageIdx + 1} dari {pages.length}
                </span>
                <span>{pageItems.length} Stiker pada Lembar Ini</span>
              </div>

              {/* Grid of stickers on A4 Sheet */}
              <div 
                className={`grid gap-3 w-full h-[90%] items-center ${
                  stickersPerSheet === 8
                    ? 'grid-cols-2 sm:grid-cols-4'
                    : stickersPerSheet === 12
                    ? 'grid-cols-3 sm:grid-cols-4'
                    : stickersPerSheet === 20
                    ? 'grid-cols-4 sm:grid-cols-5'
                    : 'grid-cols-4 sm:grid-cols-6'
                }`}
              >
                {pageItems.map(({ aroma, size }, idx) => (
                  <div
                    key={`${aroma.id}-${size.id}-${idx}`}
                    className={`relative aspect-[2/3] rounded overflow-hidden select-none flex flex-col items-center justify-between p-2 text-center ${
                      showCropMarks ? 'ring-1 ring-dashed ring-neutral-700/80' : ''
                    }`}
                    style={{
                      backgroundColor: theme.bg,
                    }}
                  >
                    {/* Outer Gold Frame */}
                    <div 
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        border: '3px solid transparent',
                        borderImage: `${gold.gradient} 1`,
                      }}
                    />

                    {/* Inner Gold Frame */}
                    <div 
                      className="absolute inset-[6px] pointer-events-none"
                      style={{
                        border: '1px solid transparent',
                        borderImage: `${gold.gradient} 1`,
                      }}
                    />

                    {/* Content */}
                    <div className="absolute inset-[7px] flex flex-col items-center justify-between py-2 px-1 text-center">
                      {/* Brand */}
                      <span 
                        className={`text-white leading-tight ${getBrandFontClass()}`}
                        style={{
                          fontSize: `${Math.max(8, config.brandFontSize * 0.32)}px`,
                          letterSpacing: `${config.brandTracking}em`,
                        }}
                      >
                        {config.brandName}
                      </span>

                      {/* Aroma */}
                      <span 
                        className={`text-neutral-100 ${getAromaFontClass()}`}
                        style={{
                          fontSize: `${Math.max(7.5, config.aromaFontSize * 0.38)}px`,
                          letterSpacing: `${config.aromaTracking}em`,
                        }}
                      >
                        {aroma.name}
                      </span>

                      {/* Bottom */}
                      <div className="flex flex-col items-center">
                        <span 
                          className="font-sans-clean font-bold text-white tracking-widest text-[7px]"
                          style={{ letterSpacing: `${config.mlTracking}em` }}
                        >
                          {size.value}
                        </span>
                        <span className="font-sans-clean text-neutral-300 tracking-wider text-[5px] uppercase">
                          {config.subtext}
                        </span>
                        {config.showDivider && (
                          <div 
                            className="w-5 h-[0.8px] mt-0.5"
                            style={{ background: gold.gradient }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
