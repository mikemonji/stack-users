import React, { useState, useEffect, useCallback } from "react";
import { ActivityIndicator, FlatList } from "react-native";
import { Column } from "@/components/atoms/layout/Column/Column.component";
import { Spacer } from "@/components/atoms/layout/Spacer/Spacer.component";
import { useGetUsersQuery } from "@/features/stackUsers/stackUsersApi";
import { Text } from "@/components/atoms/ui/Text/Text.component";
import { Stack, useRouter } from "expo-router";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { resetOverrides } from "@/features/stackUsers/localOverridesSlice";
import type { StackUser } from "@/features/stackUsers/types";
import { UserCard } from "@/components/organisms/organisms/UserCard/UserCard.component";

export default function UsersScreen() {
  const [page, setPage] = useState(1);
  const [allUsers, setAllUsers] = useState<StackUser[]>([]);
  const { data, isFetching, refetch } = useGetUsersQuery(page);
  const overrides = useAppSelector((state) => state.stackUserOverrides);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    console.log("✅ getUsersQuery result:", data, "Fetching:", isFetching);
  }, [data, isFetching]);

  // accumulate users across pages
  useEffect(() => {
    if (data?.items?.length) {
      setAllUsers((prev) => [
        ...prev,
        ...data.items.filter(
          (item) => !prev.find((u) => u.user_id === item.user_id)
        ),
      ]);
    }
  }, [data]);

  const mergedUsers = allUsers.map((user) => overrides[user.user_id] || user);

  const handleEdit = useCallback(
    (id?: number) => () => {
      id && router.navigate(`./local-users/${id}`);
    },
    []
  );

  const handleDelete = useCallback((id: number) => {
    // Not implemented here — showcase delete via local override slice or local POST fallback
  }, []);

  const handleRefresh = useCallback(() => {
    dispatch(resetOverrides());
    setAllUsers([]); // clear accumulated list
    setPage(1); // start over
    refetch(); // pull fresh data
  }, []);

  if (!mergedUsers.length && isFetching) {
    return <ActivityIndicator />;
  }

  if (!mergedUsers.length) {
    return <Text>No users found</Text>;
  }

  return (
    <>
      <Stack.Screen options={{ headerTitle: "Stack Overflow Users" }} />
      <Column fullWidth flex={1} style={{ padding: 16 }}>
        <FlatList
          data={mergedUsers}
          keyExtractor={(item) => item.user_id?.toString() ?? ""}
          renderItem={({ item }) => (
            <UserCard
              user={item}
              onDelete={() => handleDelete(item.user_id)}
              onEdit={handleEdit(item.user_id)}
            />
          )}
          onEndReached={() => setPage((p) => p + 1)}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isFetching ? <ActivityIndicator /> : <Spacer size={24} />
          }
          onRefresh={handleRefresh}
          refreshing={isFetching}
        />
      </Column>
    </>
  );
}
