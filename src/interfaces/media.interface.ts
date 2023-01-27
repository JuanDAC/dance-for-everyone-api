/* 
type AsyncReturnType<T extends (...args: any) => any> = T extends (...args: any) => Promise<infer U>
  ? U
  : T extends (...args: any) => infer U
  ? U
  : any;
 */

export type SearchItem = {
  kind: string; // "youtube#searchResult",
  etag: string; // "CC-vtoC-R7aodt8iuJyckKBwhFg",
  id: {
    kind: string; // "youtube#video",
    videoId?: string; // "SuQ1rtHvrdc"
    playlistId?: string; // "SuQ1rtHvrdc"
    url: string;
  };
  snippet: {
    publishedAt: string; // "2023-01-25T15:00:17Z",
    channelId: string; // "UCczFdwWpVEpoqb-eMm4c4dQ",
    title: string; // "Bad Bunny - Efecto Dance | Matt Steffanina Choreography",
    description: string; // "Had to do another Bad Bunny routine after you guys loved the last one! Learn The Dance Here: https://dncr.com/firstweek/ ...",
    thumbnails: {
      default: {
        url: string; // "https://i.ytimg.com/vi/SuQ1rtHvrdc/default.jpg",
        width: number; // 120,
        height: number; //  90
      };
      medium: {
        url: string; // "https://i.ytimg.com/vi/SuQ1rtHvrdc/mqdefault.jpg",
        width: number; // 320,
        height: number; // 180
      };
      high: {
        url: string; // "https://i.ytimg.com/vi/SuQ1rtHvrdc/hqdefault.jpg",
        width: number; // 480,
        height: number; // 360
      };
    };
    channelTitle: string; // "Matt Steffanina",
    liveBroadcastContent: string; // "none",
    publishTime: string; // "2023-01-25T15:00:17Z"
  };
};

export type SearchItems = SearchItem[];

export type searchApiYoutube<T> = {
  kind: string; //"youtube#searchListResponse",
  etag: string; //"47YmyIAAys1aFKW6mksisOBMJM4",
  nextPageToken: string; //"CAUQAA",
  regionCode: string; //"CO",
  pageInfo: {
    totalResults: number; // 1000000,
    resultsPerPage: number;
  };
  items: T;
};
