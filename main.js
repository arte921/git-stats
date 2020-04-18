const leaderboardsize = 3

const fs = require('fs')
const path = process.cwd()
let rawtext
try{
  rawtext = fs.readFileSync(path + "/testadresses.txt").toString()
}catch(e){
  console.log('Please clone a repository, run "git log --pretty=format:"%ae" > adresses.txt" in the directory you it cloned to, and copy the newly created file "adresses.txt" to the folder you are running this script from.')
  return null
}

const rawarray = rawtext.split("\n")
const domainsarray = rawarray.map(address => address.substring(address.indexOf("@") + 1)) //trailing \n?
const domains = domainsarray.join("\n")
let resultsarray = []
domainsarray.forEach(domain => {
  if(resultsarray[domain] == null){
    resultsarray[domain] = domains.match(domain).length
  } else resultsarray[domain]++
})

let numberedarray = []
let totalcommits = domainsarray.length
for(let domain in resultsarray){
  let commits = resultsarray[domain]
  let percentage = Math.round(commits / totalcommits * 100 * 10) / 10
  numberedarray.push({domain, commits, percentage})
}
numberedarray.sort((a,b) => b["commits"] - a["commits"])

console.log(numberedarray.slice(0,leaderboardsize))

if(leaderboardsize == 0){
  console.log(numberedarray)
}
