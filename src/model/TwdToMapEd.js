import TwdToTownCode from "./TwdToTownCode";
import TownCodeToMap from "./TownCodeToMap";

function TwdToMapEd(twd) {

    let edObject = { twd: "", ed: "" }

    //Town
    let town = TwdToTownCode(twd, 'twd')
    let townString = TownCodeToMap([town])

    //Ward
    let wardString = twd.slice(2, 4);
    
    if (wardString === "00") {
        wardString = ""
    } else {
        wardString = `${wardString}-`
    }

    //District
    let districtString = twd.slice(4);
    edObject.ed = `${townString} ${wardString}${districtString}`
    edObject.twd = twd
    
    return edObject
}

export default TwdToMapEd