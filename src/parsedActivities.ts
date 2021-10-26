import { IParsedNode, IQuailioNode } from './types'

export const getParsedNodes = (
  quailioNodes: IQuailioNode[],
): IParsedNode[] => {
  return quailioNodes.map((activity) => {
    const { id: uuid, name, relationships } = activity
    const relatedIds = Object.keys(relationships)

    return {
      id: uuid,
      name,
      relatedIds,
    }
  })
}
