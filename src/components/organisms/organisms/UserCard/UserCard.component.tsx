import React from "react";
import { View, Image } from "react-native";
import { Text } from "@/components/atoms/ui/Text/Text.component";
import { UserCardProps } from "./UserCard.types";
import { styles } from "./UserCard.styles";

export const UserCard: React.FC<UserCardProps> = ({ user }) => (
  <View style={styles.card}>
    <Image source={{ uri: user.profile_image }} style={styles.avatar} />
    <View>
      <Text variant="subtitle">{user.display_name}</Text>
      <Text variant="caption">Reputation: {user.reputation}</Text>
    </View>
  </View>
);
