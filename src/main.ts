import * as core from '@actions/core'
import { promises as fs } from 'fs'

function getInputs() {
  return {
    hasCdi: core.getBooleanInput('has-cdi', { required: true }),
    hasFdi: core.getBooleanInput('has-fdi', { required: true })
  }
}

export async function run() {
  const inputs = getInputs()

  if (inputs.hasCdi) {
    const cdiFile = await fs.readFile(
      'coreDriverInterfaceSupported.json',
      'utf-8'
    )
    const cdiVersions: string[] = JSON.parse(cdiFile).versions

    core.setOutput('cdi-versions', JSON.stringify(cdiVersions))
  }

  if (inputs.hasFdi) {
    const fdiFile = await fs.readFile(
      'frontendDriverInterfaceSupported.json',
      'utf-8'
    )
    const fdiVersions: string[] = JSON.parse(fdiFile).versions

    core.setOutput('fdi-versions', JSON.stringify(fdiVersions))
  }
}
