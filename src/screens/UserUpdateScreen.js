/* eslint-disable no-underscore-dangle */
import React, {
  Component
} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  Alert
} from 'react-native';
import {
  connect
} from 'react-redux';

import {
  onFormChange,
  clearForm,
  updateUser,
  removeError,
  getUser
} from '../redux/actions';
import {
  styles
} from '../constants/styles';
import { NAME, USERNAME, PASSWORD, LEVEL, EMAIL, ADDRESS } from '../constants/strings';

class UserUpdateScreen extends Component {
  componentDidMount() {
    this.props.onFormChange(this.props.navigation.state.params.name, NAME);
    this.props.onFormChange(this.props.navigation.state.params.username, USERNAME);
    this.props.onFormChange(this.props.navigation.state.params.level, LEVEL);
    this.props.onFormChange(this.props.navigation.state.params.email, EMAIL);
    this.props.onFormChange(this.props.navigation.state.params.address, ADDRESS);
  }

  componentWillUnmount() {
    this.props.clearForm();
  }

  onFormChange(text, field) {
    this.props.onFormChange(text, field);
  }

  updateUser() {
    const {
      name,
      username,
      password,
      level,
      email,
      address
    } = this.props.form;
    const user = {
      _id: this.props.navigation.state.params._id,
      name,
      username,
      password,
      level,
      email,
      address
    };
    // console.log(user);
    this.props.updateUser(user, this.props.navigation);
  }

  renderConnection() {
    if (this.props.form.addError) {
      Alert.alert(
        '',
        this.props.form.addError,
        [{
          text: 'Ok',
          onPress: () => {
            console.log('executed');
            this.props.removeError();
            this.props.getUser();
          }
        }]
      );
    }
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {this.renderConnection()}
        <View>
          <Text style={styles.label}>Name<Text style={{ color: 'red' }}>*</Text> {this.props.form.nameError && (<Text style={styles.formError}> {this.props.form.nameError}</Text>)}</Text>
          <TextInput
            style={styles.form}
            value={this.props.form.name}
            onChangeText={(text) => this.onFormChange(text, NAME)}
            autoCapitalize='words'
            onSubmitEditing={() => { this.usernameInput.focus(); }}
            returnKeyType={'next'}
          />
        </View>
        <View>
          <Text style={styles.label}>Username<Text style={{ color: 'red' }}>*</Text> {this.props.form.usernameError && (<Text style={styles.formError}> {this.props.form.usernameError}</Text>)}</Text>
          <TextInput
            style={styles.form}
            value={this.props.form.username}
            onChangeText={(text) => this.onFormChange(text, USERNAME)}
            autoCapitalize='none'
            ref={input => { this.usernameInput = input; }}
            onSubmitEditing={() => { this.passwordInput.focus(); }}
            returnKeyType={'next'}
          />
        </View>
        <View>
          <Text style={styles.label}>Password<Text style={{ color: 'red' }}>*</Text> {this.props.form.passwordError && (<Text style={styles.formError}> {this.props.form.passwordError}</Text>)}</Text>
          <TextInput
            style={styles.form}
            onChangeText={(text) => this.onFormChange(text, PASSWORD)}
            secureTextEntry
            ref={input => { this.passwordInput = input; }}
            onSubmitEditing={() => { this.levelInput.focus(); }}
            returnKeyType={'next'}
          />
        </View>
        <View>
          <Text style={styles.label}>Level<Text style={{ color: 'red' }}>*</Text> {this.props.form.levelError && (<Text style={styles.formError}> {this.props.form.levelError}</Text>)}</Text>
          <TextInput
            style={styles.form}
            value={this.props.form.level}
            onChangeText={(text) => this.onFormChange(text, LEVEL)}
            autoCapitalize='none'
            ref={input => { this.levelInput = input; }}
            onSubmitEditing={() => { this.emailInput.focus(); }}
            returnKeyType={'next'}
          />
        </View>
        <View>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.form}
            value={this.props.form.email}
            onChangeText={(text) => this.onFormChange(text, EMAIL)}
            autoCapitalize='none'
            ref={input => { this.emailInput = input; }}
            onSubmitEditing={() => { this.addressInput.focus(); }}
            returnKeyType={'next'}
          />
        </View>
        <View>
          <Text style={styles.label}>Address</Text>
          <TextInput
            style={styles.form}
            value={this.props.form.address}
            onChangeText={(text) => this.onFormChange(text, ADDRESS)}
            multiline
            numberOfLines={3}
            autoCapitalize='sentences'
            ref={input => { this.addressInput = input; }}
          />
        </View>
        <Button title='Update User' onPress={() => this.updateUser()} />
        <View style={{ height: 16 }} />
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  form: state.form
});

export default connect(mapStateToProps, {
  onFormChange,
  clearForm,
  updateUser,
  removeError,
  getUser
})(UserUpdateScreen);
