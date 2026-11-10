import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  Download, 
  Search, 
  Filter, 
  Printer, 
  Layers, 
  Eye, 
  Sliders, 
  Check, 
  ExternalLink,
  Info,
  PackageCheck,
  RefreshCw
} from 'lucide-react';

import { INITIAL_AROMAS, INITIAL_SIZES, DEFAULT_STYLE_CONFIG } from './data/initialData';
import { AromaItem, SizeItem, StickerStyleConfig } from './types/sticker';
import { StickerCard } from './components/StickerCard';
import { StudioControls } from './components/StudioControls';
import { BottlePreviewModal } from './components/BottlePreviewModal';
import { StickerDetailModal } from './components/StickerDetailModal';
import { PrintSheetModal } from './components/PrintSheetModal';
import { OriginalReferenceModal } from './components/OriginalReferenceModal';
import { downloadAllStickersZip } from './utils/exportUtils';

export default function App() {
  // Master data
  const [aromas] = useState<AromaItem[]>(INITIAL_AROMAS);
  const [sizes] = useState<SizeItem[]>(INITIAL_SIZES);
  const [config, setConfig] = useState<StickerStyleConfig>(DEFAULT_STYLE_CONFIG);

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAromaId, setSelectedAromaId] = useState<string>('all');
  const [selectedSizeId, setSelectedSizeId] = useState<string>('all');
  const [groupBy, setGroupBy] = useState<'aroma' | 'size' | 'all'>('aroma');

  // UI state
  const [isControlsOpen, setIsControlsOpen] = useState(true);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [isReferenceModalOpen, setIsReferenceModalOpen] = useState(false);

  // Modal inspection targets
  const [inspectTarget, setInspectTarget] = useState<{ aroma: string; size: string } | null>(null);
  const [mockupTarget, setMockupTarget] = useState<{ aroma: string; size: string } | null>(null);

  // Batch ZIP generation progress state
  const [zipProgress, setZipProgress] = useState<{
    isActive: boolean;
    current: number;
    total: number;
    message: string;
  }>({
    isActive: false,
    current: 0,
    total: 80,
    message: '',
  });

  // Filtered stickers calculation
  const filteredStickers = useMemo(() => {
    const list: { aroma: AromaItem; size: SizeItem }[] = [];
    const q = searchQuery.toLowerCase().trim();

    aromas.forEach((aroma) => {
      if (selectedAromaId !== 'all' && aroma.id !== selectedAromaId) return;

      sizes.forEach((size) => {
        if (selectedSizeId !== 'all' && size.id !== selectedSizeId) return;

        // Search matching
        if (
          q &&
          !aroma.name.toLowerCase().includes(q) &&
          !size.value.toLowerCase().includes(q) &&
          !config.brandName.toLowerCase().includes(q)
        ) {
          return;
        }

        list.push({ aroma, size });
      });
    });

    return list;
  }, [aromas, sizes, selectedAromaId, selectedSizeId, searchQuery, config.brandName]);

  // Handle batch ZIP download
  const handleDownloadAllZip = async () => {
    setZipProgress({
      isActive: true,
      current: 0,
      total: aromas.length * sizes.length,
      message: 'Mempersiapkan pembuatan 80 file stiker HD...',
    });

    try {
      await downloadAllStickersZip(
        aromas,
        sizes,
        config,
        (current, total, message) => {
          setZipProgress({
            isActive: true,
            current,
            total,
            message,
          });
        }
      );
    } catch (err) {
      console.error('Error generating zip:', err);
    } finally {
      setTimeout(() => {
        setZipProgress((prev) => ({ ...prev, isActive: false }));
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans">
      {/* Zone 1, 2, 3: Top Bar Contract */}
      <header className="sticky top-0 z-40 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-3.5">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="font-serif-luxury font-bold text-lg sm:text-xl tracking-tight text-white whitespace-nowrap">
              {config.brandName}
            </span>
            <span className="hidden sm:inline-block text-neutral-500 font-light">|</span>
            <span className="hidden sm:inline-block text-xs text-amber-400/90 font-medium whitespace-nowrap">
              Studio Stiker Parfum (80 Desain)
            </span>
          </div>

          {/* Zone 2: Navigation / Info */}
          <nav className="hidden md:flex items-center gap-6 text-xs text-neutral-400">
            <button
              onClick={() => {
                setSelectedAromaId('all');
                setSelectedSizeId('all');
                setGroupBy('aroma');
              }}
              className="hover:text-amber-400 transition-colors whitespace-nowrap"
            >
              10 Aroma Pilihan
            </button>
            <button
              onClick={() => {
                setSelectedAromaId('all');
                setSelectedSizeId('all');
                setGroupBy('size');
              }}
              className="hover:text-amber-400 transition-colors whitespace-nowrap"
            >
              8 Ukuran (3ML - 100ML)
            </button>
            <button
              onClick={() => setIsReferenceModalOpen(true)}
              className="hover:text-amber-400 transition-colors whitespace-nowrap flex items-center gap-1 text-neutral-300"
            >
              <Eye className="w-3.5 h-3.5 text-amber-400" />
              Lihat Foto Asli
            </button>
            <button
              onClick={() => setIsPrintModalOpen(true)}
              className="hover:text-amber-400 transition-colors whitespace-nowrap flex items-center gap-1 text-neutral-300"
            >
              <Printer className="w-3.5 h-3.5 text-amber-400" />
              Lembar Cetak A4
            </button>
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              disabled={zipProgress.isActive}
              onClick={handleDownloadAllZip}
              className="px-4 py-2 text-xs font-semibold text-neutral-950 bg-amber-500 hover:bg-amber-400 rounded-lg shadow-md shadow-amber-500/10 transition-colors flex items-center gap-1.5 whitespace-nowrap"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{zipProgress.isActive ? 'Membuat ZIP...' : 'Download 80 Stiker (ZIP)'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 flex-1 space-y-6">
        {/* Hero & Request Compliance Banner */}
        <section className="p-6 rounded-2xl bg-gradient-to-r from-neutral-900 via-neutral-900/95 to-neutral-900 border border-neutral-800 shadow-xl relative overflow-hidden">
          {/* Subtle gold accent light */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full filter blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold tracking-wide uppercase">
                <Sparkles className="w-4 h-4" />
                <span>Koleksi Lengkap 10 Aroma × 8 Takaran ML</span>
              </div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-serif-luxury font-bold text-white tracking-tight">
                80 Desain Stiker Parfum Premium {config.brandName}
              </h1>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Dibuat berdasarkan foto contoh: Nama toko <strong>"{config.brandName}"</strong> diperbesar, nama aroma dengan <strong>Font Estetik Grafiti</strong> yang proporsional, border ganda emas elegan, serta jarak antar tulisan dirapikan untuk 8 varian ukuran botol (3ML, 8ML, 10ML, 15ML, 20ML, 30ML, 50ML, 100ML).
              </p>
            </div>

            {/* Quick action buttons & photo reference link */}
            <div className="flex flex-wrap sm:flex-nowrap gap-3 shrink-0">
              <button
                onClick={() => setIsReferenceModalOpen(true)}
                className="py-2.5 px-4 bg-neutral-800/90 hover:bg-neutral-800 text-neutral-200 text-xs font-medium rounded-xl border border-neutral-700/80 flex items-center gap-2 transition-colors"
              >
                <Eye className="w-4 h-4 text-amber-400" />
                <span>Bandingkan Foto Contoh</span>
              </button>

              <button
                onClick={() => setIsPrintModalOpen(true)}
                className="py-2.5 px-4 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 text-xs font-semibold rounded-xl border border-amber-500/30 flex items-center gap-2 transition-colors"
              >
                <Printer className="w-4 h-4 text-amber-400" />
                <span>Layout Cetak A4 / PDF</span>
              </button>
            </div>
          </div>

          {/* Stats Bar (Unboxed text with separators per Zero-Pill rule) */}
          <div className="mt-5 pt-4 border-t border-neutral-800/80 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-neutral-400">
            <div className="flex items-center gap-1.5">
              <span className="text-white font-semibold">10 Varian Aroma</span>
              <span className="text-neutral-500">·</span>
              <span className="text-neutral-400">Ciel Doré s/d Pure Éclat</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-white font-semibold">8 Takaran ML</span>
              <span className="text-neutral-500">·</span>
              <span className="text-neutral-400">3ML, 8ML, 10ML, 15ML, 20ML, 30ML, 50ML, 100ML</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-white font-semibold">Total 80 Stiker</span>
              <span className="text-neutral-500">·</span>
              <span className="text-emerald-400 font-medium">Siap Cetak 300 DPI</span>
            </div>
          </div>
        </section>

        {/* Live Studio Controls (Font Graffiti, Brand Size, Gold Tone, Letter Spacing) */}
        <StudioControls
          config={config}
          onChange={setConfig}
          isOpen={isControlsOpen}
          onToggle={() => setIsControlsOpen(!isControlsOpen)}
        />

        {/* Filter & Toolbar Area */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-neutral-900/60 p-4 rounded-xl border border-neutral-800">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari aroma (misal: Ciel Doré, Soir Prestige, 100ML)..."
                className="w-full bg-neutral-950 border border-neutral-700/80 rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Segmented Controls: Group By View */}
            <div className="flex items-center gap-1 p-1 bg-neutral-950 rounded-lg border border-neutral-800 text-xs shrink-0">
              <button
                type="button"
                onClick={() => setGroupBy('aroma')}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                  groupBy === 'aroma'
                    ? 'bg-neutral-800 text-white shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Grup per Aroma (10)
              </button>
              <button
                type="button"
                onClick={() => setGroupBy('size')}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                  groupBy === 'size'
                    ? 'bg-neutral-800 text-white shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Grup per Ukuran (8 ML)
              </button>
              <button
                type="button"
                onClick={() => setGroupBy('all')}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                  groupBy === 'all'
                    ? 'bg-neutral-800 text-white shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Semua ({filteredStickers.length})
              </button>
            </div>
          </div>

          {/* Quick Select Buttons for Aroma & Size */}
          <div className="space-y-2">
            {/* Quick Aroma Filter Buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
              <span className="text-neutral-500 text-[11px] uppercase font-semibold tracking-wider shrink-0 mr-1">
                Aroma:
              </span>
              <button
                type="button"
                onClick={() => setSelectedAromaId('all')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium shrink-0 transition-colors ${
                  selectedAromaId === 'all'
                    ? 'bg-amber-500 text-neutral-950 font-semibold'
                    : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800'
                }`}
              >
                Semua Aroma (10)
              </button>
              {aromas.map((a) => (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => setSelectedAromaId(a.id)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium shrink-0 transition-colors ${
                    selectedAromaId === a.id
                      ? 'bg-amber-500 text-neutral-950 font-semibold'
                      : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800'
                  }`}
                >
                  #{a.number} {a.name}
                </button>
              ))}
            </div>

            {/* Quick Size Filter Buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
              <span className="text-neutral-500 text-[11px] uppercase font-semibold tracking-wider shrink-0 mr-1">
                Ukuran:
              </span>
              <button
                type="button"
                onClick={() => setSelectedSizeId('all')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium shrink-0 transition-colors ${
                  selectedSizeId === 'all'
                    ? 'bg-amber-500 text-neutral-950 font-semibold'
                    : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800'
                }`}
              >
                Semua ML (8)
              </button>
              {sizes.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSelectedSizeId(s.id)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium shrink-0 transition-colors ${
                    selectedSizeId === s.id
                      ? 'bg-amber-500 text-neutral-950 font-semibold'
                      : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800'
                  }`}
                >
                  {s.value}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery of 80 Stickers */}
        <section className="space-y-8">
          {filteredStickers.length === 0 ? (
            <div className="py-16 text-center bg-neutral-900/40 rounded-2xl border border-neutral-800 p-8">
              <Search className="w-8 h-8 text-neutral-600 mx-auto mb-3" />
              <h3 className="text-sm font-semibold text-white">Tidak ada stiker yang cocok</h3>
              <p className="text-xs text-neutral-400 mt-1">
                Coba sesuaikan kata kunci pencarian atau reset filter aroma / ukuran.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedAromaId('all');
                  setSelectedSizeId('all');
                }}
                className="mt-4 px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-xs text-white rounded-lg transition-colors"
              >
                Reset Semua Filter
              </button>
            </div>
          ) : groupBy === 'aroma' ? (
            /* GROUPED BY AROMA (10 Sections, each containing the 8 ML sizes) */
            <div className="space-y-10">
              {aromas
                .filter((a) => selectedAromaId === 'all' || a.id === selectedAromaId)
                .map((aroma) => {
                  const aromaStickers = filteredStickers.filter((s) => s.aroma.id === aroma.id);
                  if (aromaStickers.length === 0) return null;

                  return (
                    <div key={aroma.id} className="space-y-4">
                      {/* Aroma Section Header */}
                      <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs font-bold flex items-center justify-center">
                            #{aroma.number}
                          </span>
                          <div>
                            <h2 className="text-base sm:text-lg font-bold text-white tracking-wide flex items-center gap-2">
                              <span>{aroma.name}</span>
                              <span className="text-xs font-normal text-neutral-400 font-sans">
                                ({aromaStickers.length} Varian Ukuran)
                              </span>
                            </h2>
                            {aroma.character && (
                              <p className="text-xs text-neutral-500">{aroma.character}</p>
                            )}
                          </div>
                        </div>

                        {/* Quick mockup for this aroma */}
                        <button
                          onClick={() => setMockupTarget({ aroma: aroma.name, size: '30 ML' })}
                          className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Simulasi Botol</span>
                        </button>
                      </div>

                      {/* 8 Stickers Grid for this Aroma */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
                        {aromaStickers.map(({ size }) => (
                          <StickerCard
                            key={`${aroma.id}-${size.id}`}
                            aromaName={aroma.name}
                            aromaNumber={aroma.number}
                            sizeValue={size.value}
                            config={config}
                            onInspect={(aName, sVal) => setInspectTarget({ aroma: aName, size: sVal })}
                            onPreviewBottle={(aName, sVal) => setMockupTarget({ aroma: aName, size: sVal })}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
            </div>
          ) : groupBy === 'size' ? (
            /* GROUPED BY SIZE (8 Sections, each containing the 10 Aromas) */
            <div className="space-y-10">
              {sizes
                .filter((s) => selectedSizeId === 'all' || s.id === selectedSizeId)
                .map((size) => {
                  const sizeStickers = filteredStickers.filter((item) => item.size.id === size.id);
                  if (sizeStickers.length === 0) return null;

                  return (
                    <div key={size.id} className="space-y-4">
                      {/* Size Section Header */}
                      <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
                        <div className="flex items-center gap-3">
                          <span className="px-3 py-1 rounded-lg bg-neutral-800 text-amber-400 font-bold text-sm">
                            {size.value}
                          </span>
                          <div>
                            <h2 className="text-base font-semibold text-white">
                              Varian Ukuran {size.value}
                            </h2>
                            <p className="text-xs text-neutral-500">
                              Tersedia untuk semua {sizeStickers.length} aroma parfum
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* 10 Stickers Grid for this size */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-3 sm:gap-4">
                        {sizeStickers.map(({ aroma }) => (
                          <StickerCard
                            key={`${aroma.id}-${size.id}`}
                            aromaName={aroma.name}
                            aromaNumber={aroma.number}
                            sizeValue={size.value}
                            config={config}
                            onInspect={(aName, sVal) => setInspectTarget({ aroma: aName, size: sVal })}
                            onPreviewBottle={(aName, sVal) => setMockupTarget({ aroma: aName, size: sVal })}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
            </div>
          ) : (
            /* UNIFIED ALL 80 STICKERS GRID */
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredStickers.map(({ aroma, size }) => (
                <StickerCard
                  key={`${aroma.id}-${size.id}`}
                  aromaName={aroma.name}
                  aromaNumber={aroma.number}
                  sizeValue={size.value}
                  config={config}
                  onInspect={(aName, sVal) => setInspectTarget({ aroma: aName, size: sVal })}
                  onPreviewBottle={(aName, sVal) => setMockupTarget({ aroma: aName, size: sVal })}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-neutral-800 bg-neutral-950 py-8 text-neutral-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-serif-luxury font-bold text-white text-sm">
              {config.brandName}
            </span>
            <span>·</span>
            <span>Koleksi 80 Desain Stiker Parfum Siap Produksi</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsReferenceModalOpen(true)}
              className="hover:text-amber-400 transition-colors"
            >
              Foto Referensi
            </button>
            <button
              onClick={() => setIsPrintModalOpen(true)}
              className="hover:text-amber-400 transition-colors"
            >
              Lembar Cetak A4
            </button>
            <button
              onClick={handleDownloadAllZip}
              className="hover:text-amber-400 transition-colors text-amber-400/90 font-medium"
            >
              Download Semua (ZIP)
            </button>
          </div>
        </div>
      </footer>

      {/* MODALS */}

      {/* 1. Detail / Inspector Modal */}
      {inspectTarget && (
        <StickerDetailModal
          isOpen={!!inspectTarget}
          onClose={() => setInspectTarget(null)}
          aromaName={inspectTarget.aroma}
          sizeValue={inspectTarget.size}
          config={config}
          onOpenMockup={() => setMockupTarget(inspectTarget)}
        />
      )}

      {/* 2. 3D Perfume Bottle Mockup Modal */}
      {mockupTarget && (
        <BottlePreviewModal
          isOpen={!!mockupTarget}
          onClose={() => setMockupTarget(null)}
          aromaName={mockupTarget.aroma}
          sizeValue={mockupTarget.size}
          config={config}
        />
      )}

      {/* 3. A4 Printable Sheet Modal */}
      {isPrintModalOpen && (
        <PrintSheetModal
          isOpen={isPrintModalOpen}
          onClose={() => setIsPrintModalOpen(false)}
          aromas={aromas}
          sizes={sizes}
          config={config}
        />
      )}

      {/* 4. Original Reference Photo Comparison Modal */}
      {isReferenceModalOpen && (
        <OriginalReferenceModal
          isOpen={isReferenceModalOpen}
          onClose={() => setIsReferenceModalOpen(false)}
        />
      )}

      {/* Batch ZIP Progress Toast Modal */}
      {zipProgress.isActive && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 max-w-md w-full shadow-2xl text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto">
              <RefreshCw className="w-6 h-6 animate-spin" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">
                Membuat 80 Stiker HD & ZIP
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
                {zipProgress.message}
              </p>
            </div>
            <div className="w-full bg-neutral-950 rounded-full h-2 overflow-hidden border border-neutral-800">
              <div 
                className="bg-amber-500 h-full transition-all duration-200"
                style={{ width: `${(zipProgress.current / zipProgress.total) * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-neutral-500 font-mono">
              <span>{zipProgress.current} dari {zipProgress.total} stiker</span>
              <span>{Math.round((zipProgress.current / zipProgress.total) * 100)}%</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
