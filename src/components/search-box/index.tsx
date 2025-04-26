import React from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { ReloadIcon } from '@radix-ui/react-icons';

type Props = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  refetch: () => void;
  isFetching?: boolean;
  setPage?: (page: number) => void;
};

export default function SearchBox({
  search,
  setSearch,
  isFetching,
  refetch,
  setPage
}: Readonly<Props>) {
  return (
    <div className="flex items-center gap-4">
      <Input
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        placeholder="Search"
        className="rounded-lg w-full"
        prefix="search"
      />
      <span className="">
        <Button
          size="sm"
          className="bg-primary text-white"
          onClick={() => {
            refetch();
            if (setPage) {
              setPage(1);
            }
          }}
          disabled={isFetching}
        >
          {isFetching ? <ReloadIcon /> : 'Search'}
        </Button>
      </span>
    </div>
  );
}
