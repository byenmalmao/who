"use client";

import React, { useState } from "react";
import Planet from "../components/Planet";
import ProjectCard, { Project, isVideo } from "../components/ProjectCard";

/* ─────────────────────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────────────────────── */

const skills = [
  {
    category: "Artificial Intelligence & Automatization ",
    icon: "⬢",
    techs: ["RAG", "LangChain", "LangGraph", "Ollama", "n8n", "OpenAI", "Selenium", "Playwright"],
  },
  {
    category: "Frontend",
    icon: "◈",
    techs: ["React", "React Native", "Next.js", "Flutter", "Shopify Themes", "Tailwind CSS", "Framer Motion", "Three.js", "Angular"],
  },
  {
    category: "Backend",
    icon: "⬡",
    techs: ["Express", "FastAPI", "Django", ".NET", "MySQL", "PostgreSQL", "MongoDB", "Neon", "Axum", "NestJS", "Bun", "Supabase", "Firebase"],
  },
  {
    category: "DevOps / Cloud & Servers",
    icon: "⬢",
    techs: ["Docker", "AWS", "Azure", "Git", "CI/CD", "Cloudflare", "Vercel", "Ubuntu", "Windows Server", "Cisco"],
  },
  {
    category: "Lenguajes",
    icon: "⟨/⟩",
    techs: ["JavaScript", "TypeScript", "Python", "Dart", "SQL", "Rust", "Java", "PHP", "Kotlin", "C#", "C++", "C"],
  },
];



const projects: Project[] = [
  {
    name: "Joseate",
    tagline: "Red de Referidos",
    description:
      "El proyecto más ambicioso que he construido. Una plataforma completa de conexión entre reclutadores, candidatos y empresas BPO en la República Dominicana. Incluye sistema de referidos con tracking en tiempo real, pagos automatizados, dashboards analíticos y gestión de colocaciones masivas.",
    tags: ["React", "Javascript","Express", "MongoDB", "WebSockets", "Cloudflare"],
    status: "Live",
    scale: "Plataforma Web de Referidos",
    images: ["/landingJoseate.png"],
    color: "from-amber-500/10 to-orange-600/10",
    accent: "#f59e0b",
    url: "https://joseate.com",
  },
  // {
  //   name: "Ninja Monitor",
  //   tagline: "Monitoreo Inteligente de Microsoft Teams",
  //   description:
  //     "¿Estás en Teams todo el día? Ninja Monitor te mantiene al tanto en tiempo real. Detecta menciones, alertas de reuniones urgentes y mensajes críticos, notificándote instantáneamente para que nunca pierdas lo importante sin estar pegado a la pantalla.",
  //   tags: ["Electron", "Node.js", "Teams API", "WebSockets", "Notifications"],
  //   status: "Completado",
  //   scale: "Herramienta de Productividad",
  //   images: [],
  //   color: "from-blue-500/20 to-cyan-600/10",
  //   accent: "#3b82f6",
  // },
  // {
  //   name: "Telegrum",
  //   tagline: "Mensajería con Cifrado Extremo a Extremo",
  //   description:
  //     "Aplicación de mensajería segura con cifrado de grado militar extremo a extremo. Arquitectura zero-knowledge donde ni el servidor puede leer los mensajes. Soporta salas privadas, mensajes efímeros, archivos cifrados y llamadas de voz encriptadas.",
  //   tags: ["React Native", "Rust", "E2E Encryption", "WebRTC", "Signal Protocol"],
  //   status: "En desarrollo",
  //   scale: "App Móvil + Web",
  //   images: [],
  //   color: "from-purple-500/20 to-violet-600/10",
  //   accent: "#8b5cf6",
  // },
  // {
  //   name: "LangUs",
  //   tagline: "Aprendizaje de Idiomas por Input Comprensible",
  //   description:
  //     "Plataforma de adquisición de idiomas basada en la metodología del Input Comprensible de Krashen. Los usuarios aprenden leyendo y escuchando contenido en su nivel, con el sistema adaptando el contenido automáticamente según el progreso.",
  //   tags: ["React", "FastAPI", "AI/NLP", "Python", "PostgreSQL"],
  //   status: "En desarrollo",
  //   scale: "EdTech Platform",
  //   images: [],
  //   color: "from-green-500/20 to-emerald-600/10",
  //   accent: "#10b981",
  // },
  {
    name: "Shopify Theme Dev",
    tagline: "Desarrollo de Temas E-commerce Premium",
    description:
      "Diseño y desarrollo de Shopify Thems & NextJS Stores completamente personalizados para clientes en mercados de productos importados. Desde tiendas de moda hasta electrónicos, optimizados para conversión con tasas de carga ultrarrápidas y experiencias de compra inmersivas.",
    tags: ["Liquid", "JavaScript", "Shopify API", "CSS", "Performance", "NextJS"],
    status: "Live",
    scale: "Freelance / Agencia",
    images: [],
    color: "from-green-500/10 to-emerald-600/10",
    accent: "#008f21ff",
    url: "#",
  },
  {
    name: "Clinica Jarabacoa",
    tagline: "Sistema de Gestión Clínica Integral",
    description:
      "Sistema completo de gestión hospitalaria para la Clínica  Cardiológica de Jarabacoa. Módulos de pacientes, citas, historiales médicos digitales, facturación, inventario de farmacia e informes estadísticos. Transformando la operación clínica de papel a digital.",
    tags: ["Flutter", "Arquitectura en capas", "Supabase", "Docker", "Windows/Linux/Mac"],
    status: "Live",
    scale: "Sistema Desktop Clinico",
    images: ["/DatabaseClinica.png", "/clinica/DatabaseClinica.png"],
    color: "from-sky-500/10 to-blue-600/10",
    accent: "#0ea5e9",
    url: "#",
  },
  // {
  //   name: "Talkify",
  //   tagline: "Intercambio de Idiomas en Tiempo Real",
  //   description:
  //     "Plataforma de intercambio lingüístico donde hablantes nativos de diferentes idiomas se conectan para practicar mutuamente. Video llamadas con subtítulos en tiempo real, chat de práctica con correcciones asistidas por IA y sistema de emparejamiento inteligente.",
  //   tags: ["Next.js", "WebRTC", "OpenAI", "Supabase", "TypeScript"],
  //   status: "En desarrollo",
  //   scale: "SaaS Platform",
  //   images: [],
  //   color: "from-indigo-500/20 to-purple-600/10",
  //   accent: "#6366f1",
  // },
  {
    name: "Serena Spa",
    tagline: "Web para Spa de Montaña en Jarabacoa",
    description:
      "Aplicación móvil premium para un spa de lujo en Jarabacoa, destino turístico de montaña en Rep. Dominicana. Reserva de tratamientos, exploración de servicios, programas de fidelidad, promociones exclusivas y guía del destino integrada.",
    tags: ["NextJS", "TypeScript", "Tailwind CSS", "Neon SQL", "Google Maps"],
    status: "Completado",
    scale: "Web",
    images: [],
    color: "from-rose-200/10 to-stone-100/10",
    accent: "#f6e0e0ff",
    url: "https://serena-spa-web.vercel.app",
  },
  {
    name: "SLAM ",
    tagline: "Investigación en Localización y Mapeo Simultáneo",
    description:
      "Investigación aplicada en Simultaneous Localization and Mapping (SLAM) para robótica autónoma. Implementación de algoritmos de última generación para navegación en entornos no estructurados, presentado como proyecto de investigación universitaria.",
    tags: ["Python", "ROS", "OpenCV", "C++", "Robotics"],
    status: "Completado",
    scale: "Investigación Académica",
    images: [],
    color: "from-rose-500/10 to-pink-600/10",
    accent: "#f43f5e",
    url: "https://slam-eta.vercel.app",
  },
  // {
  //   name: "Moodle UCATECI",
  //   tagline: "Personalización de LMS Universitario",
  //   description:
  //     "Prototipado y personalización completa de la plataforma Moodle para la Universidad UCATECI. Rediseño de interfaz, desarrollo de módulos personalizados, integración con sistemas académicos internos y capacitación del equipo docente.",
  //   tags: ["Moodle", "PHP", "MySQL", "JavaScript", "UX Design"],
  //   status: "Completado",
  //   scale: "Institución Educativa",
  //   images: [],
  //   color: "from-yellow-500/20 to-amber-600/10",
  //   accent: "#eab308",
  // },
];

/* ─────────────────────────────────────────────────────────────────────────────
   TIPOS & ESTADO
───────────────────────────────────────────────────────────────────────────── */

type LightboxState = {
  projectIdx: number;
  imageIdx: number;
} | null;



/* ─────────────────────────────────────────────────────────────────────────────
   MODAL – AGREGAR IMAGEN
───────────────────────────────────────────────────────────────────────────── */
function AddImageModal({
  projectName,
  onClose,
  onAdd,
}: {
  projectName: string;
  onClose: () => void;
  onAdd: (url: string) => void;
}) {
  const [url, setUrl] = useState("");
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-white/15 p-6"
        style={{ background: "rgba(15,15,20,0.95)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-white font-semibold text-lg mb-1">Agregar recurso (Imagen/Video)</h3>
        <p className="text-white/40 text-sm mb-5">
          Proyecto: <span className="text-white/60">{projectName}</span>
        </p>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://ejemplo.com/recurso.png (.mp4 o .jpg...)"
          className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-white/40 mb-4"
          autoFocus
        />
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-white/15 text-white/50 text-sm hover:text-white hover:border-white/30 transition-all"
          >
            Cancelar
          </button>
          <button
            onClick={() => { if (url.trim()) { onAdd(url.trim()); onClose(); } }}
            className="flex-1 py-2.5 rounded-xl bg-white text-black text-sm font-medium hover:bg-white/90 transition-all"
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   LIGHTBOX
───────────────────────────────────────────────────────────────────────────── */
function Lightbox({
  state,
  projects,
  onClose,
  onPrev,
  onNext,
}: {
  state: LightboxState;
  projects: Project[];
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  if (!state) return null;
  const project = projects[state.projectIdx];
  const img = project.images[state.imageIdx];
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(16px)" }}
      onClick={onClose}
    >
      <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-white font-semibold">{project.name}</h3>
            <p className="text-white/40 text-sm">
              {state.imageIdx + 1} / {project.images.length}
            </p>
          </div>
          <button onClick={onClose} className="text-white/50 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Renderizado condicional de la vista principal del Lightbox */}
        <div className="w-full flex items-center justify-center bg-black/40 rounded-2xl border border-white/10 overflow-hidden" style={{ minHeight: '40vh', maxHeight: '75vh' }}>
          {isVideo(img) ? (
            <video src={img} controls autoPlay className="w-full max-h-[75vh] object-contain" playsInline />
          ) : (
            <img src={img} alt="" className="w-full max-h-[75vh] object-contain" />
          )}
        </div>

        <div className="flex justify-between mt-4">
          <button
            onClick={onPrev}
            disabled={state.imageIdx === 0}
            className="px-4 py-2 rounded-xl border border-white/15 text-white/50 hover:text-white hover:border-white/30 transition-all disabled:opacity-30 flex items-center gap-2"
          >
            <span>←</span> Anterior
          </button>
          <button
            onClick={onNext}
            disabled={state.imageIdx >= project.images.length - 1}
            className="px-4 py-2 rounded-xl border border-white/15 text-white/50 hover:text-white hover:border-white/30 transition-all disabled:opacity-30 flex items-center gap-2"
          >
             Siguiente <span>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────────────────────────────────────── */

export default function Portfolio() {
  const [projectsData, setProjectsData] = useState<Project[]>(projects);
  const [addImageTarget, setAddImageTarget] = useState<number | null>(null);
  const [lightbox, setLightbox] = useState<LightboxState>(null);

  function handleAddImage(projectIdx: number, url: string) {
    setProjectsData((prev) =>
      prev.map((p, i) => (i === projectIdx ? { ...p, images: [...p.images, url] } : p))
    );
  }

  return (
    <>
      {/* ───── MODALS ───── */}
      {addImageTarget !== null && (
        <AddImageModal
          projectName={projectsData[addImageTarget].name}
          onClose={() => setAddImageTarget(null)}
          onAdd={(url) => handleAddImage(addImageTarget, url)}
        />
      )}
      <Lightbox
        state={lightbox}
        projects={projectsData}
        onClose={() => setLightbox(null)}
        onPrev={() =>
          setLightbox((prev) => prev && prev.imageIdx > 0 ? { ...prev, imageIdx: prev.imageIdx - 1 } : prev)
        }
        onNext={() =>
          setLightbox((prev) =>
            prev && prev.imageIdx < projectsData[prev.projectIdx].images.length - 1
              ? { ...prev, imageIdx: prev.imageIdx + 1 }
              : prev
          )
        }
      />

      <div className="relative z-10">
        {/* ═══════════════════════════════════════════════════════════════════
            HERO
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="min-h-dvh w-full flex flex-col justify-center px-6 md:px-16 lg:px-28 pt-24 pb-16">
          <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">

            {/* Left — Identity */}
            <div>
              {/* Availability badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-red-500/25 bg-red-500/8 text-red-300 text-xs mb-8">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                Ocupado — Desarrollando e Investigando
              </div>

              {/* Name */}
              <h1 className="text-6xl md:text-7xl xl:text-8xl font-black text-white leading-[0.95] tracking-tight mb-4">
                Enmanuel
                <span
                  className="block"
                  style={{
                    background: "linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.4) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Bautista.
                </span>
              </h1>

              {/* Role */}
              <p className="text-lg text-white/40 font-light mb-8 tracking-wide">
                <span className="text-amber-300/80 font-medium">Ingeniero de Software</span>
                {" "}&amp;{" "}
                <span className="text-white/50">Investigador Independiente</span>
              </p>

              {/* Bio */}
              <p className="text-white/55 text-base leading-relaxed max-w-lg mb-10">
                Analizo problemas complejos en soluciones tecnológicas con visión de negocio.
                Combino ingeniería de software con estrategias de negocios para construir productos
                que escalan en mercados locales e internacionales. Tambien estudio temas en concretos y hacer presentaciones web dinamicas sobre ellas haha.
              </p>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-3">
                <a
                  href="#projects"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-7 py-3 bg-white text-black rounded-full font-medium text-sm hover:bg-white/90 transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                >
                  Ver Proyectos
                </a>
                {/* <a
                  href="#contact"
                  className="px-7 py-3 border border-white/20 text-white rounded-full font-medium text-sm hover:bg-white/8 hover:border-white/40 transition-all"
                >
                  Descargar CV
                </a> */}
              </div>
            </div>

            {/* Right — Stats */}
            {/* Right — Interactive Planet with Orbiting Stats */}
            <div className="relative flex justify-center items-center w-full h-full min-h-[500px]">
              
              <style>{`
                @keyframes float-1 {
                  0%, 100% { transform: translateY(0) rotate(0deg); }
                  50% { transform: translateY(-10px) rotate(2deg); }
                }
                @keyframes float-2 {
                  0%, 100% { transform: translateY(0) rotate(0deg); }
                  50% { transform: translateY(12px) rotate(-2deg); }
                }
                @keyframes float-3 {
                  0%, 100% { transform: translateY(0) rotate(0deg); }
                  50% { transform: translateY(-12px) rotate(-1deg); }
                }
                @keyframes float-4 {
                  0%, 100% { transform: translateY(0) rotate(0deg); }
                  50% { transform: translateY(10px) rotate(1deg); }
                }
                .orbit-card {
                  backdrop-filter: blur(12px);
                  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
                }
              `}</style>
              
              <Planet>
                {/* 1. Top Left Card - Amber */}
                <div 
                  className="absolute -top-2 -left-4 md:-left-12 w-44 p-4 rounded-2xl orbit-card border border-amber-500/20 bg-gradient-to-br from-amber-500/10 to-orange-600/5 hover:border-amber-500/40 transition-all pointer-events-auto"
                  style={{ animation: 'float-1 6s ease-in-out infinite' }}
                >
                  <div className="absolute inset-0 bg-amber-500/5 blur-xl rounded-2xl pointer-events-none" />
                  <div className="relative z-10 text-3xl md:text-4xl font-black text-amber-400 mb-1 drop-shadow-[0_0_8px_rgba(245,158,11,0.4)]"> ∑8+9+7</div>
                  <div className="relative z-10 text-xs font-medium text-white/80 mb-0.5">Proyectos </div>
                  <div className="relative z-10 text-[10px] text-white/40">En producción</div>
                </div>

                {/* 2. Bottom Left Card - Sky Blue */}
                <div 
                  className="absolute -bottom-8 -left-2 md:-left-8 w-44 p-4 rounded-2xl orbit-card border border-sky-500/20 bg-gradient-to-br from-sky-500/10 to-blue-600/5 hover:border-sky-500/40 transition-all pointer-events-auto"
                  style={{ animation: 'float-2 7s ease-in-out infinite' }}
                >
                  <div className="absolute inset-0 bg-sky-500/5 blur-xl rounded-2xl pointer-events-none" />
                  <div className="relative z-10 text-3xl md:text-4xl font-black text-sky-400 mb-1 drop-shadow-[0_0_8px_rgba(14,165,233,0.4)]">3+</div>
                  <div className="relative z-10 text-xs font-medium text-white/80 mb-0.5">Años de Exp.</div>
                  <div className="relative z-10 text-[10px] text-white/40">Desarrollo profesional</div>
                </div>

                {/* 3. Top Right Card - Rose/Pink */}
                <div 
                  className="absolute top-8 -right-4 md:-right-12 w-48 p-4 rounded-2xl orbit-card border border-rose-500/20 bg-gradient-to-br from-rose-500/10 to-pink-600/5 hover:border-rose-500/40 transition-all pointer-events-auto"
                  style={{ animation: 'float-3 5.5s ease-in-out infinite' }}
                >
                  <div className="absolute inset-0 bg-rose-500/5 blur-xl rounded-2xl pointer-events-none" />
                  <div className="relative z-10 text-3xl md:text-4xl font-black text-rose-400 mb-1 drop-shadow-[0_0_8px_rgba(244,63,94,0.4)]">30+</div>
                  <div className="relative z-10 text-xs font-medium text-white/80 mb-0.5">Tecnologías</div>
                  <div className="relative z-10 text-[10px] text-white/40">Dominios variados</div>
                </div>

                {/* 4. Bottom Right Card - Teal */}
                <div 
                  className="absolute bottom-2 -right-6 md:-right-16 w-44 p-4 rounded-2xl orbit-card border border-teal-500/20 bg-gradient-to-br from-teal-500/10 to-cyan-600/5 hover:border-teal-500/40 transition-all pointer-events-auto"
                  style={{ animation: 'float-4 6.5s ease-in-out infinite' }}
                >
                  <div className="absolute inset-0 bg-teal-500/5 blur-xl rounded-2xl pointer-events-none" />
                  <div className="relative z-10 text-3xl md:text-4xl font-black text-teal-400 mb-1 drop-shadow-[0_0_8px_rgba(20,184,166,0.4)]">6</div>
                  <div className="relative z-10 text-xs font-medium text-white/80 mb-0.5">Industrias</div>
                  <div className="relative z-10 text-[10px] text-white/40">Salud, E-commerce, etc</div>
                </div>
              </Planet>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
            <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
              <div className="w-1 h-2.5 bg-white/40 rounded-full animate-pulse" />
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SKILLS
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="py-24 px-6 md:px-16 lg:px-28">
          <div className="max-w-7xl mx-auto">
            <div className="mb-14">
              <span className="text-xs font-mono text-white/30 tracking-widest uppercase">Stack Tecnológico</span>
              <h2 className="text-4xl font-bold text-white mt-2">Tecnologías</h2>
            </div>
            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
              {skills.map((skill, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-white/8 p-6 hover:border-white/20 transition-all group"
                  style={{ background: "rgba(255,255,255,0.03)" }}
                >
                  <div className="text-2xl mb-3 font-mono text-white/30 group-hover:text-white/50 transition-colors">
                    {skill.icon}
                  </div>
                  <h3 className="text-base font-semibold text-white mb-4">{skill.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skill.techs.map((tech, i) => (
                      <span key={i} className="px-2.5 py-1 bg-white/5 rounded-lg text-white/60 text-xs border border-white/5">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            PROJECTS
        ═══════════════════════════════════════════════════════════════════ */}
        <section id="projects" className="py-24 px-6 md:px-16 lg:px-28">
          <div className="max-w-7xl mx-auto">
            {/* Section header */}
            <div className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <span className="text-xs font-mono text-white/30 tracking-widest uppercase">Portafolio</span>
                <h2 className="text-4xl font-bold text-white mt-2">Proyectos</h2>
                <p className="text-white/40 mt-2 text-sm max-w-md">
                  Cada proyecto es una solución real a un problema real. Explóralos, mira los detalles y agrega imágenes.
                </p>
              </div>
              <div className="flex gap-4 text-xs text-white/30">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full" /> Live
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-amber-400 rounded-full" /> En desarrollo
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" /> Completado
                </span>
              </div>
            </div>

            {/* Project cards grid */}
            <div className="flex flex-col gap-8 ">
              {projectsData.map((project, idx) => (
                <ProjectCard
                  key={idx}
                  project={project}
                  index={idx}
                  onAddImage={(i: number) => setAddImageTarget(i)}
                  onViewImage={(pi: number, ii: number) => setLightbox({ projectIdx: pi, imageIdx: ii })}
                />
              ))}
            </div>

            {/* Mensaje de más proyectos */}
            <div className="mt-16 mb-8 text-center flex items-center justify-center gap-4 text-white/40 opacity-80">
              <div className="h-px w-16 md:w-32 bg-gradient-to-r from-transparent to-white/20" />
              <p className="font-mono text-xl tracking-widest uppercase">¡Y hay muchos otros más!</p>
              <div className="h-px w-16 md:w-32 bg-gradient-to-l from-transparent to-white/20" />
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            CONTACT
        ═══════════════════════════════════════════════════════════════════ */}
        <section id="contact" className="py-24 px-6 md:px-16 lg:px-28">
          <div className="max-w-7xl mx-auto">
            <div
              className="rounded-3xl border border-white/10 p-12 md:p-16 text-center"
              style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(12px)" }}
            >
              <span className="text-xs font-mono text-white/30 tracking-widest uppercase">Trabajemos juntos</span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-4">
                ¿Tienes un proyecto en mente?
              </h2>
              <p className="text-white/45 text-lg mb-10 max-w-lg mx-auto">
                Desde startups hasta empresas consolidadas — construyamos algo que importe.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                <a
                  href="mailto:enmanuel@example.com"
                  className="px-8 py-3.5 bg-white text-black rounded-full font-medium hover:bg-white/90 transition-all hover:scale-105"
                >
                  Enviar Email
                </a>
                {/* <a
                  href="#"
                  className="px-8 py-3.5 border border-white/20 text-white rounded-full font-medium hover:bg-white/8 hover:border-white/40 transition-all"
                >
                  Descargar CV
                </a> */}
              </div>
              <div className="pt-8 border-t border-white/8 flex justify-center gap-8">
                {[
                  { label: "GitHub", href: "#" },
                  { label: "LinkedIn", href: "#" },
                  { label: "Twitter / X", href: "#" },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-sm text-white/30 hover:text-white/70 transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
