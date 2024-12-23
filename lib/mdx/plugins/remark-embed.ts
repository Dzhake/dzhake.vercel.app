import type { Transformer } from "unified";
import type { Node, Nodes, Paragraph } from "mdast";
import { visit } from "unist-util-visit";
import transformIntoMdxJsx from "../misc/transformIntoMdxJsx";
import { oEmbedConfig as oEmbedConfigBase, oEmbedProvider, getOEmbed } from "@lib/oembed";
import { fetchDefaultProviders as fetchProvidersServer } from "@api/oembed/default-providers";

type oEmbedConfig = oEmbedConfigBase<{ componentName?: string }>;

export interface RemarkEmbedOptions {
  componentName?: string;
  providers?: (getDefaultProviders: () => Promise<oEmbedProvider[]>) => Promise<oEmbedProvider[]>;
  overrides?: oEmbedConfig["overrides"];
  size?: [width: number, height: number];
}

export default function remarkEmbed(options: RemarkEmbedOptions = {}): Transformer<Nodes> {
  const defaultComponentName = options.componentName ?? "Embed";

  const fetchProviders = typeof window === "undefined" ? fetchProvidersServer : fetchProvidersClient;

  async function fetchProvidersClient() {
    const res = await fetch("/api/oembed/default-providers", { next: { revalidate: 3600 } });
    return (await res.json()) as oEmbedProvider[];
  }

  // Do the fetch request once per plugin instantiation
  let providers: oEmbedProvider[] = [];
  const initProvidersPromise = (async () => {
    providers = await (options.providers ?? (f => f()))(fetchProviders);
  })();

  return async tree => {
    await initProvidersPromise;

    const oEmbedConfig: oEmbedConfig = {
      providers,
      overrides: options.overrides,
      size: options.size ?? [800, 450],
    };

    // Function for transforming nodes into embeds
    async function transformIntoEmbed(node: Node, url: string) {
      try {
        const info = getOEmbed(oEmbedConfig, url);
        if (!info) return;
        const response = await info.response();
        if (!response) return;

        // Transform the node into a MdxJsx component with necessary attributes
        const componentName = info.override?.componentName ?? defaultComponentName;
        const attrs = { url: url, data: JSON.stringify(response) };
        transformIntoMdxJsx(node, componentName, attrs);
      } catch (error) {
        console.error(error);
      }
    }

    const tasks: Promise<unknown>[] = [];

    // Start an embed transformation task for every single-link paragraph
    visit(tree, "paragraph", (node: Paragraph) => {
      if (node.children.length === 1 && node.children[0].type === "link") {
        const link = node.children[0];
        tasks.push(transformIntoEmbed(node, link.url));
      }
    });

    await Promise.all(tasks);
  };
}
