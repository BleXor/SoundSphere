
import RAF from "../utils/RAF";

class SoundReactor {
    constructor(audioUrl) {
        this.ctx;
        this.audio;
        this.audioSource;
        this.analyser;
        this.fdata;
        this.playState = false;
        this.url = audioUrl;
        
        this.bind();
    }
    
    init() {
        this.ctx = new AudioContext();
        this.audio = new Audio(this.url);
        this.audioSource = this.ctx.createMediaElementSource(this.audio);
        this.analyser = this.ctx.createAnalyser();
        this.analyser.smoothingTimeConstant = 0.8;
        
        this.audioSource.connect(this.analyser);
        this.audioSource.connect(this.ctx.destination);
        this.fdata = new Uint8Array(this.analyser.frequencyBinCount);
    }
    
    play() {
        this.audio.play();
        this.playState = true;
        RAF.subscribe('audioReactorUpdate', this.update);
    }
    
    pause() {
        this.audio.pause();
        this.playState = false;
        RAF.unsubscribe('audioReactorUpdate');
    }
    
    update() {
        this.analyser.getByteFrequencyData(this.fdata);
    }
    
    bind() {
        this.update = this.update.bind(this);
        this.init = this.init.bind(this);
    }
}
// a1 = fox stev
// a2 = spybreak
// a3 = asteroid galax
// a4 = wayward son
// a5 = pursuit of happ
// a6 = jammin
const _instance = new SoundReactor('./assets/audio6.mp3');
export default _instance;