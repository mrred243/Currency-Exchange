import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, Button, Picker } from 'react-native';

export default function App() {

const [input, setInput] = useState('');
const [data, setData] = useState([]);
const [currency, setCurrency] = useState('');
const [result,setResult] = useState('0');


useEffect(() => {
  fetch('http://data.fixer.io/api/latest?access_key=bccd6514841abc171c05437ba0776a09')
  .then(response  => response.json())
  .then(responseJson => {
        // const array = Object.keys(responseJson.rates);
        setData(responseJson.rates);
})
  .catch((error) => {
    Alert.alert('Error', error);
  });
}, []);


const convert = () => {
      const x = (input / data[currency]).toFixed(2);
      setResult(x);
}
const test = () => {
  const url = `http://data.fixer.io/api/convert?access_key=bccd6514841abc171c05437ba0776a09&from=${currency}&to=EUR&amount=${input}`;
  console.log(url);
};

const itemRows = Object.keys(data).map((todo, index) =>
      <Picker.Item label={todo} value={todo} key={index} />
);

  return (
    <View style={styles.container}>
      <Text>{result} €</Text>
        <View style={{flexDirection: 'row'}} >
        <TextInput
          style={{fontSize: 18, width: 200}} value={input}
          placeholder="Amount" onChangeText={(input) => setInput(input)} />

        <Picker
            style={{width: 100, height: 50}}
            selectedValue={currency}
            onValueChange={(input) => setCurrency(input)}>
            {itemRows}
        </Picker>
        </View>
      <Button style={{cellPadding: 100}} onPress={convert} title="Convert" />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
