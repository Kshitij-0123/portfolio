import React, { useEffect, useRef } from "react";
import styles from "./Background.module.scss";
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  AmbientLight,
  IcosahedronGeometry,
  Mesh,
  PointLight,
  MeshPhongMaterial,
  HemisphereLight,
  SphereGeometry,
  BoxGeometry,
  BufferGeometry,
  Points,
  BufferAttribute,
  PointsMaterial,
  TextureLoader,
} from "three";

import starAl from "../../assets/new_star.png";
import mp from "../../assets/bumpMap.jpg";

const Background = () => {
  const canvasRef = useRef();
  useEffect(() => {
    const sizes = [window.innerWidth, window.innerHeight];
    const scene = new Scene();

    const camera = new PerspectiveCamera(50, sizes[0] / sizes[1], 1, 1000);
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 9;
    camera.rotateZ(200);

    const renderer = new WebGLRenderer({
      alpha: true,
      canvas: canvasRef.current,
      antialias: true,
    });
    renderer.setSize(sizes[0], sizes[1] - 4);

    const ambientLight = new AmbientLight(0x322300, 1);
    // const directionalLight = new DirectionalLight(0x00ffff, 0.4);
    // directionalLight.position.set(-10, 0, 10);
    const hemisphereLight = new HemisphereLight(0xffff00, 0xff5500, 1);
    hemisphereLight.position.set(0, 8, -10);
    // const pointLightB = new PointLight(0x00ffff, 0.5);
    // pointLightB.position.set(-15, 18, 6);
    // pointLightB.castShadow = true;
    // const pointLightB2 = new PointLight(0x00ffff, 0.5);
    // pointLightB2.position.set(15, -10, -6);
    const pointLightY = new PointLight(0xff7300, 0.2);
    pointLightY.position.set(0, 0, 10);
    scene.add(pointLightY);
    scene.add(ambientLight);
    scene.add(hemisphereLight);
    // scene.add(directionalLight);
    // scene.add(pointLightB);
    // scene.add(pointLightB2);

    const particleGeometry = new BufferGeometry();
    const particleCount = 5000;
    const posParticles = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      posParticles[i] = (Math.random() - 0.5) * 100 * 1.8 - 20;
    }
    particleGeometry.setAttribute(
      "position",
      new BufferAttribute(posParticles, 3)
    );

    // const geometeryIcosahedron = new BoxGeometry(1, 1, 1);
    const geometeryIcosahedron = new SphereGeometry(1, 100, 100);
    const materialIcosahedron = new MeshPhongMaterial({
      //   bumpMap: new TextureLoader().load(mp),
      //   bumpScale: 0.02,
    //   wireframe: true,
    });
    const meshIcosahedron = new Mesh(geometeryIcosahedron, materialIcosahedron);
    const meshIcosahedron2 = new Mesh(
      new IcosahedronGeometry(1, 1),
      new MeshPhongMaterial({
        emissive: 0xff8800,
        reflectivity: 0,
        wireframe: true,
      })
    );
    meshIcosahedron2.scale.set(1.5, 1.5, 1.5);
    const particleMaterial = new PointsMaterial({
      size: 0.05,
      color: 0xddff00,
      alphaMap: new TextureLoader().load(starAl),
    });
    const meshParticles = new Points(particleGeometry, particleMaterial);

    scene.add(meshIcosahedron);
    scene.add(meshIcosahedron2);
    scene.add(meshParticles);

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight - 4);
    }

    window.addEventListener("resize", onWindowResize, false);

    const targetX = window.innerWidth / 2;
    const targetY = window.innerHeight / 2;

    window.addEventListener("mousemove", (event) => {
      meshIcosahedron.rotation.y =
        -(event.clientY - targetX - meshIcosahedron.rotation.y) * 0.009;
      meshIcosahedron.rotation.x =
        (event.clientX - targetY - meshIcosahedron.rotation.x) * 0.009;
      meshIcosahedron.position.z = -(event.clientX - targetX) * 0.0009;

      meshIcosahedron2.rotation.y =
        -(event.clientY - targetX - meshIcosahedron.rotation.y) * 0.0009;
      meshIcosahedron2.rotation.x =
        (event.clientX - targetY - meshIcosahedron.rotation.x) * 0.0009;
      meshIcosahedron2.position.z = -(event.clientX - targetX) * 0.0009;

      meshParticles.rotation.y =
        -(event.clientY - targetX - meshIcosahedron.rotation.y) * 0.0003;
      meshParticles.rotation.x =
        (event.clientX - targetY - meshIcosahedron.rotation.x) * 0.0003;
      meshParticles.position.z = -(event.clientX - targetX) * 0.0003;

      camera.rotation.y =
        (event.clientX - targetY - camera.rotation.x) * 0.00009;
      camera.rotation.x =
        (event.clientY - targetX - camera.rotation.y) * 0.00009;
    });
    const animate = () => {
      window.requestAnimationFrame(animate);
      meshIcosahedron.rotateY(0.001);
      meshIcosahedron.rotateX(0.001);
      meshIcosahedron.position.z+=(0.001);
      meshIcosahedron2.rotateY(-0.001);
      meshIcosahedron2.rotateX(-0.001);
      meshIcosahedron2.rotateZ(-0.001);
      meshParticles.rotation.x += 0.0002;
      meshParticles.rotation.z += 0.0002;
      renderer.render(scene, camera);
    };
    animate();
  }, []);
  return (
    // <div className={styles.background}>
    <canvas className={styles.background} ref={canvasRef} />
    // </div>
  );
};

export default Background;
