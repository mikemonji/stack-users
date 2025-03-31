import { useLocalSearchParams, useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { localUserSchema, LocalUserForm } from "@/forms/localUserSchema";

import {
  useGetLocalUserByIdQuery,
  useUpdateLocalUserMutation,
} from "@/features/localUsers/localUsersApi";

import { Column } from "@/components/atoms/layout/Column/Column.component";
import { Spacer } from "@/components/atoms/layout/Spacer/Spacer.component";
import { TextInput } from "@/components/atoms/ui/TextInput/TextInput.component";
import { Button } from "@/components/atoms/ui/Button/Button.component";
import { Text } from "@/components/atoms/ui/Text/Text.component";

export default function EditUserScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { data } = useGetLocalUserByIdQuery(Number(id));
  const [updateUser, { isLoading }] = useUpdateLocalUserMutation();

  const {
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<LocalUserForm>({
    resolver: zodResolver(localUserSchema),
    defaultValues: {
      display_name: data?.display_name ?? "",
      reputation: data?.reputation ?? 0,
      location: data?.location ?? "",
    },
    values: data
      ? {
          display_name: data.display_name,
          reputation: data.reputation,
          location: data.location ?? "",
        }
      : undefined,
  });

  const onSubmit = async (form: LocalUserForm) => {
    if (!id) return;
    try {
      await updateUser({ ...form, id: Number(id) }).unwrap();
      router.back();
    } catch {
      alert("Update failed");
    }
  };

  return (
    <Column fullWidth style={{ padding: 16 }}>
      <Text variant="heading">Edit Local User</Text>
      <Spacer size={12} />

      <TextInput
        label="Name"
        placeholder="e.g. Riley"
        onChangeText={(val) => setValue("display_name", val)}
        error={errors.display_name?.message}
      />

      <Spacer size={8} />
      <TextInput
        label="Reputation"
        keyboardType="numeric"
        onChangeText={(val) => setValue("reputation", Number(val))}
        error={errors.reputation?.message}
      />

      <Spacer size={8} />
      <TextInput
        label="Location"
        onChangeText={(val) => setValue("location", val)}
      />

      <Spacer size={16} />
      <Button
        title="Update"
        onPress={handleSubmit(onSubmit)}
        loading={isLoading}
      />
    </Column>
  );
}
