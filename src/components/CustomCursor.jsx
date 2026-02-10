import { useEffect, useRef } from 'react';

export default function CustomCursor({
  bgColor = 'bg-white',
  arrowColor = 'text-deep-charcoal',
  active = false,
  blendBackground = false,
  blendBackgroundClassName = 'mix-blend-overlay',
}) {
  const cursorRef = useRef(null);
  const rafRef = useRef(null);
  const lastPointerPosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handlePointerMove = (e) => {
      lastPointerPosRef.current = { x: e.clientX, y: e.clientY };

      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const cursorEl = cursorRef.current;
        if (!cursorEl) return;
        cursorEl.style.left = `${lastPointerPosRef.current.x}px`;
        cursorEl.style.top = `${lastPointerPosRef.current.y}px`;
      });
    };

    window.addEventListener('pointermove', handlePointerMove);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className={`custom-cursor fixed left-0 top-0 z-50 pointer-events-none -translate-x-1/2 -translate-y-1/2 ${
        active ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
        className={`${bgColor} ${arrowColor} rounded-full p-6 ${
          blendBackground ? blendBackgroundClassName : ''
        }`}
      >
        <svg
          width="33"
          height="33"
          viewBox="0 0 33 33"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M32.108 0.000129588L32.167 27.2683H27.4453V8.02712L3.30529 32.2261L6.29236e-05 28.9209L24.1401 4.72189H4.95791V0.000129588H32.108Z"
          />
        </svg>
      </div>
    </div>
  );
}
