import React ,{ Component }from 'react';
import { Button } from "react-native";
import { SafeAreaView, View, FlatList, StyleSheet, Text } from 'react-native';
import { Theme, createTheme } from '../../theme';


const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Lecture',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Lecture',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Lecture',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d22',
    title: 'Fourth Lecture',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e21111',
    title: 'Fivth Lecture',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e23244',
    title: 'Sixth Lecture',
  },
];

function Item(props) {
  console.log('The props: ', props);
  return (
    <View style={styles.todoItem}>
      <Text style={styles.title}>{props.title}</Text>
        <Button
          title='go'
          color='green'
          //onPress={() => props.test.navigation.goBack(null)}
          onPress={() => props.test.navigation.navigate('Intro')}
        />
    </View>
  );
}

export default class LecturesList extends Component {

  constructor(props){
      super(props);
  }
  
  render(){
      return (
      <View style={styles.todoItem}>    
        <FlatList style={styles.container}
            data={DATA}
            renderItem={({ item }) => <Item title={item.title} test={this.props}/>}
            keyExtractor={item => item.id}
        />
      </View>
   );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    padding: 15,
    marginBottom: 5,
    //backgroundColor: 'skyblue',
  },
  todoItem: {
    width: '100%',
    //height: 40,
    borderBottomColor: '#cccccc',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 15
  }
});
