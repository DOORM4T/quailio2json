// Map Quailio UUID to each node's data

import { IQuailioNode, UUIDToDataMap } from './types'

export const getUuidToDataMap = (quailioNodes: IQuailioNode[]) => {
  const uuidToData: UUIDToDataMap = {}

  quailioNodes.forEach((activity) => {
    const { id: uuid } = activity

    if (uuidToData[uuid] === undefined) {
      uuidToData[uuid] = { ...activity }
    }

    return uuid
  })

  return uuidToData
}
