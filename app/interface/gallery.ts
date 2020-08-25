export enum Category {
  'Doujinshi' = 'Doujinshi',
  'Manga' = 'Manga',
  'Artist_CG' = 'Artist_CG',
  'Game_CG' = 'Game_CG',
  'Western' = 'Western',
  'Non-H' = 'Non-H',
  'Image_Set' = 'Image_Set',
  'Cosplay' = 'Cosplay',
  'Asian_Porn' = 'Asian_Porn',
  'Misc' = 'Misc',
}
export interface IndexListItemPorps {
  gid: string
  token: string
  archiver_key: string
  title: string
  title_jpn: string
  category: Category
  thumb: string
  uploader: string
  posted: string
  filecount: string
  filesize: string
  expunged: boolean
  rating: string
  language: string
  torrentcount: string
  tags: string[]
  url: string
  path: string
  rating_count: string
  favcount: string
  favoritelink: string
}

export interface Torrent {
  downloads: string
  peers: string
  posted: number
  seeds: string
  size: string
  uploader: string
  hash: string
  name: string
  url: string
}

export interface DetailPageListItemProps {
  thumb: string
  url: string
}
export interface commentListItemProps {
  time: string
  userName: string
  comment: string
  score: string
}
export interface tagListItemProps {
  namespace: string
  namespace_CHS: string
  description: string
  tags: {
    name: string
    name_CHS: string
    intro: string
    keyword: string
    dash: boolean
  }[]
}

export interface Detailpage {
  info: IndexListItemPorps
  list: DetailPageListItemProps[]
  commentList: commentListItemProps[]
  tagList: tagListItemProps[]
  error?: boolean
}

export interface GalleriesPage {
  list?: IndexListItemPorps[]
  total?: number
  error?: boolean
  message?: string
}
export interface PageListProps {
  initialData: DetailPageListItemProps[]
  url: string
  filecount: number
}
