import * as core from '@actions/core'
import { promises as fs } from 'fs'

function getInputs() {
  return {
    hasCdi: core.getBooleanInput('has-cdi', { required: false }),
    hasFdi: core.getBooleanInput('has-fdi', { required: false }),
    hasWebJs: core.getBooleanInput('has-web-js', { required: false }),
    hasCommon: core.getBooleanInput('has-common', { required: false })
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

    core.info(`cdiVersions=${cdiVersions}`)
    core.setOutput('cdiVersions', JSON.stringify(cdiVersions))
  }

  if (inputs.hasFdi) {
    const fdiFile = await fs.readFile(
      'frontendDriverInterfaceSupported.json',
      'utf-8'
    )
    const fdiVersions: string[] = JSON.parse(fdiFile).versions

    core.info(`fdiVersions=${fdiVersions}`)
    core.setOutput('fdiVersions', JSON.stringify(fdiVersions))
  }

  if (inputs.hasWebJs) {
    const webJsFile = await fs.readFile('webJsInterfaceSupported.json', 'utf-8')
    const webJsVersion: string = JSON.parse(webJsFile).version

    core.info(`webJsVersion=${webJsVersion}`)
    core.setOutput('webJsVersion', webJsVersion)
  }

  if (inputs.hasCommon) {
    const commonFile = await fs.readFile('supportedVersions.json', 'utf-8')
    const versions = JSON.parse(commonFile)

    core.info(`versions=${versions}`)
    core.setOutput('versions', JSON.stringify(versions))
  }
}
