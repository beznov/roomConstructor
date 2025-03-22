class Control {
    constructor(room) {
        this.room = room;
        this.previousPage = [];
        this.currentPage = 'initial';

        this.controls = document.querySelector('.controls');
        this.controlsItems = this.controls.children;

        this.pages = {
            initial: document.querySelector('.controls__initial'),
            room: document.querySelector('.controls__room'),
            light: document.querySelector('.controls__light'),
            object: document.querySelector('.controls__object'),
            save: document.querySelector('.controls__save'),
            walls: document.querySelector('.controls__room__walls'),
            wallsDimensions: document.querySelector('.controls__room__walls__wl'),
            wallsHeight: document.querySelector('.controls__room__walls__h'),
            addWalls: document.querySelector('.controls__room__walls__add'),
            removeWalls: document.querySelector('.controls__room__walls__remove'),
            windows: document.querySelector('.controls__room__windows'),
            addWindows: document.querySelector('.controls__room__windows__add'),
            removeWindows: document.querySelector('.controls__room__windows__remove'),
            windowsDimensions: document.querySelector('.controls__room__windows__dm'),
            tuneWindowLeft: document.querySelector('.controls__room__windows__tune_left'),
            tuneWindowBack: document.querySelector('.controls__room__windows__tune_back'),
            tuneWindowRight: document.querySelector('.controls__room__windows__tune_right'),
            tuneWindowFront: document.querySelector('.controls__room__windows__tune_front'),
            doors: document.querySelector('.controls__room__doors'),
            addDoors: document.querySelector('.controls__room__doors__add'),
            removeDoors: document.querySelector('.controls__room__doors__remove'),
            doorsDimensions: document.querySelector('.controls__room__doors__dm'),
            tuneDoorLeft: document.querySelector('.controls__room__doors__tune_left'),
            tuneDoorBack: document.querySelector('.controls__room__doors__tune_back'),
            tuneDoorRight: document.querySelector('.controls__room__doors__tune_right'),
            tuneDoorFront: document.querySelector('.controls__room__doors__tune_front'),
            addObject: document.querySelector('.controls__object__add'),
            removeObject: document.querySelector('.controls__object__remove'),
            objectDimensions: document.querySelector('.controls__object__dm'),
            textures: document.querySelector('.controls__textures'),
            texturesAdd: document.querySelector('.controls__textures__add'),
            texturesRemove: document.querySelector('.controls__textures__remove')
        };

        this.addEventListeners();
    }

    addEventListeners() {
        this.controls.addEventListener('click', (event) => {
            const target = event.target.closest('[data-action]');

            if (!target) return;

            const action = target.dataset.action;

            if (action) {
                this.handleAction(action);
            }
        });
    }

    handleAction(action) {
        switch (action) {
            // pages
            case 'room':
                this.goto('room', false);
                break;
            case 'light':
                this.goto('light', false);
                this.room.showLightHelper();
                break;
            case 'object':
                this.goto('object', false);
                break;
            case 'save':
                this.goto('save', false);
                break;
            case 'walls':
                this.goto('walls', false);
                break;
            case 'wallsDimensions':
                this.goto('wallsDimensions', false);
                break;
            case 'wallsHeight':
                this.goto('wallsHeight', false);
                break;
            case 'addWalls':
                this.createWallsAddPage();
                this.goto('addWalls', false);
                break;
            case 'removeWalls':
                this.createWallsRemovePage();
                this.goto('removeWalls', false);
                break;
            case 'windows':
                this.goto('windows', false);
                break;
            case 'addWindows':
                this.createWindowsAddPage();
                this.goto('addWindows', false);
                break;
            case 'removeWindows':
                this.createWindowsRemovePage();
                this.goto('removeWindows', false);
                break;
            case 'windowsDimensions':
                this.createWindowsDMPage();
                this.goto('windowsDimensions', false);
                break;
            case 'tuneWindowBack':
                this.goto('tuneWindowBack', false);
                break;
            case 'tuneWindowFront':
                this.goto('tuneWindowFront', false);
                break;
            case 'tuneWindowLeft':
                this.goto('tuneWindowLeft', false);
                break;
            case 'tuneWindowRight':
                this.goto('tuneWindowRight', false);
                break;
            case 'doors':
                this.goto('doors', false);
                break;
            case 'addDoors':
                this.createDoorsAddPage();
                this.goto('addDoors', false);
                break;
            case 'removeDoors':
                this.createDoorsRemovePage();
                this.goto('removeDoors', false);
                break;
            case 'doorsDimensions':
                this.createDoorsDMPage();
                this.goto('doorsDimensions', false);
                break;
            case 'tuneDoorBack':
                this.goto('tuneDoorBack', false);
                break;
            case 'tuneDoorFront':
                this.goto('tuneDoorFront', false);
                break;
            case 'tuneDoorLeft':
                this.goto('tuneDoorLeft', false);
                break;
            case 'tuneDoorRight':
                this.goto('tuneDoorRight', false);
                break;
            case 'addObject':
                this.createObjectAddPage();
                this.goto('addObject', false);
                break;
            case 'removeObject':
                this.createObjectRemovePage();
                this.goto('removeObject', false);
                break;
            case 'objectDimensions':
                this.createObjectDMPage();
                this.goto('objectDimensions', false);
                break;
            case 'textures':
                this.goto('textures', false);
                break;
            case 'addTexture':
                this.createTextureAddPage();
                this.goto('texturesAdd', false);
                break;
            case 'removeTexture':
                this.createTextureRemovePage();
                this.goto('texturesRemove', false);
                break;
            case 'back':
                this.room.hideHelpers();
                this.goBack();
                break;
            // functions
            case 'increaseLength':
                this.room.updateWallLength(100);
                break;
            case 'decreaseLength':
                this.room.updateWallLength(-100);
                break;
            case 'increaseWidth':
                this.room.updateWallWidth(100);
                break;
            case 'decreaseWidth':
                this.room.updateWallWidth(-100);
                break;
            case 'increaseHeight':
                this.room.updateWallHeight(100);
                break;
            case 'decreaseHeight':
                this.room.updateWallHeight(-100);
                break;
            case 'increaseLightX':
                this.room.updateLightX(10);
                break;
            case 'decreaseLightX':
                this.room.updateLightX(-10);
                break;
            case 'increaseLightY':
                this.room.updateLightY(10);
                break;
            case 'decreaseLightY':
                this.room.updateLightY(-10);
                break;
            case 'increaseLightZ':
                this.room.updateLightZ(10);
                break;
            case 'decreaseLightZ':
                this.room.updateLightZ(-10);
                break;
            case 'increaseLightIntensity':
                this.room.updateLightIntensity(0.5);
                break;
            case 'decreaseLightIntensity':
                this.room.updateLightIntensity(-0.5);
                break;
            case 'increaseWallHeight':
                this.room.updateWallHeight(100);
                break;
            case 'decreaseWallHeight':
                this.room.updateWallHeight(-100);
                break;
            case 'removeWallFront':
                this.room.removeWall('front');
                this.pages.removeWalls.children[0].style = 'cursor: not-allowed; background-color: #cecece;';
                this.pages.removeWalls.children[0].removeAttribute('data-action');
                break;
            case 'removeWallLeft':
                this.room.removeWall('left');
                this.pages.removeWalls.children[1].style = 'cursor: not-allowed; background-color: #cecece;';
                this.pages.removeWalls.children[1].removeAttribute('data-action');
                break;
            case 'removeWallBack':
                this.room.removeWall('back');
                this.pages.removeWalls.children[2].style = 'cursor: not-allowed; background-color: #cecece;';
                this.pages.removeWalls.children[2].removeAttribute('data-action');
                break;
            case 'removeWallRight':
                this.room.removeWall('right');
                this.pages.removeWalls.children[3].style = 'cursor: not-allowed; background-color: #cecece;';
                this.pages.removeWalls.children[3].removeAttribute('data-action');
                break;
            case 'increaseWindowWidthBack':
                this.room.updateWindowWidth('back', 50);
                break;
            case 'decreaseWindowWidthBack':
                this.room.updateWindowWidth('back', -50);
                break;
            case 'increaseWindowWidthLeft':
                this.room.updateWindowWidth('left', 50);
                break;
            case 'decreaseWindowWidthLeft':
                this.room.updateWindowWidth('left', -50);
                break;
            case 'increaseWindowWidthRight':
                this.room.updateWindowWidth('right', 50);
                break;
            case 'decreaseWindowWidthRight':
                this.room.updateWindowWidth('right', -50);
                break;
            case 'increaseWindowWidthFront':
                this.room.updateWindowWidth('front', 50);
                break;
            case 'decreaseWindowWidthFront':
                this.room.updateWindowWidth('front', -50);
                break;

            case 'increaseWindowHeightBack':
                this.room.updateWindowHeight('back', 50);
                break;
            case 'decreaseWindowHeightBack':
                this.room.updateWindowHeight('back', -50);
                break;
            case 'increaseWindowHeightLeft':
                this.room.updateWindowHeight('left', 50);
                break;
            case 'decreaseWindowHeightLeft':
                this.room.updateWindowHeight('left', -50);
                break;
            case 'increaseWindowHeightRight':
                this.room.updateWindowHeight('right', 50);
                break;
            case 'decreaseWindowHeightRight':
                this.room.updateWindowHeight('right', -50);
                break;
            case 'increaseWindowHeightFront':
                this.room.updateWindowHeight('front', 50);
                break;
            case 'decreaseWindowHeightFront':
                this.room.updateWindowHeight('front', -50);
                break;

            case 'increaseWindowYFront':
                this.room.updateWindowOffsetY('front', 50);
                break;
            case 'decreaseWindowYFront':
                this.room.updateWindowOffsetY('front', -50);
                break;
            case 'increaseWindowYBack':
                this.room.updateWindowOffsetY('back', 50);
                break;
            case 'decreaseWindowYBack':
                this.room.updateWindowOffsetY('back', -50);
                break;
            case 'increaseWindowYLeft':
                this.room.updateWindowOffsetY('left', 50);
                break;
            case 'decreaseWindowYLeft':
                this.room.updateWindowOffsetY('left', -50);
                break;
            case 'increaseWindowYRight':
                this.room.updateWindowOffsetY('right', 50);
                break;
            case 'decreaseWindowYRight':
                this.room.updateWindowOffsetY('right', -50);
                break;

            case 'increaseDoorWidthBack':
                this.room.updateDoorWidth('back', 50);
                break;
            case 'decreaseDoorWidthBack':
                this.room.updateDoorWidth('back', -50);
                break;
            case 'increaseDoorWidthLeft':
                this.room.updateDoorWidth('left', 50);
                break;
            case 'decreaseDoorWidthLeft':
                this.room.updateDoorWidth('left', -50);
                break;
            case 'increaseDoorWidthRight':
                this.room.updateDoorWidth('right', 50);
                break;
            case 'decreaseDoorWidthRight':
                this.room.updateDoorWidth('right', -50);
                break;
            case 'increaseDoorWidthFront':
                this.room.updateDoorWidth('front', 50);
                break;
            case 'decreaseDoorWidthFront':
                this.room.updateDoorWidth('front', -50);
                break;

            case 'increaseDoorHeightBack':
                this.room.updateDoorHeight('back', 50);
                break;
            case 'decreaseDoorHeightBack':
                this.room.updateDoorHeight('back', -50);
                break;
            case 'increaseDoorHeightLeft':
                this.room.updateDoorHeight('left', 50);
                break;
            case 'decreaseDoorHeightLeft':
                this.room.updateDoorHeight('left', -50);
                break;
            case 'increaseDoorHeightRight':
                this.room.updateDoorHeight('right', 50);
                break;
            case 'decreaseDoorHeightRight':
                this.room.updateDoorHeight('right', -50);
                break;
            case 'increaseDoorHeightFront':
                this.room.updateDoorHeight('front', 50);
                break;
            case 'decreaseDoorHeightFront':
                this.room.updateDoorHeight('front', -50);
                break;

            case 'increaseDoorXFront':
                this.room.updateDoorOffsetX('front', -50);
                break;
            case 'decreaseDoorXFront':
                this.room.updateDoorOffsetX('front', 50);
                break;
            case 'increaseDoorXBack':
                this.room.updateDoorOffsetX('back', -50);
                break;
            case 'decreaseDoorXBack':
                this.room.updateDoorOffsetX('back', 50);
                break;
            case 'increaseDoorXLeft':
                this.room.updateDoorOffsetX('left', -50);
                break;
            case 'decreaseDoorXLeft':
                this.room.updateDoorOffsetX('left', 50);
                break;
            case 'increaseDoorXRight':
                this.room.updateDoorOffsetX('right', -50);
                break;
            case 'decreaseDoorXRight':
                this.room.updateDoorOffsetX('right', 50);
                break;
            default:
                console.warn(`Невідома дія: ${action}`);
        }
    }

    goto(pageName, back) {
        Object.values(this.pages).forEach(page => {
            if (page) page.style.display = 'none';
        });

        if (this.pages[pageName]) {
            this.pages[pageName].style.display = 'flex';
            if (!back) this.previousPage.push(this.currentPage);
            this.currentPage = pageName;
        }

    }

    goBack() {
        if (this.previousPage.length === 0) return;
        const prevPage = this.previousPage.pop();
        this.goto(prevPage, true);
    }

    createWallsAddPage() {
        const initialWallsState = JSON.parse(JSON.stringify(this.room.presentedWalls));
    
        const presentedWalls = Object.entries(this.room.presentedWalls)
            .filter(([_, wall]) => wall.presented)
            .map(([name]) => ({ name: name }));
    
        this.pages.addWalls.innerHTML = '';
        this.pages.addWalls.innerHTML += `
            <div class="controls__room__walls__add__item controls__item__inner" ${presentedWalls.some(wall => wall.name === "front") ? 'style="cursor: not-allowed; background-color: #cecece;"' : 'data-action="addWallFront"'}  tabindex="1">
                <img src="src/img/wall.svg" alt="Room">
                <span>Стіна 1</span>
            </div>
            <div class="controls__room__walls__add__item controls__item__inner" ${presentedWalls.some(wall => wall.name === "left") ? 'style="cursor: not-allowed; background-color: #cecece;"' : 'data-action="addWallLeft"'} tabindex="2">
                <img src="src/img/wall.svg" alt="Room">
                <span>Стіна 2</span>
            </div>
            <div class="controls__room__walls__add__item controls__item__inner" ${presentedWalls.some(wall => wall.name === "back") ? 'style="cursor: not-allowed; background-color: #cecece;"' : 'data-action="addWallBack"'} tabindex="3">
                <img src="src/img/wall.svg" alt="Room">
                <span>Стіна 3</span>
            </div>
            <div class="controls__room__walls__add__item controls__item__inner" ${presentedWalls.some(wall => wall.name === "right") ? 'style="cursor: not-allowed; background-color: #cecece;"' : 'data-action="addWallRight"'} tabindex="4">
                <img src="src/img/wall.svg" alt="Room">
                <span>Стіна 4</span>
            </div>
            <div class="controls__room__walls__add__item controls__item__inner" data-action="back" tabindex="5">
                <img src="src/img/return.svg" alt="Return" style="width: 70px;">
                <span>Назад</span>
            </div>
        `;
    
        document.querySelectorAll('.controls__room__walls__add__item').forEach((item, index) => {
            item.addEventListener('mouseenter', () => {
                const presentedWalls = Object.entries(this.room.presentedWalls)
                    .filter(([_, wall]) => wall.presented)
                    .map(([name]) => ({ name: name }));

                Object.entries(this.room.presentedWalls).forEach(([_, wall]) => {
                    wall.isEditing = false;
                });
    
                switch (index) {
                    case 0:
                        if (!presentedWalls.some(wall => wall.name === "front")) {
                            this.room.presentedWalls.front.isEditing = true;
                            this.room.presentedWalls.front.presented = true;
                        }
                        break;
                    case 1:
                        if (!presentedWalls.some(wall => wall.name === "left")) {
                            this.room.presentedWalls.left.isEditing = true;
                            this.room.presentedWalls.left.presented = true;
                        }
                        break;
                    case 2:
                        if (!presentedWalls.some(wall => wall.name === "back")) {
                            this.room.presentedWalls.back.isEditing = true;
                            this.room.presentedWalls.back.presented = true;
                        }
                        break;
                    case 3:
                        if (!presentedWalls.some(wall => wall.name === "right")) {
                            this.room.presentedWalls.right.isEditing = true;
                            this.room.presentedWalls.right.presented = true;
                        }
                        break;
                }
                this.room.createWalls();
            });
    
            item.addEventListener('mouseleave', () => {
                const presentedWalls = Object.entries(this.room.presentedWalls)
                    .filter(([_, wall]) => wall.presented)
                    .map(([name]) => ({ name: name }));
    
                switch (index) {
                    case 0:
                        if (!initialWallsState.front.presented) {
                            this.room.presentedWalls.front.isEditing = false;
                            this.room.presentedWalls.front.presented = false;
                        }
                        break;
                    case 1:
                        if (!initialWallsState.left.presented) {
                            this.room.presentedWalls.left.isEditing = false;
                            this.room.presentedWalls.left.presented = false;
                        }
                        break;
                    case 2:
                        if (!initialWallsState.back.presented) {
                            this.room.presentedWalls.back.isEditing = false;
                            this.room.presentedWalls.back.presented = false;
                        }
                        break;
                    case 3:
                        if (!initialWallsState.right.presented) {
                            this.room.presentedWalls.right.isEditing = false;
                            this.room.presentedWalls.right.presented = false;
                        }
                        break;
                }
                this.room.createWalls();
            });
    
            item.addEventListener('click', () => {
                const action = item.getAttribute('data-action');
                if (action && action.startsWith('addWall')) {
                    const wallName = action.slice(7).toLowerCase();
                    this.room.presentedWalls[wallName].presented = true;
                    this.room.createWalls();
                    this.createWallsAddPage();
                }
            });
        });
    }

    createWallsRemovePage() {
        let presentedWalls = Object.entries(this.room.presentedWalls)
            .filter(([_, wall]) => !wall.presented)
            .map(([name]) => ({ name: name}));

            this.pages.removeWalls.innerHTML = '';

            this.pages.removeWalls.innerHTML += `<div class="controls__room__walls__remove__item controls__item__inner" ${presentedWalls.some(wall => wall.name === "front") ? 'style="cursor: not-allowed; background-color: #cecece;"' : 'data-action="removeWallFront"'} tabindex="1">`
            + '<img src="src/img/wall.svg" alt="Room">'
            + '<span>Стіна 1</span>'
            + '</div>'

            + `<div class="controls__room__walls__remove__item controls__item__inner" ${presentedWalls.some(wall => wall.name === "left") ? 'style="cursor: not-allowed; background-color: #cecece;"' : 'data-action="removeWallLeft"'} tabindex="2">`
            + '<img src="src/img/wall.svg" alt="Room">'
            + '<span>Стіна 2</span>'
            + '</div>'

            + `<div class="controls__room__walls__remove__item controls__item__inner" ${presentedWalls.some(wall => wall.name === "back") ? 'style="cursor: not-allowed; background-color: #cecece;"' : 'data-action="removeWallBack"'} tabindex="3">`
            + '<img src="src/img/wall.svg" alt="Room">'
            + '<span>Стіна 3</span>'
            + '</div>'

            + `<div class="controls__room__walls__remove__item controls__item__inner" ${presentedWalls.some(wall => wall.name === "right") ? 'style="cursor: not-allowed; background-color: #cecece;"' : 'data-action="removeWallRight"'} tabindex="4">`
            + '<img src="src/img/wall.svg" alt="Room">'
            + '<span>Стіна 4</span>'
            + '</div>'

            + '<div class="controls__room__walls__remove__item controls__item__inner" data-action="back" tabindex="5">'
            + '<img src="src/img/return.svg" alt="Return" style="width: 70px;">'
            + '<span>Назад</span>'
            + '</div>';

            document.querySelectorAll('.controls__room__walls__remove__item').forEach((item, index) => {
                item.addEventListener('mouseenter', () => {
                    switch(index) {
                        case 0:
                            this.room.presentedWalls.front.isEditing = true;
                            break;
                        case 1:
                            this.room.presentedWalls.left.isEditing = true;
                            break;
                        case 2:
                            this.room.presentedWalls.back.isEditing = true;
                            break;
                        case 3:
                            this.room.presentedWalls.right.isEditing = true;
                            break;
                    }
                    
                    this.room.createWalls();
                });
            });

            document.querySelectorAll('.controls__room__walls__remove__item').forEach((item, index) => {
                item.addEventListener('mouseleave', () => {
                    switch(index) {
                        case 0:
                            this.room.presentedWalls.front.isEditing = false;
                            break;
                        case 1:
                            this.room.presentedWalls.left.isEditing = false;
                            break;
                        case 2:
                            this.room.presentedWalls.back.isEditing = false;
                            break;
                        case 3:
                            this.room.presentedWalls.right.isEditing = false;
                            break;
                    }
                    
                    this.room.createWalls();
                });
            });
    }

    createWindowsAddPage() {
        const initialWallsState = JSON.parse(JSON.stringify(this.room.presentedWalls));
    
        this.pages.addWindows.innerHTML = '';
        this.pages.addWindows.innerHTML += `
            <div class="controls__room__windows__add__item controls__item__inner" 
                ${this.room.presentedWalls.front.presented && !this.room.presentedWalls.front.hasWindow && !this.room.presentedWalls.front.hasDoor ? 
                    'data-action="addWindowFront"' : 
                    'style="cursor: not-allowed; background-color: #cecece;"'} tabindex="1">
                <img src="src/img/window.svg" alt="Window">
                <span>Вікно 1</span>
            </div>
            <div class="controls__room__windows__add__item controls__item__inner" 
                ${this.room.presentedWalls.left.presented && !this.room.presentedWalls.left.hasWindow && !this.room.presentedWalls.left.hasDoor ? 
                    'data-action="addWindowLeft"' : 
                    'style="cursor: not-allowed; background-color: #cecece;"'} tabindex="2">
                <img src="src/img/window.svg" alt="Window">
                <span>Вікно 2</span>
            </div>
            <div class="controls__room__windows__add__item controls__item__inner" 
                ${this.room.presentedWalls.back.presented && !this.room.presentedWalls.back.hasWindow && !this.room.presentedWalls.back.hasDoor ? 
                    'data-action="addWindowBack"' : 
                    'style="cursor: not-allowed; background-color: #cecece;"'} tabindex="3">
                <img src="src/img/window.svg" alt="Room">
                <span>Вікно 3</span>
            </div>
            <div class="controls__room__windows__add__item controls__item__inner" 
                ${this.room.presentedWalls.right.presented && !this.room.presentedWalls.right.hasWindow && !this.room.presentedWalls.right.hasDoor ? 
                    'data-action="addWindowRight"' : 
                    'style="cursor: not-allowed; background-color: #cecece;"'} tabindex="4">
                <img src="src/img/window.svg" alt="Window">
                <span>Вікно 4</span>
            </div>
            <div class="controls__room__windows__add__item controls__item__inner" data-action="back" tabindex="5">
                <img src="src/img/return.svg" alt="Return" style="width: 70px;">
                <span>Назад</span>
            </div>
        `;
    
        document.querySelectorAll('.controls__room__windows__add__item').forEach((item, index) => {
            item.addEventListener('mouseenter', () => {
                if (item.style.cursor !== 'not-allowed') {
                    Object.entries(this.room.presentedWalls).forEach(([_, wall]) => {
                        wall.isEditing = false;
                    });
    
                    switch (index) {
                        case 0:
                            if (this.room.presentedWalls.front.presented && !this.room.presentedWalls.front.hasWindow) {
                                this.room.presentedWalls.front.isEditing = true;
                                this.room.presentedWalls.front.hasWindow = true;
                            }
                            break;
                        case 1:
                            if (this.room.presentedWalls.left.presented && !this.room.presentedWalls.left.hasWindow) {
                                this.room.presentedWalls.left.isEditing = true;
                                this.room.presentedWalls.left.hasWindow = true;
                            }
                            break;
                        case 2:
                            if (this.room.presentedWalls.back.presented && !this.room.presentedWalls.back.hasWindow) {
                                this.room.presentedWalls.back.isEditing = true;
                                this.room.presentedWalls.back.hasWindow = true;
                            }
                            break;
                        case 3:
                            if (this.room.presentedWalls.right.presented && !this.room.presentedWalls.right.hasWindow) {
                                this.room.presentedWalls.right.isEditing = true;
                                this.room.presentedWalls.right.hasWindow = true;
                            }
                            break;
                    }
                    this.room.createWalls();
                }
            });
    
            item.addEventListener('mouseleave', () => {
                if (item.style.cursor !== 'not-allowed') {
                    switch (index) {
                        case 0:
                            if (!initialWallsState.front.hasWindow) {
                                this.room.presentedWalls.front.isEditing = false;
                                this.room.presentedWalls.front.hasWindow = false;
                            }
                            break;
                        case 1:
                            if (!initialWallsState.left.hasWindow) {
                                this.room.presentedWalls.left.isEditing = false;
                                this.room.presentedWalls.left.hasWindow = false;
                            }
                            break;
                        case 2:
                            if (!initialWallsState.back.hasWindow) {
                                this.room.presentedWalls.back.isEditing = false;
                                this.room.presentedWalls.back.hasWindow = false;
                            }
                            break;
                        case 3:
                            if (!initialWallsState.right.hasWindow) {
                                this.room.presentedWalls.right.isEditing = false;
                                this.room.presentedWalls.right.hasWindow = false;
                            }
                            break;
                    }
                    this.room.createWalls();
                }
            });
    
            item.addEventListener('click', () => {
                const action = item.getAttribute('data-action');
                if (action && action.startsWith('addWindow')) {
                    const wallName = action.slice(9).toLowerCase();
                    this.room.presentedWalls[wallName].hasWindow = true;
                    this.room.presentedWalls[wallName].isEditing = false;
                    this.room.createWalls();
                    this.createWindowsAddPage();
                }
            });
        });
    }

    createWindowsRemovePage() {
        this.pages.removeWindows.innerHTML = '';
    
        this.pages.removeWindows.innerHTML += `
            <div class="controls__room__walls__remove__item controls__item__inner" 
                ${this.room.presentedWalls.front.presented && this.room.presentedWalls.front.hasWindow ? 
                    'data-action="removeWindowFront"' : 
                    'style="cursor: not-allowed; background-color: #cecece;"'} tabindex="1">
                <img src="src/img/window.svg" alt="Window">
                <span>Вікно 1</span>
            </div>
            <div class="controls__room__walls__remove__item controls__item__inner" 
                ${this.room.presentedWalls.left.presented && this.room.presentedWalls.left.hasWindow ? 
                    'data-action="removeWindowLeft"' : 
                    'style="cursor: not-allowed; background-color: #cecece;"'} tabindex="2">
                <img src="src/img/window.svg" alt="Window">
                <span>Вікно 2</span>
            </div>
            <div class="controls__room__walls__remove__item controls__item__inner" 
                ${this.room.presentedWalls.back.presented && this.room.presentedWalls.back.hasWindow ? 
                    'data-action="removeWindowBack"' : 
                    'style="cursor: not-allowed; background-color: #cecece;"'} tabindex="3">
                <img src="src/img/window.svg" alt="Window">
                <span>Вікно 3</span>
            </div>
            <div class="controls__room__walls__remove__item controls__item__inner" 
                ${this.room.presentedWalls.right.presented && this.room.presentedWalls.right.hasWindow ? 
                    'data-action="removeWindowRight"' : 
                    'style="cursor: not-allowed; background-color: #cecece;"'} tabindex="4">
                <img src="src/img/window.svg" alt="Window">
                <span>Вікно 4</span>
            </div>
            <div class="controls__room__walls__remove__item controls__item__inner" data-action="back" tabindex="5">
                <img src="src/img/return.svg" alt="Return" style="width: 70px;">
                <span>Назад</span>
            </div>
        `;
    
        document.querySelectorAll('.controls__room__walls__remove__item').forEach((item, index) => {
            item.addEventListener('mouseenter', () => {
                if (item.style.cursor !== 'not-allowed') {
                    Object.entries(this.room.presentedWalls).forEach(([_, wall]) => {
                        wall.isEditing = false;
                    });
    
                    switch (index) {
                        case 0:
                            if (this.room.presentedWalls.front.presented && this.room.presentedWalls.front.hasWindow) {
                                this.room.presentedWalls.front.isEditing = true;
                            }
                            break;
                        case 1:
                            if (this.room.presentedWalls.left.presented && this.room.presentedWalls.left.hasWindow) {
                                this.room.presentedWalls.left.isEditing = true;
                            }
                            break;
                        case 2:
                            if (this.room.presentedWalls.back.presented && this.room.presentedWalls.back.hasWindow) {
                                this.room.presentedWalls.back.isEditing = true;
                            }
                            break;
                        case 3:
                            if (this.room.presentedWalls.right.presented && this.room.presentedWalls.right.hasWindow) {
                                this.room.presentedWalls.right.isEditing = true;
                            }
                            break;
                    }
                    this.room.createWalls();
                }
            });
    
            item.addEventListener('mouseleave', () => {
                if (item.style.cursor !== 'not-allowed') {
                    switch (index) {
                        case 0:
                            this.room.presentedWalls.front.isEditing = false;
                            break;
                        case 1:
                            this.room.presentedWalls.left.isEditing = false;
                            break;
                        case 2:
                            this.room.presentedWalls.back.isEditing = false;
                            break;
                        case 3:
                            this.room.presentedWalls.right.isEditing = false;
                            break;
                    }
                    this.room.createWalls();
                }
            });
    
            item.addEventListener('click', () => {
                const action = item.getAttribute('data-action');
                if (action && action.startsWith('removeWindow')) {
                    const wallName = action.slice(12).toLowerCase();
                    this.room.presentedWalls[wallName].hasWindow = false;
                    this.room.presentedWalls[wallName].isEditing = false;
                    this.room.createWalls();
                    this.createWindowsRemovePage();
                }
            });
        });
    }

    createWindowsDMPage() {
        this.pages.windowsDimensions.innerHTML = '';
    
        this.pages.windowsDimensions.innerHTML += `
            <div class="controls__room__windows__dm__item controls__item__inner" 
                ${this.room.presentedWalls.front.presented && this.room.presentedWalls.front.hasWindow ? 
                    'data-action="tuneWindowFront"' : 
                    'style="cursor: not-allowed; background-color: #cecece;"'} tabindex="1">
                <img src="src/img/window.svg" alt="Window">
                <span>Вікно 1</span>
            </div>
            <div class="controls__room__windows__dm__item controls__item__inner" 
                ${this.room.presentedWalls.left.presented && this.room.presentedWalls.left.hasWindow ? 
                    'data-action="tuneWindowLeft"' : 
                    'style="cursor: not-allowed; background-color: #cecece;"'} tabindex="2">
                <img src="src/img/window.svg" alt="Window">
                <span>Вікно 2</span>
            </div>
            <div class="controls__room__windows__dm__item controls__item__inner" 
                ${this.room.presentedWalls.back.presented && this.room.presentedWalls.back.hasWindow ? 
                    'data-action="tuneWindowBack"' : 
                    'style="cursor: not-allowed; background-color: #cecece;"'} tabindex="3">
                <img src="src/img/window.svg" alt="Window">
                <span>Вікно 3</span>
            </div>
            <div class="controls__room__windows__dm__item controls__item__inner" 
                ${this.room.presentedWalls.right.presented && this.room.presentedWalls.right.hasWindow ? 
                    'data-action="tuneWindowRight"' : 
                    'style="cursor: not-allowed; background-color: #cecece;"'} tabindex="4">
                <img src="src/img/window.svg" alt="Window">
                <span>Вікно 4</span>
            </div>
            <div class="controls__room__windows__dm__item controls__item__inner" data-action="back" tabindex="5">
                <img src="src/img/return.svg" alt="Return" style="width: 70px;">
                <span>Назад</span>
            </div>
        `;
    
        document.querySelectorAll('.controls__room__windows__dm__item').forEach((item, index) => {
            item.addEventListener('mouseenter', () => {
                if (item.style.cursor !== 'not-allowed') {
                    Object.entries(this.room.presentedWalls).forEach(([_, wall]) => {
                        wall.isEditing = false;
                    });
    
                    switch (index) {
                        case 0:      
                            this.room.presentedWalls.front.isEditing = true;
                            break;
                        case 1:
                            this.room.presentedWalls.left.isEditing = true;
                            break;
                        case 2:
                            this.room.presentedWalls.back.isEditing = true;
                            break;
                        case 3:
                            this.room.presentedWalls.right.isEditing = true;
                            break;
                    }
                    this.room.createWalls();
                }
            });
    
            item.addEventListener('mouseleave', () => {
                if (item.style.cursor !== 'not-allowed') {
                    switch (index) {
                        case 0:
                            this.room.presentedWalls.front.isEditing = false;
                            break;
                        case 1:
                            this.room.presentedWalls.left.isEditing = false;
                            break;
                        case 2:
                            this.room.presentedWalls.back.isEditing = false;
                            break;
                        case 3:
                            this.room.presentedWalls.right.isEditing = false;
                            break;
                    }
                    this.room.createWalls();
                }
            });
        });
    }

    createDoorsAddPage() {
        const initialWallsState = JSON.parse(JSON.stringify(this.room.presentedWalls));
    
        this.pages.addDoors.innerHTML = '';
        this.pages.addDoors.innerHTML += `
            <div class="controls__room__doors__add__item controls__item__inner" 
                ${this.room.presentedWalls.front.presented && !this.room.presentedWalls.front.hasDoor && !this.room.presentedWalls.front.hasWindow ? 
                    'data-action="addDoorFront"' : 
                    'style="cursor: not-allowed; background-color: #cecece;"'} tabindex="1">
                <img src="src/img/door.svg" alt="Door">
                <span>Двері 1</span>
            </div>
            <div class="controls__room__doors__add__item controls__item__inner" 
                ${this.room.presentedWalls.left.presented && !this.room.presentedWalls.left.hasDoor && !this.room.presentedWalls.left.hasWindow ? 
                    'data-action="addDoorLeft"' : 
                    'style="cursor: not-allowed; background-color: #cecece;"'} tabindex="2">
                <img src="src/img/door.svg" alt="Door">
                <span>Двері 2</span>
            </div>
            <div class="controls__room__doors__add__item controls__item__inner" 
                ${this.room.presentedWalls.back.presented && !this.room.presentedWalls.back.hasDoor && !this.room.presentedWalls.back.hasWindow ? 
                    'data-action="addDoorBack"' : 
                    'style="cursor: not-allowed; background-color: #cecece;"'} tabindex="3">
                <img src="src/img/door.svg" alt="Door">
                <span>Двері 3</span>
            </div>
            <div class="controls__room__doors__add__item controls__item__inner" 
                ${this.room.presentedWalls.right.presented && !this.room.presentedWalls.right.hasDoor && !this.room.presentedWalls.right.hasWindow ? 
                    'data-action="addDoorRight"' : 
                    'style="cursor: not-allowed; background-color: #cecece;"'} tabindex="4">
                <img src="src/img/door.svg" alt="Door">
                <span>Двері 4</span>
            </div>
            <div class="controls__room__doors__add__item controls__item__inner" data-action="back" tabindex="5">
                <img src="src/img/return.svg" alt="Return" style="width: 70px;">
                <span>Назад</span>
            </div>
        `;
    
        document.querySelectorAll('.controls__room__doors__add__item').forEach((item, index) => {
            item.addEventListener('mouseenter', () => {
                if (item.style.cursor !== 'not-allowed') {
                    Object.entries(this.room.presentedWalls).forEach(([_, wall]) => {
                        wall.isEditing = false;
                    });
    
                    switch (index) {
                        case 0:
                            if (this.room.presentedWalls.front.presented && !this.room.presentedWalls.front.hasDoor) {
                                this.room.presentedWalls.front.isEditing = true;
                                this.room.presentedWalls.front.hasDoor = true;
                            }
                            break;
                        case 1:
                            if (this.room.presentedWalls.left.presented && !this.room.presentedWalls.left.hasDoor) {
                                this.room.presentedWalls.left.isEditing = true;
                                this.room.presentedWalls.left.hasDoor = true;
                            }
                            break;
                        case 2:
                            if (this.room.presentedWalls.back.presented && !this.room.presentedWalls.back.hasDoor) {
                                this.room.presentedWalls.back.isEditing = true;
                                this.room.presentedWalls.back.hasDoor = true;
                            }
                            break;
                        case 3:
                            if (this.room.presentedWalls.right.presented && !this.room.presentedWalls.right.hasDoor) {
                                this.room.presentedWalls.right.isEditing = true;
                                this.room.presentedWalls.right.hasDoor = true;
                            }
                            break;
                    }
                    this.room.createWalls();
                }
            });
    
            item.addEventListener('mouseleave', () => {
                if (item.style.cursor !== 'not-allowed') {
                    switch (index) {
                        case 0:
                            if (!initialWallsState.front.hasDoor) {
                                this.room.presentedWalls.front.isEditing = false;
                                this.room.presentedWalls.front.hasDoor = false;
                            }
                            break;
                        case 1:
                            if (!initialWallsState.left.hasDoor) {
                                this.room.presentedWalls.left.isEditing = false;
                                this.room.presentedWalls.left.hasDoor = false;
                            }
                            break;
                        case 2:
                            if (!initialWallsState.back.hasDoor) {
                                this.room.presentedWalls.back.isEditing = false;
                                this.room.presentedWalls.back.hasDoor = false;
                            }
                            break;
                        case 3:
                            if (!initialWallsState.right.hasDoor) {
                                this.room.presentedWalls.right.isEditing = false;
                                this.room.presentedWalls.right.hasDoor = false;
                            }
                            break;
                    }
                    this.room.createWalls();
                }
            });
    
            item.addEventListener('click', () => {
                const action = item.getAttribute('data-action');
                if (action && action.startsWith('addDoor')) {
                    const wallName = action.slice(7).toLowerCase();
                    this.room.presentedWalls[wallName].hasDoor = true;
                    this.room.presentedWalls[wallName].isEditing = false;
                    this.room.createWalls();
                    this.createDoorsAddPage();
                }
            });
        });
    }

    createDoorsRemovePage() {
        this.pages.removeDoors.innerHTML = '';
    
        this.pages.removeDoors.innerHTML += `
            <div class="controls__room__doors__remove__item controls__item__inner" 
                ${this.room.presentedWalls.front.presented && this.room.presentedWalls.front.hasDoor ? 
                    'data-action="removeDoorFront"' : 
                    'style="cursor: not-allowed; background-color: #cecece;"'} tabindex="1">
                <img src="src/img/door.svg" alt="Door">
                <span>Двері 1</span>
            </div>
            <div class="controls__room__doors__remove__item controls__item__inner" 
                ${this.room.presentedWalls.left.presented && this.room.presentedWalls.left.hasDoor ? 
                    'data-action="removeDoorLeft"' : 
                    'style="cursor: not-allowed; background-color: #cecece;"'} tabindex="2">
                <img src="src/img/door.svg" alt="Door">
                <span>Двері 2</span>
            </div>
            <div class="controls__room__doors__remove__item controls__item__inner" 
                ${this.room.presentedWalls.back.presented && this.room.presentedWalls.back.hasDoor ? 
                    'data-action="removeDoorBack"' : 
                    'style="cursor: not-allowed; background-color: #cecece;"'} tabindex="3">
                <img src="src/img/door.svg" alt="Door">
                <span>Двері 3</span>
            </div>
            <div class="controls__room__doors__remove__item controls__item__inner" 
                ${this.room.presentedWalls.right.presented && this.room.presentedWalls.right.hasDoor ? 
                    'data-action="removeDoorRight"' : 
                    'style="cursor: not-allowed; background-color: #cecece;"'} tabindex="4">
                <img src="src/img/door.svg" alt="Door">
                <span>Двері 4</span>
            </div>
            <div class="controls__room__doors__remove__item controls__item__inner" data-action="back" tabindex="5">
                <img src="src/img/return.svg" alt="Return" style="width: 70px;">
                <span>Назад</span>
            </div>
        `;
    
        document.querySelectorAll('.controls__room__doors__remove__item').forEach((item, index) => {
            item.addEventListener('mouseenter', () => {
                if (item.style.cursor !== 'not-allowed') {
                    Object.entries(this.room.presentedWalls).forEach(([_, wall]) => {
                        wall.isEditing = false;
                    });
    
                    switch (index) {
                        case 0:
                            if (this.room.presentedWalls.front.presented && this.room.presentedWalls.front.hasDoor) {
                                this.room.presentedWalls.front.isEditing = true;
                            }
                            break;
                        case 1:
                            if (this.room.presentedWalls.left.presented && this.room.presentedWalls.left.hasDoor) {
                                this.room.presentedWalls.left.isEditing = true;
                            }
                            break;
                        case 2:
                            if (this.room.presentedWalls.back.presented && this.room.presentedWalls.back.hasDoor) {
                                this.room.presentedWalls.back.isEditing = true;
                            }
                            break;
                        case 3:
                            if (this.room.presentedWalls.right.presented && this.room.presentedWalls.right.hasDoor) {
                                this.room.presentedWalls.right.isEditing = true;
                            }
                            break;
                    }
                    this.room.createWalls();
                }
            });
    
            item.addEventListener('mouseleave', () => {
                if (item.style.cursor !== 'not-allowed') {
                    switch (index) {
                        case 0:
                            this.room.presentedWalls.front.isEditing = false;
                            break;
                        case 1:
                            this.room.presentedWalls.left.isEditing = false;
                            break;
                        case 2:
                            this.room.presentedWalls.back.isEditing = false;
                            break;
                        case 3:
                            this.room.presentedWalls.right.isEditing = false;
                            break;
                    }
                    this.room.createWalls();
                }
            });
    
            item.addEventListener('click', () => {
                const action = item.getAttribute('data-action');
                if (action && action.startsWith('removeDoor')) {
                    const wallName = action.slice(10).toLowerCase();
                    this.room.presentedWalls[wallName].hasDoor = false;
                    this.room.presentedWalls[wallName].isEditing = false;
                    this.room.createWalls();
                    this.createDoorsRemovePage();
                }
            });
        });
    }

    createDoorsDMPage() {
        this.pages.doorsDimensions.innerHTML = '';
    
        this.pages.doorsDimensions.innerHTML += `
            <div class="controls__room__doors__dm__item controls__item__inner" 
                ${this.room.presentedWalls.front.presented && this.room.presentedWalls.front.hasDoor ? 
                    'data-action="tuneDoorFront"' : 
                    'style="cursor: not-allowed; background-color: #cecece;"'} tabindex="1">
                <img src="src/img/door.svg" alt="Door">
                <span>Двері 1</span>
            </div>
            <div class="controls__room__doors__dm__item controls__item__inner" 
                ${this.room.presentedWalls.left.presented && this.room.presentedWalls.left.hasDoor ? 
                    'data-action="tuneDoorLeft"' : 
                    'style="cursor: not-allowed; background-color: #cecece;"'} tabindex="2">
                <img src="src/img/door.svg" alt="Door">
                <span>Двері 2</span>
            </div>
            <div class="controls__room__doors__dm__item controls__item__inner" 
                ${this.room.presentedWalls.back.presented && this.room.presentedWalls.back.hasDoor ? 
                    'data-action="tuneDoorBack"' : 
                    'style="cursor: not-allowed; background-color: #cecece;"'} tabindex="3">
                <img src="src/img/door.svg" alt="Door">
                <span>Двері 3</span>
            </div>
            <div class="controls__room__doors__dm__item controls__item__inner" 
                ${this.room.presentedWalls.right.presented && this.room.presentedWalls.right.hasDoor ? 
                    'data-action="tuneDoorRight"' : 
                    'style="cursor: not-allowed; background-color: #cecece;"'} tabindex="4">
                <img src="src/img/door.svg" alt="Door">
                <span>Двері 4</span>
            </div>
            <div class="controls__room__doors__dm__item controls__item__inner" data-action="back" tabindex="5">
                <img src="src/img/return.svg" alt="Return" style="width: 70px;">
                <span>Назад</span>
            </div>
        `;
    
        document.querySelectorAll('.controls__room__doors__dm__item').forEach((item, index) => {
            item.addEventListener('mouseenter', () => {
                if (item.style.cursor !== 'not-allowed') {
                    Object.entries(this.room.presentedWalls).forEach(([_, wall]) => {
                        wall.isEditing = false;
                    });
    
                    switch (index) {
                        case 0:      
                            this.room.presentedWalls.front.isEditing = true;
                            break;
                        case 1:
                            this.room.presentedWalls.left.isEditing = true;
                            break;
                        case 2:
                            this.room.presentedWalls.back.isEditing = true;
                            break;
                        case 3:
                            this.room.presentedWalls.right.isEditing = true;
                            break;
                    }
                    this.room.createWalls();
                }
            });
    
            item.addEventListener('mouseleave', () => {
                if (item.style.cursor !== 'not-allowed') {
                    switch (index) {
                        case 0:
                            this.room.presentedWalls.front.isEditing = false;
                            break;
                        case 1:
                            this.room.presentedWalls.left.isEditing = false;
                            break;
                        case 2:
                            this.room.presentedWalls.back.isEditing = false;
                            break;
                        case 3:
                            this.room.presentedWalls.right.isEditing = false;
                            break;
                    }
                    this.room.createWalls();
                }
            });
        });
    }

    createObjectAddPage() {
        this.pages.addObject.innerHTML = '';
        let tabIndex = 0;
        Object.entries(this.room.objects).forEach(([key, obj]) => {
            const isLoaded = obj.loadedObject !== null;
            tabIndex++;
            this.pages.addObject.innerHTML += `
                <div class="controls__object__add__item controls__item__inner" 
                    data-action="addObject${key}" 
                    ${isLoaded ? 'style="cursor: not-allowed; background-color: #cecece;"' : ''} tabindex="${tabIndex}">
                    <img src="src/img/object.svg" alt="Object">
                    <span>${obj.name}</span>
                </div>
            `;
        });
    
        this.pages.addObject.innerHTML += `
            <div class="controls__object__add__item controls__item__inner" data-action="back" tabindex="${++tabIndex}">
                <img src="src/img/return.svg" alt="Return" style="width: 70px;">
                <span>Назад</span>
            </div>
        `;
    
        document.querySelectorAll('.controls__object__add__item').forEach((item) => {
            item.replaceWith(item.cloneNode(true));
        });
    
        document.querySelectorAll('.controls__object__add__item').forEach((item) => {
            let objectKey = item.getAttribute('data-action');
    
            if (objectKey) {
                item.addEventListener('click', () => {
                    objectKey = objectKey.slice(9);
                    if (this.room.objects[objectKey].loadedObject === null) {
                        this.room.loadObject(objectKey);
                        setTimeout(() => this.createObjectAddPage(), 1000);
                    }
                });
            }
        });
    }
    
    createObjectRemovePage() {
        this.pages.removeObject.innerHTML = '';
        let tabIndex = 0;
        Object.entries(this.room.objects).forEach(([key, obj]) => {
            const isLoaded = obj.loadedObject !== null;
            tabIndex++;
            this.pages.removeObject.innerHTML += `
                <div class="controls__object__remove__item controls__item__inner" 
                    data-action="removeObject${key}" 
                    ${!isLoaded ? 'style="cursor: not-allowed; background-color: #cecece;"' : ''} tabindex="${tabIndex}">
                    <img src="src/img/object.svg" alt="Object">
                    <span>${obj.name}</span>
                </div>
            `;
        });
    
        this.pages.removeObject.innerHTML += `
            <div class="controls__object__remove__item controls__item__inner" data-action="back" tabindex="${++tabIndex}">
                <img src="src/img/return.svg" alt="Return" style="width: 70px;">
                <span>Назад</span>
            </div>
        `;
    
        document.querySelectorAll('.controls__object__remove__item').forEach((item) => {
            item.replaceWith(item.cloneNode(true));
        });
    
        document.querySelectorAll('.controls__object__remove__item').forEach((item) => {
            let objectKey = item.getAttribute('data-action');
    
            if (objectKey) {
                item.addEventListener('click', () => {
                    objectKey = objectKey.slice(12);
                    if (this.room.objects[objectKey].loadedObject !== null) {
                        this.room.removeObject(objectKey);
                        setTimeout(() => this.createObjectRemovePage(), 100); // Обновление страницы после удаления
                    }
                });
            }
        });
    }
    
    createObjectDMPage() {
        this.pages.objectDimensions.innerHTML = '';
        this.pages.objectDimensions.style.justifyContent = 'start';
        let tabIndex = 0;
        Object.entries(this.room.objects).forEach(([key, obj]) => {
            const isLoaded = obj.loadedObject !== null;
            tabIndex++;
            this.pages.objectDimensions.innerHTML += `
                <div class="controls__object__dm__item controls__item__inner" 
                    data-action="tuneObject${key}" 
                    ${!isLoaded ? 'style="cursor: not-allowed; background-color: #cecece;"' : ''} tabindex="${tabIndex}">
                    <img src="src/img/object.svg" alt="Object" style="width: 80px;">
                    <span>${obj.name}</span>
                </div>
            `;
        });
    
        this.pages.objectDimensions.innerHTML += `
            <div class="controls__object__dm__item controls__item__inner" data-action="back" tabindex="${++tabIndex}">
                <img src="src/img/return.svg" alt="Return" style="width: 70px;">
                <span>Назад</span>
            </div>
        `;
    
        document.querySelectorAll('.controls__object__dm__item').forEach((item) => {
            item.replaceWith(item.cloneNode(true));
        });
    
        document.querySelectorAll('.controls__object__dm__item').forEach((item) => {
            let objectKey = item.getAttribute('data-action');
    
            if (objectKey) {
                item.addEventListener('click', () => {
                    objectKey = objectKey.slice(10);
                    if (this.room.objects[objectKey].loadedObject !== null) {
                        this.createObjectTunePage(objectKey);
                    }
                });
            }
        });
    }

    createObjectTunePage(objectKey) {
        this.pages.objectDimensions.innerHTML = '';
        this.pages.objectDimensions.style.justifyContent = 'space-between';
        
            this.pages.objectDimensions.innerHTML += `
                <div></div>
            <div class="controls__object__dm__control control">
                <button class="controls__object__dm__control__item" data-action="decreaseObjectZ${objectKey}" style="position: absolute; transform: translate(0, -15px);" tabindex="1"><img src="/src/img/increaseLightY.svg" alt="object y increase"></button>
                <button class="controls__object__dm__control__item" data-action="increaseObjectX${objectKey}" style="position: absolute; transform: translate(65px, 10px);" tabindex="2"><img src="/src/img/increaseLightX.svg" alt="object x increase"></button>
                <button class="controls__object__dm__control__item" data-action="increaseObjectZ${objectKey}" style="position: absolute; transform: translate(0, 45px);" tabindex="3"><img src="/src/img/decreaseLightY.svg" alt="object y decrease"></button>
                <button class="controls__object__dm__control__item" data-action="decreaseObjectX${objectKey}" style="position: absolute; transform: translate(-55px, 10px);" tabindex="4"><img src="/src/img/decreaseLightX.svg" alt="object X decrease"></button>
            
                <button class="controls__object__dm__control__item" data-action="increaseObjectY${objectKey}" style="position: absolute; transform: translate(130px, -15px);" tabindex="5"><img src="/src/img/increaseLightY.svg" alt="object z decrease"></button>
                <button class="controls__object__dm__control__item" data-action="decreaseObjectY${objectKey}" style="position: absolute; transform: translate(130px, 45px);" tabindex="6"><img src="/src/img/decreaseLightY.svg" alt="object z increase"></button>

                <button class="controls__object__dm__control__item" data-action="increaseObjectScale${objectKey}" style="position: absolute; transform: translate(-130px, -15px);" tabindex="7"><img src="/src/img/increaseScale.svg" alt="object scale increase"></button>
                <button class="controls__object__dm__control__item" data-action="decreaseObjectScale${objectKey}" style="position: absolute; transform: translate(-130px, 45px);" tabindex="8"><img src="/src/img/decreaseScale.svg" alt="object scale decrease"></button>
            
                <button class="controls__object__dm__control__item" data-action="increaseObjectAngle${objectKey}" style="position: absolute; transform: translate(-210px, -15px);     width: 60px;
                    height: 50px;
                    border-top-left-radius: 50%;
                    border-top-right-radius: 50%;" tabindex="9"><img src="/src/img/rotateLeft.svg" alt="object angle increase" style="width: 25px;"></button>
                    <button class="controls__object__dm__control__item" data-action="decreaseObjectAngle${objectKey}" style="position: absolute; transform: translate(-210px, 45px); width: 60px;
                    height: 50px;
                    border-bottom-left-radius: 50%;
                    border-bottom-right-radius: 50%;" tabindex="10"><img src="/src/img/rotateRight.svg" alt="object angle decrease" style="width: 25px;"></button>
                    </div>
                <div class="controls__object__dm__control__item controls__item__inner" data-action="back" tabindex="11">
                    <img src="/src/img/return.svg" alt="Return" style="width: 70px;">
                    <span>Назад</span>
            </div>
            `;
    
        // Удаляем старые обработчики перед назначением новых
        document.querySelectorAll('.controls__object__dm__control__item').forEach((item) => {
            item.replaceWith(item.cloneNode(true));
        });
    
        document.querySelectorAll('.controls__object__dm__control__item').forEach((item) => {
            let objectKey = item.getAttribute('data-action');
            let objectAction = [];
            if (objectKey) {
                item.addEventListener('click', () => {
                    if
                    (
                        objectKey.startsWith('increaseObjectX') || objectKey.startsWith('increaseObjectY') || objectKey.startsWith('increaseObjectZ') ||
                        objectKey.startsWith('decreaseObjectX') || objectKey.startsWith('decreaseObjectY') || objectKey.startsWith('decreaseObjectZ')
                    ) {
                        this.room.handleObjectAction(objectKey.slice(0, 8), objectKey.slice(14, 15), objectKey.slice(15));
                    } else {
                        this.room.handleObjectAction(objectKey.slice(0, 8), objectKey.slice(14, 19), objectKey.slice(19));
                    }
                });
            }
        });
    }

    createTextureAddPage() {
        this.pages.texturesAdd.innerHTML = '';
        this.pages.texturesAdd.innerHTML += `
            <div class="controls__textures__add__item controls__item__inner" ${!this.room.presentedWalls.front.presented ? 'style="cursor: not-allowed; background-color: #cecece;"' : 'data-action="addTextureFront"'}  tabindex="1">
                <img src="src/img/wall.svg" alt="Wall">
                <span>Стіна 1</span>
            </div>
            <div class="controls__textures__add__item controls__item__inner" ${!this.room.presentedWalls.left.presented ? 'style="cursor: not-allowed; background-color: #cecece;"' : 'data-action="addTextureLeft"'} tabindex="2">
                <img src="src/img/wall.svg" alt="Wall">
                <span>Стіна 2</span>
            </div>
            <div class="controls__textures__add__item controls__item__inner" ${!this.room.presentedWalls.back.presented  ? 'style="cursor: not-allowed; background-color: #cecece;"' : 'data-action="addTextureBack"'} tabindex="3">
                <img src="src/img/wall.svg" alt="Wall">
                <span>Стіна 3</span>
            </div>
            <div class="controls__textures__add__item controls__item__inner" ${!this.room.presentedWalls.right.presented  ? 'style="cursor: not-allowed; background-color: #cecece;"' : 'data-action="addTextureRight"'} tabindex="4">
                <img src="src/img/wall.svg" alt="Wall">
                <span>Стіна 4</span>
            </div>
            <div class="controls__textures__add__item controls__item__inner" data-action="addTextureFloor" tabindex="5">
                <img src="src/img/wall.svg" alt="Floor">
                <span>Підлога</span>
            </div>
            <div class="controls__textures__add__item controls__item__inner" data-action="back" tabindex="6">
                <img src="src/img/return.svg" alt="Return" style="width: 70px;">
                <span>Назад</span>
            </div>
        `;
    
        document.querySelectorAll('.controls__textures__add__item').forEach((item) => {
            item.addEventListener('click', () => {
                const action = item.getAttribute('data-action');
                if (action && action.startsWith('addTexture')) {
                    const value = action.slice(10);
                    this.chooseTextureToAddPage(value);
                }
            })
        });
        
    }

    chooseTextureToAddPage(wall) {
        this.pages.texturesAdd.innerHTML = '';
        let tabIndex = 0;
        Object.entries(this.room.textures).forEach(([key, value]) => {
            tabIndex++;
            this.pages.texturesAdd.innerHTML += `
            <div class="controls__textures__add__item controls__item__inner" ${this.room.presentedWalls[wall.toLowerCase()].texturePath == value.path ? 'style="cursor: not-allowed; background-color: #cecece;"' : `data-action="addTexture${wall + key}"` } tabindex="${tabIndex}">
                <img src="src/img/wall.svg" alt="Room">
                <span>${value.name}</span>
            </div>
        `;
        })


        this.pages.texturesAdd.innerHTML += `
            <div class="controls__textures__add__item controls__item__inner" data-action="back" tabindex="${++tabIndex}">
                <img src="src/img/return.svg" alt="Return" style="width: 70px;">
                <span>Назад</span>
            </div>
        `;
    
        document.querySelectorAll('.controls__textures__add__item').forEach((item) => {
            item.addEventListener('click', () => {
                const action = item.getAttribute('data-action');
                if (action && action.startsWith('addTexture')) {
                    const value = action.slice(10);
                    let wall = '';
                    let texture = '';
                    if(value.includes('Left') || value.includes('Back')) {
                        wall = value.slice(0, 4);
                        texture = value.slice(4);
                    } else {
                        wall = value.slice(0, 5);
                        texture = value.slice(5);
                    }
                    this.room.addTexture(wall.toLowerCase(), texture);
                    this.chooseTextureToAddPage(wall);
                }
            })
        });
        
    }

    createTextureRemovePage() {
        this.pages.texturesRemove.innerHTML = '';
        this.pages.texturesRemove.innerHTML += `
            <div class="controls__textures__remove__item controls__item__inner" ${!this.room.presentedWalls.front.texturePath ? 'style="cursor: not-allowed; background-color: #cecece;"' : 'data-action="removeTextureFront"'}  tabindex="1">
                <img src="src/img/wall.svg" alt="Wall">
                <span>Стіна 1</span>
            </div>
            <div class="controls__textures__remove__item controls__item__inner" ${!this.room.presentedWalls.left.texturePath ? 'style="cursor: not-allowed; background-color: #cecece;"' : 'data-action="removeTextureLeft"'} tabindex="2">
                <img src="src/img/wall.svg" alt="Wall">
                <span>Стіна 2</span>
            </div>
            <div class="controls__textures__remove__item controls__item__inner" ${!this.room.presentedWalls.back.texturePath  ? 'style="cursor: not-allowed; background-color: #cecece;"' : 'data-action="removeTextureBack"'} tabindex="3">
                <img src="src/img/wall.svg" alt="Wall">
                <span>Стіна 3</span>
            </div>
            <div class="controls__textures__remove__item controls__item__inner" ${!this.room.presentedWalls.right.texturePath  ? 'style="cursor: not-allowed; background-color: #cecece;"' : 'data-action="removeTextureRight"'} tabindex="4">
                <img src="src/img/wall.svg" alt="Wall">
                <span>Стіна 4</span>
            </div>
            <div class="controls__textures__remove__item controls__item__inner" data-action="addTextureFloor"  ${!this.room.presentedWalls.floor.texturePath  ? 'style="cursor: not-allowed; background-color: #cecece;"' : 'data-action="removeTextureRight"'} tabindex="5">
                <img src="src/img/wall.svg" alt="Floor">
                <span>Підлога</span>
            </div>
            <div class="controls__textures__remove__item controls__item__inner" data-action="back" tabindex="6">
                <img src="src/img/return.svg" alt="Return" style="width: 70px;">
                <span>Назад</span>
            </div>
        `;
    
        document.querySelectorAll('.controls__textures__remove__item').forEach((item) => {
            item.addEventListener('click', () => {
                const action = item.getAttribute('data-action');
                if (action && action.startsWith('removeTexture')) {
                    const value = action.slice(13);
                    this.room.removeTexture(value.toLowerCase());
                    this.createTextureRemovePage();
                }
            })
        });
        
    }

}

export default Control;