import "server-only";
import type { oEmbedProvider } from "@lib/oembed";

export async function fetchDefaultProviders(): Promise<oEmbedProvider[]> {
  const res = await fetch("https://oembed.com/providers.json", { next: { revalidate: 3600 } });
  const response = (await res.json()) as oEmbedProvider[];

  // Embeds are whitelisted and implemented individually,
  // to prevent unwanted tracking by the linked services.
  const allowedProviders = ["YouTube"];

  const providers = allowedProviders.map(name => response.find(p => p.provider_name === name));

  return normalizeProviders(providers.filter(p => p != null));
}

function normalizeProviders(data: oEmbedProvider[]) {
  // Ensure `endpoints` and `schemes` aren't undefined
  for (const provider of data) {
    provider.endpoints ??= [];
    for (const endpoint of provider.endpoints!) {
      endpoint.schemes ??= [];
      for (let i = 0, length = endpoint.schemes.length; i < length; i++) {
        // Replace "simple patterns" with regex patterns
        const regex = endpoint.schemes[i].replaceAll(".", "\\.").replaceAll("*", ".*");
        endpoint.schemes[i] = "^" + regex + "$";
      }
    }
  }
  return data as unknown as oEmbedProvider[];
}
