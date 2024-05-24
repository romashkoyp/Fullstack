import { View, StyleSheet } from 'react-native';

const Overlay = ({ visible }) => {
  if (!visible) return null;

  return <View style={styles.overlay} pointerEvents="none" />;
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'black',
    opacity: 0.6,
    zIndex: 1, // overlay is on top of other elements
  },
});

export default Overlay;