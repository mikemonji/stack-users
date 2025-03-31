import React from "react";
import { View, Image } from "react-native";
import { Text } from "@/components/atoms/ui/Text/Text.component";
import { UserCardProps } from "./UserCard.types";
import { styles } from "./UserCard.styles";
import { Button } from "@/components/atoms/ui/Button/Button.component";

export const UserCard: React.FC<UserCardProps> = ({
  user,
  onEdit,
  onDelete,
}) => (
  <View style={styles.card}>
    <Image source={{ uri: user.profile_image }} style={styles.avatar} />
    <View style={{ flex: 1 }}>
      <Text variant="subtitle">{user.display_name}</Text>
      <Text variant="caption">Reputation: {user.reputation}</Text>
    </View>
    {(onEdit || onDelete) && (
      <View style={styles.actions}>
        {onEdit && <Button title="Edit" onPress={onEdit} />}
        {onDelete && <Button title="Delete" onPress={onDelete} />}
      </View>
    )}
  </View>
);
