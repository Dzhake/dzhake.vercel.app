export interface oEmbedProvider {
  provider_name: string;
  provider_url: string;
  endpoints: oEmbedEndpoint[];
}
export interface oEmbedEndpoint {
  schemes: string[];
  url: string;
  discovery?: boolean;
  formats?: ("json" | "xml")[];
  params?: Record<string, string | number | boolean>;
}

interface oEmbedResponseBase {
  type: "photo" | "video" | "link" | "rich";
  version: "1.0";
  title?: string;
  author_name?: string;
  author_url?: string;
  provider_name?: string;
  provider_url?: string;
  cache_age?: number;
  thumbnail_url?: string;
  thumbnail_width?: number;
  thumbnail_height?: number;
}
export interface oEmbedPhotoResponse extends oEmbedResponseBase {
  type: "photo";
  url: string;
  width: number;
  height: number;
}
export interface oEmbedVideoResponse extends oEmbedResponseBase {
  type: "video";
  html: string;
  width: number;
  height: number;
}
export interface oEmbedLinkResponse extends oEmbedResponseBase {
  type: "link";
  width?: never;
  height?: never;
}
export interface oEmbedRichResponse extends oEmbedResponseBase {
  type: "rich";
  html: string;
  width: number;
  height: number;
}

export type oEmbedResponse = oEmbedPhotoResponse | oEmbedVideoResponse | oEmbedLinkResponse | oEmbedRichResponse;
export type oEmbedResponseType = oEmbedResponse["type"];
