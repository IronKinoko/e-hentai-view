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
  torrentcount: string
  tags: string[]
  url: string
  time: string
  path: string
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
  name: string
  tags: { name: string; keyword: string; dash: boolean }[]
}

export interface Detailpage {
  info: IndexListItemPorps
  list: DetailPageListItemProps[]
  commentList: commentListItemProps[]
  tagList: tagListItemProps[]
}

export interface GalleriesPage {
  list?: IndexListItemPorps[]
  total?: number
  error?: boolean
  message?: string
}
