import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { localUserSchema, LocalUserForm } from "@/forms/localUserSchema";
import { useAddLocalUserMutation } from "@/features/localUsers/localUsersApi";

import { Column } from "@/components/atoms/layout/Column/Column.component";
import { Spacer } from "@/components/atoms/layout/Spacer/Spacer.component";
import { TextInput } from "@/components/atoms/ui/TextInput/TextInput.component";
import { Button } from "@/components/atoms/ui/Button/Button.component";
import { Text } from "@/components/atoms/ui/Text/Text.component";
import { LocalUserForm, localUserSchema } from "../../forms/localUserSchema";

export default function PostUserScreen() {
  const [addUser, { isLoading }] = useAddLocalUserMutation();

  const {
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm<LocalUserForm>({
    resolver: zodResolver(localUserSchema),
    defaultValues: {
      display_name: "",
      reputation: 0,
      location: "",
    },
  });

  const onSubmit = useCallback(
    async (data: LocalUserForm) => {
      try {
        await addUser(data).unwrap();
        alert("User created!");
      } catch (err) {
        alert("Failed to create user");
      }
    },
    [addUser]
  );

  return (
    <Column fullWidth style={{ padding: 16 }}>
      <Text variant="heading">Create Local User</Text>
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
        placeholder="e.g. 1200"
        keyboardType="numeric"
        onChangeText={(val) => setValue("reputation", Number(val))}
        error={errors.reputation?.message}
      />

      <Spacer size={8} />
      <TextInput
        label="Location"
        placeholder="e.g. Cape Town"
        onChangeText={(val) => setValue("location", val)}
      />

      <Spacer size={16} />
      <Button
        title="Submit"
        onPress={handleSubmit(onSubmit)}
        loading={isLoading}
      />
    </Column>
  );
}
