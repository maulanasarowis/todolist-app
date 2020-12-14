import {faPlus, faSearch} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {Component} from 'react';
import {Text, StyleSheet, View, Alert, ScrollView} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {CardList} from '../../components';
import FIREBASE from '../../config/firebase';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: {},
      todosKey: [],
    };
  }

  componentDidMount() {
    this.ambilData();
  }

  ambilData = () => {
    FIREBASE.database()
      .ref('todo')
      .once('value', (querySnapShot) => {
        let data = querySnapShot.val() ? querySnapShot.val() : {};
        let todoItem = {...data};

        this.setState({
          todos: todoItem,
          todosKey: Object.keys(todoItem),
        });
      });
  };

  removeData = (id) => {
    Alert.alert(
      'Info',
      'Anda yakin akan mengahapus Data List',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            FIREBASE.database()
              .ref('todo/' + id)
              .remove();
            this.ambilData();

            Alert.alert('Hapus', 'Sukses hapus');
          },
        },
      ],
      {cancelable: false},
    );
  };

  render() {
    // console.log('todos : ', this.state.todos);
    // console.log('todos key : ', this.state.todosKey);
    const {todos, todosKey} = this.state;
    // const fillterData = todosKey.filter((item) => {
    //   return item(searchKey) >= 0;
    // });
    return (
      <View style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>List yang ingin dikerjakan</Text>
          <View style={styles.garis} />
        </View>

        <View style={styles.search}>
          <FontAwesomeIcon
            icon={faSearch}
            color={'gray'}
            size={18}
            style={styles.icon}></FontAwesomeIcon>
          <TextInput placeholder="Cari list ..."></TextInput>
        </View>

        <ScrollView>
          <View style={styles.listKontak}>
            {todosKey.length > 0 ? (
              todosKey.map((key) => (
                <CardList
                  key={key}
                  todoItem={todos[key]}
                  id={key}
                  {...this.props}
                  removeData={this.removeData}
                />
              ))
            ) : (
              <Text>Daftar list kosong</Text>
            )}
          </View>
          <></>
        </ScrollView>

        <View style={styles.wrapperButton}>
          <TouchableOpacity
            style={styles.btnTambah}
            onPress={() => this.props.navigation.navigate('TambahList')}>
            <FontAwesomeIcon icon={faPlus} size={20} color={'white'} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {flex: 1},
  header: {
    paddingHorizontal: 30,
    paddingTop: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  search: {
    flexDirection: 'row',
    borderRadius: 5,
    marginTop: 8,
    backgroundColor: 'white',
    height: 40,
    marginHorizontal: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  icon: {marginVertical: 11, marginLeft: 10},
  listKontak: {
    paddingHorizontal: 30,
    marginTop: 20,
  },
  garis: {
    borderWidth: 1,
    marginTop: 10,
  },
  wrapperButton: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: 30,
  },
  btnTambah: {
    padding: 20,
    backgroundColor: '#2c3e50',
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
