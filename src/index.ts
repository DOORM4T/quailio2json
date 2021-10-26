#!/usr/bin/env node
import { Command } from 'commander'
import fs from 'fs'
import path from 'path'
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
  .action((input: string, output?: string) => {
    try {
      const inputFile = fs.readFileSync(path.resolve(input), {
        encoding: 'utf-8',
      })
      const inputJSON = JSON.parse(inputFile) as IQuailioNetworkJSON
      const parsedNodes = getParsedNodes(inputJSON.people)

      if (output === undefined) return
      const parsedPath = path.parse(output)
      if (!fs.existsSync(parsedPath.dir)) {
        fs.mkdirSync(parsedPath.dir, { recursive: true })
      }
      fs.writeFileSync(output, JSON.stringify(parsedNodes), 'utf-8')
    } catch (error) {
      console.error(error)
    }
  })

program.parse()
