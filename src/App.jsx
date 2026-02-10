import MeltedImage from './components/MeltedImage.jsx';

const demoImg = 'https://cdn.midjourney.com/b0072aee-4ee4-4917-aead-10b5c03ae98e/0_1.png';

export default function App() {
  return (
    <main className="min-h-screen flex items-center justify-center p-0">
      <div className="bg-[#FF4413] min-h-screen w-full grid grid-cols-2 grid-rows-2 gap-6">
        {/* <h1 className="text-2xl font-semibold">Avatar demo</h1>
        <p className="mt-2 text-sm text-slate">
          Hover the link area to trigger <span className="font-mono">group/avatar-link</span> effects.
        </p> */}
        <section className="col-start-1 row-start-1 row-span-2 w-full h-full p-4">
          <a
            href="#"
            className="group/avatar-link inline-flex w-full h-full items-stretch bg-ghost relative"
            onClick={(e) => e.preventDefault()}
          >
            <span className='absolute bottom-4 left-4 z-10 text-[160px] font-medium'>
              Cyra Moon
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
        <section className="col-start-2 row-start-1">
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
        </section>
      </div>
    </main>
  );
}
