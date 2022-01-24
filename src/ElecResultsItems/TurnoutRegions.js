function TurnoutRegions(muniType, muniName, office) {
    let returnString = ""

        if (office.includes("Congress")) {
            returnString = "congress"
        } else if (office.includes("State Senate")) {
            returnString = "stateSenate"
        } else if (office.includes("Assembly")) {
            returnString = "stateAssembly"
        } else if (office.includes("Legislator")) {
            returnString = "countyLegislator"
        } else if ((office.includes("Council")) && (office.includes("District"))) {
            returnString = "councilDistrict"
        } else if ((muniType.includes("Town/City")) && !(office.includes("District"))) {
            returnString = "townCity"
        } else if (muniType.includes("Village")) {
            returnString = "village"
        } else {
            returnString = "county"
        }
        return returnString
    
    }


export default TurnoutRegions