
var app = function(){
 
    // initiallize scene, camera, objects and renderer

    var scene, camera, renderer, cube, sphere;
    var newPos = 0.03;

    var init_app = function() {
        // 1. create the scene
        scene = new THREE.Scene();

        scene.fog = new THREE.Fog(0xFFFFFF, 10, 100);
        // create background
        // scene.background = new THREE.Color(0xffffff);
        scene.background = new THREE.TextureLoader().load("data/textures/background.jpeg");

        // 2. create an locate the camera
        // var canvasWidth = 1280, canvasHeight = 1280;
        var canvasWidth = 1280, canvasHeight = 720;
        var feilfOfViewY = 75, aspectRatio = canvasWidth/ canvasHeight, near=1.0, far=100.0;
        camera = new THREE.PerspectiveCamera(feilfOfViewY, aspectRatio, near, far);
        camera.position.z = 20;
        
        // 3.create and locate the objects on the scene
        // 3.2 Depth Material
        // Geometry
        const boxGeometry = new THREE.BoxGeometry(5, 5, 5);
        const sphereGeometry = new THREE.SphereGeometry(3, 30, 30);

        // Material
        const material = new THREE.MeshDepthMaterial();

        // Object
        cube = new THREE.Mesh(boxGeometry, material);
        cube.position.z = -5;
        cube.position.x = -5;

        sphere = new THREE.Mesh(sphereGeometry, material);
        sphere.position.z = 0;
        sphere.position.x = 5;

        // Add objects to scene
        scene.add(cube);
        scene.add(sphere);

        // create an AudioListener and add it to the camera
        const listener = new THREE.AudioListener();
        camera.add( listener );
    
        // create a global audio source
        const sound = new THREE.Audio( listener );
    
        // load a sound and set it as the Audio object's buffer
        const audioLoader = new THREE.AudioLoader();
        audioLoader.load( 'data/sounds/ambient.ogg', function( buffer ) {
            sound.setBuffer( buffer );
            sound.setLoop(true);
            sound.setVolume(0.5);
            sound.play();
        });

        // 4. create the renderer
        renderer = new THREE.WebGLRenderer();
        renderer.setSize( canvasWidth, canvasHeight);
        document.body.appendChild(renderer.domElement);

    };

    
    // main animation loop - calls every 50-60ms.
    var mainLoop = function(){

        requestAnimationFrame(mainLoop);


        // change the position of sphere
        sphere.position.z += newPos;
        cube.position.z -= newPos;
        if (sphere.position.z >= 6 || sphere.position.z <= -16){
            newPos *= -1;
        }       

        renderer.render(scene,camera);
    };
    init_app();
    mainLoop();
}