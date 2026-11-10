import React from 'react';
import { 
  Sliders, 
  Type, 
  Palette, 
  Maximize2, 
  RotateCcw, 
  Sparkles,
  Layers,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { StickerStyleConfig, AromaFontKey, BrandFontKey } from '../types/sticker';
import { FONT_OPTIONS, GOLD_FINISHES, COLOR_THEMES, DEFAULT_STYLE_CONFIG } from '../data/initialData';

interface StudioControlsProps {
  config: StickerStyleConfig;
  onChange: (newConfig: StickerStyleConfig) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const StudioControls: React.FC<StudioControlsProps> = ({
  config,
  onChange,
  isOpen,
  onToggle,
}) => {
  const updateField = <K extends keyof StickerStyleConfig>(key: K, value: StickerStyleConfig[K]) => {
    onChange({ ...config, [key]: value });
  };

  const handleReset = () => {
    onChange({ ...DEFAULT_STYLE_CONFIG });
  };

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-2xl">
      {/* Header bar */}
      <div 
        onClick={onToggle}
        className="flex items-center justify-between px-5 py-3.5 bg-neutral-900/90 hover:bg-neutral-850 cursor-pointer border-b border-neutral-800 transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <Sliders className="w-4 h-4 text-amber-400" />
          <h2 className="text-sm font-semibold text-white tracking-wide">
            Pengaturan Desain & Proporsi (80 Stiker)
          </h2>
          <span className="text-[11px] text-amber-400/90 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded-full font-medium">
            Live Editor
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleReset();
            }}
            className="flex items-center gap-1 text-xs text-neutral-400 hover:text-amber-400 transition-colors px-2 py-1 rounded hover:bg-neutral-800"
            title="Reset ke pengaturan awal"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
          {isOpen ? (
            <ChevronUp className="w-4 h-4 text-neutral-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-neutral-400" />
          )}
        </div>
      </div>

      {/* Accordion Body */}
      {isOpen && (
        <div className="p-5 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Quick Presets */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Preset Gaya Cepat
              </label>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => {
                  onChange({
                    ...config,
                    brandFontSize: 30,
                    aromaFont: 'graffiti-sedgwick',
                    aromaFontSize: 19,
                    aromaTracking: 0.05,
                    goldFinish: 'royal-gold',
                    theme: 'onyx-black',
                  });
                }}
                className={`p-2 rounded-lg text-left text-xs border transition-all ${
                  config.aromaFont === 'graffiti-sedgwick'
                    ? 'border-amber-500 bg-amber-500/10 text-amber-300 font-semibold'
                    : 'border-neutral-800 bg-neutral-950/40 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200'
                }`}
              >
                <div className="font-medium text-white text-[11px]">Estetik Grafiti (Sesuai Request)</div>
                <div className="text-[10px] text-neutral-400 font-graffiti-sedgwick mt-0.5">Sedgwick Ave Style</div>
              </button>

              <button
                type="button"
                onClick={() => {
                  onChange({
                    ...config,
                    brandFontSize: 28,
                    aromaFont: 'graffiti-marker',
                    aromaFontSize: 18,
                    aromaTracking: 0.06,
                    goldFinish: 'royal-gold',
                  });
                }}
                className={`p-2 rounded-lg text-left text-xs border transition-all ${
                  config.aromaFont === 'graffiti-marker'
                    ? 'border-amber-500 bg-amber-500/10 text-amber-300 font-semibold'
                    : 'border-neutral-800 bg-neutral-950/40 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200'
                }`}
              >
                <div className="font-medium text-white text-[11px]">Street Marker Grafiti</div>
                <div className="text-[10px] text-neutral-400 font-graffiti-marker mt-0.5">Permanent Marker</div>
              </button>

              <button
                type="button"
                onClick={() => {
                  onChange({
                    ...config,
                    brandFontSize: 28,
                    aromaFont: 'aesthetic-kaushan',
                    aromaFontSize: 20,
                    aromaTracking: 0.04,
                  });
                }}
                className={`p-2 rounded-lg text-left text-xs border transition-all ${
                  config.aromaFont === 'aesthetic-kaushan'
                    ? 'border-amber-500 bg-amber-500/10 text-amber-300 font-semibold'
                    : 'border-neutral-800 bg-neutral-950/40 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200'
                }`}
              >
                <div className="font-medium text-white text-[11px]">Brush Estetik Modern</div>
                <div className="text-[10px] text-neutral-400 font-aesthetic-script mt-0.5">Kaushan Script</div>
              </button>

              <button
                type="button"
                onClick={() => {
                  onChange({
                    ...config,
                    aromaFont: 'luxury-playfair',
                    aromaFontSize: 22,
                    aromaTracking: 0.03,
                    brandFontSize: 28,
                    goldFinish: 'royal-gold',
                    theme: 'onyx-black',
                  });
                }}
                className={`p-2 rounded-lg text-left text-xs border transition-all ${
                  config.aromaFont === 'luxury-playfair'
                    ? 'border-amber-500 bg-amber-500/10 text-amber-300 font-semibold'
                    : 'border-neutral-800 bg-neutral-950/40 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200'
                }`}
              >
                <div className="font-medium text-white text-[11px]">Klasik Asli (Foto Contoh)</div>
                <div className="text-[10px] text-neutral-400 font-serif-playfair italic mt-0.5">Playfair Italic</div>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Bagian 1: Nama Toko (LifeStruggel - Diperbesar) */}
            <div className="space-y-4 p-4 rounded-xl bg-neutral-950/50 border border-neutral-800/80">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-neutral-200 flex items-center gap-1.5">
                  <Type className="w-3.5 h-3.5 text-amber-400" />
                  1. Nama Toko (Diperbesar)
                </span>
                <span className="text-[10px] bg-amber-500/10 text-amber-300 px-1.5 py-0.5 rounded border border-amber-500/20">
                  {config.brandFontSize}px
                </span>
              </div>

              <div>
                <label className="block text-[11px] text-neutral-400 mb-1">Teks Nama Toko</label>
                <input
                  type="text"
                  value={config.brandName}
                  onChange={(e) => updateField('brandName', e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors"
                  placeholder="LifeStruggel"
                />
              </div>

              <div>
                <label className="block text-[11px] text-neutral-400 mb-1">Font Nama Toko</label>
                <select
                  value={config.brandFont}
                  onChange={(e) => updateField('brandFont', e.target.value as BrandFontKey)}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors"
                >
                  {FONT_OPTIONS.brand.map((opt) => (
                    <option key={opt.key} value={opt.key}>
                      {opt.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-neutral-400 mb-1">
                  <span>Ukuran Nama Toko (Perbesar)</span>
                  <span className="text-neutral-300 font-mono">{config.brandFontSize}px</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="42"
                  value={config.brandFontSize}
                  onChange={(e) => updateField('brandFontSize', Number(e.target.value))}
                  className="w-full accent-amber-500 bg-neutral-800 h-1.5 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-neutral-400 mb-1">
                  <span>Jarak Huruf Toko (Tracking Rapi)</span>
                  <span className="text-neutral-300 font-mono">{config.brandTracking.toFixed(2)}em</span>
                </div>
                <input
                  type="range"
                  min="0.00"
                  max="0.30"
                  step="0.01"
                  value={config.brandTracking}
                  onChange={(e) => updateField('brandTracking', Number(e.target.value))}
                  className="w-full accent-amber-500 bg-neutral-800 h-1.5 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>

            {/* Bagian 2: Nama Aroma (Font Estetik Grafiti - Diperkecil) */}
            <div className="space-y-4 p-4 rounded-xl bg-neutral-950/50 border border-neutral-800/80">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-neutral-200 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  2. Nama Aroma (Font Estetik Grafiti)
                </span>
                <span className="text-[10px] bg-amber-500/10 text-amber-300 px-1.5 py-0.5 rounded border border-amber-500/20">
                  {config.aromaFontSize}px
                </span>
              </div>

              <div>
                <label className="block text-[11px] text-neutral-400 mb-1">Pilihan Font Aroma</label>
                <select
                  value={config.aromaFont}
                  onChange={(e) => updateField('aromaFont', e.target.value as AromaFontKey)}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors"
                >
                  {FONT_OPTIONS.aroma.map((opt) => (
                    <option key={opt.key} value={opt.key}>
                      [{opt.category}] {opt.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-neutral-400 mb-1">
                  <span>Ukuran Font Aroma (Diperkecil)</span>
                  <span className="text-neutral-300 font-mono">{config.aromaFontSize}px</span>
                </div>
                <input
                  type="range"
                  min="14"
                  max="30"
                  value={config.aromaFontSize}
                  onChange={(e) => updateField('aromaFontSize', Number(e.target.value))}
                  className="w-full accent-amber-500 bg-neutral-800 h-1.5 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-neutral-400 mb-1">
                  <span>Jarak Huruf Aroma (Diperdengarkan / Renggang Rapi)</span>
                  <span className="text-neutral-300 font-mono">{config.aromaTracking.toFixed(2)}em</span>
                </div>
                <input
                  type="range"
                  min="0.00"
                  max="0.25"
                  step="0.01"
                  value={config.aromaTracking}
                  onChange={(e) => updateField('aromaTracking', Number(e.target.value))}
                  className="w-full accent-amber-500 bg-neutral-800 h-1.5 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="pt-1">
                <span className="text-[11px] text-amber-400/90 font-medium">Contoh Pratinjau Font:</span>
                <div className="mt-1 px-3 py-2 bg-neutral-900 rounded border border-neutral-800 flex items-center justify-center">
                  <span 
                    className={`text-base text-amber-300 ${
                      FONT_OPTIONS.aroma.find(f => f.key === config.aromaFont)?.cssClass || ''
                    }`}
                  >
                    Ciel Doré · Soir Prestige
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bagian 3: Warna Foil Emas & Latar Belakang */}
          <div className="p-4 rounded-xl bg-neutral-950/50 border border-neutral-800/80 space-y-4">
            <span className="text-xs font-semibold text-neutral-200 flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-amber-400" />
              3. Efek Emas & Tema Warna Stiker
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Foil Finish */}
              <div>
                <label className="block text-[11px] text-neutral-400 mb-1.5">Warna Foil Logam (Border & Aksen)</label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(GOLD_FINISHES).map(([key, val]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => updateField('goldFinish', key as any)}
                      className={`flex items-center gap-2 p-2 rounded-lg text-xs border text-left transition-all ${
                        config.goldFinish === key
                          ? 'border-amber-500 bg-neutral-900 text-white'
                          : 'border-neutral-800 bg-neutral-900/50 text-neutral-400 hover:border-neutral-700'
                      }`}
                    >
                      <span 
                        className="w-3.5 h-3.5 rounded-full shrink-0 shadow-sm"
                        style={{ background: val.gradient }}
                      />
                      <span className="truncate text-[11px]">{val.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Theme */}
              <div>
                <label className="block text-[11px] text-neutral-400 mb-1.5">Warna Dasar Latar Belakang</label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(COLOR_THEMES).map(([key, val]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => updateField('theme', key as any)}
                      className={`flex items-center gap-2 p-2 rounded-lg text-xs border text-left transition-all ${
                        config.theme === key
                          ? 'border-amber-500 bg-neutral-900 text-white'
                          : 'border-neutral-800 bg-neutral-900/50 text-neutral-400 hover:border-neutral-700'
                      }`}
                    >
                      <span 
                        className="w-3.5 h-3.5 rounded-full shrink-0 border border-neutral-700"
                        style={{ backgroundColor: val.bg }}
                      />
                      <span className="truncate text-[11px]">{val.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Subtext and divider toggles */}
            <div className="pt-2 border-t border-neutral-800/80 flex flex-wrap items-center justify-between gap-4">
              <label className="flex items-center gap-2 text-xs text-neutral-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.showDivider}
                  onChange={(e) => updateField('showDivider', e.target.checked)}
                  className="rounded border-neutral-700 text-amber-500 focus:ring-0 bg-neutral-900"
                />
                <span>Tampilkan Garis Aksen Emas di Bawah "EAU DE PARFUM"</span>
              </label>

              <div className="flex items-center gap-2">
                <span className="text-[11px] text-neutral-400">Teks Kategori:</span>
                <input
                  type="text"
                  value={config.subtext}
                  onChange={(e) => updateField('subtext', e.target.value)}
                  className="bg-neutral-900 border border-neutral-700 rounded px-2 py-0.5 text-xs text-white w-32 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
