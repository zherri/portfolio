export enum NodeType {
  File,
  Exe,
  Folder,
}

export interface Node {
  id: string;
  name: string;
  type: NodeType;
  parent: string | null;
  children: string[] | null;
}

const FILES: Node[] = [
  {
    id: "1",
    name: "myportfolio",
    type: NodeType.Folder,
    parent: null,
    children: ["2", "3", "4", "5"],
  },
  {
    id: "2",
    name: "about.bin",
    type: NodeType.Exe,
    parent: "1",
    children: null,
  },
  {
    id: "3",
    name: "stacks",
    type: NodeType.Folder,
    parent: "1",
    children: [],
  },
  {
    id: "4",
    name: "projects",
    type: NodeType.Folder,
    parent: "1",
    children: [],
  },
  {
    id: "5",
    name: "experience",
    type: NodeType.Folder,
    parent: "1",
    children: [],
  },
];

export class FileSystem {
  private files: Node[];

  constructor(files: Node[]) {
    this.files = files;
  }

  findNode(name: string): Node | undefined {
    return this.files.find((node) => node.name === name);
  }

  findNodeById(id: string): Node | undefined {
    return FILES.find((node) => node.id === id);
  }

  getChildren(node: Node): string {
    var files: string[] = [];
    node.children?.forEach((child) => {
      const childName = this.findNodeById(child)?.name;
      if (childName != undefined) {
        files.push(childName);
      }
    });
    return files.join("  ");
  }
}
