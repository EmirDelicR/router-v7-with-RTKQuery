import { Pagination } from '@mantine/core';
import { useSearchParams } from 'react-router';

export default function CustomPagination({
  totalCount,
}: {
  totalCount: number;
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page') || 1);

  const onChange = (p: number) => {
    searchParams.set('page', `${p}`);
    setSearchParams(searchParams);
  };

  return (
    <Pagination
      total={totalCount}
      value={currentPage}
      onChange={onChange}
      mt="sm"
    />
  );
}
