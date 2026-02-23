import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import { WebContainer } from "@webcontainer/api";

export async function initWebContainer(term: Terminal, fitAddon: FitAddon) {
    const instance = await WebContainer.boot();

    await instance.mount({
        myportfolio: {
            directory: {
                "hello.txt": {
                    file: { contents: "Olá, mundo!" },
                },
            },
        },
    });

    const shellProcess = await instance.spawn("jsh", {
        terminal: {
            cols: term.cols,
            rows: term.rows,
        },
        cwd: "myportfolio",
    });

    const input = shellProcess.input.getWriter();
    term.onData((data) => {
        input.write(data);
    });

    shellProcess.output.pipeTo(
        new WritableStream({
            write(data) {
                term.write(data);
            },
        }),
    );

    window.addEventListener("resize", () => {
        fitAddon.fit();
        shellProcess.resize({
            cols: term.cols,
            rows: term.rows,
        });
    });
}
