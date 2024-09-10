import './App.css'
import {SelectProvider} from "./SelectContext.tsx";
import Select from "./Select.tsx";

export const ID_ENV = "env";
export const ID_USE_CASE = "usecase";
export const ID_BRAND = "brand";
export const ID_REGION = "region";
export const ID_APP = "app";

function App() {

    // /oru/audi/eu/ota/rn-2023-03-14-ftkm/de-de/tech-1-2/mode-day/index.html

    return (
        <form>
            <SelectProvider>
                <h1>Select Dropdowns with Context</h1>
                <Select
                    name={ID_USE_CASE}
                    endpoint="http://localhost:3000/options/select1"
                    resetOthersOnChange={[ID_ENV, ID_BRAND]}
                />
                <Select
                    name={ID_ENV}
                    endpoint="http://localhost:3000/options/select2"
                    resetOthersOnChange={[ID_REGION, ID_APP]}
                />
                <Select
                    name={ID_BRAND}
                    endpoint="http://localhost:3000/options/select1"
                />
                <Select
                    name={ID_REGION}
                    endpoint="http://localhost:3000/options/select2"
                />
                <Select
                    name={ID_APP}
                    endpoint="http://localhost:3000/options/select1"
                />
            </SelectProvider>
        </form>
    )
}

export default App


