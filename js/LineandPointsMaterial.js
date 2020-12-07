
var app = function(){
 
    // initiallize scene, camera, objects and renderer

    var scene, camera, renderer, torusKnot, cylinder,sphereLineDashed;
    var newPos = 0.03;


    var init_app = function() {
        // 1. create the scene
        scene = new THREE.Scene();

        scene.fog = new THREE.Fog(0xFFFFFF, 10, 100);
        // create background
        scene.background = new THREE.Color(0x000000);

        // 2. create an locate the camera
        // var canvasWidth = 1280, canvasHeight = 1280;
        var canvasWidth = 1280, canvasHeight = 720;
        var feilfOfViewY = 75, aspectRatio = canvasWidth/ canvasHeight, near=1.0, far=100.0;
        camera = new THREE.PerspectiveCamera(feilfOfViewY, aspectRatio, near, far);
        camera.position.z = 35;
        
        // 3.create and locate the objects on the scene

        // 3.3 Line and Points Material
        // 3.3.1 Line Material
        const geometry_3_1 = new THREE.TorusKnotGeometry( 10, 3, 100, 16 );
        const material_3_1 = new THREE.LineBasicMaterial({color: 0xffffff, linewidth: 1});
        torusKnot = new THREE.Line( geometry_3_1, material_3_1 );
        torusKnot.position.x = -60;
        torusKnot.position.z = -60;
        scene.add( torusKnot );

        // // 3.3.2 Line dash Material
        const geometry_3_2 = new THREE.SphereGeometry(5, 30, 30);
        const material_3_2 = new THREE.LineDashedMaterial({color: 0xffffff, linewidth: 2, dashSize: 1, gapSize: 1});
        sphereLineDashed = new THREE.Line(geometry_3_2, material_3_2);
        sphereLineDashed.computeLineDistances();
        scene.add(sphereLineDashed);

        // 3.3.3 Points Material
        const geometry_3_3 = new THREE.CylinderGeometry(4,3,4);
        const material_3_3 = new THREE.PointsMaterial({color: 0xffffff});
        cylinder = new THREE.Points(geometry_3_3, material_3_3);
        cylinder.position.x = 20;
        scene.add(cylinder);

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

        // rotate torusKnot
        torusKnot.rotation.x += newPos;
        torusKnot.rotation.z += newPos;

        // rotate cylinder
        cylinder.rotation.z += newPos;
        cylinder.rotation.x += newPos;

        // rotate sphereLineDashed
        sphereLineDashed.rotation.x += newPos;
        sphereLineDashed.rotation.z += newPos;
   
          renderer.render(scene,camera);
    };
    init_app();
    mainLoop();
}