var scene = new THREE.Scene(); //init scene
var windowAspect = window.innerWidth/window.innerHeight;
var camera = new THREE.PerspectiveCamera( 50, windowAspect, 0.1, 1000 );//setup the camera
var time = 0; //set time


//init renderer 
var renderer = new THREE.WebGLRenderer();
document.body.appendChild(renderer.domElement);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

//window resize fix
window.addEventListener('resize',function()
{
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize(width,height)
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
})

//set camera position
camera.position.x = -1.43;
camera.position.y = 1.82;
camera.position.z = 19; 

//set torus variables
const torusRadius = 9;
const torusTube = 8;
const torusSegmentsR = 200;
const torusSegmentsT = 200;
//create torus
const geometry = new THREE.TorusGeometry(torusRadius,torusTube,torusSegmentsR,torusSegmentsT); //init box

//attempting texture loading
const texture = new THREE.TextureLoader().load('./images/alpha2_1.png');
const imageMaterial = new THREE.MeshStandardMaterial({map:texture});
//imageMaterial.map.needsUpdate = true;
imageMaterial.map.magFilter = THREE.NearestFilter;
imageMaterial.map.wrapT = THREE.RepeatWrapping;
imageMaterial.map.wrapS = THREE.RepeatWrapping;
imageMaterial.map.repeat.set(6,6);

const torus = new THREE.Mesh(geometry, imageMaterial); //init mesh
torus.position.x = -0.3;
torus.position.y = -0.3;
torus.position.z = 2.9;
torus.rotation.y = -0.289;
torus.rotation.x = -0.744;

//init lights
const color = 0xFFFFFF;
const intensity = 1;
const light = new THREE.DirectionalLight(color,intensity);
light.position.set(-1,2,4);

scene.fog = new THREE.FogExp2(0x008000, 0.07); 

//add items to scene
scene.add(light);//add light to scene
scene.add(torus); //add mesh to the scene
scene.background = new THREE.Color(0x008000);

//gui init
const gui = new dat.GUI();
gui.add(torus.position,"x",-50,50,0.1).name("x position");
gui.add(torus.position,"y",-50,50,0.1).name("y position");
gui.add(torus.position,"z",-50,50,0.1).name("z position");
gui.add(torus.rotation,"x",-1,1,0.001).name("x rotation");
gui.add(torus.rotation,"y",-1,1,0.001).name("y rotation");
gui.add(torus.rotation,"z",-1,1,0.001).name("z rotation");
gui.add(camera.position,"x",-50,50,0.01).name("camera position x");
gui.add(camera.position,"y",-50,50,0.01).name("camera position y");

var animate = function () {
	requestAnimationFrame( animate );
    time ++;
    
    //rotate torus
	//cube.rotation.x += 0.01;
	//cube.rotation.y += 0.01;

    imageMaterial.map.offset.y = time *-0.001;
    //imageMaterial.map.offset.x = time *0.002;
    
	renderer.render( scene, camera );
};

animate();


