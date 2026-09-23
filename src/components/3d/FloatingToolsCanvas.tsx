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
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.z = 14;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    container.appendChild(renderer.domElement);

    // Subtle Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const keyLight = new THREE.PointLight(0xff6b00, 2.5, 30);
    keyLight.position.set(6, 4, 8);
    scene.add(keyLight);

    const fillLight = new THREE.PointLight(0x38bdf8, 1.8, 30);
    fillLight.position.set(-6, -4, 6);
    scene.add(fillLight);

    // Group for elegant background elements
    const bgGroup = new THREE.Group();
    scene.add(bgGroup);

    // Sleek metallic materials with subtle reflection
    const darkChromeMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      metalness: 0.9,
      roughness: 0.25,
      wireframe: true,
    });

    const subtleGoldMat = new THREE.MeshStandardMaterial({
      color: 0xffb800,
      metalness: 0.8,
      roughness: 0.3,
      transparent: true,
      opacity: 0.5,
      wireframe: false,
    });

    // 1. Subtle Geodesic Wireframe Spheres on outer flanks (far in the background)
    const sphereGeo = new THREE.IcosahedronGeometry(2.2, 1);
    const leftGlobe = new THREE.Mesh(sphereGeo, darkChromeMat);
    leftGlobe.position.set(-7.5, 1.5, -4);
    bgGroup.add(leftGlobe);

    const rightGlobe = new THREE.Mesh(sphereGeo, darkChromeMat);
    rightGlobe.position.set(7.5, -1.8, -4);
    bgGroup.add(rightGlobe);

    // 2. Delicate floating rings at the edges (never intersecting center content)
    const ringGeo = new THREE.TorusGeometry(1.6, 0.04, 16, 64);
    const leftRing = new THREE.Mesh(ringGeo, subtleGoldMat);
    leftRing.position.set(-6.5, -2.5, -2);
    leftRing.rotation.x = Math.PI / 3;
    bgGroup.add(leftRing);

    const rightRing = new THREE.Mesh(ringGeo, subtleGoldMat);
    rightRing.position.set(6.8, 2.8, -2);
    rightRing.rotation.y = Math.PI / 4;
    bgGroup.add(rightRing);

    // 3. 120+ Micro Spark Particles (welding sparks / kinetic energy floating upwards)
    const particleCount = 140;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);
    const particleSpeed: { x: number; y: number; z: number }[] = [];

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 18;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 14;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2;

      particleScales[i] = Math.random() * 0.08 + 0.04;

      particleSpeed.push({
        x: (Math.random() - 0.5) * 0.004,
        y: Math.random() * 0.012 + 0.004,
        z: (Math.random() - 0.5) * 0.004,
      });
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xffa500,
      size: 0.07,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Smooth lerp scrolling & cursor physics (100+ FPS buttery smooth)
    let currentScroll = 0;
    let targetScroll = 0;
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseX = (x / width) * 2 - 1;
      mouseY = -(y / height) * 2 + 1;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = container.getBoundingClientRect();
        mouseX = ((touch.clientX - rect.left) / width) * 2 - 1;
        mouseY = -((touch.clientY - rect.top) / height) * 2 + 1;
      }
    };

    const handleScroll = () => {
      targetScroll = window.scrollY * 0.002;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Animation Loop with clock delta
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Smooth lerp interpolation for 60-120fps buttery motion
      currentScroll += (targetScroll - currentScroll) * 0.08;
      targetMouseX += (mouseX - targetMouseX) * 0.05;
      targetMouseY += (mouseY - targetMouseY) * 0.05;

      // Rotate group gently in response to scroll & cursor
      bgGroup.rotation.y = targetMouseX * 0.25 + elapsedTime * 0.05 + currentScroll * 0.4;
      bgGroup.rotation.x = -targetMouseY * 0.15 + Math.sin(elapsedTime * 0.3) * 0.04;

      // Outer globes rotate on their own axis
      leftGlobe.rotation.y += 0.003;
      leftGlobe.rotation.x += 0.002;
      rightGlobe.rotation.y -= 0.003;
      rightGlobe.rotation.x -= 0.002;

      leftRing.rotation.z += 0.005;
      rightRing.rotation.z -= 0.005;

      // Particle upward flow
      const positions = particleGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += particleSpeed[i].y + currentScroll * 0.02;
        positions[i * 3] += particleSpeed[i].x;

        if (positions[i * 3 + 1] > 8) {
          positions[i * 3 + 1] = -8;
          positions[i * 3] = (Math.random() - 0.5) * 18;
        }
      }
      particleGeometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

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
      sphereGeo.dispose();
      ringGeo.dispose();
      particleGeometry.dispose();
      darkChromeMat.dispose();
      subtleGoldMat.dispose();
      particleMaterial.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden opacity-60"
      aria-hidden="true"
    />
  );
};
