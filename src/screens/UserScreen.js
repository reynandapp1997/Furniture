/* eslint-disable no-underscore-dangle */
import React, {
  Component
} from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  Alert
} from 'react-native';
import ActionButton from 'react-native-action-button';
import {
  connect
} from 'react-redux';
import IconFa from 'react-native-vector-icons/FontAwesome';

import {
  styles
} from '../constants/styles';
import {
  getUser,
  deleteUser
} from '../redux/actions';
import CardComponent from '../components/CardComponent';

class UserScreen extends Component {
  componentDidMount() {
    this.props.getUser();
  }

  deleteUser(id) {
    this.props.deleteUser(id);
  }

  renderItem(item) {
    return (
      <CardComponent>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ color: 'black', fontSize: 18 }}>{item.item.name}</Text>
          <View style={{ flexDirection: 'row' }}>
            <IconFa
              name='pencil'
              size={18}
              color='green'
              onPress={() => this.props.navigation.navigate('UserUpdate', item.item)}
            />
            <View style={{ width: 32 }} />
            <IconFa
              name='trash'
              size={18}
              color='red'
              onPress={() => this.deleteUser(item.item._id)}
            />
          </View>
        </View>
      </CardComponent>
    );
  }

  renderConditions() {
    if (this.props.user.isLoadingUser) {
      return (
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <ActivityIndicator />
        </View>
      );
    } else if (this.props.user.isErrorUser) {
      return (
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <Text>{this.props.user.messageUser}</Text>
        </View>
      );
    } 
    return (
      <View style={styles.container}>
        {this.renderConnection()}
        <FlatList
          data={this.props.user.user}
          keyExtractor={item => item._id}
          renderItem={this.renderItem.bind(this)}
          nestedScrollEnabled
          refreshControl={
            <RefreshControl
              colors={['black', 'red', 'green', 'blue']}
              onRefresh={() => this.props.getUser()}
            />
          }
          ListEmptyComponent={(<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Tidak ada user</Text></View>)}
        />
        <ActionButton
          buttonColor='black'
          onPress={() => this.props.navigation.navigate('UserAdd')}
        />
      </View>
    );
  }

  renderConnection() {
    if (this.props.form.addError) {
      Alert.alert(
        '',
        this.props.form.addError,
        [{
          text: 'Ok',
          onPress: () => null
        }]
      );
    }
  }

  render() {
    return (
      this.renderConditions()
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  form: state.form
});

export default connect(mapStateToProps, {
  getUser,
  deleteUser
})(UserScreen);
