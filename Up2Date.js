//esm is good👌
import { setFailed, setOutput as _ } from "@actions/core";
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
  const year = (new Date(Date.now())).getUTCFullYear()
  await fs.stat(aboutPath)
  for (const each of toIcsCollection(year.toString())) await fs.stat(each)
  /** @type {string} */
  const content = Buffer.from(await fs.readFile(aboutPath)).toString('utf8')
  /** @type {object|string} */
  let data = JSON.parse(content)
  data['preferredEdition'] = data['preferredEdition']==year.toString()?((year+1).toString()):(year.toString())
  data = JSON.stringify(data);
  await fs.writeFile(aboutPath, data)
}
main().catch(e=>setFailed(e.message))
