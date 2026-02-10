import { memo, useEffect, useId, useRef, useState } from 'react';

function MeltedImage({
  imgSrc,
  imgAlt,
  size = 40,
  aspectRatio = 1,
  cornerRadius = '9999px',
  stretch = false,
  mode = 'default',
  turbulenceBaseFrequency = 0.05,
  turbulenceNumOctaves = 3,
  turbulenceSeed,
  turbulenceType = 'fractalNoise',
  displacementInactiveScale = 1,
  displacementActiveScale = 100,
  displacementXChannelSelector = 'R',
  displacementYChannelSelector = 'G',
  iconColor,
}) {
  const id = useId();
  const filterId = `glass-distortion-${id.replace(/:/g, '')}`;

  const [isParentHovered, setIsParentHovered] = useState(false);
  const [isSelfHovered, setIsSelfHovered] = useState(false);

  const displacementRef = useRef(null);
  const reqRef = useRef(null);
  const currentScaleRef = useRef(displacementInactiveScale);
  const sensorRef = useRef(null);
  const imgRef = useRef(null);

  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const isHovered = isParentHovered || isSelfHovered;
  const isEffectActive = mode === 'inverted' ? !isHovered : isHovered;

  const resolvedBaseFrequency = Array.isArray(turbulenceBaseFrequency)
    ? turbulenceBaseFrequency.join(' ')
    : String(turbulenceBaseFrequency);

  useEffect(() => {
    setIsImageLoaded(false);
  }, [imgSrc]);

  useEffect(() => {
    const imgEl = imgRef.current;
    if (!imgEl) return;

    if (imgEl.complete && imgEl.naturalWidth > 0) {
      setIsImageLoaded(true);
    }
  }, [imgSrc]);

  useEffect(() => {
    if (!sensorRef.current) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setIsParentHovered(entry.contentRect.width > 0);
      }
    });

    observer.observe(sensorRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reqRef.current) {
      cancelAnimationFrame(reqRef.current);
      reqRef.current = null;
    }

    const displacementEl = displacementRef.current;

    if (!displacementEl) {
      currentScaleRef.current = isEffectActive
        ? displacementActiveScale
        : displacementInactiveScale;
      return;
    }

    if (!isEffectActive) {
      currentScaleRef.current = displacementInactiveScale;
      displacementEl.scale.baseVal = displacementInactiveScale;
      return;
    }

    const targetScale = displacementActiveScale;
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      currentScaleRef.current = targetScale;
      displacementEl.scale.baseVal = targetScale;
      return;
    }

    let isCancelled = false;

    const animate = () => {
      if (isCancelled) return;

      const diff = targetScale - currentScaleRef.current;
      if (Math.abs(diff) < 0.5) {
        currentScaleRef.current = targetScale;
        displacementEl.scale.baseVal = targetScale;
        return;
      }

      currentScaleRef.current += diff * 0.05;
      displacementEl.scale.baseVal = currentScaleRef.current;
      reqRef.current = requestAnimationFrame(animate);
    };

    reqRef.current = requestAnimationFrame(animate);
    return () => {
      isCancelled = true;
      if (reqRef.current) cancelAnimationFrame(reqRef.current);
      reqRef.current = null;
    };
  }, [
    isEffectActive,
    displacementActiveScale,
    displacementInactiveScale,
  ]);

  const distortionStyle = { filter: `url(#${filterId})` };
  const iconStyle = iconColor ? { color: iconColor } : undefined;
  const sizeCss = typeof size === 'number' ? `${size}px` : size;
  const cornerRadiusCss =
    typeof cornerRadius === 'number' ? `${cornerRadius}px` : cornerRadius;
  const resolvedAspectRatio =
    typeof aspectRatio === 'string' ? aspectRatio.replace('/', ' / ') : aspectRatio;

  const wrapperClassName = stretch
    ? 'relative w-full h-full self-stretch'
    : 'relative inline-block';
  const containerStyle = stretch
    ? {
        width: '100%',
        height: '100%',
        borderRadius: cornerRadiusCss,
      }
    : {
        width: sizeCss,
        aspectRatio: resolvedAspectRatio,
        borderRadius: cornerRadiusCss,
      };
  const roundedStyle = { borderRadius: cornerRadiusCss };
  const isImageHidden = mode === 'inverted' && isEffectActive;
  const isIconActive = mode === 'inverted' ? !isHovered : isHovered;
  const shouldShowIcon = isImageLoaded && isIconActive;

  return (
    <div
      className={wrapperClassName}
      onMouseEnter={() => setIsSelfHovered(true)}
      onMouseLeave={() => setIsSelfHovered(false)}
    >
      {/*
        Sensor logic:
        - This hidden div sits inside the component.
        - It has w-0 normally.
        - It gains w-[1px] when the PARENT group is hovered.
        - The ResizeObserver sees this change and triggers React state.

        Requirement: Parent must have className="group/avatar-link".
      */}
      <div
        ref={sensorRef}
        className="absolute top-0 left-0 w-0 h-0 pointer-events-none opacity-0 group-hover/avatar-link:w-px group-hover/avatar-link:h-px"
        aria-hidden="true"
      />

      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id={filterId}>
            <feTurbulence
              type={turbulenceType}
              baseFrequency={resolvedBaseFrequency}
              numOctaves={turbulenceNumOctaves}
              seed={turbulenceSeed}
              result="noise"
            />
            <feDisplacementMap
              ref={displacementRef}
              in="SourceGraphic"
              in2="noise"
              scale={displacementInactiveScale}
              xChannelSelector={displacementXChannelSelector}
              yChannelSelector={displacementYChannelSelector}
            />
          </filter>
        </defs>
      </svg>

      <div
        className="flex items-center justify-center overflow-hidden relative transform-gpu"
        style={containerStyle}
      >
        <div
          className={`absolute inset-0 bg-white/20 transition-all duration-300 ease-out pointer-events-none z-20 ${
            isEffectActive
              ? 'opacity-100 backdrop-blur-[3px]'
              : 'opacity-0 backdrop-blur-none'
          }`}
          style={{ ...distortionStyle, ...roundedStyle }}
        />

        <div
          className={`transition-all duration-600 ease-out absolute text-ocean inset-0 blur-[1px] flex items-center justify-center z-30 pointer-events-none mix-blend-soft-light transform-gpu origin-center ${
            shouldShowIcon
              ? 'opacity-100 rotate-0'
              : 'opacity-0 rotate-\[-90deg\]'
          }`}
          style={iconStyle}
        >
          <svg
            viewBox="0 0 42 11"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid meet"
            style={{ width: '105%', height: '27.5%' }}
          >
            <path d="M42 5.15466C42 16.7526 32.598 5.15466 21 5.15466C9.40202 5.15466 0 16.7526 0 5.15466C0 -6.44332 9.40202 5.15466 21 5.15466C32.598 5.15466 42 -6.44332 42 5.15466Z" />
          </svg>
        </div>

        <div
          className={`absolute inset-0 bg-cover bg-center blur-[2px] translate-x-1 mix-blend-screen bg-sand/10 transition-opacity duration-300 z-10 ${
            isEffectActive ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ ...distortionStyle, backgroundImage: `url('${imgSrc}')` }}
        />

        <div
          className={`absolute inset-0 bg-cover bg-center blur-[2px] -translate-x-1 mix-blend-screen bg-slate/20 transition-opacity duration-300 z-10 ${
            isEffectActive ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ ...distortionStyle, backgroundImage: `url('${imgSrc}')` }}
        />

        <img
          ref={imgRef}
          src={imgSrc}
          alt={imgAlt}
          onLoad={() => setIsImageLoaded(true)}
          onError={() => setIsImageLoaded(false)}
          className={`w-full h-full object-cover relative z-0 transition-opacity duration-300 ${
            isImageHidden ? 'opacity-0' : 'opacity-100'
          }`}
        />
      </div>
    </div>
  );
}

export default memo(MeltedImage);
