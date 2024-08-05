//esm is good👌
import { setFailed, setOutput } from "@actions/core";
import fs from "node:fs/promises";
const aboutPath = "about.json"
/** @type {(f:string)=>string[]} */
function toIcsCollection(f){
    return [
        `${f}.ics`,
        `${f}-detailed.ics`,
    ]
}
async function main(){
  process.TZ = "UTC0"
  const year = (new Date(Date.now())).getFullYear()
  setOutput(`getting file stats for ${aboutPath}`)
  await fs.stat(aboutPath)
  setOutput(`getting file stats for current year`)
  for (const each of toIcsCollection(year.toString())) await fs.stat(each)
  /** @type {string} */
  const content = Buffer.from(await fs.readFile(aboutPath)).toString('utf8')
  /** @type {object|string} */
  let data = JSON.parse(content)
  let yearCalc = data['preferredEdition']==(year.toString())?((year+1).toString()):(year.toString())
  setOutput(`setting year to ${yearCalc}`)
  data['preferredEdition'] = year calc
  data = JSON.stringify(data);
  setOutput(`writing back to ${aboutPath}`)
  await fs.writeFile(aboutPath, data)
}
main().catch(e=>setFailed(e.message))
