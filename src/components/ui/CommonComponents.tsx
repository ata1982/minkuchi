import React from 'react';
import { cn } from '@/lib/utils';

// Badge Component
interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'success' | 'warning' | 'error' | 'info' | 'gray';
  children: React.ReactNode;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'gray', children, ...props }, ref) => (
    <span
      ref={ref}
      className={cn("badge", `badge-${variant}`, className)}
      {...props}
    >
      {children}
    </span>
  )
);
Badge.displayName = "Badge";

// Modal Components
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

interface ModalHeaderProps {
  title: string;
  onClose: () => void;
  subtitle?: string;
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({ title, subtitle, onClose }) => (
  <div className="modal-header">
    <div>
      <h2 className="modal-title">{title}</h2>
      {subtitle && <p className="text-slate-600 text-sm mt-1">{subtitle}</p>}
    </div>
    <button onClick={onClose} className="modal-close">
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
      </svg>
    </button>
  </div>
);

interface ModalBodyProps {
  children: React.ReactNode;
}

export const ModalBody: React.FC<ModalBodyProps> = ({ children }) => (
  <div className="modal-body">{children}</div>
);

interface ModalFooterProps {
  children: React.ReactNode;
}

export const ModalFooter: React.FC<ModalFooterProps> = ({ children }) => (
  <div className="modal-footer">{children}</div>
);

// Rating Component
interface RatingProps {
  value: number;
  onChange?: (rating: number) => void;
  readonly?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Rating: React.FC<RatingProps> = ({ 
  value, 
  onChange, 
  readonly = false, 
  size = 'md' 
}) => {
  const [hovered, setHovered] = React.useState(0);
  
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <div className="rating-stars">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readonly}
          onClick={() => onChange?.(star)}
          onMouseEnter={() => !readonly && setHovered(star)}
          onMouseLeave={() => !readonly && setHovered(0)}
          className={cn(
            "transition-colors",
            readonly ? "cursor-default" : "cursor-pointer hover:scale-110 transform",
            star <= (hovered || value) ? "star-active" : "star-inactive"
          )}
        >
          <svg
            className={sizeClasses[size]}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </button>
      ))}
    </div>
  );
};

// Form Field Component
interface FormFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  help?: string;
  children: React.ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({ 
  label, 
  required, 
  error, 
  help, 
  children 
}) => (
  <div className="space-y-2">
    <label className={cn("label", required && "label-required")}>
      {label}
    </label>
    {children}
    {error && <p className="error-text">{error}</p>}
    {help && <p className="help-text">{help}</p>}
  </div>
);

// Input Component
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => (
    <input
      ref={ref}
      className={cn("input-field", error && "input-error", className)}
      {...props}
    />
  )
);
Input.displayName = "Input";

// Textarea Component
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn("input-field resize-none", error && "input-error", className)}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";

// Image Upload Component
interface ImageUploadProps {
  onFilesChange: (files: File[]) => void;
  maxFiles?: number;
  accept?: string;
  dragActive?: boolean;
  onDragActive?: (active: boolean) => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  onFilesChange,
  maxFiles = 5,
  accept = "image/*",
  dragActive = false,
  onDragActive
}) => {
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      onDragActive?.(true);
    } else if (e.type === "dragleave") {
      onDragActive?.(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onDragActive?.(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      onFilesChange(files.slice(0, maxFiles));
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      onFilesChange(files.slice(0, maxFiles));
    }
  };

  return (
    <label className={cn("upload-zone", dragActive && "upload-zone-active")}>
      <input
        type="file"
        multiple
        accept={accept}
        onChange={handleFileInput}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className="sr-only"
      />
      <svg className="w-8 h-8 text-slate-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
      </svg>
      <p className="text-sm text-slate-600">クリックまたはドラッグして写真を追加</p>
      <p className="text-xs text-slate-500 mt-1">最大{maxFiles}枚まで</p>
    </label>
  );
};

export type { 
  BadgeProps, 
  ModalProps, 
  RatingProps, 
  FormFieldProps, 
  InputProps, 
  TextareaProps,
  ImageUploadProps 
};