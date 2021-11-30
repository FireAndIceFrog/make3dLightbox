import { ColorBrush } from "./components/ColorBrush";
import CustomColorPicker from "./components/CustomColorPicker/index";
import ThreeCanvas from "./components/ThreeCanvas";

function App() {
  return (
    <div className="App">
      <ColorBrush/>
      <CustomColorPicker/>
      <ThreeCanvas />
    </div>
  );
  
}

export default App;
