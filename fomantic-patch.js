const chalk = require("chalk");
const fs = require("fs");
const logSymbols = require("log-symbols");
const path = require("path");

const nodeModulesPath = path.resolve(process.cwd(), "node_modules");

const hasPackage = (packageName) => {
    return fs.existsSync(path.resolve(nodeModulesPath, packageName));
};

const replaceDoubleSemiColon = (input) =>
    input.replace("utf-8;;base64", "utf-8;base64");

const run = async () => {
    if (hasPackage("fomantic-ui-css")) {
        console.log(logSymbols.info, `Detected "fomantic-ui-css" package...`);

        const fileToPatchPath = path.resolve(
            nodeModulesPath,
            "fomantic-ui-css",
            "semantic.css",
        );

        if (fs.existsSync(fileToPatchPath)) {
            fs.writeFileSync(
                fileToPatchPath,
                replaceDoubleSemiColon(
                    fs.readFileSync(fileToPatchPath, { encoding: "utf8" }),
                ),
            );
            console.log(logSymbols.info, `Patch was successfully applied`);
        } else {
            console.log(
                logSymbols.error,
                chalk.bgRed.bold(
                    `Failed to find "${path.resolve(
                        process.cwd(),
                        fileToPatchPath,
                    )}", please check your installation of "fomantic-ui-less"`,
                ),
            );
        }
    } else if (hasPackage("semantic-ui-css")) {
        const filesToPatchPath = [
            path.resolve(nodeModulesPath, "semantic-ui-css", "semantic.css"),
            path.resolve(
                nodeModulesPath,
                "semantic-ui-css",
                "semantic.min.css",
            ),
            path.resolve(
                nodeModulesPath,
                "semantic-ui-css",
                "components",
                "step.css",
            ),
            path.resolve(
                nodeModulesPath,
                "semantic-ui-css",
                "components",
                "step.min.css",
            ),
        ];

        filesToPatchPath.forEach((fileToPatchPath) => {
            fs.writeFileSync(
                fileToPatchPath,
                replaceDoubleSemiColon(
                    fs.readFileSync(fileToPatchPath, { encoding: "utf8" }),
                ),
            );
        });

        console.log(logSymbols.info, `Patch was successfully applied`);
    } else {
        console.log(logSymbols.info, `No supported packages found`);
    }
};

run();
