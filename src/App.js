import React, { Fragment/*, useState, useEffect*/ } from 'react';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';

import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';

/*
import { Environment } from './Environment';
import House from './House';
*/

const base = 'https://gist.githubusercontent.com/grenade/bacfcaa93d858a387b1c9d94fe67e9c7/raw';


function App() {

  const components = [
    {
      name: 'roof',
      color: 'rgb(255, 255, 255)',
      opacity: 0.9,
      stl: useLoader(STLLoader, `${base}/7c82990faec1bff4c63b2c808c53957a4a8846428de5f0f648a2550d7f22a6de.stl`),
    },
    {
      name: 'trusses',
      color: 'rgb(187, 129, 65)',
      opacity: 0.9,
      stl: useLoader(STLLoader, `${base}/244a9969971f2784bc0fd870b2f553d45ba47c5d6c0fe41e5b86a170695b657f.stl`),
    },
    {
      name: 'concrete',
      color: 'rgb(210, 209, 205)',
      opacity: 0.5,
      stl: useLoader(STLLoader, `${base}/cd8ab7aa998190d26315c328c9bb6919ff8c3d06d64676167c0a61389becf967.stl`),
    },
    {
      name: 'stairs',
      color: 'rgb(210, 209, 205)',
      opacity: 0.7,
      stl: useLoader(STLLoader, `${base}/55c6feb95fe40493506b29415c28765dedeacf36833e209fd9bf528f31535675.stl`),
    },


    {
      name: 'plot',
      color: 'rgb(86, 125, 70)',
      opacity: 0.2,
      stl: useLoader(STLLoader, `${base}/44d712deb0c421e2db2eb625b76085d36c7a226afc9b7918cee13e59b0c4769d.stl`),
    },
  ];

  /*
  useEffect(() => {
    if ( ! concrete.boundingSphere ) {
      concrete.computeBoundingSphere();
    }
    console.log('concrete radius', concrete.boundingSphere.radius );

    //const scale = concrete.boundingSphere.radius;
    //geomLower.scale( scale, scale, scale );
    //console.log( 'geomLower radius (after scaling)', geomLower.boundingSphere.radius );

  })
  */
  return (
    <Container>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Navbar.Brand href="#home">
          <Image src="favicon-16x16.png" roundedCircle />
          the y
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
      </Navbar>
      <Row style={{height: '1200px'}}>
        {
          /*
        <Canvas shadows camera={{ position: [-15, 10, 15], fov: 25 }}>
          <color attach="background" args={['skyblue']} />
          <House />
          <Environment />
          <OrbitControls makeDefault />
          <gridHelper />
        </Canvas>
          */
        }

        <Canvas>
            {
              components.map(({name, stl, color, opacity}) => (
                <mesh key={name} scale={0.00015}>
                  <primitive object={stl}/>
                  <meshStandardMaterial color={color} transparent={!!opacity && (opacity < 1)} opacity={opacity} />
                </mesh>
              ))
            }
          <OrbitControls makeDefault />
          <ambientLight/>
        {
          /*
          <pointLight position={[10, 10, 10]}/>
          */
        }
        </Canvas>
      </Row>
    </Container>
  );
}

export default App;
