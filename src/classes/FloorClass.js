
import * as THREE from 'three';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import LoadingController from "./LoadingController";

class FloorClass {
    constructor() {
        this.modelLoader = new GLTFLoader(LoadingController);
        
        this.bind()
    }

    init(scene) {
        this.scene = scene;
        
        this.floor = undefined;
        
        this.modelLoader.load('./assets/models/floor.glb', glb => {
            glb.scene.traverse(child => {
                if(child instanceof THREE.Mesh) {
                    this.floor = child;
                }
            });
            
            this.floor.translateY(-2);
            this.floor.scale.multiplyScalar(1.35)
            this.scene.add(this.floor);
        });
    }

    update() {

    }

    bind() {

    }
}

const _instance = new FloorClass()
export default _instance