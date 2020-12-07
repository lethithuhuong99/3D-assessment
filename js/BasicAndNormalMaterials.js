
var app = function(){
 
    // initiallize scene, camera, objects and renderer

    var scene, camera, renderer, cube, torus;
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
        camera.position.z = 35;
        
        // 3.create and locate the objects on the scene
        // 3.1 Normal Materials
        // 3.1.1 Basic material
        var pattern_1 = new THREE.TextureLoader().load("data/textures/black-white.jpg");
        const geometry_1_1 = new THREE.BoxGeometry( 10, 10, 10 );
        const material_1_1 = new THREE.MeshBasicMaterial({ 
            color: 0xff0000, 
            alphaMap: pattern_1, 
            transparent: true});
        cube = new THREE.Mesh( geometry_1_1, material_1_1 );
        cube.position.x = -20;
        scene.add( cube );

        // 3.1.2 Normal Materials
        const geometry_1_2 = new THREE.TorusGeometry(6, 3, 10, 12);
        const material_1_2 = new THREE.MeshNormalMaterial();
        torus = new THREE.Mesh(geometry_1_2, material_1_2);
        torus.position.x = 20;
        scene.add(torus);
        
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

        // rotate cube
        cube.rotation.x += newPos;
        cube.rotation.y += newPos;

        // rotate torus
        torus.rotation.x += newPos;
        torus.rotation.y += newPos;

        renderer.render(scene,camera);
    };
    init_app();
    mainLoop();
}