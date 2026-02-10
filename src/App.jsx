import { useEffect, useRef, useState } from 'react';
import MeltedImage from './components/MeltedImage.jsx';

const demoImg = 'https://cdn.midjourney.com/b0072aee-4ee4-4917-aead-10b5c03ae98e/0_1.png';

export default function App() {
  const [isCustomCursorActive, setIsCustomCursorActive] = useState(false);
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

  const sectionLinkProps = {
    onPointerEnter: () => setIsCustomCursorActive(true),
    onPointerLeave: () => setIsCustomCursorActive(false),
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#FF4413] ">
      <div
        ref={cursorRef}
        aria-hidden="true"
        className={`custom-cursor fixed left-0 top-0 z-50 pointer-events-none -translate-x-1/2 -translate-y-1/2 ${
          isCustomCursorActive ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="bg-white rounded-full p-6">
          <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M32.108 0.000129588L32.167 27.2683H27.4453V8.02712L3.30529 32.2261L6.29236e-05 28.9209L24.1401 4.72189H4.95791V0.000129588H32.108Z"
              fill="#181817"
            />
          </svg>
        </div>
      </div>
      <header className='p-4 leading-none text-ghost '>
        <h1 className="text-[clamp(72px,14vw,240px)] font-semibold px-4 tracking-tighter m-0">Icebreakr</h1>
        <p className='px-4 text-2xl'>Featured stories on startup founders</p>
      </header>
      <div className="min-h-screen w-full grid grid-cols-1 grid-rows-3 md:grid-cols-2 md:grid-rows-2 gap-0 p-4">
        <section className="grid-appear col-start-1 row-start-1 row-span-1 md:col-start-1 md:row-start-1 md:row-span-2 w-full h-full p-4" style={{ '--appear-delay': '0ms' }}>
          <a
            href="#"
            className="section-link group/avatar-link inline-flex w-full h-full items-stretch bg-ghost relative"
            onClick={(e) => e.preventDefault()}
            {...sectionLinkProps}
          >
            <span className='absolute bottom-4 left-4 z-10 text-[clamp(96px,12vw,240px)] md:text-[clamp(72px,12vw,240px)] font-medium leading-none text-mist mix-blend-multiply group-hover/avatar-link:mix-blend-overlay'>
              Cyra 
              <br />Moon
            </span>
            <span className='absolute top-10 left-6 z-10 text-[clamp(52px,5.5vw,102px)] md:text-[clamp(40px,5.5vw,102px)] font-medium leading-none text-ghost mix-blend-multiply group-hover/avatar-link:mix-blend-overlay'>
              CEO • Founder
              <br />at Lux
            </span>
            <MeltedImage 
              imgSrc={demoImg} 
              imgAlt="Demo avatar" 
              mode="inverted"
              size="100%"
              displacementActiveScale={200}
              turbulenceNumOctaves={200}
              stretch={true}
              cornerRadius='0'
            />
          </a>
        </section>
        <section className="grid-appear col-start-1 row-start-2 md:col-start-2 md:row-start-1 w-full h-full p-4" style={{ '--appear-delay': '80ms' }}>
          <a
            href="#"
            className="section-link group/avatar-link inline-flex w-full h-full items-stretch bg-ghost relative"
            onClick={(e) => e.preventDefault()}
            {...sectionLinkProps}
          >
            <span className='absolute bottom-4 left-4 z-10 text-[clamp(72px,9vw,160px)] md:text-[clamp(56px,9vw,160px)] font-medium leading-none text-mist mix-blend-multiply group-hover/avatar-link:mix-blend-overlay'>
              Caleb 
              <br />Wright
            </span>
            <span className='absolute top-10 left-6 z-10 text-[clamp(36px,4.2vw,72px)] md:text-[clamp(28px,4.2vw,72px)] font-medium leading-none text-ghost mix-blend-multiply group-hover/avatar-link:mix-blend-overlay'>
              CEO • Founder
              <br />at Solis
            </span>
            <MeltedImage 
              imgSrc="https://cdn.midjourney.com/ff3036df-17e6-4ed7-9fe6-6ca02853ca1b/0_1.png" 
              imgAlt="Demo avatar" 
              mode="inverted"
              size="100%"
              displacementActiveScale={200}
              turbulenceNumOctaves={200}
              stretch={true}
              cornerRadius='0'
            />
          </a>
        </section>
        <section className="grid-appear col-start-1 row-start-3 md:col-start-2 md:row-start-2 w-full h-full p-4" style={{ '--appear-delay': '160ms' }}>
          <a
            href="#"
            className="section-link group/avatar-link inline-flex w-full h-full items-stretch bg-ghost relative"
            onClick={(e) => e.preventDefault()}
            {...sectionLinkProps}
          >
            <span className='absolute bottom-4 left-4 z-10 text-[clamp(72px,9vw,160px)] md:text-[clamp(56px,9vw,160px)] font-medium leading-none text-mist mix-blend-multiply group-hover/avatar-link:mix-blend-overlay'>
              Zara 
              <br />Quinn
            </span>
            <span className='absolute top-10 left-6 z-10 text-[clamp(36px,4.2vw,72px)] md:text-[clamp(28px,4.2vw,72px)] font-medium leading-none text-ghost mix-blend-multiply group-hover/avatar-link:mix-blend-overlay'>
              CEO • Founder
              <br />at K-ai
            </span>
            <MeltedImage 
              imgSrc="https://cdn.midjourney.com/06cd883f-4798-44f5-88f9-526fb2138ba6/0_2.png" 
              imgAlt="Demo avatar" 
              mode="inverted"
              size="100%"
              displacementActiveScale={200}
              turbulenceNumOctaves={200}
              stretch={true}
              cornerRadius='0'
            />
          </a>
        </section>
        
        {/* <section className="col-start-2 row-start-1">
          <a
            href="#"
            className="group/avatar-link inline-flex items-center gap-3 rounded-full px-4 py-3 bg-ghost"
            onClick={(e) => e.preventDefault()}
          >
            <MeltedImage 
              imgSrc="https://cdn.midjourney.com/ff3036df-17e6-4ed7-9fe6-6ca02853ca1b/0_1.png" 
              imgAlt="Demo avatar" 
              mode="inverted"
              size={200}
              displacementActiveScale={200}
              turbulenceNumOctaves={200}
            />
            <span className="text-sm">Olivia • View profile</span>
          </a>
        </section>
        <section className="col-start-2 row-start-2">
          <a
            href="#"
            className="group/avatar-link inline-flex items-center gap-3 rounded-full px-4 py-3 bg-ghost"
            onClick={(e) => e.preventDefault()}
          >
            <MeltedImage 
              imgSrc="https://cdn.midjourney.com/06cd883f-4798-44f5-88f9-526fb2138ba6/0_2.png"
              imgAlt="Demo avatar" 
              mode="inverted"
              size={200}
              displacementActiveScale={200}
              turbulenceNumOctaves={200}
            />
            <span className="text-sm">Olivia • View profile</span>
          </a>
        </section> */}
      </div>
      <footer className='px-4 pb-10 pt-4 leading-none text-ghost/50 '>
        <p className='px-4 text-2xl'>Demo made by <a href="https://www.linkedin.com/in/olia-gozha/" target="_blank" title="Olia Gozha's LinkedIn profile" className='text-mist mix-blend-overlay underline hover:mix-blend-screen'>Olia Gozha</a></p>
      </footer>
    </main>
  );
}
