"use client";

import React, { useState } from "react";
import Planet from "../components/Planet";
import ProjectCard, { Project, isVideo } from "../components/ProjectCard";

/* ─────────────────────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────────────────────── */

const skills = [
  {
    category: "Artificial Intelligence & Automation ",
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
    techs: ["Express", "FastAPI", "Django", ".NET", "MySQL", "PostgreSQL", "MongoDB", "Neon", "Axum", "NestJS", "Bun", "Supabase", "Firebase", "Qdrant"],
  },
  {
    category: "DevOps / Cloud & Servers",
    icon: "⬢",
    techs: ["Docker", "AWS", "Azure", "Git", "CI/CD", "Cloudflare", "Vercel", "Ubuntu", "Windows Server", "Cisco"],
  },
  {
    category: "Languages",
    icon: "⟨/⟩",
    techs: ["JavaScript", "TypeScript", "Python", "Dart", "SQL", "Rust", "Java", "PHP", "Kotlin", "C#", "C++", "C"],
  },
];



const projects: Project[] = [
  {
    name: "Joseate",
    tagline: "Referral Network",
    description:
      "The most ambitious project I have built. A complete platform connecting recruiters, candidates, and BPO companies in the Dominican Republic. Includes real-time tracking referral system, automated payments, analytical dashboards, and mass placement management.",
    tags: ["React", "Javascript","Express", "MongoDB", "WebSockets", "Cloudflare"],
    status: "Live",
    scale: "Referral Web Platform",
    images: ["/joseate/HomeJoseate.png","/joseate/Jobs.png","/joseate/Apply.png","/joseate/Chat.png"],
    color: "from-amber-500/10 to-orange-600/10",
    accent: "#f59e0b",
    url: "https://joseate.com",
    desktopVideo: "/joseate/main.mp4",
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
    tagline: "Premium E-commerce Theme Development",
    description:
      "Design and development of fully customized Shopify Themes & NextJS Stores for clients in imported product markets. From fashion stores to electronics, optimized for conversion with ultra-fast loading rates and immersive shopping experiences.",
    tags: ["Liquid", "JavaScript", "Shopify API", "CSS", "Performance", "NextJS"],
    status: "Live",
    scale: "Freelance / Agency",
    images: [],
    color: "from-green-500/10 to-emerald-600/10",
    accent: "#008f21ff",
    url: "#",
  },
  {
    name: "Clinica Jarabacoa",
    tagline: "Comprehensive Clinical Management System",
    description:
      "Complete hospital management system for the Cardiology Clinic of Jarabacoa. Modules for patients, appointments, digital medical records, billing, pharmacy inventory, and statistical reports. Transforming clinical operations from paper to digital.",
    tags: ["Flutter", "Layered Architecture", "Supabase", "Docker", "Windows/Linux/Mac"],
    status: "Live",
    scale: "Clinical Desktop System",
    images: ["/clinica/LoginClinica.png", "/clinica/DatabaseClinica.png", "/clinica/paciente.png", "/clinica/agenda.png"],
    color: "from-sky-500/10 to-blue-600/10",
    accent: "#0ea5e9",
    url: "#",
    desktopVideo: "/clinica/videoclinica.mp4",
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
    name: "Talkify",
    tagline: "Language Exchange Web App",
    description:
      "Talkify is a digital platform designed to facilitate language learning through direct interaction between people of different languages and cultures. Unlike traditional methodologies, Talkify integrates video calls, chat, and educational tools in a single environment, encouraging real practice and linguistic immersion. Its main objective is to create a safe, accessible, and motivating space where users can develop communication skills through authentic social experiences. (The API for the picture profile was closed btw)",
    tags: ["React", "ExpressJS", "Tailwind CSS", "MongoDB", "noSQL", "Cloudinary", "WebSockets", "JWT", "tanstack", "Axios", "DaisyUI", "Stream-io"],
    status: "Completed",
    scale: "Web",
    images: ["/talkify/videocall1.png", "/talkify/DFDTalkify.png", "/talkify/ERTalkify.png", "/talkify/Chat.png"], 
    color: "from-lime-200/10 to-stone-100/10",
    accent: "#83ae75ff",
    url: "https://talkify-103i.onrender.com",
    desktopVideo: "/talkify/videoTalk.mp4",

  },
  {
    name: "SLAM ",
    tagline: "Simultaneous Localization and Mapping Research",
    description:
      "Applied research in Simultaneous Localization and Mapping (SLAM) for autonomous robotics. Implementation of state-of-the-art algorithms for navigation in unstructured environments, presented as a university research project.",
    tags: ["Python", "ROS", "OpenCV", "C++", "Robotics"],
    status: "Completed",
    scale: "Academic Research",
    images: ["slam/SlamAplicaciones.png","slam/quizz.png","slam/SlamArq.png","slam/videolidar.gif"],
    color: "from-rose-500/10 to-pink-600/10",
    accent: "#f43f5e",
    url: "https://slam-eta.vercel.app",
    desktopVideo: "slam/SlamVideo.mp4",
    
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
        <h3 className="text-white font-semibold text-lg mb-1">Add resource (Image/Video)</h3>
        <p className="text-white/40 text-sm mb-5">
          Project: <span className="text-white/60">{projectName}</span>
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
            Cancel
          </button>
          <button
            onClick={() => { if (url.trim()) { onAdd(url.trim()); onClose(); } }}
            className="flex-1 py-2.5 rounded-xl bg-white text-black text-sm font-medium hover:bg-white/90 transition-all"
          >
            Add
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
            <span>←</span> Previous
          </button>
          <button
            onClick={onNext}
            disabled={state.imageIdx >= project.images.length - 1}
            className="px-4 py-2 rounded-xl border border-white/15 text-white/50 hover:text-white hover:border-white/30 transition-all disabled:opacity-30 flex items-center gap-2"
          >
             Next <span>→</span>
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
                Busy — Developing and Researching
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
                <span className="text-amber-300/80 font-medium">Software Engineer</span>
                {" "}&amp;{" "}
                <span className="text-white/50">Independent Researcher</span>
              </p>

              {/* Bio */}
              <p className="text-white/55 text-base leading-relaxed max-w-lg mb-10">
                I analyze complex problems into technological solutions with a business vision.
                I combine software engineering with business strategies to build products that scale in local and international markets. I also study specific topics and make dynamic web presentations about them haha.
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
                  View Projects
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
                  className="absolute -top-2 -left-4 md:-left-16 w-56 p-5 rounded-2xl orbit-card border border-amber-500/20 bg-gradient-to-br from-amber-500/10 to-orange-600/5 hover:border-amber-500/40 transition-all pointer-events-auto"
                  style={{ animation: 'float-1 6s ease-in-out infinite' }}
                >
                  <div className="absolute inset-0 bg-amber-500/5 blur-xl rounded-2xl pointer-events-none" />
                  <div className="relative z-10 flex items-center justify-center font-serif text-2xl md:text-3xl font-bold text-amber-400 mb-2 drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]">
                    <span className="flex flex-col items-center justify-center mr-1.5">
                      <span className="text-xs font-bold mb-[-5px] z-10">∞</span>
                      <span className="text-5xl font-normal leading-none" style={{ transform: "scaleY(1.2)" }}>∫</span>
                      <span className="text-xs font-bold mt-[-5px] z-10">-∞</span>
                    </span>
                    <span className="flex items-start ml-1">
                      <span className="italic">e</span>
                      <sup className="text-sm md:text-base tracking-tighter mt-1">-x²</sup>
                    </span>
                    <span className="italic ml-2">dx</span>
                    <span className="mx-3">=</span>
                    <span>√π</span>
                  </div>
                  <div className="relative z-10 text-xs font-medium text-white/80 mb-0.5">Gaussian Integral </div>
                  <div className="relative z-10 text-[10px] text-white/40">In production</div>
                </div>

                {/* 2. Bottom Left Card - Sky Blue */}
                <div 
                  className="absolute -bottom-8 -left-2 md:-left-8 w-44 p-4 rounded-2xl orbit-card border border-sky-500/20 bg-gradient-to-br from-sky-500/10 to-blue-600/5 hover:border-sky-500/40 transition-all pointer-events-auto"
                  style={{ animation: 'float-2 7s ease-in-out infinite' }}
                >
                  <div className="absolute inset-0 bg-sky-500/5 blur-xl rounded-2xl pointer-events-none" />
                  <div className="relative z-10 text-3xl md:text-4xl font-black text-sky-400 mb-1 drop-shadow-[0_0_8px_rgba(14,165,233,0.4)]">3+</div>
                  <div className="relative z-10 text-xs font-medium text-white/80 mb-0.5">Years of Exp.</div>
                  <div className="relative z-10 text-[10px] text-white/40">Professional development</div>
                </div>

                {/* 3. Top Right Card - Rose/Pink */}
                <div 
                  className="absolute top-8 -right-4 md:-right-12 w-48 p-4 rounded-2xl orbit-card border border-rose-500/20 bg-gradient-to-br from-rose-500/10 to-pink-600/5 hover:border-rose-500/40 transition-all pointer-events-auto"
                  style={{ animation: 'float-3 5.5s ease-in-out infinite' }}
                >
                  <div className="absolute inset-0 bg-rose-500/5 blur-xl rounded-2xl pointer-events-none" />
                  <div className="relative z-10 text-3xl md:text-4xl font-black text-rose-400 mb-1 drop-shadow-[0_0_8px_rgba(244,63,94,0.4)]">30+</div>
                  <div className="relative z-10 text-xs font-medium text-white/80 mb-0.5">Technologies</div>
                  <div className="relative z-10 text-[10px] text-white/40">Varied domains</div>
                </div>

                {/* 4. Bottom Right Card - Teal */}
                <div 
                  className="absolute bottom-2 -right-6 md:-right-16 w-44 p-4 rounded-2xl orbit-card border border-teal-500/20 bg-gradient-to-br from-teal-500/10 to-cyan-600/5 hover:border-teal-500/40 transition-all pointer-events-auto"
                  style={{ animation: 'float-4 6.5s ease-in-out infinite' }}
                >
                  <div className="absolute inset-0 bg-teal-500/5 blur-xl rounded-2xl pointer-events-none" />
                  <div className="relative z-10 text-3xl md:text-4xl font-black text-teal-400 mb-1 drop-shadow-[0_0_8px_rgba(20,184,166,0.4)]">6</div>
                  <div className="relative z-10 text-xs font-medium text-white/80 mb-0.5">Industries</div>
                  <div className="relative z-10 text-[10px] text-white/40">Health, E-commerce, etc</div>
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
              <span className="text-xs font-mono text-white/30 tracking-widest uppercase">Tech Stack</span>
              <h2 className="text-4xl font-bold text-white mt-2">Technologies</h2>
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
                <span className="text-xs font-mono text-white/30 tracking-widest uppercase">Portfolio</span>
                <h2 className="text-4xl font-bold text-white mt-2">Projects</h2>
                <p className="text-white/40 mt-2 text-sm max-w-md">
                  Every project is a real solution to a real problem. Explore them, see the details.
                </p>
              </div>
              <div className="flex gap-4 text-xs text-white/30">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full" /> Live
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-amber-400 rounded-full" /> In Development
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" /> Completed
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
              <p className="font-mono text-xl tracking-widest uppercase">And there are many more!</p>
              <div className="h-px w-16 md:w-32 bg-gradient-to-l from-transparent to-white/20" />
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            CONTACT
        ═══════════════════════════════════════════════════════════════════ */}
       
      </div>
    </>
  );
}
