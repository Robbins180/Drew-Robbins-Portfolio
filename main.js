import './style.css'
import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { randFloatSpread } from 'three/src/math/MathUtils';
import { Vector3 } from 'three';



/*  !!!!!!!!!! Camera and Scene setup * !!!!!!!!! */

const scene = new THREE.Scene()
    /* sceen == Container */

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    /* Perspective of the viewer*/
    /* 75 is the percentage of field of view*/
    /* 0.1 and 1000 are the view frustum */
    /* */

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
         /* bg is background */
});

    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
        /* Sets the window size to the screen size */
    camera.position.setZ(30);
    camera.position.setX(-3);

    renderer.render( scene, camera);

     /*  !!!!!!!!!! Tous Shape and material 1 * !!!!!!!!! */

const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
     /* Mesurements for the 3D donut Ring */
const material = new THREE.MeshStandardMaterial( {color: 0xAE00FF, wireframe: true } );
    /* 3D wrapping paper for the geometry item */
const torus = new THREE.Mesh( geometry, material );
     /* The actual shape plus the material */

    scene.add(torus)

    /*  !!!!!!!!!! Tous Shape and material 2 * !!!!!!!!! */

 const geometry2 = new THREE.TorusGeometry(23, 4, 32, 200)
    /* Mesurements for the 3D donut Ring */
const material2 = new THREE.MeshStandardMaterial( {color: 0x5D00FF, wireframe: true } );
   /* 3D wrapping paper for the geometry item */
const torus2 = new THREE.Mesh( geometry2, material2 );
    /* The actual shape plus the material */

    scene.add(torus2)



      /*  !!!!!!!!!! Torus knot * !!!!!!!!! */

const torusKnotTexture = new THREE.TextureLoader().load('images/gif.gif')

const geometry3 = new THREE.TorusKnotGeometry( 10, 3, 100, 16 );

const material3 = new THREE.MeshBasicMaterial( { map: torusKnotTexture, wireframe: false } );

const torusKnot = new THREE.Mesh( 
    geometry3,
    material3,
     );


    torusKnot.position.z = 10;
    torusKnot.position.setX(-150);
    torusKnot.position.setY(45);

    scene.add( torusKnot );


     /*  !!!!!!!!!! Lighting and grids * !!!!!!!!! */


const pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(5, 5, 5)

const ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(pointLight, ambientLight)

const lightHelper = new THREE.PointLightHelper(pointLight);
    scene.add(lightHelper)
     /* Inital lighting source and ambient on the object */

// const gridHelper = new THREE.GridHelper(200, 50, );
//     scene.add(lightHelper, gridHelper)

/* Grid for building the layout */

// const controls = new OrbitControls(camera, renderer.domElement);
    /* Updates camera position on clicks  */


    /*  !!!!!!!!!! Stars * !!!!!!!!! */

function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial( { color: 0xffffff } );
    const star = new THREE.Mesh( geometry, material );

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ) )
    /* randFLoat generates a random number between listed(100) and (-100) in the array */

    star.position.set(x, y, z);
    scene.add(star)
};

    Array(350).fill().forEach( addStar )


    /*  !!!!!!!!!! Background * !!!!!!!!! */


const spaceTexture = new THREE.TextureLoader().load('images/space.jpg')
    scene.background = spaceTexture;


        /*  !!!!!!!!!! Me * !!!!!!!!! */


const drewTexture = new THREE.TextureLoader().load('images/Drew.jpeg');

const drew = new THREE.Mesh(
    new THREE.BoxGeometry(3, 3, 3), 
    new THREE.MeshBasicMaterial({ map: drewTexture })

    );
    
    scene.add(drew);


     /*  !!!!!!!!!! Neptune * !!!!!!!!! */

const neptuneTexture = new THREE.TextureLoader().load('images/neptune.jpg')
const normalTexture = new THREE.TextureLoader().load('images/normal.jpg')

const neptune = new THREE.Mesh(
     new THREE.SphereGeometry(3, 32, 32), 
     new THREE.MeshStandardMaterial( { map: neptuneTexture, normalMap: normalTexture } ) 
     );
     scene.add(neptune);

     neptune.position.z = 30;
     neptune.position.setX(-12);
     neptune.position.setY(-4);

    drew.position.z = -5;
    drew.position.x = 2;

     /*  !!!!!!!!!! Jupiter * !!!!!!!!! */

const jupiterTexture = new THREE.TextureLoader().load('images/jupiter.jpg' )


const jupiter = new THREE.Mesh(
     new THREE.SphereGeometry(4, 32, 32), 
     new THREE.MeshStandardMaterial( { map: jupiterTexture  } ) 
     );
     scene.add(jupiter);

     jupiter.position.z = 7;
     jupiter.position.setX(-15);
     jupiter.position.setY(4);



    /*  !!!!!!!!!! Scroll animation * !!!!!!!!! */

function moveCamera() {
    const t = document.body.getBoundingClientRect().top;
    neptune.rotation.x += 0.05;
    neptune.rotation.y += 0.075;
    neptune.rotation.z += 0.05;

    jupiter.rotation.x += 0.05;
    jupiter.rotation.y += 0.075;
    jupiter.rotation.z += 0.05;
  
    drew.rotation.y += 0.01;
    drew.rotation.z += 0.01;

    camera.position.z = t * -0.01;
    camera.position.x = t * -0.0002;
    camera.rotation.y = t * -0.0002;




}

    document.body.onscroll = moveCamera;
    moveCamera();
   

function animate() {
    requestAnimationFrame( animate);

    torus.rotation.x += 0.01;
    torus.rotation.y += 0.004;
    torus.rotation.z += 0.00;

    torus2.rotation.x += 0.003;
    torus2.rotation.y += 0.002;
    torus2.rotation.z += 0.00;

    torusKnot.rotation.x += 0.001;
    torusKnot.rotation.y += 0.001;
    torusKnot.rotation.z += 0.001;


    neptune.rotation.y += 0.009;
    jupiter.rotation.y += 0.002;

    

  

    // controls.update();


    renderer.render( scene, camera );
}
    animate()
    /* animate pulls scene and camera in a loop so it does not have to be called everytime. */


   

