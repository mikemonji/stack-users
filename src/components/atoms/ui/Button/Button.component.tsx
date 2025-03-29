import React from "react";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import { ButtonProps } from "./Button.types";
import { styles } from "./Button.styles";

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  loading = false,
  fullWidth,
  ...rest
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={loading}
      style={[
        // styles.base,
        // styles[variant],
        // fullWidth && styles.fullWidth,
        rest.style,
      ]}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};
