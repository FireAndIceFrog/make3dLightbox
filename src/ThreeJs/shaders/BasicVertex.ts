export default `
varying vec2 xyPos ;
void main() {
    xyPos = position.xy;
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
}
`