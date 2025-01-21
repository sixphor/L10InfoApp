import React,{useState, useEffect} from 'react';
import { FlatList, StatusBar, Text, TextInput, View, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f7f7f7',
        flex: 1,
        padding: 20,
    },

    listContainer: {
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#ff7000',
        padding: 15,
        marginVertical: 10,
        backgroundColor: '#ffd2d2',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },

    searchbar: {
        marginVertical: 20,
        padding: 10,
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: '#fff',
        borderColor: '#ddd',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },

    searchLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 2,
        color: '#333',
    },

    listText: {
        fontSize: 16,
        color: '#444',
        marginBottom: 5,
    },

    appTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFD700',
        marginBottom: 5,
        alignSelf: 'center',
    },

    boldItem: {
        fontWeight: 'bold',
    }
})

let originalData = [];

const App = () => {
  const [mydata, setMyData] = useState([]);

  useEffect(() => {
    fetch("https://mysafeinfo.com/api/data?list=deadlyworlddisasters&format=json&case=default")
        .then((response) => {
          return response.json();
        })
        .then((myJson) => {
          if(originalData.length < 1)
          {
            setMyData(myJson);
            originalData = myJson;
          }
        })
  }, []);


    const FilterData = (text) => {
        if (text !== '') {
            let myFilteredData = originalData.filter((item) => {
                return (
                    item.Name.toLowerCase().includes(text.toLowerCase()) ||
                    item.Year.toString().includes(text) || // No need for lowercase on numbers
                    item.Location.toLowerCase().includes(text.toLowerCase())

                );
            });
            setMyData(myFilteredData);
        } else {
            setMyData(originalData);
        }
    };


    const renderItem = ({item, index}) => {
    return (
        <View>
          <View style={styles.listContainer}>
            <Text style={styles.listText}>
                <Text style={styles.boldItem}>Name: </Text>
                {item.Name}
            </Text>
            <Text style={styles.listText}>
                <Text style={styles.boldItem}>Year: </Text>
                {item.Year}
            </Text>
            <Text style={styles.listText}>
                <Text style={styles.boldItem}>Location: </Text>
                {item.Location}
            </Text>
            <Text style={styles.listText}>
                <Text style={styles.boldItem}>Deaths: </Text>
                {item.Deaths}
            </Text>
          </View>
        </View>
    );
  };

  return (
      <View style={styles.container}>
        <StatusBar/>
          <Text style={styles.appTitle}>World Disasters</Text>
        <Text style={styles.searchLabel}>Search:</Text>
        <TextInput style={styles.searchbar} placeholder={'Enter Disaster Name, Year or Location'} onChangeText={(text) => {FilterData(text)}}/>
        <FlatList data={mydata} renderItem={renderItem} />
      </View>
  );
}

export default App;
