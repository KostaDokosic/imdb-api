import { createPaginator } from 'prisma-pagination';

const paginate = createPaginator({ perPage: 10 });
export type SortOrder = 'asc' | 'desc';

export default paginate;
