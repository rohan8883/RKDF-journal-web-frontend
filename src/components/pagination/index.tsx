import {
  Pagination,
  PaginationContent,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination';
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem
} from '@/components/ui/select';

//   using react js page or perpage

type PaginationProps = {
  page?: number;
  perPage?: number;
  totalPage?: number;
  hasNextPage?: boolean;
  hasPrevPage?: boolean;
  setPage?: (page: any) => void;
  setPerPage?: (perPage: any) => void;
};

const PER_PAGE_OPTIONS = [5, 10, 15, 20, 40];

export default function PaginationComponent({
  page,
  perPage,
  totalPage,
  hasNextPage,
  hasPrevPage,
  setPage,
  setPerPage
}: Readonly<PaginationProps>) {
  return (
    <div className="flex justify-between items-center gap-2">
      <div>
        <Select value={String(perPage)} onValueChange={(e) => setPerPage!(e)}>
          <SelectTrigger className="h-7">
            <SelectValue>{perPage}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {PER_PAGE_OPTIONS.map((item) => (
              <SelectItem key={item} value={String(item)}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Pagination>
        <PaginationPrevious
          className="cursor-pointer text-xs"
          onClick={() => {
            if (!hasPrevPage) return;
            setPage!((prev: number) => prev - 1);
          }}
        >
          Previous
        </PaginationPrevious>
        <PaginationContent className="text-xs">
          {page} of {Math.ceil(totalPage! / perPage!)}
        </PaginationContent>

        {/* using paginationEllipsis */}

        <PaginationNext
          className="cursor-pointer text-xs"
          aria-disabled={page == totalPage! / perPage! ? true : false}
          onClick={() => {
            if (!hasNextPage) return;
            setPage!((prev: number) => prev + 1);
          }}
        >
          Next
        </PaginationNext>
      </Pagination>
    </div>
  );
}
