import * as THREE from 'three';
import { OBJLoader } from '/node_modules/three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from '/node_modules/three/examples/jsm/loaders/MTLLoader.js';



class Room {
    constructor(scene, {
        wallWidth = 1000,
        wallLength = 1000,
        wallHeight = 400,
        wallThickness = 20,
        material = new THREE.MeshStandardMaterial({ color: 0x999999, side: THREE.DoubleSide }),
        presentedWalls = {},
        obj = {},
        lights = [],
        lightX = 0,
        lightY = 500,
        lightZ = 200,
        lightIntensity = 1
    } = {}) {
        this.scene = scene;
        this.wallWidth = wallWidth;
        this.wallLength = wallLength;
        this.wallHeight = wallHeight;
        this.wallThickness = wallThickness;
        this.material = material;
        this.walls = [];
        this.presentedWalls = {
            front: {
                presented: false,
                hasWindow: false,
                hasDoor: false,
                isEditing: false,
                windowWidth: 200,
                windowHeight: 200,
                windowOffsetY: 0,
                doorHeight: 200,
                doorWidth: 100,
                doorOffsetX: 0,
                texturePath: '',
                ...presentedWalls.front
            },
            back: {
                presented: true,
                hasWindow: false,
                hasDoor: false,
                isEditing: false,
                windowWidth: 200,
                windowHeight: 200,
                windowOffsetY: 0,
                doorHeight: 200,
                doorWidth: 100,
                doorOffsetX: 0,
                texturePath: '',
                ...presentedWalls.back
            },
            right: {
                presented: true,
                hasWindow: false,
                hasDoor: false,
                isEditing: false,
                windowWidth: 200,
                windowHeight: 200,
                windowOffsetY: 0,
                doorHeight: 200,
                doorWidth: 100,
                doorOffsetX: 0,
                texturePath: '',
                ...presentedWalls.right
            },
            left: {
                presented: true,
                hasWindow: false,
                hasDoor: false,
                isEditing: false,
                windowWidth: 200,
                windowHeight: 200,
                windowOffsetY: 0,
                doorHeight: 200,
                doorWidth: 100,
                doorOffsetX: 0,
                texturePath: '',
                ...presentedWalls.left
            },
            floor: {
                texturePath: '',
                ...presentedWalls.floor
            }
        };
        this.objects = {
            tableAndChairs: {
                name: 'Стіл і стільці',
                pathMTL: '../object/tableAndChairs/tableAndChairs.mtl',
                pathOBJ: '../object/tableAndChairs/tableAndChairs.obj',
                scale: 2.5,
                positionX: 0,
                positionY: -190,
                positionZ: 0,
                angle: 0,
                loadedObject: null,
            },
            woodenTable: {
                name: 'Дерев\'яний стілець',
                pathMTL: '../object/woodenTable/woodenTable.mtl',
                pathOBJ: '../object/woodenTable/woodenTable.obj',
                pathTex: '../object/woodenTable/woodenTable.jpg',
                scale: 1,
                positionX: 0,
                positionY: -150,
                positionZ: 0,
                angle: 0,
                loadedObject: null,
            },
            tvStand: {
                name: 'Тумба під телевізор',
                pathMTL: '../object/tvStand/table.mtl',
                pathOBJ: '../object/tvStand/table.obj',
                pathTex: '../object/tvStand/wood-018_larch-european-2_d.png',
                scale: 10,
                positionX: 300,
                positionY: -190,
                positionZ: 0,
                angle: 135,
                loadedObject: null,
            },
            chair: {
                name: 'Крісло',
                pathMTL: '../object/chair/Office_chair.mtl',
                pathOBJ: '../object/chair/Office chair.obj',
                pathTex: '../object/chair/textiles_1_20090323_1963410504.png',
                scale: 0.2,
                positionX: 0,
                positionY: -190,
                positionZ: 0,
                angle: 0,
                loadedObject: null,
            },
            drawer: {
                name: 'Тумба',
                pathMTL: '../object/drawer/Free model Drawer(Final) .mtl',
                pathOBJ: '../object/drawer/Free model Drawer(Final) .obj',
                pathTex: '../object/drawer/Drawer Texture(Final).png',
                scale: 40,
                positionX: 0,
                positionY: -190,
                positionZ: 0,
                angle: 0,
                loadedObject: null,
            },
            bed: {
                name: 'Ліжко',
                pathMTL: '../object/bed/bed.mtl',
                pathOBJ: '../object/bed/bed.obj',
                pathTex: '../object/bed/bed_d.png',
                scale: 110,
                positionX: 0,
                positionY: -190,
                positionZ: 0,
                angle: 0,
                loadedObject: null,
            },
            tv: {
                name: 'Телевізор',
                pathMTL: '../object/tv/MI SMART TV.mtl',
                pathOBJ: '../object/tv/MI SMART TV.obj',
                pathTex: '',
                scale: 100,
                positionX: 0,
                positionY: -190,
                positionZ: 0,
                angle: 0,
                loadedObject: null,
            }
        };
        this.objectsToDB = {
            tableAndChairs: {
                scale: 2.5,
                positionX: 0,
                positionY: -190,
                positionZ: 0,
                angle: 0,
                isPresented: false,
                ...obj.tableAndChairs
            },
            woodenTable: {
                scale: 1,
                positionX: 0,
                positionY: -150,
                positionZ: 0,
                angle: 0,
                isPresented: false,
                ...obj.woodenTable
            },
            tvStand: {
                scale: 10,
                positionX: 300,
                positionY: -190,
                positionZ: 0,
                angle: 135,
                isPresented: false,
                ...obj.tvStand
            },
            chair: {
                scale: 0.2,
                positionX: 0,
                positionY: -190,
                positionZ: 0,
                angle: 0,
                isPresented: false,
                ...obj.chair
            },
            drawer: {
                scale: 40,
                positionX: 0,
                positionY: -190,
                positionZ: 0,
                angle: 0,
                isPresented: false,
                ...obj.drawer
            },
            bed: {
                scale: 110,
                positionX: 0,
                positionY: -190,
                positionZ: 0,
                angle: 0,
                isPresented: false,
                ...obj.bed
            },
            tv: {
                scale: 100,
                positionX: 0,
                positionY: -190,
                positionZ: 0,
                angle: 0,
                isPresented: false,
                ...obj.tv
            }
        };
        this.textures = {
            wood1: {
                name: 'Дерево 1',
                path: '/src/img/texture/wood1.jpg'
            },
            wood2: {
                name: 'Дерево 2',
                path: '/src/img/texture/wood2.jpg'
            },
            brick: {
                name: 'Цегла',
                path: '/src/img/texture/brick.jpg'
            },
            wallpaper1: {
                name: 'Шпалери 1',
                path: '/src/img/texture/wallpaper1.jpg'
            },
            wallpaper2: {
                name: 'Шпалери 2',
                path: '/src/img/texture/wallpaper2.jpg'
            },
            tile: {
                name: 'Плитка',
                path: '/src/img/texture/tile.jpg'
            }
        }
        this.lights = lights;
        this.directionalLight = null;
        this.lightX = lightX;
        this.lightY = lightY;
        this.lightZ = lightZ;
        this.lightIntensity = lightIntensity;
        this.textureCache = {};
        this.createInitialRoom();
    }

    loadObject(objectKey) {
        const obj = this.objects[objectKey];
        if (!obj) {
            return;
        }
    
        const textureLoader = new THREE.TextureLoader();
        const mtlLoader = new MTLLoader();
        const objLoader = new OBJLoader();
    
        if (obj.pathMTL && obj.pathOBJ) {
            mtlLoader.load(obj.pathMTL, (materials) => {
                materials.preload();
                objLoader.setMaterials(materials);
    
                objLoader.load(obj.pathOBJ, (object) => {
                    object.scale.set(obj.scale, obj.scale, obj.scale);
                    object.position.set(obj.positionX, obj.positionY, obj.positionZ);
                    object.castShadow = true;
                    object.receiveShadow = true;
                    object.rotation.y = obj.angle;
    
                    if (obj.pathTex) {
                        textureLoader.load(obj.pathTex, (texture) => {
                            object.traverse((child) => {
                                if (child.isMesh) {
                                    child.material.map = texture;
                                    child.material.needsUpdate = true;
                                }
                            });
                        });
                    }
    
                    this.scene.add(object);
                    obj.loadedObject = object;
                    this.objectsToDB[objectKey].isPresented = true;
                }, undefined, (error) => {
                    console.error(`Error loading object ${objectKey}:`, error);
                });
            }, undefined, (error) => {
                console.error(`Error loading MTL for ${objectKey}:`, error);
            });
        }
    }
    
    removeObject(objectKey) {
        if (!this.objects[objectKey]) {
            return;
        }
        
        const obj = this.objects[objectKey];
        if (obj.loadedObject && this.scene.getObjectById(obj.loadedObject.id)) {
            this.scene.remove(obj.loadedObject);
            this.objectsToDB[objectKey].isPresented = false;
        }
        obj.loadedObject = null;
    }

    updateObjectScale(objectKey, scale) {
        if (!this.objects[objectKey]) {
            return;
        }
        
        const obj = this.objects[objectKey];
        if (obj.loadedObject) {
            obj.scale += scale;
            this.objectsToDB[objectKey].scale = obj.scale;
            obj.loadedObject.scale.set(obj.scale, obj.scale, obj.scale);
        }
    }

    updateObjectPosition(objectKey, positionX, positionY, positionZ) {
        if (!this.objects[objectKey]) {
            console.error(`Object ${objectKey} not found in this.objects`);
            return;
        }
        
        const obj = this.objects[objectKey];
        if (obj.loadedObject) {
            obj.positionX += positionX;
            obj.positionY += positionY;
            obj.positionZ += positionZ;
            this.objectsToDB[objectKey].positionX = obj.positionX;
            this.objectsToDB[objectKey].positionY = obj.positionY;
            this.objectsToDB[objectKey].positionZ = obj.positionZ;
            obj.loadedObject.position.set(obj.positionX, obj.positionY, obj.positionZ);
        }
    }

    updateObjectRotation(objectKey, angle) {
        if (!this.objects[objectKey]) {
            return;
        }
        
        const obj = this.objects[objectKey];
        if (obj.loadedObject) {
            obj.angle += angle;
            this.objectsToDB[objectKey].angle = obj.angle;
            obj.loadedObject.rotation.y = THREE.MathUtils.degToRad(obj.angle);
        }
    }

    handleObjectAction(action, param, object) {
        if (param === 'X' || param === 'Y' || param === 'Z') {
            let value = action === 'increase' ? 10 : -10;
            this.updateObjectPosition(object, param === 'X' ? value : 0, param === 'Y' ? value : 0, param === 'Z' ? value : 0);
        } else if(param === 'Scale') {
            if (object === 'chair') return;
            this.updateObjectScale(object, action === 'increase' ? 0.2 : -0.2);
        } else {
            this.updateObjectRotation(object, action === 'increase' ? 45 : -45);
        }
    }

    createInitialRoom() {
        this.createWalls();
        this.createLighting(this.lightX, this.lightY, this.lightZ, this.lightIntensity);
        
        const presentedObjects = Object.entries(this.objectsToDB)
        .filter(([key, value]) => value.isPresented === true)
        .map(([key, value]) => ({ [key]: value }));

        if(presentedObjects) {
            presentedObjects.forEach(obj => {
                for (let key in obj) {
                    this.objects[key].scale = obj[key].scale;
                    this.objects[key].positionX = obj[key].positionX;
                    this.objects[key].positionY = obj[key].positionY;
                    this.objects[key].positionZ = obj[key].positionZ;
                    this.objects[key].angle = obj[key].angle;
                    this.loadObject(key);
                }
            });
        }
    }

    createWalls() {
        this.walls.forEach(wall => this.scene.remove(wall));
        this.walls = [];

        if (this.presentedWalls.left.presented) {
            this.createLeftWall();
        }
        if (this.presentedWalls.right.presented) {
            this.createRightWall();
        }
        if (this.presentedWalls.back.presented) {
            this.createBackWall();
        }
        if (this.presentedWalls.front.presented) {
            this.createFrontWall();
        }

        this.createFloor();
    }

    createLeftWall() {
        if (!this.textureCache) {
            this.textureCache = {};
        }
        let material = this.material;
        if (this.presentedWalls.left.isEditing) {
            material = new THREE.MeshStandardMaterial({ color: 0x00ff00, side: THREE.DoubleSide });
        }

        if (this.presentedWalls.left.texturePath) {
            const texturePath = this.presentedWalls.left.texturePath;
        
            
            if (!this.textureCache[texturePath]) {
                const loader = new THREE.TextureLoader();
                this.textureCache[texturePath] = loader.load(texturePath, () => {
                    this.room.createWalls();
                });
            }
        
            material = new THREE.MeshStandardMaterial({ 
                map: this.textureCache[texturePath], 
                side: THREE.DoubleSide 
            });
        }
    
        if (this.presentedWalls.left.hasWindow) {
            let leftWallLeftGeometry = new THREE.BoxGeometry(
                this.wallThickness,
                this.wallHeight,
                Math.max(0, this.wallLength / 2 - this.presentedWalls.left.windowWidth / 2)
            );
            let leftWallLeft = new THREE.Mesh(leftWallLeftGeometry, material);
            leftWallLeft.position.set(
                -this.wallWidth / 2,
                0,
                -(this.wallLength / 4 + this.presentedWalls.left.windowWidth / 4)
            );
            leftWallLeft.receiveShadow = true;
            this.scene.add(leftWallLeft);
            this.walls.push(leftWallLeft);
    
            let leftWallRightGeometry = new THREE.BoxGeometry(
                this.wallThickness,
                this.wallHeight,
                Math.max(0, this.wallLength / 2 - this.presentedWalls.left.windowWidth / 2)
            );
            let leftWallRight = new THREE.Mesh(leftWallRightGeometry, material);
            leftWallRight.position.set(
                -this.wallWidth / 2,
                0,
                this.wallLength / 4 + this.presentedWalls.left.windowWidth / 4
            );
            leftWallRight.receiveShadow = true;
            this.scene.add(leftWallRight);
            this.walls.push(leftWallRight);
    
            let leftWallTopGeometry = new THREE.BoxGeometry(
                this.wallThickness,
                Math.max(0, this.wallHeight / 2 - this.presentedWalls.left.windowHeight / 2 - this.presentedWalls.left.windowOffsetY),
                this.presentedWalls.left.windowWidth
            );
            let leftWallTop = new THREE.Mesh(leftWallTopGeometry, material);
            leftWallTop.position.set(
                -this.wallWidth / 2,
                this.wallHeight / 4 + this.presentedWalls.left.windowHeight / 4 + this.presentedWalls.left.windowOffsetY / 2,
                0
            );
            leftWallTop.receiveShadow = true;
            this.scene.add(leftWallTop);
            this.walls.push(leftWallTop);
    
            let leftWallBottomGeometry = new THREE.BoxGeometry(
                this.wallThickness,
                Math.max(0, this.wallHeight / 2 - this.presentedWalls.left.windowHeight / 2 + this.presentedWalls.left.windowOffsetY),
                this.presentedWalls.left.windowWidth
            );
            let leftWallBottom = new THREE.Mesh(leftWallBottomGeometry, material);
            leftWallBottom.position.set(
                -this.wallWidth / 2,
                -this.wallHeight / 4 - this.presentedWalls.left.windowHeight / 4 + this.presentedWalls.left.windowOffsetY / 2,
                0
            );
            leftWallBottom.receiveShadow = true;
            this.scene.add(leftWallBottom);
            this.walls.push(leftWallBottom);
        } else if (this.presentedWalls.left.hasDoor) {
            let effectiveDoorHeight = Math.min(this.presentedWalls.left.doorHeight, this.wallHeight);
            let topHeight = Math.max(0, this.wallHeight - effectiveDoorHeight);
            let offsetX = this.presentedWalls.left.doorOffsetX;
    
            // Ограничим смещение, чтобы дверь не выходила за края стены
            let maxOffset = (this.wallLength / 2) - (this.presentedWalls.left.doorWidth / 2);
            offsetX = Math.max(-maxOffset, Math.min(maxOffset, offsetX));
    
            // Новые размеры боковых стен (учитываем offsetX)
            let leftWallWidth = (this.wallLength - this.presentedWalls.left.doorWidth) / 2 - offsetX;
            let rightWallWidth = (this.wallLength - this.presentedWalls.left.doorWidth) / 2 + offsetX;
    
            // Левая часть стены
            let leftWallLeftGeometry = new THREE.BoxGeometry(
                this.wallThickness,
                this.wallHeight,
                leftWallWidth
            );
            let leftWallLeft = new THREE.Mesh(leftWallLeftGeometry, material);
            leftWallLeft.position.set(
                -this.wallWidth / 2,
                0,
                -((this.wallLength / 2) - (leftWallWidth / 2)) // Смещаем левую часть
            );
            leftWallLeft.receiveShadow = true;
            this.scene.add(leftWallLeft);
            this.walls.push(leftWallLeft);
    
            // Правая часть стены
            let leftWallRightGeometry = new THREE.BoxGeometry(
                this.wallThickness,
                this.wallHeight,
                rightWallWidth
            );
            let leftWallRight = new THREE.Mesh(leftWallRightGeometry, material);
            leftWallRight.position.set(
                -this.wallWidth / 2,
                0,
                (this.wallLength / 2) - (rightWallWidth / 2) // Смещаем правую часть
            );
            leftWallRight.receiveShadow = true;
            this.scene.add(leftWallRight);
            this.walls.push(leftWallRight);
    
            // Верхняя часть над дверью (с учётом смещения offsetX)
            let leftWallTopGeometry = new THREE.BoxGeometry(
                this.wallThickness,
                topHeight,
                this.presentedWalls.left.doorWidth
            );
            let leftWallTop = new THREE.Mesh(leftWallTopGeometry, material);
            leftWallTop.position.set(
                -this.wallWidth / 2,
                (this.wallHeight / 2) - (topHeight / 2),
                -offsetX
            );
            leftWallTop.receiveShadow = true;
            this.scene.add(leftWallTop);
            this.walls.push(leftWallTop);
        } else {
            let leftWallGeometry = new THREE.BoxGeometry(
                this.wallThickness,
                this.wallHeight,
                this.wallLength
            );
            let leftWall = new THREE.Mesh(leftWallGeometry, material);
            leftWall.position.set(
                -this.wallWidth / 2,
                0,
                0
            );
            leftWall.receiveShadow = true;
            this.scene.add(leftWall);
            this.walls.push(leftWall);
        }
    }

    createRightWall() {
    if (!this.textureCache) {
        this.textureCache = {};
    }

    let material = this.material;
    if (this.presentedWalls.right.isEditing) {
        material = new THREE.MeshStandardMaterial({ color: 0x00ff00, side: THREE.DoubleSide });
    }

    if (this.presentedWalls.right.texturePath) {
        const texturePath = this.presentedWalls.right.texturePath;
    
        // Проверяем, есть ли уже загруженная текстура в кэше
        if (!this.textureCache[texturePath]) {
            const loader = new THREE.TextureLoader();
            this.textureCache[texturePath] = loader.load(texturePath, () => {
                this.room.createWalls(); // Обновляем стены после загрузки
            });
        }
    
        material = new THREE.MeshStandardMaterial({ 
            map: this.textureCache[texturePath], 
            side: THREE.DoubleSide 
        });
    }

    if (this.presentedWalls.right.hasWindow) {
        let rightWallLeftGeometry = new THREE.BoxGeometry(
            this.wallThickness,
            this.wallHeight,
            Math.max(0, this.wallLength / 2 - this.presentedWalls.right.windowWidth / 2)
        );
        let rightWallLeft = new THREE.Mesh(rightWallLeftGeometry, material);
        rightWallLeft.position.set(
            this.wallWidth / 2,
            0,
            -(this.wallLength / 4 + this.presentedWalls.right.windowWidth / 4)
        );
        rightWallLeft.receiveShadow = true;
        this.scene.add(rightWallLeft);
        this.walls.push(rightWallLeft);

        let rightWallRightGeometry = new THREE.BoxGeometry(
            this.wallThickness,
            this.wallHeight,
            Math.max(0, this.wallLength / 2 - this.presentedWalls.right.windowWidth / 2)
        );
        let rightWallRight = new THREE.Mesh(rightWallRightGeometry, material);
        rightWallRight.position.set(
            this.wallWidth / 2,
            0,
            this.wallLength / 4 + this.presentedWalls.right.windowWidth / 4
        );
        rightWallRight.receiveShadow = true;
        this.scene.add(rightWallRight);
        this.walls.push(rightWallRight);

        let rightWallTopGeometry = new THREE.BoxGeometry(
            this.wallThickness,
            Math.max(0, this.wallHeight / 2 - this.presentedWalls.right.windowHeight / 2 - this.presentedWalls.right.windowOffsetY),
            this.presentedWalls.right.windowWidth
        );
        let rightWallTop = new THREE.Mesh(rightWallTopGeometry, material);
        rightWallTop.position.set(
            this.wallWidth / 2,
            this.wallHeight / 4 + this.presentedWalls.right.windowHeight / 4 + this.presentedWalls.right.windowOffsetY / 2,
            0
        );
        rightWallTop.receiveShadow = true;
        this.scene.add(rightWallTop);
        this.walls.push(rightWallTop);

        let rightWallBottomGeometry = new THREE.BoxGeometry(
            this.wallThickness,
            Math.max(0, this.wallHeight / 2 - this.presentedWalls.right.windowHeight / 2 + this.presentedWalls.right.windowOffsetY),
            this.presentedWalls.right.windowWidth
        );
        let rightWallBottom = new THREE.Mesh(rightWallBottomGeometry, material);
        rightWallBottom.position.set(
            this.wallWidth / 2,
            -this.wallHeight / 4 - this.presentedWalls.right.windowHeight / 4 + this.presentedWalls.right.windowOffsetY / 2,
            0
        );
        rightWallBottom.receiveShadow = true;
        this.scene.add(rightWallBottom);
        this.walls.push(rightWallBottom);
    } else if (this.presentedWalls.right.hasDoor) {
        let effectiveDoorHeight = Math.min(this.presentedWalls.right.doorHeight, this.wallHeight);
        let topHeight = Math.max(0, this.wallHeight - effectiveDoorHeight);
        let offsetX = this.presentedWalls.right.doorOffsetX;

        // Ограничим смещение, чтобы дверь не выходила за края стены
        let maxOffset = (this.wallLength / 2) - (this.presentedWalls.right.doorWidth / 2);
        offsetX = Math.max(-maxOffset, Math.min(maxOffset, offsetX));

        // Новые размеры боковых стен (учитываем offsetX)
        let leftWallWidth = (this.wallLength - this.presentedWalls.right.doorWidth) / 2 - offsetX;
        let rightWallWidth = (this.wallLength - this.presentedWalls.right.doorWidth) / 2 + offsetX;

        // Левая часть стены
        let rightWallLeftGeometry = new THREE.BoxGeometry(
            this.wallThickness,
            this.wallHeight,
            leftWallWidth
        );
        let rightWallLeft = new THREE.Mesh(rightWallLeftGeometry, material);
        rightWallLeft.position.set(
            this.wallWidth / 2,
            0,
            -((this.wallLength / 2) - (leftWallWidth / 2)) // Смещаем левую часть
        );
        rightWallLeft.receiveShadow = true;
        this.scene.add(rightWallLeft);
        this.walls.push(rightWallLeft);

        // Правая часть стены
        let rightWallRightGeometry = new THREE.BoxGeometry(
            this.wallThickness,
            this.wallHeight,
            rightWallWidth
        );
        let rightWallRight = new THREE.Mesh(rightWallRightGeometry, material);
        rightWallRight.position.set(
            this.wallWidth / 2,
            0,
            (this.wallLength / 2) - (rightWallWidth / 2) // Смещаем правую часть
        );
        rightWallRight.receiveShadow = true;
        this.scene.add(rightWallRight);
        this.walls.push(rightWallRight);

        // Верхняя часть над дверью (с учётом смещения offsetX)
        let rightWallTopGeometry = new THREE.BoxGeometry(
            this.wallThickness,
            topHeight,
            this.presentedWalls.right.doorWidth
        );
        let rightWallTop = new THREE.Mesh(rightWallTopGeometry, material);
        rightWallTop.position.set(
            this.wallWidth / 2,
            (this.wallHeight / 2) - (topHeight / 2),
            -offsetX
        );
        rightWallTop.receiveShadow = true;
        this.scene.add(rightWallTop);
        this.walls.push(rightWallTop);
    } else {
        let rightWallGeometry = new THREE.BoxGeometry(
            this.wallThickness,
            this.wallHeight,
            this.wallLength
        );
        let rightWall = new THREE.Mesh(rightWallGeometry, material);
        rightWall.position.set(
            this.wallWidth / 2,
            0,
            0
        );
        rightWall.receiveShadow = true;
        this.scene.add(rightWall);
        this.walls.push(rightWall);
    }
}

    createBackWall() {
        if (!this.textureCache) {
            this.textureCache = {};
        }
        let material = this.material;
        if (this.presentedWalls.back.isEditing) {
            material = new THREE.MeshStandardMaterial({ color: 0x00ff00, side: THREE.DoubleSide });
        }

        if (this.presentedWalls.back.texturePath) {
            const texturePath = this.presentedWalls.back.texturePath;
        
            // Проверяем, есть ли уже загруженная текстура в кэше
            if (!this.textureCache[texturePath]) {
                const loader = new THREE.TextureLoader();
                this.textureCache[texturePath] = loader.load(texturePath, () => {
                    this.room.createWalls(); // Обновляем стены после загрузки
                });
            }
        
            material = new THREE.MeshStandardMaterial({ 
                map: this.textureCache[texturePath], 
                side: THREE.DoubleSide 
            });
        }
    
        if (this.presentedWalls.back.hasWindow) {
            let backWallLeftGeometry = new THREE.BoxGeometry(
                Math.max(0, this.wallWidth / 2 - this.presentedWalls.back.windowWidth / 2),
                this.wallHeight,
                this.wallThickness
            );
            let backWallLeft = new THREE.Mesh(backWallLeftGeometry, material);
            backWallLeft.position.set(
                -(this.wallWidth / 4 + this.presentedWalls.back.windowWidth / 4),
                0,
                -this.wallLength / 2
            );
            backWallLeft.receiveShadow = true;
            this.scene.add(backWallLeft);
            this.walls.push(backWallLeft);
    
            let backWallRightGeometry = new THREE.BoxGeometry(
                Math.max(0, this.wallWidth / 2 - this.presentedWalls.back.windowWidth / 2),
                this.wallHeight,
                this.wallThickness
            );
            let backWallRight = new THREE.Mesh(backWallRightGeometry, material);
            backWallRight.position.set(
                this.wallWidth / 4 + this.presentedWalls.back.windowWidth / 4,
                0,
                -this.wallLength / 2
            );
            backWallRight.receiveShadow = true;
            this.scene.add(backWallRight);
            this.walls.push(backWallRight);
    
            let backWallTopGeometry = new THREE.BoxGeometry(
                this.presentedWalls.back.windowWidth,
                Math.max(0, this.wallHeight / 2 - this.presentedWalls.back.windowHeight / 2 - this.presentedWalls.back.windowOffsetY),
                this.wallThickness
            );
            let backWallTop = new THREE.Mesh(backWallTopGeometry, material);
            backWallTop.position.set(
                0,
                this.wallHeight / 4 + this.presentedWalls.back.windowHeight / 4 + this.presentedWalls.back.windowOffsetY / 2,
                -this.wallLength / 2
            );
            backWallTop.receiveShadow = true;
            this.scene.add(backWallTop);
            this.walls.push(backWallTop);
    
            let backWallBottomGeometry = new THREE.BoxGeometry(
                this.presentedWalls.back.windowWidth,
                Math.max(0, this.wallHeight / 2 - this.presentedWalls.back.windowHeight / 2 + this.presentedWalls.back.windowOffsetY),
                this.wallThickness
            );
            let backWallBottom = new THREE.Mesh(backWallBottomGeometry, material);
            backWallBottom.position.set(
                0,
                -this.wallHeight / 4 - this.presentedWalls.back.windowHeight / 4 + this.presentedWalls.back.windowOffsetY / 2,
                -this.wallLength / 2
            );
            backWallBottom.receiveShadow = true;
            this.scene.add(backWallBottom);
            this.walls.push(backWallBottom);
        } else if (this.presentedWalls.back.hasDoor) {
            let effectiveDoorHeight = Math.min(this.presentedWalls.back.doorHeight, this.wallHeight);
            let topHeight = Math.max(0, this.wallHeight - effectiveDoorHeight);
            let offsetX = this.presentedWalls.back.doorOffsetX;
    
            // Ограничим смещение, чтобы дверь не выходила за края стены
            let maxOffset = (this.wallWidth / 2) - (this.presentedWalls.back.doorWidth / 2);
            offsetX = Math.max(-maxOffset, Math.min(maxOffset, offsetX));
    
            // Новые размеры боковых стен (учитываем offsetX)
            let leftWallWidth = (this.wallWidth - this.presentedWalls.back.doorWidth) / 2 - offsetX;
            let rightWallWidth = (this.wallWidth - this.presentedWalls.back.doorWidth) / 2 + offsetX;
    
            // Левая часть стены
            let backWallLeftGeometry = new THREE.BoxGeometry(leftWallWidth, this.wallHeight, this.wallThickness);
            let backWallLeft = new THREE.Mesh(backWallLeftGeometry, material);
            backWallLeft.position.set(
                -((this.wallWidth / 2) - (leftWallWidth / 2)), // Смещаем левую часть
                0,
                -this.wallLength / 2
            );
            backWallLeft.receiveShadow = true;
            this.scene.add(backWallLeft);
            this.walls.push(backWallLeft);
    
            // Правая часть стены
            let backWallRightGeometry = new THREE.BoxGeometry(rightWallWidth, this.wallHeight, this.wallThickness);
            let backWallRight = new THREE.Mesh(backWallRightGeometry, material);
            backWallRight.position.set(
                (this.wallWidth / 2) - (rightWallWidth / 2), // Смещаем правую часть
                0,
                -this.wallLength / 2
            );
            backWallRight.receiveShadow = true;
            this.scene.add(backWallRight);
            this.walls.push(backWallRight);
    
            // Верхняя часть над дверью (с учётом смещения offsetX)
            let backWallTopGeometry = new THREE.BoxGeometry(this.presentedWalls.back.doorWidth, topHeight, this.wallThickness);
            let backWallTop = new THREE.Mesh(backWallTopGeometry, material);
            backWallTop.position.set(
                -offsetX,
                (this.wallHeight / 2) - (topHeight / 2),
                -this.wallLength / 2
            );
            backWallTop.receiveShadow = true;
            this.scene.add(backWallTop);
            this.walls.push(backWallTop);
        } else {
            let backWallGeometry = new THREE.BoxGeometry(this.wallWidth, this.wallHeight, this.wallThickness);
            let backWall = new THREE.Mesh(backWallGeometry, material);
            backWall.position.set(
                0,
                0,
                -this.wallLength / 2
            );
            backWall.receiveShadow = true;
            this.scene.add(backWall);
            this.walls.push(backWall);
        }
    }

    createFrontWall() {
        if (!this.textureCache) {
            this.textureCache = {};
        }
        let material = this.material;
        if (this.presentedWalls.front.isEditing) {
            material = new THREE.MeshStandardMaterial({ color: 0x00ff00, side: THREE.DoubleSide });
        }

        if (this.presentedWalls.front.texturePath) {
            const texturePath = this.presentedWalls.front.texturePath;
        
            // Проверяем, есть ли уже загруженная текстура в кэше
            if (!this.textureCache[texturePath]) {
                const loader = new THREE.TextureLoader();
                this.textureCache[texturePath] = loader.load(texturePath, () => {
                    this.room.createWalls(); // Обновляем стены после загрузки
                });
            }
        
            material = new THREE.MeshStandardMaterial({ 
                map: this.textureCache[texturePath], 
                side: THREE.DoubleSide 
            });
        }
    
        if (this.presentedWalls.front.hasWindow) {
            let frontWallLeftGeometry = new THREE.BoxGeometry(
                Math.max(0, this.wallWidth / 2 - this.presentedWalls.front.windowWidth / 2),
                this.wallHeight,
                this.wallThickness
            );
            let frontWallLeft = new THREE.Mesh(frontWallLeftGeometry, material);
            frontWallLeft.position.set(
                -(this.wallWidth / 4 + this.presentedWalls.front.windowWidth / 4),
                0,
                this.wallLength / 2
            );
            frontWallLeft.receiveShadow = true;
            this.scene.add(frontWallLeft);
            this.walls.push(frontWallLeft);
    
            let frontWallRightGeometry = new THREE.BoxGeometry(
                Math.max(0, this.wallWidth / 2 - this.presentedWalls.front.windowWidth / 2),
                this.wallHeight,
                this.wallThickness
            );
            let frontWallRight = new THREE.Mesh(frontWallRightGeometry, material);
            frontWallRight.position.set(
                this.wallWidth / 4 + this.presentedWalls.front.windowWidth / 4,
                0,
                this.wallLength / 2
            );
            frontWallRight.receiveShadow = true;
            this.scene.add(frontWallRight);
            this.walls.push(frontWallRight);
    
            let frontWallTopGeometry = new THREE.BoxGeometry(
                this.presentedWalls.front.windowWidth,
                Math.max(0, this.wallHeight / 2 - this.presentedWalls.front.windowHeight / 2 - this.presentedWalls.front.windowOffsetY),
                this.wallThickness
            );
            let frontWallTop = new THREE.Mesh(frontWallTopGeometry, material);
            frontWallTop.position.set(
                0,
                this.wallHeight / 4 + this.presentedWalls.front.windowHeight / 4 + this.presentedWalls.front.windowOffsetY / 2,
                this.wallLength / 2
            );
            frontWallTop.receiveShadow = true;
            this.scene.add(frontWallTop);
            this.walls.push(frontWallTop);
    
            let frontWallBottomGeometry = new THREE.BoxGeometry(
                this.presentedWalls.front.windowWidth,
                Math.max(0, this.wallHeight / 2 - this.presentedWalls.front.windowHeight / 2 + this.presentedWalls.front.windowOffsetY),
                this.wallThickness
            );
            let frontWallBottom = new THREE.Mesh(frontWallBottomGeometry, material);
            frontWallBottom.position.set(
                0,
                -this.wallHeight / 4 - this.presentedWalls.front.windowHeight / 4 + this.presentedWalls.front.windowOffsetY / 2,
                this.wallLength / 2
            );
            frontWallBottom.receiveShadow = true;
            this.scene.add(frontWallBottom);
            this.walls.push(frontWallBottom);
        } else if (this.presentedWalls.front.hasDoor) {
            let effectiveDoorHeight = Math.min(this.presentedWalls.front.doorHeight, this.wallHeight);
            let topHeight = Math.max(0, this.wallHeight - effectiveDoorHeight);
            let offsetX = this.presentedWalls.front.doorOffsetX;
    
            // Ограничим смещение, чтобы дверь не выходила за края стены
            let maxOffset = (this.wallWidth / 2) - (this.presentedWalls.front.doorWidth / 2);
            offsetX = Math.max(-maxOffset, Math.min(maxOffset, offsetX));
    
            // Новые размеры боковых стен (учитываем offsetX)
            let leftWallWidth = (this.wallWidth - this.presentedWalls.front.doorWidth) / 2 - offsetX;
            let rightWallWidth = (this.wallWidth - this.presentedWalls.front.doorWidth) / 2 + offsetX;
    
            // Левая часть стены
            let frontWallLeftGeometry = new THREE.BoxGeometry(
                leftWallWidth,
                this.wallHeight,
                this.wallThickness
            );
            let frontWallLeft = new THREE.Mesh(frontWallLeftGeometry, material);
            frontWallLeft.position.set(
                -((this.wallWidth / 2) - (leftWallWidth / 2)), // Смещаем левую часть
                0,
                this.wallLength / 2
            );
            frontWallLeft.receiveShadow = true;
            this.scene.add(frontWallLeft);
            this.walls.push(frontWallLeft);
    
            // Правая часть стены
            let frontWallRightGeometry = new THREE.BoxGeometry(
                rightWallWidth,
                this.wallHeight,
                this.wallThickness
            );
            let frontWallRight = new THREE.Mesh(frontWallRightGeometry, material);
            frontWallRight.position.set(
                (this.wallWidth / 2) - (rightWallWidth / 2), // Смещаем правую часть
                0,
                this.wallLength / 2
            );
            frontWallRight.receiveShadow = true;
            this.scene.add(frontWallRight);
            this.walls.push(frontWallRight);
    
            // Верхняя часть над дверью (с учётом смещения offsetX)
            let frontWallTopGeometry = new THREE.BoxGeometry(
                this.presentedWalls.front.doorWidth,
                topHeight,
                this.wallThickness
            );
            let frontWallTop = new THREE.Mesh(frontWallTopGeometry, material);
            frontWallTop.position.set(
                -offsetX,
                (this.wallHeight / 2) - (topHeight / 2),
                this.wallLength / 2
            );
            frontWallTop.receiveShadow = true;
            this.scene.add(frontWallTop);
            this.walls.push(frontWallTop);
        } else {
            let frontWallGeometry = new THREE.BoxGeometry(
                this.wallWidth,
                this.wallHeight,
                this.wallThickness
            );
            let frontWall = new THREE.Mesh(frontWallGeometry, material);
            frontWall.position.set(
                0,
                0,
                this.wallLength / 2
            );
            frontWall.receiveShadow = true;
            this.scene.add(frontWall);
            this.walls.push(frontWall);
        }
    }

    createFloor() {
        // Проверяем, есть ли объект для кэширования текстур
        if (!this.textureCache) {
            this.textureCache = {};
        }
    
        let material = this.material;
    
        // Проверяем, есть ли текстура для пола
        if (this.presentedWalls.floor.texturePath) {
            const texturePath = this.presentedWalls.floor.texturePath;
    
            // Если текстура не загружена, загружаем и кешируем
            if (!this.textureCache[texturePath]) {
                const loader = new THREE.TextureLoader();
                this.textureCache[texturePath] = loader.load(texturePath, () => {
                    this.room.createFloor(); // Обновляем пол после загрузки
                });
            }
    
            material = new THREE.MeshStandardMaterial({ 
                map: this.textureCache[texturePath], 
                side: THREE.DoubleSide 
            });
        }
    
        // Создаём пол с новой текстурой
        let floorGeometry = new THREE.BoxGeometry(this.wallWidth, this.wallThickness, this.wallLength);
        let floor = new THREE.Mesh(floorGeometry, material);
    
        floor.position.y = -this.wallHeight / 2;
        floor.receiveShadow = true;
        this.scene.add(floor);
        this.walls.push(floor);
    }

    addTexture(wall, texture) {
        if (this.presentedWalls[wall].presented || wall === 'floor') {
            this.presentedWalls[wall].texturePath = this.textures[texture].path;
            this.createWalls();
        }
    }

    removeTexture(wall) {
        if (this.presentedWalls[wall].presented && this.presentedWalls[wall].texturePath) {
            this.presentedWalls[wall].texturePath = '';
            this.createWalls();
        }
    }
    
    createLighting(x, y, z, lightIntensity) {
        this.lights.forEach(light => this.scene.remove(light));
        this.lights = [];

        let ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
        this.scene.add(ambientLight);
        this.lights.push(ambientLight);

        this.directionalLight = new THREE.DirectionalLight(0xffffff, lightIntensity);
        this.directionalLight.position.set(x, y, z);
        this.directionalLight.castShadow = true;
        this.scene.add(this.directionalLight);
        this.lights.push(this.directionalLight);
    }

    showLightHelper() {
        if (!this.directionalLight) {
            console.warn("Directional light is not initialized.");
            return;
        }

        let lightHelper = new THREE.DirectionalLightHelper(this.directionalLight, 50, 0xffff00);
        this.scene.add(lightHelper);
        this.lights.push(lightHelper);
    }

    hideHelpers() {
        Object.values(this.presentedWalls).forEach(wall => {
            if (wall.isEditing) {
                wall.isEditing = false;
            }
        });

        this.lights = this.lights.filter(light => {
            if (light instanceof THREE.DirectionalLightHelper) {
                this.scene.remove(light);
                return false;
            }
            return true;
        });

        this.createWalls();
    }

    updateWallWidth(newWidth) {
        this.hideHelpers();
        this.presentedWalls.back.isEditing = true;
        this.presentedWalls.front.isEditing = true;

        const minWallRemainder = 200;
        const minWindowWidth = 100;
        const minWallWidth = 500;

        const newWallWidth = this.wallWidth + newWidth;

        if (newWallWidth < minWallWidth) return;

        ['back', 'front'].forEach(wallName => {
            const wall = this.presentedWalls[wallName];
            if (wall.hasWindow) {
                if (newWallWidth - wall.windowWidth < minWallRemainder) {
                    wall.windowWidth = newWallWidth - minWallRemainder;
                    if (wall.windowWidth < minWindowWidth) {
                        wall.windowWidth = minWindowWidth;
                        if (newWallWidth < wall.windowWidth + minWallRemainder) {
                            this.wallWidth = wall.windowWidth + minWallRemainder;
                            return;
                        }
                    }
                }
            }
            if (wall.hasDoor) {
                if (newWallWidth - wall.doorWidth < minWallRemainder) {
                    wall.doorWidth = newWallWidth - minWallRemainder;
                    if (wall.doorWidth < minWindowWidth) { // Використовуємо minWindowWidth як мінімальну ширину для дверей
                        wall.doorWidth = minWindowWidth;
                        if (newWallWidth < wall.doorWidth + minWallRemainder) {
                            this.wallWidth = wall.doorWidth + minWallRemainder;
                            return;
                        }
                    }
                }
            }
        });

        this.wallWidth = newWallWidth;
        this.createWalls();
    }

    updateWallLength(newLength) {
        this.hideHelpers();
        this.presentedWalls.left.isEditing = true;
        this.presentedWalls.right.isEditing = true;

        const minWallRemainder = 200;
        const minWindowWidth = 100;
        const minWallLength = 500;

        const newWallLength = this.wallLength + newLength;

        if (newWallLength < minWallLength) return;

        ['left', 'right'].forEach(wallName => {
            const wall = this.presentedWalls[wallName];
            if (wall.hasWindow) {
                if (newWallLength - wall.windowWidth < minWallRemainder) {
                    wall.windowWidth = newWallLength - minWallRemainder;
                    if (wall.windowWidth < minWindowWidth) {
                        wall.windowWidth = minWindowWidth;
                        if (newWallLength < wall.windowWidth + minWallRemainder) {
                            this.wallLength = wall.windowWidth + minWallRemainder;
                            return;
                        }
                    }
                }
            }
            if (wall.hasDoor) {
                if (newWallLength - wall.doorWidth < minWallRemainder) {
                    wall.doorWidth = newWallLength - minWallRemainder;
                    if (wall.doorWidth < minWindowWidth) { // Використовуємо minWindowWidth як мінімальну ширину для дверей
                        wall.doorWidth = minWindowWidth;
                        if (newWallLength < wall.doorWidth + minWallRemainder) {
                            this.wallLength = wall.doorWidth + minWallRemainder;
                            return;
                        }
                    }
                }
            }
        });

        this.wallLength = newWallLength;
        this.createWalls();
    }

    updateWallHeight(newHeight) {
        this.hideHelpers();
        Object.values(this.presentedWalls).forEach(wall => {
            if (!wall.isEditing) {
                wall.isEditing = true;
            }
        });

        const minWallRemainderHeight = 200;
        const minWallRemainderOffset = 50;
        const minWindowHeight = 100;
        const minWallHeight = 200;

        const newWallHeight = this.wallHeight + newHeight;

        if (newWallHeight < minWallHeight) return;

        Object.values(this.presentedWalls).forEach(wall => {
            if (wall.hasWindow) {
                if (newWallHeight - wall.windowHeight < minWallRemainderHeight) {
                    wall.windowHeight = newWallHeight - minWallRemainderHeight;
                    if (wall.windowHeight < minWindowHeight) {
                        wall.windowHeight = minWindowHeight;
                        if (newWallHeight < wall.windowHeight + minWallRemainderHeight) {
                            this.wallHeight = wall.windowHeight + minWallRemainderHeight;
                            return;
                        }
                    }
                }

                const upperRemainder = (newWallHeight - wall.windowHeight) / 2 - wall.windowOffsetY;
                const lowerRemainder = (newWallHeight - wall.windowHeight) / 2 + wall.windowOffsetY;

                if (upperRemainder < minWallRemainderOffset) {
                    wall.windowOffsetY = (newWallHeight - wall.windowHeight) / 2 - minWallRemainderOffset;
                } else if (lowerRemainder < minWallRemainderOffset) {
                    wall.windowOffsetY = minWallRemainderOffset - (newWallHeight - wall.windowHeight) / 2;
                }
            }
            if (wall.hasDoor) {
                if (newWallHeight - wall.doorHeight < minWallRemainderHeight) {
                    wall.doorHeight = newWallHeight - minWallRemainderHeight;
                    if (wall.doorHeight < minWindowHeight) { // Використовуємо minWindowHeight як мінімальну висоту для дверей
                        wall.doorHeight = minWindowHeight;
                        if (newWallHeight < wall.doorHeight + minWallRemainderHeight) {
                            this.wallHeight = wall.doorHeight + minWallRemainderHeight;
                            return;
                        }
                    }
                }
            }
        });

        this.wallHeight = newWallHeight;
        this.createWalls();
    }

    updateLightX(x) {
        this.lightX += x;
        this.createLighting(this.lightX, this.lightY, this.lightZ, this.lightIntensity);
        this.showLightHelper();
    }

    updateLightY(y) {
        this.lightY += y;
        this.createLighting(this.lightX, this.lightY, this.lightZ, this.lightIntensity);
        this.showLightHelper();
    }

    updateLightZ(z) {
        this.lightZ += z;
        this.createLighting(this.lightX, this.lightY, this.lightZ, this.lightIntensity);
        this.showLightHelper();
    }

    updateLightIntensity(intensity) {
        this.lightIntensity += intensity;
        this.createLighting(this.lightX, this.lightY, this.lightZ, this.lightIntensity);
        this.showLightHelper();
    }

    removeWall(wall) {
        this.presentedWalls[wall].presented = false;
        this.createWalls();
    }

    updateWindowWidth(targetWall, points) {
        let wall = null;
        let wallSize = 0;

        switch (targetWall) {
            case 'left':
                wall = this.presentedWalls.left;
                wallSize = this.wallLength;
                break;
            case 'right':
                wall = this.presentedWalls.right;
                wallSize = this.wallLength;
                break;
            case 'back':
                wall = this.presentedWalls.back;
                wallSize = this.wallWidth;
                break;
            case 'front':
                wall = this.presentedWalls.front;
                wallSize = this.wallWidth;
                break;
        }

        if (!wall) return;

        const minWallRemainder = 200;
        const minWindowWidth = 100;

        const newWindowWidth = wall.windowWidth + points;

        if (newWindowWidth < minWindowWidth) {
            wall.windowWidth = minWindowWidth;
        } else if (newWindowWidth > wallSize - minWallRemainder) {
            wall.windowWidth = wallSize - minWallRemainder;
        } else {
            wall.windowWidth = newWindowWidth;
        }

        this.createWalls();
    }

    updateWindowHeight(targetWall, points) {
        let wall = null;
        let wallSize = 0;

        switch (targetWall) {
            case 'left':
                wall = this.presentedWalls.left;
                wallSize = this.wallHeight;
                break;
            case 'back':
                wall = this.presentedWalls.back;
                wallSize = this.wallHeight;
                break;
            case 'right':
                wall = this.presentedWalls.right;
                wallSize = this.wallHeight;
                break;
            case 'front':
                wall = this.presentedWalls.front;
                wallSize = this.wallHeight;
                break;
        }

        if (!wall) return;

        const minWallRemainder = 200;
        const minWindowHeight = 100;

        const newWindowHeight = wall.windowHeight + points;

        if (newWindowHeight < minWindowHeight) {
            wall.windowHeight = minWindowHeight;
        } else if (newWindowHeight > wallSize - minWallRemainder) {
            wall.windowHeight = wallSize - minWallRemainder;
        } else {
            wall.windowHeight = newWindowHeight;
        }

        this.createWalls();
    }

    updateWindowOffsetY(targetWall, points) {
        let wall = null;
        let wallSize = 0;

        switch (targetWall) {
            case 'left':
                wall = this.presentedWalls.left;
                wallSize = this.wallHeight;
                break;
            case 'back':
                wall = this.presentedWalls.back;
                wallSize = this.wallHeight;
                break;
            case 'right':
                wall = this.presentedWalls.right;
                wallSize = this.wallHeight;
                break;
            case 'front':
                wall = this.presentedWalls.front;
                wallSize = this.wallHeight;
                break;
        }

        if (!wall) return;

        const minWallRemainder = 50;

        const newWindowOffsetY = wall.windowOffsetY + points;

        const upperRemainder = (wallSize - wall.windowHeight) / 2 - newWindowOffsetY;
        const lowerRemainder = (wallSize - wall.windowHeight) / 2 + newWindowOffsetY;

        if (upperRemainder < minWallRemainder) {
            wall.windowOffsetY = (wallSize - wall.windowHeight) / 2 - minWallRemainder;
        } else if (lowerRemainder < minWallRemainder) {
            wall.windowOffsetY = minWallRemainder - (wallSize - wall.windowHeight) / 2;
        } else {
            wall.windowOffsetY = newWindowOffsetY;
        }

        this.createWalls();
    }

    updateDoorWidth(targetWall, points) {
        let wall = null;
        let wallSize = 0;

        switch (targetWall) {
            case 'left':
                wall = this.presentedWalls.left;
                wallSize = this.wallLength;
                break;
            case 'right':
                wall = this.presentedWalls.right;
                wallSize = this.wallLength;
                break;
            case 'back':
                wall = this.presentedWalls.back;
                wallSize = this.wallWidth;
                break;
            case 'front':
                wall = this.presentedWalls.front;
                wallSize = this.wallWidth;
                break;
        }

        if (!wall) return;

        const minWallRemainder = 200;
        const minDoorWidth = 100;

        const newDoorWidth = wall.doorWidth + points;

        if (newDoorWidth < minDoorWidth) {
            wall.doorWidth = minDoorWidth;
        } else if (newDoorWidth > wallSize - minWallRemainder) {
            wall.doorWidth = wallSize - minWallRemainder;
        } else {
            wall.doorWidth = newDoorWidth;
        }

        this.createWalls();
    }

    updateDoorHeight(targetWall, points) {
        let wall = null;
        let wallSize = 0;
    
        switch (targetWall) {
            case 'left':
                wall = this.presentedWalls.left;
                wallSize = this.wallHeight;
                break;
            case 'back':
                wall = this.presentedWalls.back;
                wallSize = this.wallHeight;
                break;
            case 'right':
                wall = this.presentedWalls.right;
                wallSize = this.wallHeight;
                break;
            case 'front':
                wall = this.presentedWalls.front;
                wallSize = this.wallHeight;
                break;
        }
    
        if (!wall) return;
    
        const minWallRemainder = 100;
        const minDoorHeight = 100;
    
        const newDoorHeight = wall.doorHeight + points;
    
        if (newDoorHeight < minDoorHeight) {
            wall.doorHeight = minDoorHeight;
        } else if (newDoorHeight > wallSize - minWallRemainder) {
            wall.doorHeight = wallSize - minWallRemainder;
        } else {
            wall.doorHeight = newDoorHeight;
        }
    
        this.createWalls();
    }

    updateDoorOffsetX(targetWall, points) {
        let wall = null;
        let wallSize = 0;

        switch (targetWall) {
            case 'left':
                wall = this.presentedWalls.left;
                wallSize = this.wallLength;
                break;
            case 'right':
                wall = this.presentedWalls.right;
                wallSize = this.wallLength;
                break;
            case 'back':
                wall = this.presentedWalls.back;
                wallSize = this.wallWidth;
                break;
            case 'front':
                wall = this.presentedWalls.front;
                wallSize = this.wallWidth;
                break;
        }

        if (!wall) return;

        const minWallRemainder = 100; // Допустимая разница для смещения (можно настроить)

        const newDoorOffsetX = wall.doorOffsetX + points;

        // Ограничиваем смещение, чтобы дверь оставалась в пределах стены
        const maxOffset = Math.max(0, (wallSize - wall.doorWidth) / 2 - minWallRemainder);
        if (newDoorOffsetX < -maxOffset) {
            wall.doorOffsetX = -maxOffset;
        } else if (newDoorOffsetX > maxOffset) {
            wall.doorOffsetX = maxOffset;
        } else {
            wall.doorOffsetX = newDoorOffsetX;
        }

        this.createWalls();
    }
}

export default Room;