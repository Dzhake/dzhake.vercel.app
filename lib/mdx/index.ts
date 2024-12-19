import React from "react";
import { VFile, type VFileCompatible } from "vfile";
import { compile, type CompileOptions } from "@mdx-js/mdx";
import { jsxRuntime } from "./jsx-runtime.cjs";
import { extractFrontmatter } from "@lib/mdx/frontmatter";
import type { MDXComponents, MDXContent, MDXModule, MDXProps } from "mdx/types";
import type { PluggableList } from "unified";

export type { MDXComponents as MdxComponents, MDXProps as MdxProps } from "mdx/types";

export interface MdxOptions {
  format?: "md" | "mdx";
  rehypePlugins: PluggableList;
  remarkPlugins: PluggableList;
  scope?: Record<string, unknown>;
  components?: MDXComponents;
}

export interface MdxResult<Frontmatter> {
  source: string;
  frontmatter?: Frontmatter;
  content: React.ReactElement<MDXProps, MDXContent>;
}

export async function compileMdx<Frontmatter>(
  markdown: VFileCompatible,
  options: MdxOptions,
): Promise<MdxResult<Frontmatter>> {
  const vfile = new VFile(markdown);
  const { frontmatter } = extractFrontmatter<Frontmatter>(vfile, true);

  const compileOptions: CompileOptions = {
    format: options.format ?? "md",
    rehypePlugins: options.rehypePlugins,
    remarkPlugins: options.remarkPlugins,
    outputFormat: "function-body",
    development: process.env.NODE_ENV === "development",
  };

  const mdxModuleSource = String(await compile(vfile, compileOptions));
  const mdxModule = await compileMdxModule(mdxModuleSource, { ...options.scope, frontmatter });
  const content = React.createElement(mdxModule.default, { components: options.components });

  return { frontmatter, source: mdxModuleSource, content };
}

interface AsyncFunctionConstructor {
  new <Args extends unknown[], Return>(...args: string[]): (...args: Args) => Promise<Return>;
}
const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor as AsyncFunctionConstructor;

export function compileMdxModule(source: string, scope: Record<string, unknown> | null) {
  // Note: jsxRuntime needs to be accessible through arguments[0]
  scope = { jsxRuntime, ...scope };

  const keys = Object.keys(scope);
  const values = Object.values(scope);

  type InitModule = (...args: unknown[]) => Promise<MDXModule>;
  const init = Reflect.construct(AsyncFunction, keys.concat(source)) as InitModule;

  return init.apply(init, values);
}
