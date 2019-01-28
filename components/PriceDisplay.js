import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { MonoText } from './StyledText';

export default class PriceDisplay extends Component {
  render() {
    return (
      <View style={styles.exchangeNameContainer}>
        <Text style={styles.exchangeNameText}>{this.props.exchangeName}</Text>

        <View style={styles.priceContainer}>
          <MonoText style={styles.priceHighlightText}>{this.props.price} €</MonoText>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  exchangeNameContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  priceHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  priceContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
    marginVertical: 7,
  },
  exchangeNameText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
});
