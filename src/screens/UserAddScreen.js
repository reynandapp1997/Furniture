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
  addUser
} from '../redux/actions';
import {
  styles
} from '../constants/styles';
import { NAME, USERNAME, PASSWORD, LEVEL, EMAIL, ADDRESS } from '../constants/strings';

class UserAddScreen extends Component {
  componentWillUnmount() {
    this.props.clearForm();
  }

  onFormChange(text, field) {
    this.props.onFormChange(text, field);
  }

  addUser() {
    const {
      name,
      username,
      password,
      level,
      email,
      address
    } = this.props.form;
    const user = {
      name,
      username,
      password,
      level,
      email,
      address
    };
    this.props.addUser(user, this.props.navigation);
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
      <ScrollView style={styles.container}>
        {this.renderConnection()}
        <View>
          <Text style={styles.label}>Name<Text style={{ color: 'red' }}>*</Text> {this.props.form.nameError && (<Text style={styles.formError}> {this.props.form.nameError}</Text>)}</Text>
          <TextInput
            style={styles.form}
            onChangeText={(text) => this.onFormChange(text, NAME)}
            autoCapitalize='words'
            onSubmitEditing={() => { this.usernameInput.focus(); }}
            returnKeyType={'next'}
            autoFocus
          />
        </View>
        <View>
          <Text style={styles.label}>Username<Text style={{ color: 'red' }}>*</Text> {this.props.form.usernameError && (<Text style={styles.formError}> {this.props.form.usernameError}</Text>)}</Text>
          <TextInput
            style={styles.form}
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
            onChangeText={(text) => this.onFormChange(text, ADDRESS)}
            multiline
            numberOfLines={3}
            autoCapitalize='sentences'
            ref={input => { this.addressInput = input; }}
          />
        </View>
        <Button title='Add User' onPress={() => this.addUser()} />
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
  addUser
})(UserAddScreen);
