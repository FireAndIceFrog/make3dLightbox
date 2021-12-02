import { Object3D } from "three";

class IntersectedObject {
    public list: Object3D<THREE.Event>[] = [];
}

const intersectedObject = new IntersectedObject()
export {intersectedObject}