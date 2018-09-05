declare module namespace {

    export interface ImageLinks {
        smallThumbnail: string;
        thumbnail: string;
    }

    export interface VolumeInfo {
        title: string;
        subtitle: string;
        authors: string[];
        publishedDate: string;
        imageLinks: ImageLinks;
        language: string;
    }

    export interface RootObject {
        volumeInfo: VolumeInfo;
    }
}