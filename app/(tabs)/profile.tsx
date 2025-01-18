import {StyleSheet, Text, View} from 'react-native';

const App = () => (
  <View style={styles.container}>
    <Text style={styles.row}>React... Where is the text</Text>
    <Text style={styles.row}>Need better formatting</Text>
    <Text style={styles.row}>Shrek is life</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 10,
    padding: 50,
    backgroundColor: '#386C5F',
  },
  row: {
    padding: 20,
    borderBottomColor: '#FFFBCE',
    borderBottomWidth: StyleSheet.hairlineWidth,
    color: '#FFFBCE',
  },
});

export default App;