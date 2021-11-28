import { render } from 'react-dom'
import React, { useEffect, useState } from 'react'
import ReactColorPicker from '@super-effective/react-color-picker';
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { Color } from 'three';
import { SetSelectedColor } from '../ThreeJs/main';

var stringToColour = function(hex: number ) {
  const colour = new Color(hex);
  return colour.getHexString()
}

export default function CustomColorPicker() {
    const dispatch = useAppDispatch()
    const selectedColor = useAppSelector(state=> state.canvasSlice.selectedColor);
    const isSelected = useAppSelector(state=> state.canvasSlice.elementHasBeenSelected);
    useEffect(()=>{
      if(isSelected === true && selectedColor)
      {
        setState({
          ...state, color: stringToColour(selectedColor as number)
        });
      }
    },[isSelected, selectedColor])

    const [state, setState] = useState({color: "blue"})

    const onChange = (color: string) => {
        setState({
            color
        });
        
        SetSelectedColor(color);
    }
    return <div>
        <ReactColorPicker showSwatch={true} color={state.color} onChange={onChange} />
        <div style={{
        background: state.color,
        width: 100,
        height: 50,
        color: 'white'
        }}>
        {state.color}
        </div>
    </div>
  
 
}