import React, { useRef, useEffect, ReactNode } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface PlanetProps {
  rotationSpeed?: number;
  ringOpacity?: number;
  autoRotate?: boolean;
  children?: ReactNode; // Espacio para agregar componentes sobre el anillo/planeta
}

const Planet: React.FC<PlanetProps> = ({ 
  rotationSpeed = 0.003, 
  ringOpacity = 0.3,
  autoRotate = true,
  children
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Escena con fondo transparente
    const scene = new THREE.Scene();
    scene.background = null;

    // Cámara ajustada para mostrar TODO el anillo sin cortes y un buen ángulo
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    // Ángulo específico pedido: Ligeramente desde arriba y de lado
    camera.position.set(2.5, 3.5, 8.5); 
    camera.lookAt(0, 0, 0);

    // Renderer transparente
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Responsive Canvas
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width === 0 || height === 0) continue;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      }
    });
    if (mountRef.current) {
      resizeObserver.observe(mountRef.current);
    }

    // Controles interactivos
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = false;
    controls.enableZoom = false; // Desactivado para no interferir con scroll
    controls.enablePan = false;

    // --- Textura procedural para el planeta ---
    // Paleta del proyecto: Oscuro (black/slate), toques sutiles de luz blanca.
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d')!;
    
    // Base casi negra (glassy dark)
    ctx.fillStyle = '#050505';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Manchas oscuras
    for (let i = 0; i < 250; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const radius = Math.random() * 25 + 5;
      const alpha = Math.random() * 0.4 + 0.1;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(15, 15, 15, ${alpha})`;
      ctx.fill();
    }
    
    // Grietas/Detalles blancos tenues
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1.5;
    for (let i = 0; i < 150; i++) {
      ctx.beginPath();
      const startX = Math.random() * canvas.width;
      const startY = Math.random() * canvas.height;
      ctx.moveTo(startX, startY);
      ctx.lineTo(startX + (Math.random() - 0.5) * 150, startY + (Math.random() - 0.5) * 150);
      ctx.stroke();
    }
    
    const planetTexture = new THREE.CanvasTexture(canvas);
    planetTexture.wrapS = THREE.RepeatWrapping;
    planetTexture.wrapT = THREE.RepeatWrapping;
    
    // Material del planeta
    const planetMaterial = new THREE.MeshStandardMaterial({
      map: planetTexture,
      color: 0x111111,
      roughness: 0.3, // Mas pulido (glass effect)
      metalness: 0.8,
      emissive: 0x0a0a0a,
      emissiveIntensity: 0.5,
    });

    const planetGeometry = new THREE.SphereGeometry(1.2, 64, 64);
    const planet = new THREE.Mesh(planetGeometry, planetMaterial);
    scene.add(planet);

    // --- Anillo principal translúcido ---
    const ringGeometry = new THREE.TorusGeometry(2.1, 0.08, 64, 200);
    const ringMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xffffff,
      emissiveIntensity: 0.1,
      transparent: true,
      opacity: ringOpacity,
      side: THREE.DoubleSide,
      roughness: 0.5,
      metalness: 0.9,
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI / 2.3;
    ring.rotation.z = 0.15;
    scene.add(ring);

    // --- Anillo exterior de luz neon blanca ---
    const neonRingGeometry = new THREE.TorusGeometry(2.5, 0.015, 16, 100);
    const neonRingMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: ringOpacity * 1.5,
    });
    const neonRing = new THREE.Mesh(neonRingGeometry, neonRingMaterial);
    neonRing.rotation.x = Math.PI / 2.3;
    neonRing.rotation.z = 0.15;
    scene.add(neonRing);

    // --- Partículas / Polvo Estelar ---
    const dustCount = 1500;
    const dustGeometry = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      const radius = 1.8 + Math.random() * 2.0;
      const angle = Math.random() * Math.PI * 2;
      const yOffset = (Math.random() - 0.5) * 0.4;
      dustPositions[i * 3] = Math.cos(angle) * radius;
      dustPositions[i * 3 + 1] = yOffset;
      dustPositions[i * 3 + 2] = Math.sin(angle) * radius;
    }
    dustGeometry.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
    const dustMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.02,
      transparent: true,
      opacity: 0.4,
    });
    const dust = new THREE.Points(dustGeometry, dustMaterial);
    // Inclinarlas para coincidir con los anillos
    dust.rotation.x = Math.PI / 2.3 - Math.PI / 2;
    dust.rotation.z = 0.15;
    scene.add(dust);

    // --- Sistema de iluminación ---
    const ambientLight = new THREE.AmbientLight(0x222222, 1);
    scene.add(ambientLight);
    
    const mainLight = new THREE.DirectionalLight(0xffffff, 2);
    mainLight.position.set(5, 5, 5);
    scene.add(mainLight);
    
    const fillLight = new THREE.PointLight(0x444444, 1);
    fillLight.position.set(-5, 0, -5);
    scene.add(fillLight);
    
    // Luz trasera (Rim light) para efecto dinámico
    const rimLight = new THREE.PointLight(0xffffff, 3);
    rimLight.position.set(0, 0, -3);
    scene.add(rimLight);

    // --- Animación ---
    let animationId: number;
    let time = 0;
    
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      time += 1;
      
      if (autoRotate) {
        planet.rotation.y += rotationSpeed;
        ring.rotation.z -= rotationSpeed * 0.5;
        neonRing.rotation.z -= rotationSpeed * 0.8;
        dust.rotation.y += rotationSpeed * 0.3;
      }
      
      // Pulso suave en la luz de borde
      rimLight.intensity = 2 + Math.sin(time * 0.03) * 1;
      
      controls.update();
      renderer.render(scene, camera);
    };
    
    animate();

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationId);
      renderer.dispose();
      planetGeometry.dispose();
      ringGeometry.dispose();
      neonRingGeometry.dispose();
      dustGeometry.dispose();
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, [rotationSpeed, ringOpacity, autoRotate]);

  return (
    <div className="relative flex items-center justify-center w-full h-full min-h-[500px]">
      {/* 3D Canvas Container */}
      <div ref={mountRef} className="absolute inset-0 flex items-center justify-center pointer-events-auto overflow-hidden" />
      
      {/* Anillo HTML (Orbit Track) para poner componentes */}
      {children && (
        <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  );
};

export default Planet;