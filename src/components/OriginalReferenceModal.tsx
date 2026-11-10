import React from 'react';
import { X, Image as ImageIcon, ExternalLink, CheckCircle } from 'lucide-react';

interface OriginalReferenceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OriginalReferenceModal: React.FC<OriginalReferenceModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-semibold text-white">
              Foto Asli Referensi & Daftar 10 Aroma
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 bg-neutral-950/60">
          {/* Card 1: Original Sticker Sample */}
          <div className="flex flex-col bg-neutral-900 border border-neutral-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-amber-400">
                1. Foto Stiker Contoh (Ciel Doré 3ML)
              </span>
              <span className="text-[11px] text-neutral-400">LifeStruggel</span>
            </div>
            <div className="flex-1 flex items-center justify-center bg-black/70 rounded-lg p-2 min-h-[340px]">
              <img
                src="/public/assets/aistudio/IMG-20261110-WA0075_5817f643.jpg"
                alt="Foto Stiker Contoh LifeStruggel"
                className="max-h-[380px] w-auto object-contain rounded shadow-lg"
              />
            </div>
            <div className="mt-3 text-[11px] text-neutral-300 space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                <span>Nama Toko <strong>"LifeStruggel"</strong> dipertahankan & diperbesar</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                <span>Double frame emas logam mewah & aksen garis bawah</span>
              </div>
            </div>
          </div>

          {/* Card 2: 10 Aroma List Screenshot */}
          <div className="flex flex-col bg-neutral-900 border border-neutral-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-amber-400">
                2. Tangkapan Layar Daftar 10 Aroma
              </span>
              <span className="text-[11px] text-neutral-400">Pilihan 3</span>
            </div>
            <div className="flex-1 flex items-center justify-center bg-black/70 rounded-lg p-2 min-h-[340px]">
              <img
                src="/public/assets/aistudio/Screenshot_20261110_174249_c6002406.jpg"
                alt="Daftar 10 Aroma Parfum"
                className="max-h-[380px] w-auto object-contain rounded shadow-lg"
              />
            </div>
            <div className="mt-3 text-[11px] text-neutral-300 space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                <span>10 Nama Aroma asli lengkap dari Ciel Doré hingga Pure Éclat</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                <span>Font estetik grafiti dengan jarak huruf rapi & proporsional</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
