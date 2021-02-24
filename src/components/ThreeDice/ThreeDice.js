import React, { Suspense, useEffect } from "react";
import { Canvas } from "react-three-fiber";
import {
  Html,
  useGLTF,
  useTexture,
  OrbitControls,
  useProgress,
} from "@react-three/drei";
// eslint-disable-next-line import/no-unresolved
import { Physics, useBox } from "@react-three/cannon";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import { Provider, useAtom } from "jotai";
import PropTypes from "prop-types";
import { gameStartState, diceDefaultState, rerollState } from "./gameState";
import {
  randomDiceImages as themes,
  initDiceImages,
  randomizeDice,
} from "../Dice/Dice";

const CollisionMesh = () => {
  const [floor] = useBox(() => ({
    position: [0, 0, 0],
    rotation: [0, -Math.PI / 2, 0],
    args: [14, 0, 22],
    material: { friction: 1000 },
  }));
  const [left] = useBox(() => ({
    position: [-11.1, 1, 0],
    rotation: [0, -Math.PI / 2, 0],
    args: [13, 4, 0],
  }));
  const [right] = useBox(() => ({
    position: [11.1, 1, 0],
    rotation: [0, -Math.PI / 2, 0],
    args: [13, 4, 0],
  }));
  const [top] = useBox(() => ({
    position: [0, 1, 6.75],
    args: [22, 4, 0],
  }));
  const [bottom] = useBox(() => ({
    position: [0, 1, -6.75],
    args: [22, 4, 0],
  }));
  return (
    <group>
      <mesh ref={floor}>
        <boxBufferGeometry args={[14, 0, 22]} />
        <meshStandardMaterial color="red" transparent opacity={0} />
      </mesh>
      <mesh ref={left}>
        <boxBufferGeometry args={[13.5, 2, 0]} />
        <meshStandardMaterial color="red" transparent opacity={0} />
      </mesh>
      <mesh ref={right}>
        <boxBufferGeometry args={[13.5, 2, 0]} />
        <meshStandardMaterial color="red" transparent opacity={0} />
      </mesh>
      <mesh ref={top}>
        <boxBufferGeometry args={[22.2, 2, 0]} />
        <meshStandardMaterial color="red" transparent opacity={0} />
      </mesh>
      <mesh ref={bottom}>
        <boxBufferGeometry args={[22.2, 2, 0]} />
        <meshStandardMaterial color="red" transparent opacity={0} />
      </mesh>
    </group>
  );
};

const Loader = () => {
  const { progress } = useProgress();
  return <Html center>{Math.trunc(progress)} % loaded</Html>;
};

// let textures = [];

const ThemedDie = (props) => {
  const { theme, dicePos, rerollToggle } = props;
  const textures = useTexture([...themes]);

  const [mesh, api] = useBox(() => ({
    mass: 300,
    inertia: 13,
    rotation: [
      Math.random() * Math.PI,
      Math.random() * Math.PI,
      Math.random() * Math.PI,
    ],
    linearDamping: 0.5,
    angularDamping: 0.1,
    material: { restitution: 0.3 },
  }));

  useEffect(() => {
    api.position.set(dicePos[0], dicePos[1], dicePos[2]);
    api.velocity.set(15, 0, -10);
    api.angularVelocity.set(-15, 2, -10);
  }, [api.angularVelocity, api.position, api.velocity, dicePos, rerollToggle]);

  if (theme === "random") {
    return (
      <mesh
        onClick={() => {
          api.position.set(dicePos[0], dicePos[1], dicePos[2]);
          api.velocity.set(15, 0, -10);
          api.angularVelocity.set(-15, 2, -10);
        }}
        ref={mesh}
      >
        <boxBufferGeometry />
        {textures.map((image) => (
          <meshStandardMaterial
            key={image.uuid}
            flatShading
            roughness={0.8}
            attachArray="material"
            map={image}
          />
        ))}
      </mesh>
    );
  }

  // if we are here, something has gone wrong
  return new Error("problem encountered in ThemedDice");
};

ThemedDie.propTypes = {
  theme: PropTypes.string.isRequired,
  dicePos: PropTypes.arrayOf(PropTypes.number).isRequired,
  rerollToggle: PropTypes.bool.isRequired,
};

const GameManager = () => {
  const [gameStarted, setGameState] = useAtom(gameStartState);
  const [reroll, rerollDice] = useAtom(rerollState);
  const [dicePosition] = useAtom(diceDefaultState);

  const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
      width: "120px",
    },
    buttonStart: {
      margin: theme.spacing(1),
      width: "160px",
    },
  }));

  const classes = useStyles();

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight
        intensity={1.0}
        position={[0, 20, 0]}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <Suspense fallback={<Loader />}>
        <Model url="table/gameTable.glb" />
      </Suspense>
      {!gameStarted && (
        <Html position={[-4, 0, 2]} scaleFactor={25}>
          <Button
            variant="contained"
            color="primary"
            className={classes.buttonStart}
            endIcon={<Icon>casino</Icon>}
            onClick={() => {
              setGameState(true);
            }}
          >
            Start Game
          </Button>
        </Html>
      )}
      {gameStarted && (
        <>
          <Suspense fallback={null}>
            {dicePosition.map((pos) => (
              <ThemedDie
                key={pos.uuid}
                theme="random"
                dicePos={pos.position}
                rerollToggle={reroll}
              />
            ))}
            <CollisionMesh />
          </Suspense>
          <Html position={[-3, 0, 7]} scaleFactor={25}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              endIcon={<Icon>casino</Icon>}
              onClick={() => {
                randomizeDice();
                rerollDice(!reroll);
              }}
            >
              Roll It!
            </Button>
          </Html>
        </>
      )}
    </>
  );
};

function Model({ url }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} dispose={null} />;
}

Model.propTypes = {
  url: PropTypes.string.isRequired,
};

const ThreeDice = () => {
  // Allows the initDiceImages function to load only once on startup.
  useEffect(() => {
    const loadDice = async () => {
      await initDiceImages();
    };
    loadDice();
  }, []);
  return (
    <Canvas
      concurrent
      style={{ width: "100vw", height: "500px" }}
      camera={{ position: [0, 20, 8], fov: 50 }}
    >
      <Provider>
        <Physics gravity={[0, -30, 0]} defaultContactMaterial>
          <GameManager />
        </Physics>
      </Provider>
      <OrbitControls />
    </Canvas>
  );
};

export default ThreeDice;