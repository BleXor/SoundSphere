
import * as THREE from 'three';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import LoadingController from "./LoadingController";

import SoundReactor from "./SoundReactorClass";
import MyGUI from "../utils/MyGUI";

class SpherePillardsClass {
    constructor() {
        this.modelLoader = new GLTFLoader(LoadingController);
        this.textureLoader = new THREE.TextureLoader();
        
        this.params = {
            waveSpeed: 1,
            subDiv: 4,
            pillardSize: .075
        };
        
        this.bind()
    }

    init(scene) {
        this.scene = scene
        
        this.upVector = new THREE.Vector3(0, 1, 0);
        this.pillards = new THREE.Group();
        this.pillard = undefined;
        
        const gTexture = this.textureLoader.load('./assets/textures/greyMetal.png');
        const bTexture = this.textureLoader.load('./assets/textures/blackMetal.png');
        
        this.gMatCap = new THREE.MeshMatcapMaterial({
            matcap: gTexture
        });
        
        this.bMatCap = new THREE.MeshMatcapMaterial({
            matcap: bTexture
        });
        
        this.modelLoader.load('./assets/models/pillard.glb', glb => {
            glb.scene.traverse(child => {
                if(child.name === 'Base') {
                    this.pillard = child;
                    child.material = this.bMatCap;
                }
                
                if(child.name === 'Cylinder') {
                    child.material = this.gMatCap;
                }
            });
            
            this.computePositions();
        });
        
        const sphereFolder = MyGUI.addFolder('Sphere Pillards');
        sphereFolder.open();
        sphereFolder.add(this.params, 'waveSpeed', .001, 3).name('Wave speed');
        sphereFolder.add(this.params, 'subDiv', 1, 5, 1).name('Ico subdivision').onChange(this.computePositions);
        sphereFolder.add(this.params, 'pillardSize', .02, .25).name('Pillard size').onChange(this.computePositions);
    }
    
    computePositions() {
        let ico;
        this.scene.traverse(child => {
            if(child.name === 'ico') ico = child;
        });
        if(ico) this.scene.remove(ico);
        
        const sphereGeometry = new THREE.IcosahedronGeometry(1, this.params.subDiv);
        const sphereMaterial = this.gMatCap;
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        sphere.name = 'ico';
        
        this.pillards.clear();
        
        const vertexArray = [];
        
        for(let i = 0; i < sphereGeometry.attributes.position.array.length; i += 3) {
            const x = sphereGeometry.attributes.position.array[i];
            const y = sphereGeometry.attributes.position.array[i+1];
            const z = sphereGeometry.attributes.position.array[i+2];
            
            vertexArray.push({
                x,
                y,
                z
            })
        }
        
        const pillardsPositions = [];
        
        for(const position of vertexArray) {
            let exists = false;
            
            for(const position2 of pillardsPositions) {
                if(
                    position.x === position2.x
                    && position.y === position2.y
                    && position.z === position2.z
                ) {
                    exists = true;
                }
            }
            
            if(!exists) {
                pillardsPositions.push(position);
    
                const posVector = new THREE.Vector3(position.x, position.y, position.z);
                const clone = this.pillard.clone();
                
                clone.scale.multiplyScalar(this.params.pillardSize);
                clone.position.copy(posVector);
                clone.quaternion.setFromUnitVectors(this.upVector, posVector.normalize());
    
                this.pillards.add(clone);
            }
        }
    
        this.scene.add(this.pillards);
        this.scene.add(sphere);
    }

    update() {
        if(SoundReactor.playState) {
            let i = 0;
    
            while(i < this.pillards.children.length) {
                const base = this.pillards.children[i];
                const cylinder = base.children[0];
                const ampl = SoundReactor.fdata[i] / 255 * 2.15;
                cylinder.position.y = ampl * ampl;
        
                i++;
            }
        } else {
            let i = 0;
    
            while(i < this.pillards.children.length) {
                const base = this.pillards.children[i];
                const cylinder = base.children[0];
                cylinder.position.y = (Math.sin(Date.now() * 0.01 * this.params.waveSpeed + base.position.x - base.position.y) + 2);
        
                i++;
            }
        }
    }

    bind() {
        this.computePositions = this.computePositions.bind(this);
    }
}

const _instance = new SpherePillardsClass()
export default _instance