import React from 'react';

interface FitCheckLogoProps {
  variant?: 'full' | 'horizontal' | 'monogram' | 'badge';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const FitCheckLogo: React.FC<FitCheckLogoProps> = ({
  variant = 'full',
  className = '',
  size = 'md',
}) => {
  if (variant === 'monogram') {
    // FC. Monogram (from IMG_4221.PNG)
    const dim = size === 'sm' ? 36 : size === 'md' ? 48 : size === 'lg' ? 64 : 80;
    return (
      <svg
        width={dim}
        height={dim}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`inline-block shrink-0 ${className}`}
      >
        <rect width="200" height="200" rx="36" fill="#000000" />
        
        {/* Letter F */}
        <path
          d="M62 48H122C128.627 48 134 53.3726 134 60C134 66.6274 128.627 72 122 72H82V96H114C120.627 96 126 101.373 126 108C126 114.627 120.627 120 114 120H82V152C82 158.627 76.6274 164 70 164C63.3726 164 58 158.627 58 152V60C58 53.3726 63.3726 48 70 48H62Z"
          fill="#FFFFFF"
        />

        {/* Letter C (rounded arc) */}
        <path
          d="M128 118C128 112.477 123.523 108 118 108C112.477 108 108 112.477 108 118C108 132.359 96.3594 144 82 144C67.6406 144 56 132.359 56 118C56 103.641 67.6406 92 82 92C87.5228 92 92 87.5228 92 82C92 76.4772 87.5228 72 82 72C56.5949 72 36 92.5949 36 118C36 143.405 56.5949 164 82 164C107.405 164 128 143.405 128 118Z"
          fill="#FFFFFF"
        />

        {/* Orange checkmark cutting dynamically */}
        <path
          d="M74 128L92 146C95.5 149.5 101 148.5 103.5 144L156 56C160 50 155 42 147 46L98 134L79 116C75 112 69 118 74 128Z"
          fill="#FF914D"
        />

        {/* Orange Period Dot */}
        <circle cx="150" cy="156" r="10" fill="#FF914D" />
      </svg>
    );
  }

  // Primary Horizontal / Stacked Logo (from IMG_4914.PNG)
  const isHorizontal = variant === 'horizontal';

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Orange Circle Checkmark Icon */}
      <div
        className={`relative shrink-0 rounded-full flex items-center justify-center bg-[#FF914D] shadow-lg shadow-[#FF914D]/25 ${
          size === 'sm'
            ? 'w-9 h-9'
            : size === 'md'
            ? 'w-12 h-12'
            : size === 'lg'
            ? 'w-16 h-16'
            : 'w-20 h-20'
        }`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={
            size === 'sm'
              ? 'w-5 h-5'
              : size === 'md'
              ? 'w-7 h-7'
              : size === 'lg'
              ? 'w-9 h-9'
              : 'w-11 h-11'
          }
        >
          <path d="M5 12.5L9.5 17L19 7.5" />
        </svg>
      </div>

      {/* Brand Typography */}
      <div className={`flex ${isHorizontal ? 'flex-row items-baseline gap-1.5' : 'flex-col leading-none'} font-display font-extrabold`}>
        <div className="flex items-baseline">
          <span
            className={`text-white tracking-tight ${
              size === 'sm'
                ? 'text-xl'
                : size === 'md'
                ? 'text-2xl sm:text-3xl'
                : size === 'lg'
                ? 'text-3xl sm:text-4xl'
                : 'text-4xl sm:text-5xl'
            }`}
          >
            Fit
          </span>
          <span
            className={`text-[#FF914D] tracking-tight ${
              size === 'sm'
                ? 'text-xl'
                : size === 'md'
                ? 'text-2xl sm:text-3xl'
                : size === 'lg'
                ? 'text-3xl sm:text-4xl'
                : 'text-4xl sm:text-5xl'
            }`}
          >
            Check<span className="text-[#FF914D]">.</span>
          </span>
        </div>
      </div>
    </div>
  );
};
