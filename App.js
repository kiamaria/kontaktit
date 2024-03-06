import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import * as Contacts from 'expo-contacts';
import { useState } from 'react';


export default function App() {

  const [contact, setContact] = useState();

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync(
        {
          fields: [Contacts.Fields.PhoneNumbers]
        }
      );
      if (data.length > 0) {
        setContact(data);
      }
    }
  }
  

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text style={styles.name}>{item.name}</Text>
            {item.phoneNumbers && item.phoneNumbers.length > 0 && (
              <Text>{item.phoneNumbers[0].number}</Text>
            )}
          </View>
        )}
        data={contact}
      />
      <Button title="Get contact" onPress={getContacts} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    paddingTop: 50
  },
  name: {
    fontWeight: 'bold'
  },
});
