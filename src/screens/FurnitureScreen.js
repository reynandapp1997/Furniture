import React, {
  Component
} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  Picker
} from 'react-native';
import {
  connect
} from 'react-redux';

import {
  getFurniture
} from '../redux/actions';
import {
  styles
} from '../constants/styles';
import CardComponent from '../components/CardComponent';

class FurnitureScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: 1
    };
  }
  componentDidMount() {
    this.props.getFurniture(this.state.category);
  }

  renderImage(img) {
    return (
      <Image source={{ uri: img.item, width: 300, height: 300 }} resizeMode='center' />
    );
  }

  renderItem(item) {
    return (
      <CardComponent>
        <Text style={{ color: 'black', fontSize: 24 }}>{item.item.name}</Text>
        <Text>{`$ ${item.item.price}.00`}</Text>
        <Text>{`${item.item.quantity} left`}</Text>
        <FlatList
          data={item.item.images}
          renderItem={this.renderImage.bind(this)}
          keyExtractor={img => img}
          horizontal
        />
      </CardComponent>
    );
  }

  renderConditions() {
    if (this.props.furniture.isLoadingFurniture) {
      return (
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <ActivityIndicator />
        </View>
      );
    } else if (this.props.furniture.isErrorFurniture) {
      return (
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <Text>{this.props.furniture.messageFurniture}</Text>
        </View>
      );
    } 
    return (
      <View style={styles.container}>
        <Picker
          selectedValue={this.state.category}
          onValueChange={async (itemValue) => {
            await this.setState({ category: itemValue });
            this.props.getFurniture(this.state.category);
          }}
        >
          <Picker.Item label='Armchair' value={1} />
          <Picker.Item label='Sofa' value={2} />
        </Picker>
        <FlatList
          data={this.props.furniture.furniture}
          keyExtractor={item => item.id}
          renderItem={this.renderItem.bind(this)}
          nestedScrollEnabled
          refreshControl={
            <RefreshControl
              colors={['black', 'red', 'green', 'blue']}
              onRefresh={() => this.props.getFurniture()}
            />
          }
          ListEmptyComponent={(<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Tidak ada furniture</Text></View>)}
        />
      </View>
    );
  }

  render() {
    return (
      this.renderConditions()
    );
  }
}

const mapStateToProps = state => ({
  furniture: state.furniture
});

export default connect(mapStateToProps, {
  getFurniture
})(FurnitureScreen);
