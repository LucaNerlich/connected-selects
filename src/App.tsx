import './App.css'
import {SelectProvider} from "./SelectContext.tsx";
import Select from "./Select.tsx";

function App() {

    return (
        <SelectProvider>
            <h1>Select Dropdowns with Context</h1>
            <Select
                name="select1"
                endpoint="http://localhost:3000/options/select1"
                resetOthersOnChange={['select2', 'select3']}
            />
            <Select
                name="select2"
                endpoint="http://localhost:3000/options/select2"
                resetOthersOnChange={['select4', 'select5']}
            />
            <Select
                name="select3"
                endpoint="http://localhost:3000/options/select1"
            />
            <Select
                name="select4"
                endpoint="http://localhost:3000/options/select2"
            />
            <Select
                name="select5"
                endpoint="http://localhost:3000/options/select1"
            />
        </SelectProvider>
    )
}

export default App


