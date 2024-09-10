import './App.css'
import {SelectProvider} from "./SelectContext.tsx";
import Select from "./Select.tsx";
import UrlResult from "./UrlResult.tsx";

export const ID_LANG = "lang";
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
                    endpoint="http://localhost:3000/options/usecase"
                    resetOthersOnChange={[ID_LANG, ID_BRAND, ID_REGION, ID_APP]}
                />
                <Select
                    name={ID_LANG}
                    endpoint="http://localhost:3000/options/lang"
                    resetOthersOnChange={[ID_BRAND, ID_REGION, ID_APP]}
                />
                <Select
                    name={ID_BRAND}
                    endpoint="http://localhost:3000/options/brand"
                    resetOthersOnChange={[ID_REGION, ID_APP]}
                />
                <Select
                    name={ID_REGION}
                    endpoint="http://localhost:3000/options/region"
                    resetOthersOnChange={[ID_APP]}
                />
                <Select
                    name={ID_APP}
                    endpoint="http://localhost:3000/options/app"
                />
                <br/>
                <UrlResult/>
            </SelectProvider>
        </form>
    )
}

export default App


