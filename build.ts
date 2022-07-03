import { join } from "path";
import { BuildOptions, build as esBuild } from "esbuild";
import { customImportPlugin } from "./custom-import";

const tsconfigJson = join(__dirname, "tsconfig.json");

export const createBuildOptions = (
  isBuild: boolean,
  outDir: string
): BuildOptions => {
  return {
    entryPoints: [join(__dirname, "entry/index.ts")],
    target: "es2020",
    outdir: outDir,
    format: "cjs",
    bundle: true,
    platform: "node",
    tsconfig: tsconfigJson,
    sourcemap: true,
    plugins: [customImportPlugin((process.env as any).CUSTOM)],
    external: [],
    treeShaking: true,
    metafile: isBuild, // 可以生成报告
  };
};

export function build() {
  const outDir = join(__dirname, "dist");
  const buildOptions = createBuildOptions(true, outDir);

  return esBuild(buildOptions);
}

build();
