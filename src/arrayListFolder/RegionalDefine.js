function RegionalDefine(regionArray) {

    let toLoadArray  = []
    let congressArray = []
    let stateSenateArray = []
    let stateAssemblyArray = []
    let countyLegislatorArray = []
    let townCityArray = []
    let councilDistrictArray = []
    let villageArray = []

for (const item of regionArray) {

    congressArray.push(item.congress)
    stateSenateArray.push(item.stateSenate)
    stateAssemblyArray.push(item.stateAssembly)
    countyLegislatorArray.push(item.countyLegislator)
    townCityArray.push(item.townCity)
    if (item.councilDistrict != "") {
        councilDistrictArray.push(item.councilDistrict)
    }
    if (item.village != "") {
        villageArray.push(item.village)
    }
}

let addCongress = [...new Set(congressArray)]
    addCongress.sort()
    if (addCongress.length > 1) {
        for (const item of addCongress) {
            toLoadArray.push({ "Congress": item })
        }
    }
    let addStateSenate = [...new Set(stateSenateArray)]
    addStateSenate.sort()
    if (addStateSenate.length > 1) {
        for (const item of addStateSenate) {
            toLoadArray.push({"State Senate": item})
        }
    }
    var addStateAssembly = [...new Set(stateAssemblyArray)]
    addStateAssembly.sort()
    if (addStateAssembly.length > 1) {
        for (const item of addStateAssembly) {
            toLoadArray.push({"State Assembly": item})
        }
    }
    let addCountyLegislator = [...new Set(countyLegislatorArray)]
    addCountyLegislator.sort()
    if (addCountyLegislator.length > 1) {
        for (const item of addCountyLegislator) {
            toLoadArray.push({"County Legislator": item})
        }
    }
    let addTownCity = [...new Set(townCityArray)]
    addTownCity.sort()
    if (addTownCity.length > 1) {
        for (const item of addTownCity) {
            toLoadArray.push({"Town/City": item})
        }
    }
    let addCouncilDistrict = [...new Set(councilDistrictArray)]
    addCouncilDistrict.sort()
    if (addCouncilDistrict.length > 0) {
        for (const item of addCouncilDistrict)  {
            toLoadArray.push({"Council District": item})
        }
    }
    let addVillage = [...new Set(villageArray)]
    addVillage.sort()
    if (addVillage.length > 0) {
        for (const item of addVillage) {
            toLoadArray.push({"Village": item})
        }
    }
    return toLoadArray
}

export default RegionalDefine