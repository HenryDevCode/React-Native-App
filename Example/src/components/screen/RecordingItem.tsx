
import React from 'react';
import { View , Text, Button, StyleSheet,  TouchableOpacity} from 'react-native';

export default class RecordingItem extends React.Component{

  constructor(props){
    super(props);
  }

  render(){
    const { todoItem , hdlOnStartPlay, hdlOnRemoveRecord }  = this.props;
    return (
      <TouchableOpacity style={styles.todoItem}>
        <Text>
          {todoItem.key}
        </Text>
        <Button
          title='Play'
          color='green'
          onPress={() => hdlOnStartPlay(todoItem.recordingId)}
        />
        <Button
          title='Remove'
          color='red'
          onPress={() => hdlOnRemoveRecord(todoItem.recordingFilePath)}
        />
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  todoItem: {
    width: '100%',
    height: 40,
    borderBottomColor: '#cccccc',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 15
  }
})
