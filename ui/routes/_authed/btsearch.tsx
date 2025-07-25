import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCallback, useRef, useState, useEffect } from "react";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
} from "@heroui/react";
import { Icons } from "@/ui/utils/icons";
import type { Selection } from "@heroui/react";
import { BtSearchList } from "@/ui/components/list/btsearch";
import { btSearchItemsQueryOptions } from "@/ui/utils/queryOptions";
import { valibotSearchValidator } from "@tanstack/router-valibot-adapter";
import { btdigParamsSchema } from "@/ui/utils/schema";
import { useIsFetching } from "@tanstack/react-query";
import { RealDebridAccountInfo } from "@/ui/components/real-debrid-account-info";

export const Route = createFileRoute("/_authed/btsearch")({
  component: Component,
  validateSearch: valibotSearchValidator(btdigParamsSchema),
  loaderDeps: ({ search }) => search,
  meta: ({ match }) => [
    {
      title: match.search.q,
    },
  ],
  wrapInSuspense: true,
  loader: async ({ context: { queryClient }, deps }) => {
    await queryClient.ensureQueryData(btSearchItemsQueryOptions(deps));
  },
});

const SearchInput = () => {
  const { q } = Route.useSearch();

  const navigate = useNavigate();

  const [search, setSearch] = useState(q || "");

  const isFetching = useIsFetching({ queryKey: ["btsearch"] });

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // Focus the search input when the page loads
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const onSubmit = useCallback(
    (e: React.BaseSyntheticEvent) => {
      e.preventDefault();
      navigate({
        to: "/btsearch",
        search: (prev) => ({ ...prev, q: search, page: 1 }),
      });
      if (inputRef.current) inputRef.current.blur();
    },
    [search]
  );

  return (
    <form onSubmit={onSubmit} className="w-full">
      <Input
        ref={inputRef}
        label="Search"
        description="Distributed Hash Table (DHT) network · BT4G"
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        classNames={{
          input: "focus:outline-none focus:ring-0"
        }}
      />
    </form>
  );
};

const categoriesList = [
  { value: "all", label: "All" },
  { value: "movie", label: "Movie" },
  { value: "audio", label: "Audio" },
  { value: "doc", label: "Document" },
  { value: "app", label: "Application" },
  { value: "other", label: "Other" },
];

const sortOderList = [
  { value: "time", label: "CreatedAt" },
  { value: "size", label: "Size" },
  { value: "seeders", label: "Seeders" },
  { value: "relevance", label: "Relevance" },
];

const CategorySelect = () => {
  const { category } = Route.useSearch();

  const [selectedKeys, setSelectedKeys] = useState<Selection>(
    new Set([category || "all"])
  );

  const navigate = useNavigate();

  const onSelectionChange = useCallback(
    (keys: Selection) => {
      setSelectedKeys(keys);
      navigate({
        to: "/btsearch",
        search: (prev) => ({ ...prev, category: Array.from(keys)[0] as any }),
        replace: true,
      });
    },
    [setSelectedKeys]
  );

  return (
    <Dropdown
      placement="bottom-end"
      classNames={{
        content: "!bg-radial-1 bg-background",
      }}
    >
      <DropdownTrigger>
        <Button
          title="Category"
          variant="flat"
          className="bg-white/5"
          isIconOnly
        >
          <Icons.Catergory />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Category"
        itemClasses={{
          base: [
            "data-[hover=true]:bg-white/5",
            "data-[selectable=true]:focus:bg-white/5",
          ],
        }}
        disallowEmptySelection
        selectionMode="single"
        items={categoriesList}
        selectedKeys={selectedKeys}
        onSelectionChange={onSelectionChange}
      >
        {(item) => (
          <DropdownItem key={item.value} className="capitalize">
            {item.label}
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
};

const SortBySelect = () => {
  const { orderBy } = Route.useSearch();

  const [selectedKeys, setSelectedKeys] = useState<Selection>(
    new Set([orderBy || "relevance"])
  );

  const navigate = useNavigate();

  const onSelectionChange = useCallback(
    (keys: Selection) => {
      setSelectedKeys(keys);
      navigate({
        to: "/btsearch",
        search: (prev) => ({ ...prev, orderBy: Array.from(keys)[0] as any }),
        replace: true,
      });
    },
    [setSelectedKeys]
  );

  return (
    <Dropdown
      placement="bottom-end"
      classNames={{
        content: "!bg-radial-1 bg-background",
      }}
    >
      <DropdownTrigger>
        <Button
          title="Order By"
          variant="flat"
          className="bg-white/5"
          isIconOnly
        >
          <Icons.Sort />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Order By"
        itemClasses={{
          base: [
            "data-[hover=true]:bg-white/5",
            "data-[selectable=true]:focus:bg-white/5",
          ],
        }}
        disallowEmptySelection
        selectionMode="single"
        items={sortOderList}
        selectedKeys={selectedKeys}
        onSelectionChange={onSelectionChange}
      >
        {(item) => (
          <DropdownItem key={item.value} className="capitalize">
            {item.label}
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
};
function Component() {
  const { q } = Route.useSearch();

  return (
    <div className="grid grid-rows-[auto_1fr_auto] gap-4 size-full">
      <div className="flex gap-4 px-2 w-full md:w-1/2 mx-auto">
        <SearchInput />
        <CategorySelect />
        <SortBySelect />
      </div>
      <BtSearchList />
      {!q && (
        <div className="flex justify-center px-4 pb-4 mt-auto">
          <RealDebridAccountInfo />
        </div>
      )}
    </div>
  );
}
