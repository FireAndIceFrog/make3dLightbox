import { CSSProperties, useEffect, useState } from 'react'
import ReactColorPicker from '@super-effective/react-color-picker';
import "./index.css"
import { useAppSelector } from '../../app/hooks';
import { useDispatch } from 'react-redux';
import { setBrushColor } from '../../app/brushSlice';

const style: Record<string, CSSProperties> = {
  container: {
    top: "75vh",
    left: "5vw",
    backgroundColor: "#f1f1f1",
    position: "absolute",
    display: "flex",
    width: "20vw",
    height: "20vh",
    borderRadius: "10px"
  },
  flexBox: {

  },
  swath: {
    marginTop: "7%",
    height: "70%",
    width: "10%"
  }
}

const classes ={ 
  colorPicker:{
    container: "color-picker__container"
  }
}

interface IPicker {
  setSelectedColorCallback?: (color: string)=>void
}

export default function Picker({ setSelectedColorCallback}: IPicker ) {
    const dispatch = useDispatch()
    const selectedColor = useAppSelector(state=> state.brushSlice.selectedColor);

    const onChange = (color: string) => {
        dispatch(setBrushColor(color))
        if(setSelectedColorCallback) setSelectedColorCallback(color);
    }

    return <div style = {style.container}>
        <ReactColorPicker 
          className= {classes.colorPicker.container}
          showHex = {false} 
          showSwatch={false} 
          color={selectedColor} 
          onChange={onChange} />
        <div style={{...style.swath, backgroundColor: selectedColor || ""}}></div>
    </div>
}