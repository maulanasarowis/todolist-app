import React, {Component} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {InputList} from '../../components';
import FIREBASE from '../../config/firebase';

export default class TambahList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isiList: '',
    };
  }

  onChangeText = (isiListState, value) => {
    this.setState({
      [isiListState]: value,
    });
  };

  onSubmit = () => {
    if (this.state.isiList) {
      const listReferensi = FIREBASE.database().ref('todo');
      const todo = {
        isiList: this.state.isiList,
      };
      listReferensi
        .push(todo)
        .then((data) => {
          Alert.alert('Sukses', 'List tersimpan');
          this.props.navigation.replace('Home');
        })
        .catch((error) => {
          console.log('Error: ', error);
        });
      // Alert.alert('Sukses', 'Kontak tersimpan');
      // console.log('Masuk Submit');
      // console.log(this.state);
    } else {
      Alert.alert('Error', 'List wajib diisi');
    }
  };

  render() {
    return (
      <View style={styles.pages}>
        <InputList
          label="Todo"
          placeholder="Masukkan List"
          onChangeText={this.onChangeText}
          value={this.state.isiList}
          isiListState="isiList"
        />
        <TouchableOpacity style={styles.tombol} onPress={() => this.onSubmit()}>
          <Text style={styles.textTombol}>Simpan</Text>
        </TouchableOpacity>
        <Text style={styles.dev}>Developed by Maulana Sarowis</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pages: {flex: 1, padding: 30},
  tombol: {
    backgroundColor: '#2c3e50',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  textTombol: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  dev: {
    padding: 65,
    textAlign: 'center',
    fontSize: 12,
    fontStyle: 'italic',
  },
});
