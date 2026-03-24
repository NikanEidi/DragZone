import React, { useState, useCallback } from "react";
import { UploadCloud, X } from "lucide-react";

/**
 * Props for the FileUploadModal
 * @interface FileUploadModalProps
 */
interface FileUploadModalProps {
  /** Boolean indicating if modal is visible */
  isOpen: boolean;
  /** Callback to close the modal */
  onClose: () => void;
  /** Function to handle the actual FileList, piped from useDragonAgent */
  onUpload: (files: FileList) => Promise<void>;
  /** Boolean indicating if upload is currently processing */
  isUploading: boolean;
}

/**
 * A highly stylized drag-and-drop zone for injecting context (PDFs, Images, Code).
 * Features neon borders that react to drag states.
 * 
 * @param {FileUploadModalProps} props
 * @returns {JSX.Element | null}
 */
export function FileUploadModal({ isOpen, onClose, onUpload, isUploading }: FileUploadModalProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      await onUpload(e.dataTransfer.files);
      onClose();
    }
  }, [onUpload, onClose]);

  const handleFileSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      await onUpload(e.target.files);
      onClose();
    }
  }, [onUpload, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#0a0a0a]/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-lg bg-[#0a0a0a] border-2 border-[#A020F0] shadow-[0_0_40px_rgba(160,32,240,0.4)] p-8 flex flex-col gap-6 transform transition-all scale-100 opacity-100">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b border-[#A020F0]/30 pb-4">
          <h2 className="font-pixel text-[#00F3FF] text-sm uppercase tracking-widest text-shadow-[0_0_10px_#00F3FF]">
            Inject Context
          </h2>
          <button onClick={onClose} className="text-[#A020F0] hover:text-[#00F3FF] transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Dropzone */}
        <div 
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            relative flex flex-col items-center justify-center p-12 text-center transition-all duration-300
            border-2 border-dashed
            ${isDragging ? 'border-[#00F3FF] bg-[#00F3FF]/10 shadow-[inset_0_0_20px_rgba(0,243,255,0.2)]' : 'border-[#A020F0]/50 bg-[#A020F0]/5 hover:bg-[#A020F0]/10'}
          `}
        >
          {isUploading ? (
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-[#A020F0] border-t-[#00F3FF] rounded-full animate-spin shadow-[0_0_15px_#00F3FF]" />
              <span className="font-mono text-[#00F3FF] animate-pulse">Processing Uplink...</span>
            </div>
          ) : (
            <>
              <UploadCloud size={48} className={`mb-4 transition-colors ${isDragging ? 'text-[#00F3FF] drop-shadow-[0_0_10px_#00F3FF]' : 'text-[#A020F0]'}`} />
              <p className="font-mono text-gray-300 mb-2">Drag & drop schematic files here</p>
              <p className="font-mono text-xs text-[#A020F0] opacity-80 mb-6">Supports PDF, PNG, TS, MD (Max 50MB)</p>
              
              <label className="cursor-pointer">
                <span className="font-mono text-sm tracking-widest text-[#0a0a0a] bg-[#00F3FF] hover:bg-[#A020F0] hover:text-white px-6 py-2 transition-all duration-300 shadow-[0_0_15px_rgba(0,243,255,0.6)]">
                  BROWSE FILES
                </span>
                <input type="file" className="hidden" multiple onChange={handleFileSelect} />
              </label>
            </>
          )}
        </div>
        
        {/* Footer decoration */}
        <div className="flex justify-between items-center text-[10px] font-mono text-[#A020F0]/60">
          <span>SYS.SECURE_LINE</span>
          <span>DRAGZONE_V1.0</span>
        </div>
      </div>
    </div>
  );
}
