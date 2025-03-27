import Room from "./Room.js";
import Control from "./Control.js";
import * as THREE from 'three';
import { OrbitControls } from '/node_modules/three/examples/jsm/controls/OrbitControls.js';



window.onload = function() {

    fetch('/authenticated')
        .then(res => res.json())
        .then(data => {
            if (data.authenticated) {
                document.getElementById('header__container__signIn').remove();
                document.querySelector('[data-action="save"]').style.display = "flex";
            } else {
                document.getElementById('header__container__signIn').style.visibility = "visible";
                document.querySelector('[data-action="save"]').remove();
            }
    });


    let canvas = document.getElementById('canva');

    let width = window.innerWidth;
    let height = window.innerHeight;

    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);

    let renderer = new THREE.WebGLRenderer({ canvas: canvas });
    renderer.setClearColor(0x000000);
    renderer.shadowMap.enabled = true;

    let scene = new THREE.Scene();

    let camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 5000);
    camera.position.set(0, 0, 600);
    camera.lookAt(0, 0, 0);
    
    let controls = new OrbitControls(camera, renderer.domElement);
    controls.update();

    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }
    animate();

    let room;
    let control;
    
    async function loadRoom(id) {
        try {
            const response = await fetch(`/get-room?id=${id}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
    
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Не вдалось завантажити кімнату:", error);
        }
    }

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    if (id) {
        loadRoom(id).then((data) => {
            room = new Room(scene, {
                wallWidth: data.wall_width,
                wallLength: data.wall_length,
                wallHeight: data.wall_height,
                wallThickness: data.wall_thickness,
                material: new THREE.MeshStandardMaterial({ color: 0x999999, side: THREE.DoubleSide }),
                presentedWalls: JSON.parse(data.presented_walls) || {}, 
                obj: JSON.parse(data.objects) || {},
                lights: JSON.parse(data.lights) || [],
                lightX: data.light_x || 0,
                lightY: data.light_y || 500,
                lightZ: data.light_z || 200,
                lightIntensity: data.light_intensity || 1
            });
            
            control = new Control(room);
        });
    } else {
        room = new Room(scene);
        control = new Control(room);
    }

    document.querySelectorAll('[class*="control"]').forEach(item => {
        item.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.keyCode === 13) {
                item.click();
            }
        });
    });

    document.getElementById('save__form').addEventListener('submit', async function (event) {
        event.preventDefault();
    
        const nameInput = this.querySelector('input[name="name"]');
        const name = nameInput.value.trim();
    
        if (name.length === 0) {
            alert('Назва кімнати не може бути порожньою!');
            return;
        }
    
        const roomData = {
            roomName: name,
            wallWidth: room.wallWidth,
            wallHeight: room.wallHeight,
            wallLength: room.wallLength,
            wallThickness: room.wallThickness,
            presentedWalls: room.presentedWalls,
            objects: room.objectsToDB,
            lights: room.lights,
            lightX: room.lightX,
            lightY: room.lightY,
            lightZ: room.lightZ,
            lightIntensity: room.lightIntensity
        };
    
        try {
            const compressedData = await compressData(roomData);
    
            const base64Data = btoa(String.fromCharCode.apply(null, compressedData));
    
            const response = await fetch('/save-room', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ data: base64Data })
            });
    
            if (response.ok) {
                document.getElementsByClassName('controls__save__item')[0].click();
            } else {
                alert('Не вдалось зберегти кімнату');
            }
        } catch (error) {
            console.error("Помилка стиснення:", error);
            alert('Помилка під час стиснення даних');
        }
    });
    
    async function compressData(data) {
        const jsonString = JSON.stringify(data);
        
        const compressed = pako.deflate(jsonString, { level: 9 });
    
        return compressed;
    }

};