import React from "react";
import { Image } from "react-native";
import Animated, { FadeInRight } from "react-native-reanimated";

import { Text } from "@/components/atoms/ui/Text/Text.component";
import { Button } from "@/components/atoms/ui/Button/Button.component";
import { Row } from "@/components/atoms/layout/Row/Row.component";
import { Column } from "@/components/atoms/layout/Column/Column.component";
import { UserCardProps } from "./UserCard.types";
import { styles as customStyles } from "./UserCard.styles";
import { useStyles } from "react-native-unistyles";
import { Swipeable } from "react-native-gesture-handler";

export const UserCard: React.FC<UserCardProps> = ({
  user,
  onEdit,
  onDelete,
}) => {
  const { styles } = useStyles(customStyles);

  const renderRightActions = () => (
    <Row
      style={styles.actionsContainer}
      alignItems="center"
      justifyContent="flex-end"
    >
      {onEdit && <Button title="Edit" onPress={onEdit} />}
      {onDelete && (
        <Button title="Delete" onPress={onDelete} variant="danger" />
      )}
    </Row>
  );

  return (
    <Animated.View entering={FadeInRight.springify().mass(0.4)}>
      <Swipeable renderRightActions={renderRightActions}>
        <Row style={styles.card} fullWidth alignItems="center">
          <Image source={{ uri: user.profile_image }} style={styles.avatar} />

          <Column style={{ flex: 1 }}>
            <Text variant="subtitle">{user.display_name}</Text>
            <Text variant="caption">Reputation: {user.reputation}</Text>
          </Column>
        </Row>
      </Swipeable>
    </Animated.View>
  );
};
