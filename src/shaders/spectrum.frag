
#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)

varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vMatCapUV;

uniform sampler2D uMatCap;
uniform float uSpectrumSize;
uniform float uTime;
uniform float uWaveBorder;
uniform float uWaveSpeed;
uniform vec3 uBorderColor;

void main() {
    float noise = snoise3(vec3(vPosition.xz * 5., uTime * .01)) * .5;

    float wave = sin(vPosition.y * 5. - uTime * uWaveSpeed);

    float borderMask = step(wave, noise - uSpectrumSize);
    borderMask -= step(wave, noise - (uSpectrumSize + uWaveBorder));
    vec4 borderOut = vec4(uBorderColor * borderMask, borderMask);

    float mcMask = step(wave, noise - uSpectrumSize);
    vec4 matCapColor = texture2D(uMatCap, vMatCapUV);
    vec4 matCapOut = vec4(matCapColor.rgb, mcMask);

    float opMask = 1. - vPosition.y;
    opMask *= .15;
    opMask += .5;
    vec4 opMaskOut = vec4(1., 1., 1., opMask);

    vec4 col = matCapOut + borderOut;
    col *= opMaskOut;

    gl_FragColor = col;
}