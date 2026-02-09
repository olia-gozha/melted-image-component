import Avatar from './components/Avatar.jsx';

const demoImg = 'https://placehold.co/80x80/png';

export default function App() {
  return (
    <main className="min-h-screen flex items-center justify-center p-10">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-semibold">Avatar demo</h1>
        <p className="mt-2 text-sm text-slate">
          Hover the link area to trigger <span className="font-mono">group/avatar-link</span> effects.
        </p>

        <div className="mt-8">
          <a
            href="#"
            className="group/avatar-link inline-flex items-center gap-3 rounded-full px-4 py-3 bg-ghost"
            onClick={(e) => e.preventDefault()}
          >
            <Avatar imgSrc={demoImg} imgAlt="Demo avatar" />
            <span className="text-sm">Olivia • View profile</span>
          </a>
        </div>
      </div>
    </main>
  );
}
