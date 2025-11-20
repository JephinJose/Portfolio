import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

// We import Sky from CDN because it's an example file, or you can bundle it yourself
const SKY_MODULE_URL = 'https://cdn.jsdelivr.net/npm/three@0.158.0/examples/jsm/objects/Sky.js';
const WEBGPU_RENDERER_URL = 'https://cdn.jsdelivr.net/npm/three@0.158.0/examples/jsm/renderers/webgpu/WebGPURenderer.js';

export default function WebGPUSkyBackground() {
  const canvasRef = useRef();

  useEffect(() => {
    let renderer, scene, camera, sky, sun;
    let animationId;

    async function loadModulesAndInit() {
      // Dynamically import Sky and WebGPURenderer
      const [{ Sky }, { WebGPURenderer }] = await Promise.all([
        import(SKY_MODULE_URL),
        import(WEBGPU_RENDERER_URL)
      ]);

      if (!navigator.gpu) {
        alert('WebGPU not supported on this browser.');
        return;
      }

      // Setup renderer with the canvas ref
      renderer = new WebGPURenderer({ canvas: canvasRef.current });
      await renderer.init();
      renderer.setSize(window.innerWidth, window.innerHeight);

      // Scene & Camera
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.set(0, 10, 20);

      // Sky
      sky = new Sky();
      sky.scale.setScalar(450000);
      scene.add(sky);

      sun = new THREE.Vector3();

      // Effect parameters
      const effectController = {
        turbidity: 10,
        rayleigh: 3,
        mieCoefficient: 0.005,
        mieDirectionalG: 0.7,
        elevation: 2,
        azimuth: 180,
        exposure: 0.5
      };

      function guiChanged() {
        const uniforms = sky.material.uniforms;
        uniforms['turbidity'].value = effectController.turbidity;
        uniforms['rayleigh'].value = effectController.rayleigh;
        uniforms['mieCoefficient'].value = effectController.mieCoefficient;
        uniforms['mieDirectionalG'].value = effectController.mieDirectionalG;

        const phi = THREE.MathUtils.degToRad(90 - effectController.elevation);
        const theta = THREE.MathUtils.degToRad(effectController.azimuth);

        sun.setFromSphericalCoords(1, phi, theta);

        uniforms['sunPosition'].value.copy(sun);

        renderer.getContext().canvas.exposure = effectController.exposure;
      }

      guiChanged();

      window.addEventListener('resize', onWindowResize);

      let elevation = effectController.elevation;

      function animate() {
        elevation = (elevation + 0.02) % 90;
        effectController.elevation = elevation;
        guiChanged();

        renderer.render(scene, camera);
        animationId = requestAnimationFrame(animate);
      }

      function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);
      }

      animate();
    }

    loadModulesAndInit();

    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', () => {});
      if (animationId) cancelAnimationFrame(animationId);
      if (renderer) renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 1,
        display: 'block'
      }}
    />
  );
}
