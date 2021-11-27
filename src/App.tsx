import CustomColorPicker from "./components/CustomColorPicker";
import Selected3DElement from "./components/SelectedElement";
import ThreeCanvas from "./components/ThreeCanvas";

function App() {
  return (
    <div className="App">
      <ThreeCanvas />
      <CustomColorPicker/>
      <Selected3DElement/>
    </div>
  );
}

export default App;
