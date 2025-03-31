import { StackUser } from "@/features/stacjUsers/types";

export interface UserCardProps {
  user: StackUser;
  onEdit?: () => void;
  onDelete?: () => void;
}
