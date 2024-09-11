import './App.css'
import {SelectProvider} from "./SelectContext.tsx";
import Select from "./Select.tsx";
import UrlResult from "./UrlResult.tsx";
import {ID} from "./ID.ts";

function App() {
    // /oru/audi/eu/ota/rn-2023-03-14-ftkm/de-de/tech-1-2/mode-day/index.html
    return (
        <form>
            <SelectProvider>
                <h1>Select Dropdowns with Context</h1>
                <div className="select-container">
                    <Select
                        id={ID.USE_CASE}
                        endpoint="http://localhost:3000/options/usecase"
                        resetOthersOnChange={[ID.BRAND, ID.REGION, ID.APP, ID.LANG]}
                    />
                    <Select
                        id={ID.BRAND}
                        endpoint="http://localhost:3000/options/brand"
                        resetOthersOnChange={[ID.REGION, ID.APP, ID.LANG]}
                        disableIfEmpty={[ID.USE_CASE]}
                    />
                    <Select
                        id={ID.REGION}
                        endpoint="http://localhost:3000/options/region"
                        resetOthersOnChange={[ID.APP, ID.LANG]}
                        disableIfEmpty={[ID.USE_CASE, ID.BRAND]}
                    />
                    <Select
                        id={ID.APP}
                        endpoint="http://localhost:3000/options/app"
                        resetOthersOnChange={[ID.LANG]}
                        disableIfEmpty={[ID.USE_CASE, ID.BRAND, ID.REGION]}
                    />
                    <Select
                        id={ID.LANG}
                        endpoint="http://localhost:3000/options/lang"
                        disableIfEmpty={[ID.USE_CASE, ID.BRAND, ID.REGION, ID.APP]}
                    />
                </div>
                <UrlResult/>
            </SelectProvider>
        </form>
    )
}

export default App
