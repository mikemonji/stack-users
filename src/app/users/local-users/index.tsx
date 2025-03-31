import React from "react";
import { FlashList } from "@shopify/flash-list";
import { ActivityIndicator, Alert } from "react-native";

import {
  useGetLocalUsersQuery,
  useDeleteLocalUserMutation,
} from "@/features/localUsers/localUsersApi";
import { Column } from "@/components/atoms/layout/Column/Column.component";
import { Spacer } from "@/components/atoms/layout/Spacer/Spacer.component";
import { UserCard } from "@/components/organisms/organisms/UserCard/UserCard.component";

export default function LocalUsersScreen() {
  const { data: users = [], isFetching } = useGetLocalUsersQuery();
  const [deleteUser] = useDeleteLocalUserMutation();

  const handleDelete = (id: number) => {
    Alert.alert("Confirm", "Delete this user?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", onPress: () => deleteUser(id) },
    ]);
  };

  return (
    <Column fullWidth style={{ padding: 16 }}>
      <FlashList
        data={users}
        estimatedItemSize={70}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <UserCard
            user={item}
            onDelete={() => handleDelete(item.id)}
            onEdit={() => console.log("TODO: edit", item.id)}
          />
        )}
        ListFooterComponent={
          isFetching ? <ActivityIndicator /> : <Spacer size={24} />
        }
      />
    </Column>
  );
}
