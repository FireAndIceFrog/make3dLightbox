import { CSSProperties, useCallback, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { Color } from 'three';
import { SetSelectedColor } from '../../ThreeJs/main';
import Picker from './Picker';
import "./index.css"
import { setBrushColor } from '../../app/brushSlice';

function stringToColour(hex: number ) {
  const colour = new Color(hex);
  return colour.getHexString()
}

export default function CustomColorPickerContainer() {
  const isSelected = useAppSelector(state=> state.canvasSlice.elementHasBeenSelected);
  const isBrushing = useAppSelector(state=>state.brushSlice.isBrushing)

  let brushDispatch = null

  if (isSelected) {
    brushDispatch = (colorRep: string)=> {
      SetSelectedColor(colorRep);
    }
  }

  if(isSelected || isBrushing) return <Picker setSelectedColorCallback={brushDispatch} ></Picker>
  else return <div></div>
  }