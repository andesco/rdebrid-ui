import { Chip } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { debridUserQueryOptions } from "@/ui/utils/queryOptions";

export const RealDebridAccountInfo = () => {
  const { data: user, isLoading, error } = useQuery(debridUserQueryOptions());

  // Debug logging
  console.log('RealDebridAccountInfo:', { user, isLoading, error });

  if (isLoading) return <div>Loading account info...</div>;
  if (error) return <div>Error loading account: {error.message}</div>;
  if (!user) return <div>No user data available</div>;

  const getDaysRemainingColor = (expiration: string) => {
    const expirationDate = new Date(expiration);
    const now = new Date();
    const daysRemaining = Math.ceil((expirationDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysRemaining <= 0) return "danger";
    if (daysRemaining < 8) return "warning";
    return "success";
  };

  const getDaysRemainingText = (expiration: string) => {
    const expirationDate = new Date(expiration);
    const now = new Date();
    const daysRemaining = Math.ceil((expirationDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysRemaining <= 0) return "Expired";
    if (daysRemaining === 1) return "1 day";
    return `${daysRemaining} days`;
  };

  const formatTraffic = (bytes: number) => {
    if (bytes === 0) return "0.00 GB";
    const gb = bytes / (1024 * 1024 * 1024);
    return `${gb.toFixed(2)} GB`;
  };

  return (
    <div id="account-info" className="w-full max-w-md space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm text-foreground-500">Username:</span>
        <span className="text-sm text-foreground-500">{user.username}</span>
      </div>
      
      <div className="flex justify-between items-center">
        <span className="text-sm text-foreground-500">Traffic Served:</span>
        <span className="text-sm text-foreground-500">{formatTraffic(user.points || 0)}</span>
      </div>
      
      <div className="flex justify-between items-center">
        <span className="text-sm text-foreground-500">Days Remaining:</span>
        <Chip 
          color={getDaysRemainingColor(user.expiration)}
          variant="flat"
          size="sm"
        >
          {getDaysRemainingText(user.expiration)}
        </Chip>
      </div>
      
      <div className="flex justify-between items-center">
        <span className="text-sm text-foreground-500">Premium:</span>
        <Chip 
          color={user.type === "premium" ? "success" : "danger"}
          variant="flat" 
          size="sm"
        >
          {user.type === "premium" ? "✓ Active" : "✗ Inactive"}
        </Chip>
      </div>
    </div>
  );
};