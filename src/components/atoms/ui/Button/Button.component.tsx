import React from "react";
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { ButtonProps } from "./Button.types";
import { styles } from "./Button.styles";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  loading = false,
  fullWidth,
  ...rest
}) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <TouchableWithoutFeedback
      onPressIn={() => (scale.value = withSpring(0.96))}
      onPressOut={() => (scale.value = withSpring(1))}
      onPress={onPress}
    >
      <Animated.View
        style={[
          styles.base,
          styles[variant],
          fullWidth && styles.fullWidth,
          animatedStyle,
        ]}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.text}>{title}</Text>
        )}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};
