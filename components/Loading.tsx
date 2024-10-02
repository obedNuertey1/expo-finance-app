import { ActivityIndicator, GestureResponderEvent, LayoutChangeEvent, StyleSheet, Text, View } from 'react-native'
import React from 'react'

type Props = {
    size?: 'small' | 'large',
    color?: string,
    style?: any
    animating?: boolean
    hidesWhenStopped?: boolean
    accessibilityLabel?: string
    accessibilityLiveRegion?: 'none' | 'polite' | 'assertive'
    accessibilityStates?: 'disabled' | 'selected' | 'checked' | 'unchecked'
    accessibilityFocus?: boolean
    accessibilityHintId?: string
    accessibilityIgnoresInvertColors?: boolean
    testID?: string
    onAccessibilityTap?: () => void
    onLayout?: (event: LayoutChangeEvent) => void
    onMagicTap?: () => void
    onMoveShouldSetResponder?: (event: GestureResponderEvent) => boolean
    onMoveShouldSetResponderCapture?: (event: GestureResponderEvent) => boolean
    onResponderEnd?: (event: GestureResponderEvent) => void
    onResponderGrant?: (event: GestureResponderEvent) => void
    onResponderMove?: (event: GestureResponderEvent) => void
    onResponderReject?: (event: GestureResponderEvent) => void
    onResponderRelease?: (event: GestureResponderEvent) => void
    onResponderStart?: (event: GestureResponderEvent) => void
    onResponderTerminate?: (event: GestureResponderEvent) => void
    onResponderTerminationRequest?: (event: GestureResponderEvent) => boolean
    onStartShouldSetResponder?: (event: GestureResponderEvent) => boolean
    onStartShouldSetResponderCapture?: (event: GestureResponderEvent) => boolean
    onTouchCancel?: (event: GestureResponderEvent) => void
    onTouchEnd?: (event: GestureResponderEvent) => void
    onTouchEndCapture?: (event: GestureResponderEvent) => void
    onTouchMove?: (event: GestureResponderEvent) => void
    onTouchStart?: (event: GestureResponderEvent) => void
    onTouchStartCapture?: (event: GestureResponderEvent) => void
    onPointerOver?: (event: GestureResponderEvent) => void
    onPointerOut?: (event: GestureResponderEvent) => void
}

const Loading = (props: Props) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator {...props} />
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})