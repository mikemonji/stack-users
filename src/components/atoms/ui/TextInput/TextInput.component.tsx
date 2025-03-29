import React from "react";
import { TextInput as RNTextInput, View, Text } from "react-native";
import { TextInputProps } from "./TextInput.types";
import { styles } from "./TextInput.styles";

export const TextInput: React.FC<TextInputProps> = ({
  label,
  error,
  style,
  ...rest
}) => {
  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}
      <RNTextInput
        style={[styles.input, error && styles.inputError, style]}
        {...rest}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};
