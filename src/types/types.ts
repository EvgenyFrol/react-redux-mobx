export type UserType = {
  avatar: string,
  email: string,
  first_name: string,
  last_name: string,
  id: number
}

export type UserState = {
  users: UserType[],
  loading: boolean,
  error: null | string,
  localUsers: any
}

export type UserAction = {
  type: string,
  payload?: any
}

export type ApiData = {
  data: UserType[],
  page: number,
  per_page: number,
  supports: any,
  total: 12,
  total_pages: 2
}
