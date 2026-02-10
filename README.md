## MeltedImage demo (Vite + React)

Standalone demo project for the `MeltedImage` component.

## Component props

`MeltedImage` supports per-instance tuning of the underlying SVG filter:

- `turbulenceBaseFrequency` (number | string | [number, number], default `0.05`)
- `turbulenceNumOctaves` (number, default `3`)
- `turbulenceSeed` (number | undefined)
- `turbulenceType` ('fractalNoise' | 'turbulence', default `'fractalNoise'`)
- `displacementInactiveScale` (number, default `1`)
- `displacementActiveScale` (number, default `100`)
- `displacementXChannelSelector` ('R' | 'G' | 'B' | 'A', default `'R'`)
- `displacementYChannelSelector` ('R' | 'G' | 'B' | 'A', default `'G'`)

Example:

```jsx
<MeltedImage
	imgSrc={demoImg}
	imgAlt="Demo avatar"
	turbulenceBaseFrequency={0.08}
	turbulenceNumOctaves={2}
	displacementActiveScale={140}
/>
```

## Local

- Install: `npm install`
- Dev: `npm run dev`
- Build: `npm run build` (outputs `dist/`)
- Preview build: `npm run preview`

## Vercel deploy

Deploy as a static Vite site on Vercel:

- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`

These are also pinned in `vercel.json`.
