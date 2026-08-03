type BrandLogoKind = 'symbol' | 'wordmark';
type BrandLogoTone = 'dark' | 'light' | 'theme';

interface BrandLogoProps {
  className?: string;
  imageClassName?: string;
  kind?: BrandLogoKind;
  label?: string;
  tone?: BrandLogoTone;
}

const logoSources: Record<BrandLogoKind, { dark: string; light: string }> = {
  symbol: {
    dark: '/brand/chy3-symbol-dark.png',
    light: '/brand/chy3-symbol-light.png',
  },
  wordmark: {
    dark: '/brand/chy3-logo-dark.png',
    light: '/brand/chy3-logo-light.png',
  },
};

function Chy3Wordmark({ className = '' }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 font-display ${className}`.trim()}
      aria-hidden="true"
    >
      <span className="text-[1.65em] font-black tracking-[-0.03em] text-current">CHY3</span>
      <span className="mt-1 h-[1px] w-6 bg-current opacity-40" />
    </span>
  );
}

function Chy3Symbol({ className = '' }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center justify-center font-display text-[2.2em] font-black leading-none tracking-[-0.03em] text-current ${className}`.trim()}
      aria-hidden="true"
    >
      <span className="bg-[linear-gradient(to_bottom_right,#4a9eff,#8b6532)] bg-clip-text text-center text-transparent">
         CH3
      </span>
    </span>
  );
}

export default function BrandLogo({
  className = '',
  imageClassName: _imageClassName = '',
  kind = 'wordmark',
  label = 'CHY3',
  tone = 'theme',
}: BrandLogoProps) {
  const pngExists = false; // Use text-based fallback until PNG assets are added

  if (kind === 'symbol') {
    return (
      <span aria-label={label} className={className} role="img">
        <Chy3Symbol />
      </span>
    );
  }

  const sources = logoSources[kind];

  if (pngExists) {
    return (
      <span
        aria-label={label}
        className={`brand-logo brand-logo-${kind} brand-logo-tone-${tone} ${className}`.trim()}
        role="img"
      >
        <img
          alt=""
          aria-hidden="true"
          className="brand-logo-image brand-logo-image-dark"
          decoding="async"
          src={sources.dark}
        />
        <img
          alt=""
          aria-hidden="true"
          className="brand-logo-image brand-logo-image-light"
          decoding="async"
          src={sources.light}
        />
      </span>
    );
  }

  return (
    <span aria-label={label} className={className} role="img">
      <Chy3Wordmark />
    </span>
  );
}
