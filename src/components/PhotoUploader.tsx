import React, { useRef, useState } from 'react';
import { UploadCloud, Image as ImageIcon, CheckCircle, Trash2, HelpCircle, Eye, FileCheck, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PhotoUploaderProps {
  id: string;
  label: string;
  subtext?: string;
  required?: boolean;
  type: 'frontal' | 'lateral' | 'comprovante';
  file: File | null;
  preview: string;
  fileName?: string;
  error?: string;
  onFileChange: (file: File | null, previewUrl: string) => void;
  onOpenGuideline?: () => void;
  accept?: string;
}

export const PhotoUploader: React.FC<PhotoUploaderProps> = ({
  id,
  label,
  subtext,
  required = true,
  type,
  file,
  preview,
  fileName,
  error,
  onFileChange,
  onOpenGuideline,
  accept = 'image/jpeg,image/png,image/webp,image/heic,application/pdf',
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const isPdf = file?.type === 'application/pdf' || fileName?.toLowerCase().endsWith('.pdf');

  const handleFile = (selectedFile: File) => {
    if (!selectedFile) return;

    if (selectedFile.type === 'application/pdf') {
      onFileChange(selectedFile, '');
    } else {
      const previewUrl = URL.createObjectURL(selectedFile);
      onFileChange(selectedFile, previewUrl);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    onFileChange(null, '');
  };

  return (
    <div className="w-full">
      {/* Header Label and Help */}
      <div className="flex items-center justify-between mb-2">
        <label htmlFor={id} className="block text-sm font-semibold text-stone-800">
          {label} {required && <span className="text-rose-500 font-bold">*</span>}
        </label>
        {onOpenGuideline && (
          <button
            type="button"
            onClick={onOpenGuideline}
            className="text-xs text-rose-600 hover:text-rose-700 font-medium inline-flex items-center gap-1 hover:underline cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Guia de foto</span>
          </button>
        )}
      </div>

      {subtext && <p className="text-xs text-stone-500 mb-2">{subtext}</p>}

      {/* Hidden File Input */}
      <input
        ref={inputRef}
        id={id}
        type="file"
        accept={accept}
        onChange={handleInputChange}
        className="hidden"
      />

      {/* Dropzone Container */}
      {!file ? (
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all duration-200 group ${
            isDragging
              ? 'border-rose-500 bg-rose-50/80 scale-[1.01]'
              : error
              ? 'border-red-400 bg-red-50/30 hover:bg-red-50/50'
              : 'border-stone-200 hover:border-rose-300 bg-white hover:bg-rose-50/20'
          }`}
        >
          <div className="w-12 h-12 rounded-full bg-rose-100/70 text-rose-600 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
            <UploadCloud className="w-6 h-6" />
          </div>

          <p className="text-sm font-semibold text-stone-700 group-hover:text-rose-600 transition-colors">
            Clique para enviar ou arraste a imagem
          </p>
          <p className="text-xs text-stone-500 mt-1">
            {type === 'comprovante' ? 'JPG, PNG ou PDF (máx. 10MB)' : 'JPG, PNG ou WEBP em boa resolução'}
          </p>

          <div className="mt-3">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-rose-50 text-rose-700 border border-rose-100">
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Selecionar arquivo</span>
            </span>
          </div>
        </div>
      ) : (
        /* Uploaded State / Preview */
        <div className="relative border border-emerald-200 rounded-2xl p-4 bg-emerald-50/30 overflow-hidden">
          <div className="flex items-center gap-4">
            {/* Thumbnail or Icon */}
            {preview && !isPdf ? (
              <div className="relative w-20 h-24 rounded-xl overflow-hidden bg-stone-100 border border-stone-200 shrink-0 group">
                <img
                  src={preview}
                  alt={label}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsZoomed(true);
                  }}
                  className="absolute inset-0 bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Ampliar imagem"
                >
                  <Eye className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="w-16 h-20 rounded-xl bg-emerald-100 text-emerald-700 flex flex-col items-center justify-center shrink-0 border border-emerald-200">
                <FileCheck className="w-8 h-8" />
                <span className="text-[10px] font-bold mt-1 uppercase">{isPdf ? 'PDF' : 'ARQUIVO'}</span>
              </div>
            )}

            {/* Info and Actions */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-1">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Arquivo anexado com sucesso</span>
              </div>
              <p className="text-sm font-semibold text-stone-800 truncate">
                {file.name || fileName || 'Arquivo selecionado'}
              </p>
              <p className="text-xs text-stone-500 mt-0.5">
                {(file.size / (1024 * 1024)).toFixed(2)} MB
              </p>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 mt-3">
                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  className="inline-flex items-center gap-1 text-xs font-medium text-stone-600 hover:text-stone-900 px-2.5 py-1 rounded-lg bg-white border border-stone-200 hover:bg-stone-50 transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3 text-stone-500" />
                  <span>Trocar</span>
                </button>
                <button
                  type="button"
                  onClick={handleRemove}
                  className="inline-flex items-center gap-1 text-xs font-medium text-rose-600 hover:text-rose-700 px-2.5 py-1 rounded-lg bg-white border border-rose-200 hover:bg-rose-50 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3 h-3 text-rose-500" />
                  <span>Remover</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <p className="text-xs font-medium text-red-600 mt-1.5 flex items-center gap-1">
          <span>⚠️</span> {error}
        </p>
      )}

      {/* Zoom Modal for Photo Preview */}
      <AnimatePresence>
        {isZoomed && preview && (
          <div
            onClick={() => setIsZoomed(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-xs cursor-zoom-out"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-2xl max-h-[85vh] bg-stone-900 rounded-2xl overflow-hidden shadow-2xl p-2"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={preview}
                alt="Visualização da foto"
                className="w-full h-full max-h-[80vh] object-contain rounded-xl"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-xs text-white text-xs px-3 py-2 rounded-lg flex items-center justify-between">
                <span>{label}</span>
                <button
                  type="button"
                  onClick={() => setIsZoomed(false)}
                  className="text-rose-300 hover:text-white font-semibold cursor-pointer"
                >
                  Fechar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
