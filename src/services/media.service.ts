import { HttpException } from '@exceptions/HttpException';
import { searchApiYoutube, SearchItem, SearchItems } from '@/interfaces/media.interface';
import { YOUTUBE_API_KEY } from '@/config';
import { YoutubeDataAPI } from 'youtube-v3-api';
import ytdl, { videoFormat } from 'ytdl-core';
import { Readable } from 'stream';

declare class MediaServiceMethod {
  getVideo(videoId: string, geformatVideo: videoFormat, range?: { start: number; end: number }): Promise<Readable>;
  getFormatVideo(videoId: string): Promise<[videoFormat, videoFormat]>;
  getVideoUrl(videoId: string): string;
  search(searchString: string): Promise<SearchItems>;
}

export class MediaService extends YoutubeDataAPI implements MediaServiceMethod {
  constructor() {
    super(YOUTUBE_API_KEY);
  }

  getVideoUrl(videoId) {
    return `http://www.youtube.com/watch?v=${videoId}`;
  }

  public async search(searchString) {
    const videosResponse = (await this.searchAll(searchString, 25)) as searchApiYoutube<SearchItems>;
    const videos = videosResponse.items.map(async media => {
      if (!media.id) {
        return false;
      }
      if (media.id.kind.includes('playlist')) {
        const { playlistId } = media.id;
        const {
          pageInfo: { totalResults },
        } = (await this.searchPlaylistItems(playlistId, 0)) as {
          pageInfo: { totalResults: string };
        };

        const playlist = (await this.searchPlaylistItems(playlistId, Number(25 ?? totalResults ?? 0))) as { items: any[] };

        return (playlist.items ?? [])
          .filter(({ snippet }) => snippet.resourceId.kind.includes('video'))
          .map(media => {
            media['id'] = media.snippet.resourceId ?? { videoId: media.contentDetails.videoId };
            const { videoId } = media.id;
            media.id['url'] = `http://localhost:3000/search/video?id=${videoId}`;
            return media;
          });
      }

      const { videoId } = media.id;
      /*       const [{ url }] = await this.getFormatVideo(videoId); */
      /*       media.id['url'] = url ? url : `http://localhost:3000/search/video?id=${videoId}`; */
      media.id['url'] = `http://localhost:3000/search/video?id=${videoId}`;
      return media;
    }) as unknown as Promise<SearchItem>[];

    return (await Promise.all(videos)).filter(Boolean).flat();
  }

  public async getFormatVideo(videoId) {
    const url = this.getVideoUrl(videoId);

    const { formats } = await ytdl.getBasicInfo(url);

    const formatVideo = formats.find(({ mimeType }) => mimeType.includes('video'));
    const formatAudio = formats.find(({ mimeType }) => mimeType.includes('audio'));

    return [formatVideo, formatAudio] as [videoFormat, videoFormat];
  }

  public async getVideo(videoId, format, range?) {
    try {
      const url = this.getVideoUrl(videoId);

      const videoStream = ytdl(url, {
        filter: formatFilter => Object.entries(format).every(([key, value]) => formatFilter[key] === value),
        range,
        dlChunkSize: 256 * 1024,
      });

      if (!videoStream) throw new HttpException(409, "Video doesn't exist");

      return videoStream;
    } catch (e) {
      throw Error(e);
    }
  }

  /*   public async createUser(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: User = this.users.find(user => user.email === userData.email);
    if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = { id: this.users.length + 1, ...userData, password: hashedPassword };
    this.users = [...this.users, createUserData];

    return createUserData;
  }

  public async updateUser(userId: number, userData: CreateUserDto): Promise<User[]> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: User = this.users.find(user => user.id === userId);
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    const hashedPassword = await hash(userData.password, 10);
    const updateUserData: User[] = this.users.map((user: User) => {
      if (user.id === findUser.id) user = { id: userId, ...userData, password: hashedPassword };
      return user;
    });

    return updateUserData;
  }

  public async deleteUser(userId: number): Promise<User[]> {
    const findUser: User = this.users.find(user => user.id === userId);
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    const deleteUserData: User[] = this.users.filter(user => user.id !== findUser.id);
    return deleteUserData;
  } */
}
