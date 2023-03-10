import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

export const MultiLineInput: React.FC<{
  value: string;
  onChangeText: (value: string) => void;
  onSubmitEditing: () => void;
  fontSize?: number;
  placeholder: string;
  height?: number;
}> = (props) => {
  const [focused, setFocused] = useState(false);
  const focusedStyles = focused ? otherFocusedStyles : styles;

  return (
    <View style={focusedStyles.container}>
      <TextInput
        autoCorrect={false}
        autoCapitalize="none"
        multiline
        value={props.value}
        onChangeText={props.onChangeText}
        placeholder={props.placeholder}
        onSubmitEditing={props.onSubmitEditing}
        style={{ fontSize: props.fontSize ?? 20, height: props.height ?? 200 }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
    borderWidth: 1,
    backgroundColor: 'gray',
  },
});

const otherFocusedStyles = {
  container: [styles.container, { backgroundColor: 'black' }],
};
