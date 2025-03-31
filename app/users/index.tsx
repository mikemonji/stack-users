/* app/users/index.tsx */

import React, { useState, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { Column } from "@/components/atoms/layout/Column/Column.component";
import { Spacer } from "@/components/atoms/layout/Spacer/Spacer.component";
import { StackUser } from "@/features/stacjUsers/types";
import { useGetUsersQuery } from "@/features/stacjUsers/stackUsersApi";
import { UserCard } from "@/components/organisms/organisms/UserCard/UserCard.component";

export default function UsersScreen() {
  const [page, setPage] = useState(1);
  const [allUsers, setAllUsers] = useState<StackUser[]>([]);

  const { data, isFetching } = useGetUsersQuery(page);

  useEffect(() => {
    if (data?.items?.length) {
      setAllUsers((prev) => [...prev, ...data.items]);
    }
  }, [data]);

  return (
    <Column fullWidth style={{ padding: 16 }}>
      <FlashList
        data={allUsers}
        estimatedItemSize={70}
        keyExtractor={(item) => item.user_id.toString()}
        renderItem={({ item }) => <UserCard user={item} />}
        onEndReached={() => setPage((p) => p + 1)}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isFetching ? <ActivityIndicator /> : <Spacer size={24} />
        }
      />
    </Column>
  );
}
