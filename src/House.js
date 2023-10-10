import { useRef } from 'react';
//import { PivotControls } from '@react-three/drei';
import { Geometry, Base, Addition/*Subtraction, */ } from '@react-three/csg';
import * as THREE from 'three';

const wingWidth = 9;
const wingDepth = 9;
const slabHeight = 0.3;
const centerArea = ((Math.sqrt(3) / 4) * Math.pow(wingWidth, 2));
const centerInRadius = ((Math.sqrt(3) * wingWidth) / 6); //(wingWidth / Math.sqrt(3));
const wingOffset = (centerInRadius + (wingDepth / 2));

const centerSlab = new THREE.CylinderGeometry(centerInRadius, centerInRadius, slabHeight, 3);
const wingSlab = new THREE.BoxGeometry(wingWidth, slabHeight, wingDepth);



/*
const cyl = new THREE.CylinderGeometry(1, 1, 2, 20);
//const tri = new THREE.CylinderGeometry(1, 1, 2, 3);

const Door = (props) => (
  <Subtraction {...props}>
    <Geometry>
      <Base geometry={box} scale={[1, 2, 1]} />
      <Addition geometry={cyl} scale={0.5} rotation={[Math.PI / 2, 0, 0]} position={[0, 1, 0]} />
    </Geometry>
  </Subtraction>
);

const Window = (props) => (
  <Subtraction {...props}>
    <Geometry>
      <Base geometry={box} />
      <Subtraction geometry={box} scale={[0.05, 1, 1]} />
      <Subtraction geometry={box} scale={[1, 0.05, 1]} />
    </Geometry>
  </Subtraction>
);

const Chimney = (props) => (
  <Addition name="chimney" {...props}>
    <Geometry>
      <Base name="base" geometry={box} scale={[1, 2, 1]} />
      <Subtraction name="hole" geometry={box} scale={[0.7, 2, 0.7]} position={[0, 0.5, 0]} />
    </Geometry>
  </Addition>
);
*/

function House(props) {
  const csg = useRef();
  const wings = ['rhodope', 'pirin', 'rila'].map((name, index) => ({
    name,
    bearing: 90 + (index * 120)
  }));
  return (
    <mesh receiveShadow castShadow {...props}>
      <Geometry ref={csg} computeVertexNormals>
        <Base name="centerSlab" geometry={centerSlab} position={[0, 0, (centerInRadius / 2)]} />
        {
          wings.map((wing) => (
            <Addition geometry={wingSlab} scale={0.5} rotation={[0, THREE.MathUtils.degToRad(wing.bearing), 0]} position={[(wingOffset * Math.cos(wing.bearing * Math.PI / 180)), 0, (wingOffset * Math.sin(wing.bearing * Math.PI / 180))]} />
          ))
        }
      </Geometry>
      {
        /*
        wings.map((wing) => (
          <Geometry key={wing.name} ref={wing.ref} computeVertexNormals>
            <Base name={wing.name} geometry={wingSlab} position={[wing.x, 0, wing.y]} rotation={[0, THREE.MathUtils.degToRad(wing.rotation), 0]} />
          </Geometry>
        ))
        */
      }
      <meshStandardMaterial envMapIntensity={0.25} />
    </mesh>
  );
}

export default House;
