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

    //const axesHelper = new THREE.AxesHelper(1000);
    //scene.add(axesHelper);

    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }
    animate();
    let room = new Room(scene);
    let control = new Control(room);

    document.querySelectorAll('[class*="control"]').forEach(item => {
        item.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.keyCode === 13) {
                item.click();
            }
        });
    });

    document.getElementById('save__form').addEventListener('submit', function (event) {
        event.preventDefault(); 
        
        const nameInput = this.querySelector('input[name="name"]');
        const name = nameInput.value.trim();
    
        if (name.length === 0) {
            alert('Назва кімнати не може бути порожньою!');
            return;
        }
    
        fetch('/save-room', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ roomName: name })
        })
        .then(response => response.json())
        .then(data => console.log('Відповідь сервера:', data))
        .catch(error => console.error('Помилка:', error));
    });
    
    
    

};