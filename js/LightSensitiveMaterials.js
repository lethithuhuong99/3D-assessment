
var app = function(){
 
    // initiallize scene, camera, objects and renderer

    var scene, camera, renderer, cone_lamber,  sphere_lamber , icosahedron_lamber, cone_phong, cone_standar, sphere_phong, sphere_standar, icosahedron_phong, icosahedron_standar;
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
 
        // 3.4 Light Sensitive Materials

        // geometry
        
        const geometry_4_1 = new THREE.ConeGeometry( 6, 8, 32);
        const geometry_4_2 = new THREE.SphereGeometry(5, 30, 30);
        const geometry_4_3 = new THREE.IcosahedronGeometry(7,0);
        // 3.4.1 MeshLambertMaterial
        
        var pattern_2 = new THREE.TextureLoader().load("data/textures/pattern.jpg");
        
        // MeshLambertMaterial
        const material_4_1 = new THREE.MeshLambertMaterial( {
            map: pattern_2, 
            transparent: true, 
            emissive: 0x0, 
            emissiveIntensity: .5, 
            side: THREE.DoubleSide} );

        cone_lamber = new THREE.Mesh( geometry_4_1, material_4_1 );
        cone_lamber.position.y = 17;
        cone_lamber.position.x = -20;
        scene.add( cone_lamber );

        sphere_lamber = new THREE.Mesh(geometry_4_2, material_4_1);
        sphere_lamber.position.y = 17;
        scene.add(sphere_lamber);

        icosahedron_lamber = new THREE.Mesh(geometry_4_3, material_4_1);
        icosahedron_lamber.position.y = 17;
        icosahedron_lamber.position.x = 20;
        scene.add(icosahedron_lamber);

        // 3.4.2 MeshPhongMaterial
           
        const material_4_2 = new THREE.MeshPhongMaterial({
            map: pattern_2, 
            transparent: true, 
            emissive: 0x0, 
            shininess: 100, 
            emissiveIntensity: .5, 
            specular: 0xffffff});
        
        cone_phong = new THREE.Mesh( geometry_4_1, material_4_2 );
        cone_phong.position.x = -20;
        scene.add( cone_phong );

        sphere_phong= new THREE.Mesh(geometry_4_2, material_4_2);
        scene.add(sphere_phong);

        icosahedron_phong = new THREE.Mesh(geometry_4_3, material_4_2);
        icosahedron_phong.position.x = 20;
        scene.add(icosahedron_phong);

        // 3.4.3 MeshStandardMaterial
        
        const material_4_3 = new THREE.MeshStandardMaterial({
            map: pattern_2, 
            side: THREE.DoubleSide,  
            emissive: 0x0 , 
            emissiveIntensity: .4, 
            metalness:1});
        
        cone_standar = new THREE.Mesh( geometry_4_1, material_4_3 );
        cone_standar.position.y = -17;
        cone_standar.position.x = -20;
        scene.add( cone_standar );

        sphere_standar = new THREE.Mesh(geometry_4_2, material_4_3);
        sphere_standar.position.y = -17;
        scene.add(sphere_standar);

        icosahedron_standar = new THREE.Mesh(geometry_4_3, material_4_3);
        icosahedron_standar.position.y = -17;
        icosahedron_standar.position.x = 20;
        scene.add(icosahedron_standar);

        
        // white spotlight shining from the side, casting a shadow
        const spotLight = new THREE.SpotLight( 0xffffff );
        spotLight.position.set( 100, 1000, 30 );

        // add direction light
        const directionalLightUp = new THREE.DirectionalLight(0xffffff);

        // add point light
        const light = new THREE.PointLight( 0xff0000, 1, 100 );
        light.position.set( 50, 50, -20 );

        scene.add( spotLight );
        scene.add(directionalLightUp);
        scene.add( light );

        
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
   
        // rotate cone
        cone_lamber.rotation.y += newPos;
        cone_lamber.rotation.z += newPos
        cone_phong.rotation.y += newPos;
        cone_phong.rotation.z += newPos
        cone_standar.rotation.y += newPos;
        cone_standar.rotation.z += newPos

        // rotate sphere 2
        sphere_lamber.rotation.y += newPos;
        sphere_lamber.rotation.z += newPos;
        sphere_phong.rotation.y += newPos;
        sphere_phong.rotation.z += newPos;
        sphere_standar.rotation.y += newPos;
        sphere_standar.rotation.z += newPos;

        // rotate icosahedron
        icosahedron_lamber.rotation.y += newPos
        icosahedron_lamber.rotation.z += newPos
        icosahedron_phong.rotation.y += newPos
        icosahedron_phong.rotation.z += newPos
        icosahedron_standar.rotation.y += newPos
        icosahedron_standar.rotation.z += newPos

        renderer.render(scene,camera);
    };
    init_app();
    mainLoop();
}