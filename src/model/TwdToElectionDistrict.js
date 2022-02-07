import TwdToTownCode from "./TwdToTownCode";
import TownCodeToTown from "./TownCodeToTown";

function TwdToElectionDistrict(twd) {

    let edObject = { twd: "", ed: "" }

    //Town
    let town = TwdToTownCode(twd, 'twd')
    let townString = TownCodeToTown([town])

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

export default TwdToElectionDistrict