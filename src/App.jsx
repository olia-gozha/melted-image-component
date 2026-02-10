import { useState } from 'react';
import CustomCursor from './components/CustomCursor.jsx';
import MeltedImage from './components/MeltedImage.jsx';

const demoImg = 'https://cdn.midjourney.com/b0072aee-4ee4-4917-aead-10b5c03ae98e/0_1.png';

export default function App() {
  const [isCustomCursorActive, setIsCustomCursorActive] = useState(false);
  const [activeLayout, setActiveLayout] = useState('hidden');

  const sectionLinkProps = {
    onPointerEnter: () => setIsCustomCursorActive(true),
    onPointerLeave: () => setIsCustomCursorActive(false),
  };

  return (
    <main className="min-h-screen flex flex-col bg-fire ">
      {activeLayout === 'hidden' && (
        <CustomCursor active={isCustomCursorActive} />
      )}
      {activeLayout === 'hover' && (
        <CustomCursor
          active={isCustomCursorActive}
          bgColor='bg-fire'
          arrowColor='text-ghost'
        />
      )}
      <header className='p-4 leading-none text-ghost '>
        <h1 className="text-[clamp(72px,14vw,240px)] font-semibold px-4 tracking-tighter m-0">Icebreakr</h1>
        <p className='px-4 text-2xl'>Fictional magazine featuring stories on startup founders</p>

        <nav className="px-4 mt-6" aria-label="Demo layouts">
          <div
            role="tablist"
            aria-label="Choose layout"
            className="inline-flex rounded-full border-2 border-ghost/30 p-1"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeLayout === 'hidden'}
              className={`rounded-full px-4 py-2 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-ghost focus-visible:outline-offset-2 ${
                activeLayout === 'hidden'
                  ? 'bg-ghost text-deep-charcoal'
                  : 'text-ghost/80 cursor-pointer hover:text-ghost'
              }`}
              onClick={() => setActiveLayout('hidden')}
            >
              Layout 1
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeLayout === 'hover'}
              className={`rounded-full px-4 py-2 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-ghost focus-visible:outline-offset-2 ${
                activeLayout === 'hover'
                  ? 'bg-ghost text-deep-charcoal'
                  : 'text-ghost/80 cursor-pointer hover:text-ghost'
              }`}
              onClick={() => setActiveLayout('hover')}
            >
              Layout 2
            </button>
          </div>
        </nav>
      </header>
      {activeLayout === 'hidden' && (
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
      )}

      {activeLayout === 'hover' && (
        <div className="min-h-screen w-full grid grid-cols-1 grid-rows-3 md:grid-cols-2 md:grid-rows-2 gap-0 p-4">
          <section className="grid-appear col-start-1 row-start-1 row-span-1 md:col-start-1 md:row-start-1 md:row-span-2 w-full h-full p-4" style={{ '--appear-delay': '0ms' }}>
            <a
              href="#"
              className="section-link group/avatar-link inline-flex w-full h-full items-stretch bg-ghost relative"
              onClick={(e) => e.preventDefault()}
              {...sectionLinkProps}
            >
              <span className='absolute bottom-4 left-4 z-10 text-[clamp(96px,12vw,240px)] md:text-[clamp(72px,12vw,240px)] font-medium leading-none text-mist mix-blend-overlay group-hover/avatar-link:mix-blend-multiply'>
                Cyra 
                <br />Moon
              </span>
              <span className='absolute top-10 left-6 z-10 text-[clamp(52px,5.5vw,102px)] md:text-[clamp(40px,5.5vw,102px)] font-medium leading-none text-ghost mix-blend-overlay group-hover/avatar-link:mix-blend-multiply'>
                CEO • Founder
                <br />at Lux
              </span>
              <MeltedImage 
                imgSrc={demoImg} 
                imgAlt="Demo avatar" 
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
              <span className='absolute bottom-4 left-4 z-10 text-[clamp(72px,9vw,160px)] md:text-[clamp(56px,9vw,160px)] font-medium leading-none text-mist mix-blend-overlay group-hover/avatar-link:mix-blend-multiply'>
                Caleb 
                <br />Wright
              </span>
              <span className='absolute top-10 left-6 z-10 text-[clamp(36px,4.2vw,72px)] md:text-[clamp(28px,4.2vw,72px)] font-medium leading-none text-ghost mix-blend-overlay group-hover/avatar-link:mix-blend-multiply'>
                CEO • Founder
                <br />at Solis
              </span>
              <MeltedImage 
                imgSrc="https://cdn.midjourney.com/ff3036df-17e6-4ed7-9fe6-6ca02853ca1b/0_1.png" 
                imgAlt="Demo avatar" 
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
              <span className='absolute bottom-4 left-4 z-10 text-[clamp(72px,9vw,160px)] md:text-[clamp(56px,9vw,160px)] font-medium leading-none text-mist mix-blend-overlay group-hover/avatar-link:mix-blend-multiply'>
                Zara 
                <br />Quinn
              </span>
              <span className='absolute top-10 left-6 z-10 text-[clamp(36px,4.2vw,72px)] md:text-[clamp(28px,4.2vw,72px)] font-medium leading-none text-ghost mix-blend-overlay group-hover/avatar-link:mix-blend-multiply'>
                CEO • Founder
                <br />at K-ai
              </span>
              <MeltedImage 
                imgSrc="https://cdn.midjourney.com/06cd883f-4798-44f5-88f9-526fb2138ba6/0_2.png" 
                imgAlt="Demo avatar" 
                size="100%"
                displacementActiveScale={200}
                turbulenceNumOctaves={200}
                stretch={true}
                cornerRadius='0'
              />
            </a>
          </section>
        </div>
      )}
      <footer className='px-4 pb-10 pt-4 leading-none text-ghost/50 '>
        <p className='px-4 text-2xl'>Demo made by <a href="https://www.linkedin.com/in/olia-gozha/" target="_blank" title="Olia Gozha's LinkedIn profile" className='text-mist mix-blend-overlay underline hover:mix-blend-screen'>Olia Gozha</a></p>
      </footer>
    </main>
  );
}
