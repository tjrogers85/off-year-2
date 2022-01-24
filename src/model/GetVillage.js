function GetVillage(villageData, twdArray) {
    let villageTemp = []
  for (const item of twdArray) {
    for (const item2 of villageData) {
        if (item === item2.ed) 
        villageTemp.push(item2.village)
    }
  }
  const village =  [...new Set(villageTemp)];
  return village.sort()
}

export default GetVillage;
