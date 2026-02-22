import { FileSystem, Node, NodeType } from "@/core/filesystem";

export const ROOT_DIR = "myportfolio";

export class Shell {
  private static VALID_CMDS: string[] = ["clear", "cd", "ls", "cat"];
  private fileSystem: FileSystem;

  constructor(files: Node[]) {
    this.fileSystem = new FileSystem(files);
  }

  static isValidCmd(cmd: string): boolean {
    return this.VALID_CMDS.includes(cmd);
  }

  interpret(
    args: string[],
    cwd: string,
    setCwd: (cwd: string) => void,
  ): string {
    var print = "";

    switch (args[0]) {
      case "cd":
        if (2 in args) {
          print = "cd: too many arguments";
          break;
        }
        print = this.cd(cwd, args[1] ?? null, setCwd);
        break;
      case "ls":
        if (2 in args) {
          print = "ls: too many arguments";
          break;
        }
        print = this.ls(cwd, args[1] ?? null);
        break;
    }

    return print;
  }

  private cd(
    cwd: string,
    path: string | null,
    setCwd: (cwd: string) => void,
  ): string {
    var node = this.fileSystem.findNode(cwd);

    if (path == null && node != undefined) {
      setCwd(ROOT_DIR);
    }

    if (path != null) {
      var pathSplit = path.split("/");
      pathSplit = pathSplit.filter((fileName) => fileName != "");
      pathSplit.forEach((fileName) => {
        if (fileName === "..") {
          if (node?.parent == null) return;
          node = this.fileSystem.findNodeById(node?.parent);
        } else {
          node = this.fileSystem.findNode(fileName);
        }
      });
      if (node === undefined) {
        return "cd: no such directory: " + path;
      }

      if (node.type !== NodeType.Folder) {
        return "cd: not a directory: " + path;
      }
      setCwd(node.name);
    }

    return "";
  }

  private ls(cwd: string, path: string | null): string {
    var node = this.fileSystem.findNode(cwd);

    if (path == null && node != undefined) {
      return this.fileSystem.getChildren(node);
    }

    if (path != null) {
      var pathSplit = path.split("/");
      pathSplit = pathSplit.filter((fileName) => fileName != "");
      pathSplit.forEach((fileName) => {
        if (fileName === "..") {
          if (node?.parent == null) return;
          node = this.fileSystem.findNodeById(node?.parent);
        } else {
          node = this.fileSystem.findNode(fileName);
        }
      });
      if (node != undefined) {
        if (node.type === NodeType.Folder) {
          return this.fileSystem.getChildren(node);
        }
        return path;
      }
    }

    return '"' + path + '": No such file or directory';
  }

  private cat(arg: string): string {}
}
