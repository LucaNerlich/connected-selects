import './App.css'
import {SelectProvider} from "./SelectContext.tsx";
import Select from "./Select.tsx";

function App() {

    return (
        <SelectProvider>
            <h1>Select Dropdowns with Context</h1>
            <Select
                name="select1"
                endpoint="https://api.example.com/options/select1"
                resetOthersOnChange={['select2', 'select3']}
            />
            <Select
                name="select2"
                endpoint="https://api.example.com/options/select2"
                resetOthersOnChange={['select4', 'select5']}
            />
            <Select
                name="select3"
                endpoint="https://api.example.com/options/select3"
            />
            <Select
                name="select4"
                endpoint="https://api.example.com/options/select4"
            />
            <Select
                name="select5"
                endpoint="https://api.example.com/options/select5"
            />
        </SelectProvider>
    )
}

export default App


