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
                <div className="select-container">
                    <Select
                        name={ID_USE_CASE}
                        endpoint="http://localhost:3000/options/usecase"
                        resetOthersOnChange={[ID_BRAND, ID_REGION, ID_APP, ID_LANG]}
                    />
                    <Select
                        name={ID_BRAND}
                        endpoint="http://localhost:3000/options/brand"
                        resetOthersOnChange={[ID_REGION, ID_APP, ID_LANG]}
                        disableIfEmpty={[ID_USE_CASE]}
                    />
                    <Select
                        name={ID_REGION}
                        endpoint="http://localhost:3000/options/region"
                        resetOthersOnChange={[ID_APP, ID_LANG]}
                        disableIfEmpty={[ID_USE_CASE, ID_BRAND]}
                    />
                    <Select
                        name={ID_APP}
                        endpoint="http://localhost:3000/options/app"
                        resetOthersOnChange={[ID_LANG]}
                        disableIfEmpty={[ID_USE_CASE, ID_BRAND, ID_REGION]}
                    />
                    <Select
                        name={ID_LANG}
                        endpoint="http://localhost:3000/options/lang"
                        disableIfEmpty={[ID_USE_CASE, ID_BRAND, ID_REGION, ID_APP]}
                    />
                </div>
                <UrlResult/>
            </SelectProvider>
        </form>
    )
}

export default App


