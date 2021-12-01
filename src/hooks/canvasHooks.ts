import { setCanvasUpdating } from '../app/canvasSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {canvasRefs} from '../Common/InjectedVars';
import { HandleMouseClickSingle } from '../ThreeJs/MouseEvents/MouseClickSingle';

export function useMouseClickHook()
{
    return HandleMouseClickSingle
}