import { createStyleSheet } from "@/theme";

export const styles = createStyleSheet(() => ({
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
}));
