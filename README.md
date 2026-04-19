# Jule for Visual Studio Code

Official Jule extension for Visual Studio Code.

## Features

- Syntax highlighting
- Snippets
- Source code formatting ([`julefmt`](https://github.com/julelang/julefmt) must be in the PATH)

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

You need [`julefmt`](https://github.com/julelang/julefmt) to use the formatting feature.\
To do this, obtain `julefmt` and add it to the PATH.\
The extension should start using it automatically.

## Contributing

Thanks for you want contributing to VSCode-Jule!
<br>
Every contribution, big or small, to Jule is greatly appreciated.
<br><br>
The VSCode-Jule project use issues for only bug reports and proposals. \
To contribute, please read the [contribution guidelines](CONTRIBUTING.md).

## Code of Conduct

[See Julenour Code of Conduct](https://jule.dev/code-of-conduct)

## License

The extension is distributed under the terms of the BSD 3-Clause license. <br>
[See License Details](LICENSE)
