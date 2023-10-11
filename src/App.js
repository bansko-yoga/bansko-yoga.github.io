import React, { useRef, useState } from 'react';

import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

import { ArrowCounterclockwise } from "react-bootstrap-icons";

import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';

import { Environment } from './Environment';

const base = 'https://gist.githubusercontent.com/grenade/bacfcaa93d858a387b1c9d94fe67e9c7/raw';
const defaultCamera = {
  zoom: 1,
  fov: 5,
  position: [0, -60, 25],
  minDistance: 10,
  maxDistance: 80,
  target: [0, 0, 0],
};

function App() {
  const orbitControls = useRef();
  const [camera, setCamera] = useState(defaultCamera);
  const [components, setComponents] = useState([
    {
      id: '7c82990faec1bff4c63b2c808c53957a4a8846428de5f0f648a2550d7f22a6de',
      name: 'roof',
      color: 'rgb(0, 0, 0)',
      opacity: 0.9,
      visible: true,
      stl: useLoader(STLLoader, `${base}/7c82990faec1bff4c63b2c808c53957a4a8846428de5f0f648a2550d7f22a6de.stl`),
    },
    {
      id: '244a9969971f2784bc0fd870b2f553d45ba47c5d6c0fe41e5b86a170695b657f',
      name: 'trusses',
      color: 'rgb(187, 129, 65)',
      opacity: 0.9,
      visible: true,
      stl: useLoader(STLLoader, `${base}/244a9969971f2784bc0fd870b2f553d45ba47c5d6c0fe41e5b86a170695b657f.stl`),
    },
    {
      id: 'cd8ab7aa998190d26315c328c9bb6919ff8c3d06d64676167c0a61389becf967',
      name: 'walls',
      color: '#ffffff',
      opacity: 0.9,
      visible: true,
      stl: useLoader(STLLoader, `${base}/cd8ab7aa998190d26315c328c9bb6919ff8c3d06d64676167c0a61389becf967.stl`),
    },
    {
      id: '55c6feb95fe40493506b29415c28765dedeacf36833e209fd9bf528f31535675',
      name: 'stairs',
      color: 'rgb(210, 209, 205)',
      opacity: 0.9,
      visible: true,
      stl: useLoader(STLLoader, `${base}/55c6feb95fe40493506b29415c28765dedeacf36833e209fd9bf528f31535675.stl`),
    },
    {
      id: 'a0eff784f1d0093aa5e57986ddc40a64cdccc4372e0a4d1c84a0fd3d4a1d9593',
      name: 'slabs',
      color: '#ffffff',
      opacity: 0.9,
      visible: true,
      stl: useLoader(STLLoader, `${base}/a0eff784f1d0093aa5e57986ddc40a64cdccc4372e0a4d1c84a0fd3d4a1d9593.stl`),
    },
    {
      id: '44d712deb0c421e2db2eb625b76085d36c7a226afc9b7918cee13e59b0c4769d',
      name: 'plot',
      color: 'rgb(86, 125, 70)',
      opacity: 0.2,
      visible: true,
      stl: useLoader(STLLoader, `${base}/44d712deb0c421e2db2eb625b76085d36c7a226afc9b7918cee13e59b0c4769d.stl`),
    },
  ]);
  return (
    <Container>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Navbar.Brand href="#home">
          <Image src="favicon-16x16.png" roundedCircle />
          the y
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
      </Navbar>
      <Row>
        <Col>
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              setCamera(defaultCamera);
              orbitControls.current.reset();
            }}>
            <ArrowCounterclockwise />
          </Button>
        </Col>
        {
          components.map((x) => (
            <Col key={x.id}>
              <Form.Check
                inline
                type="switch"
                id={x.id}
                checked={x.visible}
                onChange={() => setComponents((state) => state.map((c) => c.id === x.id ? ({...c, visible: !x.visible}) : c))}
                label={`${x.name}`}
              />
            </Col>
          ))
        }
      </Row>
      <Row style={{height: '1200px'}}>
        <Canvas shadows>
          {
            components.filter((x) => x.visible).map(({id, name, stl, color, opacity}) => (
              <mesh key={id} scale={0.00015}>
                <primitive object={stl}/>
                <meshStandardMaterial color={color} transparent={!!opacity && (opacity < 1)} opacity={opacity} />
              </mesh>
            ))
          }
          <OrbitControls
            makeDefault
            ref={orbitControls}
            maxDistance={camera.maxDistance}
            minDistance={camera.minDistance}
            target={camera.target}
          />
          <PerspectiveCamera
            makeDefault
            position={camera.position}
            fov={camera.fov}
            zoom={camera.zoom}
          />
          <ambientLight/>
          <pointLight position={[10, 10, 10]}/>
          <Environment />
          {/*
          <gridHelper />
          */}
        </Canvas>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>first floor</Card.Title>
              <Card.Text>
                the y
                <ul>
                  <li>
                    area: <strong>275m²</strong>
                  </li>
                  <li>
                    height: <strong>5.5m</strong>
                  </li>
                  <li>
                    function: <strong>yoga</strong>
                  </li>
                </ul>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>ground floor</Card.Title>
              <Card.Text>
                pirin
                <ul>
                  <li>
                    area: <strong>115m²</strong>
                  </li>
                  <li>
                    height: <strong>3m</strong>
                  </li>
                  <li>
                    function: <strong>tea lounge &amp; reception</strong>
                  </li>
                </ul>
                rila
                <ul>
                  <li>
                    area: <strong>80m²</strong>
                  </li>
                  <li>
                    height: <strong>3m</strong>
                  </li>
                  <li>
                    function: <strong>yoga</strong>
                  </li>
                </ul>
                rhodope
                <ul>
                  <li>
                    area: <strong>80m²</strong>
                  </li>
                  <li>
                    height: <strong>3m</strong>
                  </li>
                  <li>
                    function: <strong>aerial yoga</strong>
                  </li>
                </ul>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>den</Card.Title>
              <Card.Text>
                pirin
                <ul>
                  <li>
                    area: <strong>80m²</strong>
                  </li>
                  <li>
                    height: <strong>2.5m</strong>
                  </li>
                  <li>
                    function: <strong>utility</strong>
                  </li>
                </ul>
                rila
                <ul>
                  <li>
                    area: <strong>80m²</strong>
                  </li>
                  <li>
                    height: <strong>2.5m</strong>
                  </li>
                  <li>
                    function: <strong>hot yoga</strong>
                  </li>
                </ul>
                rhodope
                <ul>
                  <li>
                    area: <strong>80m²</strong>
                  </li>
                  <li>
                    height: <strong>2.5m</strong>
                  </li>
                  <li>
                    function: <strong>wc</strong>
                  </li>
                </ul>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
