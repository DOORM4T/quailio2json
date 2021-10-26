import { IParsedNode, IParsedWithRelatedStrings, UUIDToDataMap } from './types'

export function getAllParsedWithRelNames(
  uuidToData: UUIDToDataMap,
  parsedNodes: IParsedNode[],
): IParsedWithRelatedStrings[] {
  return parsedNodes.map((activity) =>
    getParsedWithRelNames(uuidToData, activity),
  )
}

// Converts the relatedIds field to the actual list of related node names
export function getParsedWithRelNames(
  uuidToData: UUIDToDataMap,
  parsedNode: IParsedNode,
): IParsedWithRelatedStrings {
  const { id, name } = parsedNode
  const relatedUuids = parsedNode.relatedIds.map((id) => uuidToData[id].id)
  const related = relatedUuids.map((uuid) => uuidToData[uuid].name)
  return { id, name, related }
}
