export type CommunityFilter = {
  lat?: number,
  lng?: number,
  pageNo?: number,
  limit?: number,
  order?: string,
  orderdir?: 'asc' | 'desc',
  search?: string,
  milesSelected?: number,
  communityType?: string,
  searchLocation?: string,
  type?: string
}

export type productFilter = {
  lat?: number,
  lng?: number,
  pageNo?: number,
  limit?: number,
  order?: string,
  orderdir?: 'asc' | 'desc',
  keyword?: string,
  milesSelected?: string[],
  price_min?: number,
  price_max?: number,
  skillsSelected?: string[],
  goodsSelected?: string[],
  searchLocation?: string
}
