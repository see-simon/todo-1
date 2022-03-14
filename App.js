import React,{useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  SafeAreaView,
  View,
  TextInput,
  Text,
  FlatList,
  TouchableOpacity,Modal,
  Alert,

} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { db } from './firebase';
const COLORS = {primary: '#1f145c', white: '#fff'};
export default function App() {
  const [todos, setTodos] = React.useState([]);
  const [textInput, setTextInput] = React.useState('');

 

  const addTodo = () => {
    if (textInput == '') {
      Alert.alert('Error', 'Please input todo');
    } else {
      db.ref('Todo').push({
        textInput,completed:false
      })
    
      setTextInput('');
    }
  };

  

  useEffect(()=>{
        
    db.ref('Todo').on('value',snap=>{
      let item = [];
      const a_ =snap.val();
      for (let x in a_){
        item.push({textInput:a_[x].textInput,key:x,completed:a_[x].completed})
      }
      setTodos(item)
    })
 

},[])
  const markTodoComplete = todoId => {
    const newTodosItem = todos.map(item => {
      if (item.id == todoId) {
        return {...item, completed: true};
      }
      return item;
    });

    setTodos(newTodosItem);
  };

  const handleDelete=(key)=>{
    db.ref('Todo').child(key).remove()

    }
    const updateTodo =(key)=>{
      db.ref('Todo').child(key).update()
    }

  const clearAllTodos = () => {
    Alert.alert('Confirm', 'Clear todos?', [
      {
        text: 'Yes',
        onPress: () => db.ref('Todo').remove(),
      },
      {
        text: 'No',
      },
    ]);
  };

  //
  const [modalOpen,setModalOpen]=useState(false)
  const [currentKey, setCurrentKey] = useState()

  
  //
  const ListItem = ({todo}) => {

    const handleUpdate =(key, text)=>{

      setCurrentKey(key,)
      setModalOpen(true)
      setTextInput(text)
    }

    return (
      
      <View style={styles.listItem}>
        {/* {
          todos.map()
        } */}
        <View style={{flex: 1}}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 15,
              color: COLORS.primary,
              textDecorationLine: todo?.completed ? 'line-through' : 'none',
            }}>
            {todo?.textInput}
          </Text>
        </View>
        {!todo?.completed && (
          <TouchableOpacity onPress={()=>handleUpdate(todo?.key, todo?.textInput)}>

            <View style={[styles.actionIcon, {backgroundColor: 'green'}]}>
              <Icon name="done" size={20} color="white" />
            </View>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => handleDelete(todo?.key)}>
          <View style={styles.actionIcon}>
            <Icon name="delete" size={20} color="white" />
          </View>
        </TouchableOpacity>


        {/* <Modal visible={modalOpen} animationType='slide' >
         {
           modalOpen? 
           ( db.ref('Todo').child(currentKey).update({textInput})):(<Text></Text>)

         }
            <View style={styles.modalContent}>
            <TouchableOpacity
            style={{justifyContent:'flex-start',width:40,height:50,borderRadius:10,
        left:150}} 
            onPress={()=>setModalOpen(false)}>
                  <Icon name="close" size={30} color='black' />
                  </TouchableOpacity> 
            
            <View>
            <TextInput placeholder='Enter todo'
              value={textInput}

            />

            <TouchableOpacity>
            <Text>Update</Text>
            </TouchableOpacity>
            </View>
            </View>
            </Modal> */}
      </View>
    );
  };
 

return (
<SafeAreaView
  style={{
    flex: 1,
    backgroundColor: 'white',
    top:10
  }}>
  <View style={styles.header}>
    <Text
      style={{
        fontWeight: 'bold',
        fontSize: 20,
        color: COLORS.primary,
      }}>
      TODO APP
    </Text>
    <Icon name="delete" size={25} color="red" onPress={clearAllTodos} />
  </View>
  <FlatList
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{padding: 20, paddingBottom: 100}}
    data={todos}
    renderItem={({item}) => <ListItem todo={item} />}
  />

  <View style={styles.footer}>
    <View style={styles.inputContainer}>
      <TextInput
        value={textInput}
        placeholder="Add Todo"
        onChangeText={text => setTextInput(text)}
      />
    </View>
    <TouchableOpacity onPress={addTodo}>
      <View style={styles.iconContainer}>
        <Icon name="add" color="white" size={30} />
      </View>
    </TouchableOpacity>
  </View>
</SafeAreaView>
  );
}


const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
  },
  inputContainer: {
    height: 50,
    paddingHorizontal: 20,
    elevation: 40,
    backgroundColor: COLORS.white,
    flex: 1,
    marginVertical: 20,
    marginRight: 20,
    borderRadius: 30,
  },
  iconContainer: {
    height: 50,
    width: 50,
    backgroundColor: COLORS.primary,
    elevation: 40,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },

  listItem: {
    padding: 20,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    elevation: 12,
    borderRadius: 7,
    marginVertical: 10,
  },
  actionIcon: {
    height: 25,
    width: 25,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    marginLeft: 5,
    borderRadius: 3,
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
