export type Relationship = { [id: string]: string }

export interface IQuailioNode {
  id: string
  name: string
  relationships: Relationship
  content: string
}

export interface IQuailioNetworkJSON {
  id: string
  name: string
  people: IQuailioNode[]
}

interface IOutputNode {
  id: string
  name: string
}

export interface IParsedNode extends IOutputNode {
  relatedIds: string[]
}

export interface IParsedWithRelatedStrings extends IOutputNode {
  related: string[]
}

export type UUIDToDataMap = { [uuid: string]: IQuailioNode }
