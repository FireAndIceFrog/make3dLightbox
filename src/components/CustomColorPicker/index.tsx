import { CSSProperties } from 'react'
import { useAppSelector } from '../../app/hooks'
import { Color } from 'three';
import { SetSelectedColor } from '../../ThreeJs/main';
import Picker from './Picker';
import "./index.css"

function stringToColour(hex: number ) {
  const colour = new Color(hex);
  return colour.getHexString()
}

export default function CustomColorPickerContainer() {
    const selectedColor = useAppSelector(state=> state.canvasSlice.selectedColor);
    const isSelected = useAppSelector(state=> state.canvasSlice.elementHasBeenSelected);
    const isBrushing = useAppSelector(state=>state.brushSlice.isBrushing)
    if(isSelected && !isBrushing) return <Picker selectedColor={stringToColour(selectedColor as number)} setSelectedColorCallback={SetSelectedColor} ></Picker>
    else return <div></div>
  }