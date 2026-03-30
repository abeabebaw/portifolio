export function BackgroundModel() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="bg-model-base" />
      <div className="bg-model-grid" />
      <div className="bg-model-ring" />
      <div className="bg-model-blob bg-model-blob-a" />
      <div className="bg-model-blob bg-model-blob-b" />
      <div className="bg-model-blob bg-model-blob-c" />
      <div className="bg-model-noise" />
    </div>
  )
}