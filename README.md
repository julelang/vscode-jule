# Jule for Visual Studio Code

[The VS Code Jule extension](https://marketplace.visualstudio.com/items?itemName=julelang.jule) provides language support [for the Jule programming language](https://jule.dev).

## Features

- Syntax highlighting
- Code snippets
- Source code formatting
- Source code documentation

## Quick Start

1.  Install Jule if you haven't already.
2.  Install the [VS Code Jule extension](https://marketplace.visualstudio.com/items?itemName=julelang.jule).
3.  Open any Jule source file or `jule.mod` file to automatically activate the extension. The Jule status bar appears in the bottom right corner of the window and displays your Jule version.
4.  The extension depends on `julec`, `julefmt`, and `juledoc` depending on your usage. See the [Dependencies](#dependencies) section for more details.

## Dependencies

### `julec`

You need [`julec`](https://github.com/julelang/jule) to compile your projects.\
But this extension is depends on `julec` only for version showing features.
To do this, obtain `julec` and add it to the PATH.\
The extension should start using it automatically.

If you have not `julec`, this features will not work and your extension will
show a suggestion to install `julec`.

### `julefmt`

You need [`julefmt`](https://github.com/julelang/julefmt) to use the formatting feature.\
To do this, obtain `julefmt` and add it to the PATH.\
The extension should start using it automatically.

If you have not `julefmt`, formatting will not work.

### `juledoc`

You need [`juledoc`](https://github.com/julelang/juledoc) to use the code documentation feature.\
To do this, obtain `juledoc` and add it to the PATH.\
The extension should start using it automatically.

If you have not `juledoc`, code documentation will not work.

## How to Build and Install

The extension is under development and not yet published. However, we can compile and install it locally. \
To do this, you will need Node.js and TypeScript.

Here are the terminal steps:
- Clone the repository: `git clone https://github.com/julelang/vscode-jule`
- Jump in it: `cd vscode-jule`
- Install the NPM dependencies: `npm ci`

After successfully completing these steps, you should be able to build the extension.\
The `package.sh` file builds the extension for you.\
The output will be a `.VSIX` file.

To install the extension, build it.\
After obtaining the `.VSIX` file, you can install the extension using this file in your VS Code.\
[See more information about manuall installing an extension using VSIX](https://stackoverflow.com/questions/42017617/how-can-i-install-vs-code-extension-manually).

## Contributing

Thanks for you want contributing to vscode-jule!
<br>
Every contribution, big or small, to jule is greatly appreciated.
<br><br>
The vscode-jule project use issues for only bug reports and proposals. \
To contribute, please read the [contribution guidelines](CONTRIBUTING.md).

## Code of Conduct

[See Julenour Code of Conduct](https://jule.dev/code-of-conduct)

## License

The extension is distributed under the terms of the BSD 3-Clause license. <br>
[See License Details](LICENSE)
