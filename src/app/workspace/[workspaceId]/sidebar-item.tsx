import { Button } from "@/components/ui/button";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { IconType } from "react-icons/lib";

const sidebarItemVariants = cva(
  "flex items-center gap-1.5 justify-start font-normal h-7 px-[18px] overflow-hidden text-sm",
  {
    variants: {
      variant: {
        default: "text-[#f9edffcc]",
        active: "text-[#481349] bg-white/90 hover:bg-white/90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface SidebarItemProps {
  label: string;
  icon: LucideIcon | IconType;
  id: string;
  variant?: VariantProps<typeof sidebarItemVariants>["variant"];
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  icon: Icon,
  id,
  variant = "default",
}) => {
  const workspaceId = useWorkspaceId();
  return (
    <Button
      asChild
      variant="transparent"
      size="sm"
      className={cn(sidebarItemVariants({ variant }))}
    >
      <Link href={`/workspace/${workspaceId}/channel/${id}`}>
        <Icon />
        <span>{label}</span>
      </Link>
    </Button>
  );
};
