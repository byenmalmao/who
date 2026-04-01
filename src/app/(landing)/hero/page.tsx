import React from "react";

export default function Portfolio() {
  const skills = [
    {
      category: "Frontend",
      techs: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    },
    {
      category: "Backend",
      techs: ["Node.js", "Python", "PostgreSQL", "MongoDB"],
    },
    { category: "DevOps", techs: ["Docker", "AWS", "Git", "CI/CD"] },
  ];

  const projects = [
    {
      name: "Tesla Elegance",
      description: "Animación interactiva con canvas",
      year: "2024",
    },
    {
      name: "E-commerce Platform",
      description: "Plataforma de ventas con Next.js",
      year: "2023",
    },
    {
      name: "Dashboard Analytics",
      description: "Visualización de datos en tiempo real",
      year: "2023",
    },
  ];

  return (
    <>
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-dvh w-full flex flex-col items-center justify-center py-16 px-4 md:px-20 lg:px-40">
          {/* ENCABEZADO, NOMBRE Y ASPIRACION */}
          <div className="text-center w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Columna Izquierda - Información Personal */}
            <div className="text-left order-1 lg:order-1 lg:pr-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 tracking-tight whitespace-nowrap">
                Enmanuel G.
                <span className="block text-2xl md:text-3xl lg:text-4xl text-white/60 mt-3 font-light">
                  Ingeniero - Investigador Independiente
                </span>
              </h1>
              <div className="mb-6 inline-block">
                <div className="px-4 py-2 rounded-full border border-red-500/30 bg-red-500/10 backdrop-blur-sm text-red-300 text-sm flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  Ocupado: Desarrollando o Investigando
                </div>
              </div>
            </div>

            {/* Columna Derecha - Descripción y CTA */}
            <div className="text-left lg:text-right order-2 lg:order-2">
              <p className="text-base md:text-lg lg:text-xl text-white/70 mb-8 leading-relaxed max-w-2xl lg:ml-auto">
                 
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-start lg:justify-end">
                <a
                  href="#projects"
                  className="px-6 md:px-8 py-3 bg-white text-black rounded-full font-medium hover:bg-white/90 transition-all transform hover:scale-105 text-center"
                >
                  Ver Portafolio
                </a>
                <a
                  href="#contact"
                  className="px-6 md:px-8 py-3 border border-white/30 text-white rounded-full font-medium hover:bg-white/10 transition-all transform hover:scale-105 backdrop-blur-sm text-center"
                >
                  Descargar CV
                </a>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-0 right-0 animate-bounce">
            <div className="flex justify-center">
              <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                <div className="w-1 h-2 bg-white/50 rounded-full mt-2 animate-pulse"></div>
              </div>
            </div>
          </div>
        </section>
        {/* Skills Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-white text-center mb-12">
              Tecnologías
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {skills.map((skill, idx) => (
                <div
                  key={idx}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all"
                >
                  <h3 className="text-xl font-semibold text-white mb-4">
                    {skill.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skill.techs.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-white/10 rounded-full text-white/80 text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section
          id="projects"
          className="py-20 px-4 bg-black/30 backdrop-blur-sm"
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-white text-center mb-12">
              Proyectos Destacados
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {projects.map((project, idx) => (
                <div
                  key={idx}
                  className="group bg-white/5 rounded-xl p-6 border border-white/10 hover:border-white/30 transition-all hover:transform hover:scale-105"
                >
                  <div className="text-white/40 text-sm mb-2">
                    {project.year}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {project.name}
                  </h3>
                  <p className="text-white/60 text-sm">{project.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              ¿Listo para crear algo increíble?
            </h2>
            <p className="text-white/60 text-lg mb-8">
              Hablemos sobre tu próximo proyecto
            </p>
            <a
              href="mailto:hurion@example.com"
              className="inline-block px-12 py-4 bg-white text-black rounded-full font-medium hover:bg-white/90 transition-all transform hover:scale-105"
            >
              Contactar
            </a>

            <div className="mt-12 pt-8 border-t border-white/10">
              <div className="flex justify-center gap-6 text-white/40 text-sm">
                <span>GitHub</span>
                <span>LinkedIn</span>
                <span>Twitter</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
