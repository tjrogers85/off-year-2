import SortParty from "./SortParty"

function SubFilter(candidateArray, dataArray, totalCanvass) {
    
    let returnArray = []

    for (const candidate of candidateArray) {
        let subReturnArray = []
        let voteTotal = 0
        for (const item of dataArray) {
            if (candidate.candidate === item.candidate) {
                const voteDec = (item.votes/totalCanvass) * 100
                voteTotal = item.votes + voteTotal
                const votePct = `${voteDec.toLocaleString("en-US", {
                    maximumFractionDigits: 1,
                    minimumFractionDigits: 1,
                  })}%`;
                  const number = item.votes.toLocaleString("en-US")
                  item.votes = `${number} (${votePct})`
                subReturnArray.push(item)
            }
        }
        subReturnArray.push( {candidate: "", party: "Total", votes: voteTotal.toLocaleString("en-US")})
        let thisThing = SortParty(subReturnArray)
        returnArray.push(thisThing)
    }

    let sub2 = []
    for (const item of dataArray) {
        if (item.candidate.includes('-VOID')) {
            item.party = item.candidate
            item.votes = item.votes.toLocaleString("en-US")
            sub2.push(item)
        }
    } 
    for (const item of dataArray) {
        if (item.candidate.includes('TOTAL BALLOT')) {
            item.party = item.candidate
            item.votes = item.votes.toLocaleString("en-US")
            sub2.push(item)
        }
    } 
    returnArray.push(sub2)

    return returnArray
}

export default SubFilter