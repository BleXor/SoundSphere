import * as THREE from "three"

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import RAF from '../utils/RAF'
import config from '../utils/config'
import MyGUI from '../utils/MyGUI'

import Floor from './FloorClass';
import SpherePillards from './SpherePillardsClass';
import Spectrum from './SpectrumClass';
import ParticleSystem from './ParticleSystem';
import CamParallax from "./CamParallax";

class MainThreeScene {
    constructor() {
        this.bind()
        this.camera
        this.scene
        this.renderer
        this.controls
    }

    init(container) {
        //RENDERER SETUP
        this.renderer = new THREE.WebGLRenderer({ antialias: true })
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.renderer.debug.checkShaderErrors = true
        // this.renderer.outputEncoding = THREE.sRGBEncoding;
        container.appendChild(this.renderer.domElement)

        //MAIN SCENE INSTANCE
        const color = new THREE.Color(0x151515);
        const fog = new THREE.Fog(color, 8, 18);
        this.scene = new THREE.Scene();
        this.scene.background = color;
        this.scene.fog = fog;

        //CAMERA AND ORBIT CONTROLLER
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        this.camera.position.set(0, 0, 5)
        this.controls = new OrbitControls(this.camera, this.renderer.domElement)
        this.controls.enabled = false//config.controls
        this.controls.maxDistance = 12
        this.controls.minDistance = 3
        this.controls.minPolarAngle = 0;
        this.controls.maxPolarAngle = Math.PI / 2 + .2;

        Floor.init(this.scene);
        SpherePillards.init(this.scene);
        Spectrum.init(this.scene);
        ParticleSystem.init(this.scene);
        CamParallax.init(this.camera)
        
        MyGUI.hide()
        
        if (config.myGui) {
            const folder = MyGUI.addFolder('Camera');
            folder.open();
            
            folder.add(this.controls, 'enabled').name('Orbit').onChange(() => {
                if(this.controls.enabled) CamParallax.active = false;
            }).listen();
            
            folder.add(CamParallax, 'active').name('Parallax').onChange(() => {
                if(CamParallax.active) this.controls.enabled = false;
            }).listen();
            
            folder.add(CamParallax.params, 'intensity', 0.001, 0.01).name('Parallax Intensity')
            folder.add(CamParallax.params, 'ease', 0.01, 0.1).name('Parallax Ease')
            
            MyGUI.show();
        }

        //RENDER LOOP AND WINDOW SIZE UPDATER SETUP
        window.addEventListener("resize", this.resizeCanvas)
        RAF.subscribe('threeSceneUpdate', this.update)
    }

    update() {
        SpherePillards.update();
        Spectrum.update();
        ParticleSystem.update();
        CamParallax.update();
        this.scene.rotateY(.0015);
        this.renderer.render(this.scene, this.camera);
    }

    resizeCanvas() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
    }

    bind() {
        this.resizeCanvas = this.resizeCanvas.bind(this)
        this.update = this.update.bind(this)
        this.init = this.init.bind(this)
    }
}

const _instance = new MainThreeScene()
export default _instance