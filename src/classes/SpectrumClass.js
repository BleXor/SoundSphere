
import * as THREE from 'three';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import LoadingController from "./LoadingController";

import MyGUI from "../utils/MyGUI";

import spectrumFrag from '../shaders/spectrum.frag';
import spectrumVert from '../shaders/spectrum.vert';

class SpectrumClass {
    constructor() {
        this.modelLoader = new GLTFLoader(LoadingController);
        this.textureLoader = new THREE.TextureLoader();
        
        this.bind()
    }

    init(scene) {
        this.scene = scene;
        
        this.spectrum = undefined;
        
        this.uniforms = {
            uMatCap: {
                value: this.textureLoader.load('./assets/textures/blackMetal.png')
            },
            uSpectrumSize: {
                value: .8
            },
            uTime: {
                value: 0
            },
            uWaveBorder: {
                value: .2
            },
            uWaveSpeed: {
                value: .1
            },
            uBorderColor: {
                value: new THREE.Color("hsl(287, 80%, 80%)")
            }
        };
        
        const folder = MyGUI.addFolder('Spectrum');
        folder.open();
        folder.add(this.uniforms.uSpectrumSize, 'value', .01, 1.25).name('Spectrum size');
        folder.add(this.uniforms.uWaveBorder, 'value', .01, 1).name('Border size');
        folder.add(this.uniforms.uWaveSpeed, 'value', .01, 1).name('Wave speed');
        
        this.modelLoader.load('./assets/models/spectrum.glb', glb => {
            this.shaderMaterial = new THREE.ShaderMaterial({
                vertexShader: spectrumVert,
                fragmentShader: spectrumFrag,
                uniforms: this.uniforms,
                transparent: true
            });
            
            glb.scene.traverse(child => {
                if(child instanceof THREE.Mesh) {
                    child.material = this.shaderMaterial;
                    child.scale.multiplyScalar(1.25);
                    child.position.y = -1.25;
                    this.spectrum = child;
                }
            });
            
            this.scene.add(this.spectrum);
        });
    }

    update() {
        this.uniforms.uTime.value += 1;
    }

    bind() {

    }
}

const _instance = new SpectrumClass()
export default _instance