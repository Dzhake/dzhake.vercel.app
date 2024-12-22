import React from "react";
import { VFile, type VFileCompatible } from "vfile";
import { compile, type CompileOptions } from "@mdx-js/mdx";
import { jsxRuntime } from "./jsx-runtime.cjs";
import { extractFrontmatter } from "@lib/mdx/frontmatter";
import type { MDXComponents, MDXModule } from "mdx/types";
import type { PluggableList } from "unified";

export type { MDXComponents as MdxComponents, MDXProps as MdxProps } from "mdx/types";

export interface MdxOptions {
  format?: "md" | "mdx";
  rehypePlugins: PluggableList;
  remarkPlugins: PluggableList;
  scope?: Record<string, unknown>;
  components?: MDXComponents;
  extraOutputComponents?: React.FunctionComponent[];
}

export interface MdxResult<FM> {
  source: string;
  frontmatter?: FM;
  content: React.ReactNode;
}

export async function compileMdx<FM>(markdown: VFileCompatible, options: MdxOptions): Promise<MdxResult<FM>> {
  const vfile = new VFile(markdown);
  const { frontmatter } = extractFrontmatter<FM>(vfile, true);

  const compileOptions: CompileOptions = {
    format: options.format ?? "md",
    rehypePlugins: options.rehypePlugins,
    remarkPlugins: options.remarkPlugins,
    outputFormat: "function-body",
    development: process.env.NODE_ENV === "development",
  };

  const source = String(await compile(vfile, compileOptions));
  const { default: Content } = await compileMdxModule(source, { ...options.scope, frontmatter });
  let content: React.ReactNode = React.createElement(Content, { components: options.components });

  if (options.extraOutputComponents) {
    const extra = options.extraOutputComponents.map(component => React.createElement(component));
    content = React.createElement(React.Fragment, undefined, content, ...extra);
  }

  return { frontmatter, source, content };
}

interface AsyncFunctionConstructor {
  new <Args extends unknown[], Return>(...args: string[]): (...args: Args) => Promise<Return>;
}
const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor as AsyncFunctionConstructor;

function compileMdxModule(source: string, scope: Record<string, unknown> | null) {
  // Note: jsxRuntime needs to be accessible through arguments[0]
  scope = { jsxRuntime, ...scope };

  const keys = Object.keys(scope);
  const values = Object.values(scope);

  type InitModule = (...args: unknown[]) => Promise<MDXModule>;
  const init = Reflect.construct(AsyncFunction, keys.concat(source)) as InitModule;

  return init.apply(init, values);
}
