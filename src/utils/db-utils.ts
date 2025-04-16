export const calculateSkip = (page: number, perPage: number) =>
  page - 1 > 0 ? (page - 1) * perPage : 0
