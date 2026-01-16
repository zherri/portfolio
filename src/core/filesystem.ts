export enum NodeType {
  File,
  Exe,
  Folder,
}

export interface Node {
  path: string;
  type: NodeType;
  children: string[] | null;
  edge: boolean;
}

export class FileSystem {
  files: Node[] = FILES;

  async findNode(path: string): Promise<Node | undefined> {
    return this.files.find((node) => node.path === path);
  }
}

const FILES: Node[] = [
  {
    path: "/myportfolio",
    type: NodeType.Folder,
    children: [],
    edge: true,
  },
  {
    path: "/myportfolio/about.bin",
    type: NodeType.Exe,
    children: null,
    edge: false,
  },
  {
    path: "/myportfolio/stacks",
    type: NodeType.Folder,
    children: [],
    edge: true,
  },
  {
    path: "/myportfolio/projects",
    type: NodeType.Folder,
    children: [],
    edge: true,
  },
  {
    path: "/myportfolio/experience",
    type: NodeType.Folder,
    children: [],
    edge: true,
  },
];
