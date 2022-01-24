import regionalSelect from "../dataStorage/RegionalSelect"

function VillageData() {
    let villageItemArray = []

    for (const item of regionalSelect) {
        let vilageItemData = { village: "", ed: "" }
        if (item.village.length !== 0) {
            vilageItemData.village = item.village
            vilageItemData.ed = item.ed
            villageItemArray.push(vilageItemData)
        }
    }
    return villageItemArray
}
export default VillageData