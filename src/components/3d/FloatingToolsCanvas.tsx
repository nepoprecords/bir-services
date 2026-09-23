import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const FloatingToolsCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const width = container.clientWidth;
    const height = container.clientHeight;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 12;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xff6b00, 2.5); // Bir Orange key light
    dirLight1.position.set(5, 5, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x38bdf8, 2.0); // Electric Cyan rim light
    dirLight2.position.set(-5, -5, 2);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xffb800, 3, 20); // Warm Gold spark light
    pointLight.position.set(0, 0, 4);
    scene.add(pointLight);

    // Group of floating objects
    const toolsGroup = new THREE.Group();
    scene.add(toolsGroup);

    // Materials
    const goldMetalMat = new THREE.MeshStandardMaterial({
      color: 0xffb800,
      metalness: 0.85,
      roughness: 0.25,
    });

    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.95,
      roughness: 0.15,
    });

    const orangeMat = new THREE.MeshStandardMaterial({
      color: 0xff6b00,
      roughness: 0.3,
      metalness: 0.5,
    });

    const glowMat = new THREE.MeshStandardMaterial({
      color: 0xffde59,
      emissive: 0xff8c00,
      emissiveIntensity: 0.6,
      roughness: 0.2,
    });

    // 1. Gears / Cogwheels (representing mechanics & engineering)
    const gearGeo = new THREE.TorusGeometry(1.2, 0.35, 16, 32);
    const gear1 = new THREE.Mesh(gearGeo, goldMetalMat);
    gear1.position.set(3.2, 1.8, -2);
    gear1.rotation.x = Math.PI / 4;
    toolsGroup.add(gear1);

    const smallGearGeo = new THREE.TorusGeometry(0.7, 0.2, 16, 24);
    const gear2 = new THREE.Mesh(smallGearGeo, chromeMat);
    gear2.position.set(-3.5, -1.5, -1);
    toolsGroup.add(gear2);

    // 2. Hexagonal Nuts (Fasteners / Construction)
    const nutGeo = new THREE.CylinderGeometry(0.7, 0.7, 0.4, 6);
    const nut1 = new THREE.Mesh(nutGeo, chromeMat);
    nut1.position.set(-2.8, 2.2, 0);
    nut1.rotation.x = Math.PI / 3;
    nut1.rotation.y = Math.PI / 6;
    toolsGroup.add(nut1);

    const nut2 = new THREE.Mesh(nutGeo, orangeMat);
    nut2.position.set(2.6, -2.2, 1);
    nut2.scale.set(0.7, 0.7, 0.7);
    toolsGroup.add(nut2);

    // 3. Electric Spark / Energy Torus (Electrical)
    const coilGeo = new THREE.TorusKnotGeometry(0.8, 0.25, 64, 16, 2, 3);
    const coil = new THREE.Mesh(coilGeo, glowMat);
    coil.position.set(0, -3.2, -2.5);
    coil.scale.set(0.65, 0.65, 0.65);
    toolsGroup.add(coil);

    // 4. Floating Spark Particles (Sparks from welding / repairs)
    const particleCount = 45;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleVelocities: { x: number; y: number; z: number }[] = [];

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 14;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 8;

      particleVelocities.push({
        x: (Math.random() - 0.5) * 0.008,
        y: Math.random() * 0.015 + 0.005,
        z: (Math.random() - 0.5) * 0.008,
      });
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xffa500,
      size: 0.12,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Mouse & Scroll interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let scrollSpeed = 0;
    let lastScrollY = window.scrollY;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      mouseX = (x / width) * 2 - 1;
      mouseY = -(y / height) * 2 + 1;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        const touch = event.touches[0];
        const rect = container.getBoundingClientRect();
        mouseX = ((touch.clientX - rect.left) / width) * 2 - 1;
        mouseY = -((touch.clientY - rect.top) / height) * 2 + 1;
      }
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      scrollSpeed = Math.abs(currentScrollY - lastScrollY) * 0.05;
      lastScrollY = currentScrollY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse follow
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      toolsGroup.rotation.y = targetX * 0.4 + elapsedTime * (0.15 + scrollSpeed * 0.5);
      toolsGroup.rotation.x = -targetY * 0.3 + Math.sin(elapsedTime * 0.5) * 0.08;

      // Individual object rotations & bobbing
      gear1.rotation.z += 0.015;
      gear1.position.y = 1.8 + Math.sin(elapsedTime * 1.5) * 0.25;

      gear2.rotation.z -= 0.02;
      gear2.position.y = -1.5 + Math.cos(elapsedTime * 1.8) * 0.2;

      nut1.rotation.y += 0.01;
      nut1.rotation.x += 0.015;
      nut1.position.y = 2.2 + Math.sin(elapsedTime * 2.0) * 0.15;

      nut2.rotation.y -= 0.015;
      nut2.position.y = -2.2 + Math.cos(elapsedTime * 1.4) * 0.2;

      coil.rotation.x += 0.02;
      coil.rotation.y += 0.025;
      coil.position.y = -3.2 + Math.sin(elapsedTime * 1.2) * 0.2;

      // Spark particles drift upwards
      const positions = particleGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += particleVelocities[i].y + scrollSpeed * 0.02;
        positions[i * 3] += particleVelocities[i].x;

        // Reset if float out of top bound
        if (positions[i * 3 + 1] > 6) {
          positions[i * 3 + 1] = -6;
          positions[i * 3] = (Math.random() - 0.5) * 12;
        }
      }
      particleGeometry.attributes.position.needsUpdate = true;

      // Decay scroll speed
      scrollSpeed *= 0.92;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      gearGeo.dispose();
      nutGeo.dispose();
      coilGeo.dispose();
      particleGeometry.dispose();
      goldMetalMat.dispose();
      chromeMat.dispose();
      orangeMat.dispose();
      glowMat.dispose();
      particleMaterial.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden opacity-85"
      aria-hidden="true"
    />
  );
};
