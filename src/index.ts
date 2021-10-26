#!/usr/bin/env node
import { Command } from 'commander'
import fs from 'fs'
import path from 'path'
import { getAllParsedWithRelNames } from './getParsedWithRelNames'
import { getUuidToDataMap } from './getUuidToDataMap'
import { getParsedNodes } from './parsedActivities'
import { IQuailioNetworkJSON } from './types'

const program = new Command()
program
  .version('0.0.1')
  .description(
    'A CLI program for parsing Quailio JSON to general-purpose JSON formats',
  )
  .argument('<input-file>', 'Input Quailio JSON')
  .argument('[output-file]', 'Output general-purpose JSON')
  .option('-r, --rels', 'Show relationship names instead of IDs', false)
  .action((inFile: string, outFile?: string) => {
    const { rels } = program.opts()

    try {
      const inputFile = fs.readFileSync(path.resolve(inFile), {
        encoding: 'utf-8',
      })
      const inputJSON = JSON.parse(inputFile) as IQuailioNetworkJSON
      const parsedNodes = getParsedNodes(inputJSON.people)

      const result = rels
        ? getAllParsedWithRelNames(
            getUuidToDataMap(inputJSON.people),
            parsedNodes,
          )
        : parsedNodes

      if (outFile === undefined) {
        console.log(result)
        return
      }

      const parsedPath = path.parse(outFile)
      if (!fs.existsSync(parsedPath.dir)) {
        fs.mkdirSync(parsedPath.dir, { recursive: true })
      }
      fs.writeFileSync(outFile, JSON.stringify(result), 'utf-8')
    } catch (error) {
      console.error(error)
    }
  })

program.parse()
