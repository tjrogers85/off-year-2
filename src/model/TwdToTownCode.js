function TwdToTownCode(twd, twdOrArray) {

    let twdResult = []
  
    if (twdOrArray === "array") {
      let townCodeArray = []
      for (const item of twd) {
          var firstTwo = item.substring(0,2);
          townCodeArray.push(firstTwo)
      }
      twdResult = townCodeArray
    } else if (twdOrArray === "twd") {
      twdResult = twd.substring(0,2);
    }

    return twdResult
    
  }
  
  export default TwdToTownCode