import { useRef, useEffect, useState, useId } from 'react';

export default function MeltedImage({
  imgSrc,
  imgAlt,
  turbulenceBaseFrequency = 0.05,
  turbulenceNumOctaves = 3,
  turbulenceSeed,
  turbulenceType = 'fractalNoise',
  displacementInactiveScale = 1,
  displacementActiveScale = 100,
  displacementXChannelSelector = 'R',
  displacementYChannelSelector = 'G',
}) {
  const id = useId();
  const filterId = `glass-distortion-${id.replace(/:/g, '')}`;

  const [isParentHovered, setIsParentHovered] = useState(false);
  const [isSelfHovered, setIsSelfHovered] = useState(false);

  const displacementRef = useRef(null);
  const reqRef = useRef(null);
  const currentScaleRef = useRef(displacementInactiveScale);
  const sensorRef = useRef(null);

  const resolvedBaseFrequency = Array.isArray(turbulenceBaseFrequency)
    ? turbulenceBaseFrequency.join(' ')
    : String(turbulenceBaseFrequency);

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
    const isActive = isParentHovered || isSelfHovered;
    const targetScale = isActive ? displacementActiveScale : displacementInactiveScale;

    const animate = () => {
      const diff = targetScale - currentScaleRef.current;

      if (Math.abs(diff) < 0.5) {
        currentScaleRef.current = targetScale;
        if (displacementRef.current) {
          displacementRef.current.scale.baseVal = targetScale;
        }
        if (targetScale === 1 && currentScaleRef.current === 1) return;
      } else {
        currentScaleRef.current += diff * 0.05;
        if (displacementRef.current) {
          displacementRef.current.scale.baseVal = currentScaleRef.current;
        }
      }

      reqRef.current = requestAnimationFrame(animate);
    };

    reqRef.current = requestAnimationFrame(animate);
    return () => {
      if (reqRef.current) cancelAnimationFrame(reqRef.current);
    };
  }, [
    isParentHovered,
    isSelfHovered,
    displacementActiveScale,
    displacementInactiveScale,
  ]);

  useEffect(() => {
    const isActive = isParentHovered || isSelfHovered;
    if (isActive) return;

    currentScaleRef.current = displacementInactiveScale;
    if (displacementRef.current) {
      displacementRef.current.scale.baseVal = displacementInactiveScale;
    }
  }, [displacementInactiveScale, isParentHovered, isSelfHovered]);

  const distortionStyle = { filter: `url(#${filterId})` };

  return (
    <div
      className="relative inline-block"
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
        className="absolute top-0 left-0 w-0 h-0 pointer-events-none opacity-0 group-hover/avatar-link:w-[1px]"
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

      <div className="rounded-full w-10 h-10 flex items-center justify-center overflow-hidden relative transform-gpu">
        <div
          className="absolute inset-0 bg-white/20 backdrop-blur-none group-hover/avatar-link:backdrop-blur-[3px] opacity-0 group-hover/avatar-link:opacity-100 transition-all duration-300 ease-out pointer-events-none rounded-full z-20"
          style={distortionStyle}
        />

        <div className="group-hover/avatar-link:opacity-100 transition-all duration-[600ms] opacity-0 ease-out absolute text-ocean top-0 bottom-0 blur-[1px] left-0 right-0 m-auto w-10 h-10 flex items-center justify-center z-30 pointer-events-none rotate-[60deg] group-hover/avatar-link:rotate-0 mix-blend-plus-lighter">
          <svg
            width="42"
            height="11"
            viewBox="0 0 42 11"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M42 5.15466C42 16.7526 32.598 5.15466 21 5.15466C9.40202 5.15466 0 16.7526 0 5.15466C0 -6.44332 9.40202 5.15466 21 5.15466C32.598 5.15466 42 -6.44332 42 5.15466Z" />
          </svg>
        </div>

        <div
          className="group-hover/avatar-link:opacity-100 absolute inset-0 bg-cover bg-center blur-[2px] translate-x-1 opacity-0 mix-blend-screen bg-sand/10 transition-opacity duration-300 z-10"
          style={{ ...distortionStyle, backgroundImage: `url('${imgSrc}')` }}
        />

        <div
          className="group-hover/avatar-link:opacity-100 absolute inset-0 bg-cover bg-center blur-[2px] -translate-x-1 opacity-0 mix-blend-screen bg-slate/20 transition-opacity duration-300 z-10"
          style={{ ...distortionStyle, backgroundImage: `url('${imgSrc}')` }}
        />

        <img src={imgSrc} alt={imgAlt} className="w-10 h-10 object-cover relative z-0" />
      </div>
    </div>
  );
}
