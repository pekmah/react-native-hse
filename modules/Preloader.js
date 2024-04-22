import React, { useRef, useEffect } from 'react';
import { View, Image, Animated } from 'react-native';

const BlinkingImage = () => {
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const blinkAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 1000, // Half of the total duration
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 1000, // Half of the total duration
          useNativeDriver: true,
        }),
      ])
    );

    blinkAnimation.start();

    return () => {
      blinkAnimation.stop();
    };
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Animated.Image
        source={{ uri: 'https://www.opticom.co.ke/wp-content/uploads/2023/03/cropped-Opticom-Logo-18.png' }}
        style={{ width: 100, height: 100, opacity }}
        resizeMode="contain" // Ensure entire image is visible within the specified dimensions
      />
    </View>
  );
};

export default BlinkingImage;
