import type { PluginBuild, OnResolveArgs } from "esbuild"; 
export const customImportPlugin = (custom: string) => ({
  name: "custom-import",
  setup(build: PluginBuild) {
    // 检测需要特殊import的模块
    build.onResolve({ filter: /^\$src\// }, async (args: OnResolveArgs) => {
      // 检测定制化目录下是否有可代替的模块
      const result = await build.resolve(
        `$customers/${custom}/${args.path.replace(/^\$src\//, "")}`,
        { resolveDir: args.resolveDir }
      );
      // 报错则走import 默认行为
      if (result.errors.length > 0) {
        return undefined;
      }
      return { path: result.path };
    });
  },
});
