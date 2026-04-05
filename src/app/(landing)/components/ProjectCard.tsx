import React from "react";

export type Project = {
  name: string;
  tagline: string;
  description: string;
  tags: string[];
  status: "Live" | "En desarrollo" | "Completado";
  scale: string;
  images: string[];
  desktopVideo?: string;
  color: string;
  accent: string;
  url?: string;
};

// Extensión simple para detectar videos
export const isVideo = (url: string) => /\.(mp4|webm|ogg)$/i.test(url);

export function StatusBadge({ status }: { status: Project["status"] }) {
  const map = {
    Live: { dot: "#22c55e", text: "text-green-400", bg: "bg-green-500/10 border-green-500/30" },
    "En desarrollo": { dot: "#f59e0b", text: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/30" },
    Completado: { dot: "#60a5fa", text: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/30" },
  };
  const s = map[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium ${s.bg} ${s.text}`}>
      <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: s.dot }} />
      {status}
    </span>
  );
}

export default function ProjectCard({
  project,
  index,
  onAddImage,
  onViewImage,
}: {
  project: Project;
  index: number;
  onAddImage: (projectIdx: number) => void;
  onViewImage: (projectIdx: number, imgIdx: number) => void;
}) {
  return (
    <article
      className="group relative rounded-2xl border border-white/8 overflow-hidden transition-all duration-500 hover:border-white/20"
      style={{
        background: "rgba(255,255,255,0.03)",
        backdropFilter: "blur(12px)",
      }}
    >
      {/* Accent gradient top bar */}
      <div
        className="h-px w-full"
        style={{ background: `linear-gradient(90deg, transparent, ${project.accent}66, transparent)` }}
      />

      {/* Card inner glow on hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
      />

      <div className="relative p-7">
        {/* Layout horizontal con Flexbox */}
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Columna izquierda - Información del proyecto */}
          <div className="flex-1 min-w-0">
            {/* Header row */}
            <div className="flex items-start justify-between gap-4 mb-4 flex-wrap">
              <div>
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-xs text-white/30 font-mono tracking-widest uppercase">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <StatusBadge status={project.status} />
                </div>
                <div className="flex items-center gap-3 mb-1 flex-wrap">
                  <h3 className="text-2xl font-bold text-white leading-tight">{project.name}</h3>
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/30 hover:text-white transition-colors"
                      title="Visitar Proyecto"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                </div>
                <p className="text-sm mt-1 font-medium" style={{ color: project.accent }}>
                  {project.tagline}
                </p>
              </div>
              <span className="shrink-0 text-xs text-white/30 border border-white/10 rounded-full px-2.5 py-1 whitespace-nowrap">
                {project.scale}
              </span>
            </div>

            {/* Description */}
            <p className="text-white/55 text-sm leading-relaxed mb-5">{project.description}</p>

            {/* Tech tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded-md text-xs font-mono border border-white/10 text-white/50"
                  style={{ background: `${project.accent}10` }}
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Desktop Video Section */}
            <div className="mt-8 relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-white/10 bg-white/[0.02] flex flex-col shadow-2xl">
              {/* Fake Mac OS Web Browser Header */}
              <div className="h-8 border-b border-white/10 bg-white/[0.04] flex items-center px-4 gap-2 backdrop-blur-md z-10 shrink-0">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
              </div>
              
              {/* Contenido del Video */}
              <div className="relative flex-1 bg-black/40">
                {project.desktopVideo ? (
                  project.desktopVideo.toLowerCase().endsWith('.gif') ? (
                    <img src={project.desktopVideo} alt={`${project.name} demo`} className="w-full h-full object-cover" />
                  ) : (
                    <video src={project.desktopVideo} className="w-full h-full object-cover" autoPlay muted loop playsInline />
                  )
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white/20">
                     <svg className="w-10 h-10 mb-3 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                       <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                     </svg>
                     <span className="text-sm font-medium tracking-wide px-4 text-center">Añadir Video Demo Desktop</span>
                     <span className="text-[10px] text-white/10 mt-1 uppercase tracking-widest">(Formato 16:9)</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Columna derecha - Vista previa de imágenes (Bento Grid) */}
          <div className="w-full lg:w-[400px] xl:w-[480px] flex-shrink-0">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-white/70">
                Vista previa <span className="text-white/30 text-xs ml-1">({project.images.length})</span>
              </h4>
              {/* <button
                onClick={() => onAddImage(index)}
                className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-white/15 text-white/50 hover:text-white hover:border-white/30 transition-all"
                title="Agregar recurso"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                Añadir
              </button> */}
            </div>

            {/* Bento Grid layout */}
            <div className="grid grid-cols-2 grid-rows-4 gap-2 lg:gap-3 w-full aspect-[4/3] sm:aspect-[3/2] lg:aspect-square">
              {[0, 1, 2, 3].map((i) => {
                const img = project.images[i];
                
                // Mapeo perfecto al sketch provisto:
                // 0: Cuadro superior izquierdo (ocupa 2 filas)
                // 1: Cuadro inferior izquierdo (ocupa 2 filas)
                // 2: Rectángulo pequeño superior derecho (ocupa 1 fila)
                // 3: Rectángulo largo inferior derecho (ocupa 3 filas)
                const gridClasses = [
                  "col-start-1 row-start-1 row-span-2",
                  "col-start-1 row-start-3 row-span-2",
                  "col-start-2 row-start-1 row-span-1",
                  "col-start-2 row-start-2 row-span-3",
                ];
                
                const gClass = gridClasses[i];

                if (img) {
                  return (
                    <button
                      key={i}
                      onClick={() => onViewImage(index, i)}
                      className={`${gClass} rounded-xl overflow-hidden border border-white/10 hover:border-white/30 transition-all hover:scale-[1.02] relative group/thumb`}
                    >
                      {/* Overlay principal '+X' si es el 4to item y hay más fotos */}
                      {i === 3 && project.images.length > 4 && (
                        <div className="absolute inset-0 bg-black/60 z-20 flex flex-col items-center justify-center backdrop-blur-[2px] border border-white/10">
                          <span className="text-white text-2xl font-black">+{project.images.length - 4}</span>
                          <span className="text-white/60 text-xs font-semibold uppercase tracking-widest mt-1">Ver todos</span>
                        </div>
                      )}

                      {isVideo(img) ? (
                        <>
                          <video src={img} className="w-full h-full object-cover" muted loop playsInline />
                          <div className={`absolute inset-0 flex items-center justify-center bg-black/30 group-hover/thumb:bg-black/10 transition-colors ${i === 3 && project.images.length > 4 ? 'hidden' : 'z-10'}`}>
                            <span className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center border border-white/20">
                              <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                            </span>
                          </div>
                        </>
                      ) : (
                        <img src={img} alt={`${project.name} preview ${i + 1}`} className="w-full h-full object-cover" />
                      )}
                    </button>
                  );
                } else {
                  return (
                    <button
                      key={i}
                      // onClick={() => onAddImage(index)}
                      className={`${gClass} rounded-xl border-2 border-dashed border-white/5 hover:border-white/20 flex flex-col items-center justify-center text-white/20 hover:text-white/40 transition-colors bg-white/[0.01] hover:bg-white/[0.03] group/drop`}
                    >
                      <svg className="w-5 h-5 mb-1 opacity-50 group-hover/drop:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                      </svg>
                      {/* {gClass.includes("row-span-1") ? null : (
                        <span className="text-[10px] font-medium tracking-wide uppercase opacity-0 group-hover/drop:opacity-100 transition-opacity hidden sm:block">Añadir</span>
                      )} */}
                    </button>
                  );
                }
              })}
            </div>
          </div>
        </div>


      </div>
    </article>
  );
}