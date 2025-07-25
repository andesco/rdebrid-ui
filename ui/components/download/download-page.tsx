import type { DebridUnlock, DownloadTab } from "@/types";
import { Avatar, Button, Tab, Tabs, Tooltip, Card, CardBody, CardHeader } from "@heroui/react";
import { getRouteApi, Outlet } from "@tanstack/react-router";
import { useDebridStore } from "@/ui/utils/store";
import { Icons } from "@/ui/utils/icons";
import { memo, useMemo } from "react";
import { CopyButton } from "@/ui/components/copy-button";

const titleMap = {
  links: "Unrestrict Links",
  torrents: "Add Torrents",
};

const getIcon = (tab: DownloadTab) => {
  switch (tab) {
    case "links":
      return <Icons.Link />;
    case "torrents":
      return <Icons.BitTorrent />;
  }
};

const routeApi = getRouteApi("/_authed/downloader/$tabId");

interface DownloadListItemProps {
  item: DebridUnlock;
}

export const UnlockListItem = memo(({ item }: DownloadListItemProps) => {
  return (
    <Card className="w-full">
      <CardBody className="flex flex-row items-center gap-3 p-3">
        <Avatar
          title={item.host}
          src={item.host_icon}
          size="sm"
        />
        <div className="flex-1">
          <p className="font-medium text-sm truncate">
            {item.error ? item.link : item.filename}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {item.error ? (
            <Tooltip
              content={item.error.replaceAll("_", " ")}
              color="danger"
            >
              <Button
                isIconOnly
                variant="light"
                color="danger"
              >
                <Icons.Exclamation />
              </Button>
            </Tooltip>
          ) : (
            <Icons.CheckCircle className="text-success" />
          )}
          <Button
            variant="solid"
            color="primary"
            as="a"
            isIconOnly
            isDisabled={!!item.error || item.streamable === 0}
            href={item.download}
            rel="noopener noreferrer"
          >
            <Icons.DownloadDashed />
          </Button>
        </div>
      </CardBody>
    </Card>
  );
});

export const DownloadPage = () => {
  const tabId = routeApi.useParams().tabId as DownloadTab;

  const navigate = routeApi.useNavigate();

  const files = useDebridStore((state) => state.unRestrictedFiles);

  const copyContent = useMemo(
    () =>
      files
        .filter((item) => item.download)
        .map((item) => item.download)
        .join("\n"),
    [files]
  );

  return (
    <div className="flex flex-col gap-4 max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <h1 className="text-xl font-bold">{titleMap[tabId]}</h1>
        </CardHeader>
        <CardBody>
          <Tabs
            color="primary"
            selectedKey={tabId}
            onSelectionChange={(key) =>
              navigate({ params: { tabId: key as DownloadTab } })
            }
          >
            {["torrents", "links"].map((tab) => (
              <Tab
                key={tab}
                title={
                  <div className="flex items-center space-x-2">
                    {getIcon(tab as DownloadTab)}
                    <span className="capitalize">{tab as DownloadTab}</span>
                  </div>
                }
              >
                <div className="mt-4">
                  <Outlet />
                </div>
              </Tab>
            ))}
          </Tabs>
        </CardBody>
      </Card>
      
      {files.length > 0 && (
        <Card>
          <CardHeader className="flex justify-between">
            <h2 className="text-lg font-semibold">Download Links</h2>
            <CopyButton value={copyContent} title="Copy Links" />
          </CardHeader>
          <CardBody className="flex flex-col gap-3 max-h-96 overflow-y-auto">
            {files.map((item) => (
              <UnlockListItem key={item.id} item={item} />
            ))}
          </CardBody>
        </Card>
      )}
    </div>
  );
};
