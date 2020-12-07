
var app = function(){
 
    // initiallize scene, camera, objects and renderer

    var scene, camera, renderer;

    // Fragment Exercise
    let fragments =[];
    let ADD = 0.05;
    const dt = 0.02;
    class Fragment {
        constructor(position, velocity, g) {
            this.velocity= velocity;
            this.velocity.multiplyScalar(dt);

            let material = new THREE.MeshPhongMaterial({
                side: THREE.DoubleSide, 
                color: 0xff9a1c, 
                emissive: 0x8ecefd, 
                emissiveIntensity:0.4,
                shininess: 100, 
                specular: 0x9d0a00, 
                vertextColor: true
            });
            this.shape = new THREE.Mesh(g, material);
            this.shape.position.copy(position);
        }
        move(){
            this.shape.position.add(this.velocity);
            this.shape.rotation.x += ADD;
        }
    };

    var createTriangle = function(p1, p2, p3) {
        let geometry = new THREE.Geometry();
        geometry.vertices.push(p1, p2, p3);
        geometry.faces.push(new THREE.Face3(0, 1, 2));
        geometry.computeFaceNormals();
        geometry.computeVertexNormals();
        return geometry;
    }

    var createGeometry = function() {
        let p1 = new THREE.Vector3(0, 1, 0);
        let p2 = new THREE.Vector3(1, 0, 1);
        let p3 = new THREE.Vector3(-1, 0, 1);
        let p4 = new THREE.Vector3(-1, 0, -1);
        let p5 = new THREE.Vector3(1, 0, -1);
        let p6 = new THREE.Vector3(0, -1, 0);

        fragments.push(new Fragment(new THREE.Vector3(0, 0, 0), 
                    new THREE.Vector3(0, 0, 6), createTriangle(p1, p2, p3)));
        
        fragments.push(new Fragment(new THREE.Vector3(0, 0, 0), 
                    new THREE.Vector3(-2, 4, 0), createTriangle(p1, p3, p4)));

        fragments.push(new Fragment(new THREE.Vector3(0, 0, 0), 
                    new THREE.Vector3(0, 5, -4), createTriangle(p1, p4, p5)));

        fragments.push(new Fragment(new THREE.Vector3(0, 0, 0), 
                    new THREE.Vector3(2, 3, 0), createTriangle(p1, p5, p2)));

        fragments.push(new Fragment(new THREE.Vector3(0, 0, 0), 
                    new THREE.Vector3(0, -5, 3), createTriangle(p3, p2, p6)));

        fragments.push(new Fragment(new THREE.Vector3(0, 0, 0), 
                    new THREE.Vector3(-4, -3, 0), createTriangle(p6, p3, p4)));

        fragments.push(new Fragment(new THREE.Vector3(0, 0, 0), 
                    new THREE.Vector3(0, -4, -4), createTriangle(p6, p4, p5)));

        fragments.push(new Fragment(new THREE.Vector3(0, 0, 0), 
                    new THREE.Vector3(3, -3, 0), createTriangle(p6, p2, p5)));

        fragments.forEach(f => scene.add(f.shape));
    }


    var init_app = function() {
        // 1. create the scene
        scene = new THREE.Scene();

        scene.fog = new THREE.Fog(0xFFFFFF, 10, 100);
        // create background
        // scene.background = new THREE.Color(0xffffff);
        scene.background = new THREE.TextureLoader().load("data/textures/background.jpeg");

         // add text
         var loader = new THREE.FontLoader();
         loader.load('data/fonts/helvetiker_regular.typeface.json', function ( font ) {
         
             var textGeometry = new THREE.TextGeometry( "Thu Huong", {
         
             font: font,
             size: 3,
             height: 1,
             curveSegments: 6,
         
             bevelThickness: 1,
             bevelSize: 1,
             bevelEnabled: true
         
             });
         
             var textMaterial = new THREE.MeshPhongMaterial( 
             { color: 0xff9a1c, specular: 0xffffff }
             );
         
             mesh = new THREE.Mesh( textGeometry, textMaterial );
            //  mesh.position.z = -25;
             mesh.position.x = -9;
             mesh.position.y = -2;
         
             scene.add( mesh );
         
         });
         

        // 2. create an locate the camera
        // var canvasWidth = 1280, canvasHeight = 1280;
        var canvasWidth = 1280, canvasHeight = 720;
        var feilfOfViewY = 75, aspectRatio = canvasWidth/ canvasHeight, near=1.0, far=100.0;
        camera = new THREE.PerspectiveCamera(feilfOfViewY, aspectRatio, near, far);
        camera.position.z = 35;
        
    
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

        // call createGeometry()
        createGeometry();

        // 4. create the renderer
        renderer = new THREE.WebGLRenderer();
        renderer.setSize( canvasWidth, canvasHeight);
        document.body.appendChild(renderer.domElement);

    };

    
    // main animation loop - calls every 50-60ms.
    var mainLoop = function(){

        fragments.forEach(f => f.move());

        requestAnimationFrame(mainLoop);

        renderer.render(scene,camera);
    };
    init_app();
    mainLoop();
}