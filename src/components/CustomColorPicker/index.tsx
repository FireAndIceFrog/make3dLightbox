import { CSSProperties, useEffect, useState } from 'react'
import ReactColorPicker from '@super-effective/react-color-picker';
import { useAppSelector } from '../../app/hooks'
import { Color } from 'three';
import { SetSelectedColor } from '../../ThreeJs/main';
import "./index.css"

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

function stringToColour(hex: number ) {
  const colour = new Color(hex);
  return colour.getHexString()
}

export default function CustomColorPicker() {
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

    if(isSelected && selectedColor) {
      return <div style = {style.container}>
          <ReactColorPicker 
            className= {classes.colorPicker.container}
            showHex = {false} 
            showSwatch={false} 
            color={state.color} 
            onChange={onChange} />
          <div style={{...style.swath, backgroundColor: state.color}}></div>
      </div>
    }
    else 
    {
      return <div></div>
    }
  
 
}