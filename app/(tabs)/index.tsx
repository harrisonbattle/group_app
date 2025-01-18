import {StyleSheet, Text, SafeAreaView, Linking, Platform, StatusBar} from 'react-native';


const App = () => {
  
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.row}>This tab will be dedicated to testing as it is the first page that loads when the app is started and reloaded</Text>
        <Text style={styles.row}>Hello Julian!</Text>
      </SafeAreaView>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#386C5F',
  },
  row: {
    color: '#FFFBCE',
    fontSize: 24,
    textAlign: 'center'
  },
});

export default App;