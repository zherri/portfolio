import { FileSystem, NodeType } from "@/core/filesystem";

export const ROOT_DIR = "myportfolio";

export class Shell {
  private static VALID_CMDS: string[] = ["clear", "cd", "ls", "cat"];

  static isValidCmd(cmd: string): boolean {
    return this.VALID_CMDS.includes(cmd);
  }

  static cd(
    cwd: string,
    path: string | null,
    setCwd: (cwd: string) => void,
  ): string {
    var node = FileSystem.findNode(cwd);

    if (path == null && node != undefined) {
      setCwd(ROOT_DIR);
    }

    if (path != null) {
      var pathSplit = path.split("/");
      pathSplit = pathSplit.filter((fileName) => fileName != "");
      pathSplit.forEach((fileName) => {
        if (fileName === "..") {
          if (node?.parent == null) return;
          node = FileSystem.findNodeById(node?.parent);
        } else {
          node = FileSystem.findNode(fileName);
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

  static ls(cwd: string, path: string | null): string {
    var node = FileSystem.findNode(cwd);

    if (path == null && node != undefined) {
      return FileSystem.getChildren(node);
    }

    if (path != null) {
      var pathSplit = path.split("/");
      pathSplit = pathSplit.filter((fileName) => fileName != "");
      pathSplit.forEach((fileName) => {
        if (fileName === "..") {
          if (node?.parent == null) return;
          node = FileSystem.findNodeById(node?.parent);
        } else {
          node = FileSystem.findNode(fileName);
        }
      });
      if (node != undefined) {
        if (node.type === NodeType.Folder) {
          return FileSystem.getChildren(node);
        }
        return path;
      }
    }

    return '"' + path + '": No such file or directory';
  }

  static cat(arg: string): string {}
}
