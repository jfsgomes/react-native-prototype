import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Clipboard,
} from 'react-native';

import { MonoText } from '../components/StyledText';
import PriceDisplay from '../components/PriceDisplay';

export default class EthereumScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      bitstampPrice: 0,
      krakenPrice: 0,
      gdaxPrice: 0,
      average: 0
    }
  }

  static navigationOptions = {
    header: null,
  };

  componentDidMount(){
    this.updateAllPrices()
    return null
  }

  updateAllPrices() {
    this.getETHPrice("Bitstamp");
    this.getETHPrice("Kraken");
    this.getETHPrice("GDAX");
  }

  refreshPrices = () => {
    this.updateAllPrices()
  }

  copyPrices = () => {
    const text = `Bitstamp: ${this.state.bitstampPrice}\nKraken: ${this.state.krakenPrice}\nGDAX: ${this.state.gdaxPrice}\n\nPreço: ${this.getMemberContribuitionInCrypto()} ETH`
    Clipboard.setString(text);
    alert('Copied to Clipboard!');
  }

  getAveragePrice() {
    const average = (parseFloat(this.state.bitstampPrice) + parseFloat(this.state.krakenPrice) + parseFloat(this.state.gdaxPrice)) / 3;

    return this.numberWithTwoDecimals(average);
  }

  getMemberContribuitionInCrypto() {
    const memberContribution = 100;

    return memberContribution / this.getAveragePrice()
  }

  fetchPrice(url) {
    return fetch(url).then((response) => response.json())
  }

  numberWithTwoDecimals(number) {
    return parseFloat(number).toFixed(2);
  }

  getETHPrice(exchange, key) {
    switch (exchange) {
      case "Bitstamp":
        return this.fetchPrice("https://www.bitstamp.net/api/v2/ticker/etheur/").then(
          (responseJson) => this.setState({ bitstampPrice: this.numberWithTwoDecimals(responseJson.last) })
        );
        break;
      case "Kraken":
        return this.fetchPrice("https://api.kraken.com/0/public/Ticker?pair=XETHZEUR").then(
          (responseJson) => this.setState({ krakenPrice: this.numberWithTwoDecimals(responseJson.result.XETHZEUR.c[0]) })
        );
        break;
      case "GDAX":
        return this.fetchPrice("https://api.pro.coinbase.com/products/ETH-EUR/ticker").then(
          (responseJson) => this.setState({ gdaxPrice: this.numberWithTwoDecimals(responseJson.price) })
        );
        break;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Ethereum Prices</Text>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <PriceDisplay exchangeName={"Bitstamp"} price={this.state.bitstampPrice}/>

          <PriceDisplay exchangeName={"Kraken"} price={this.state.krakenPrice}/>

          <PriceDisplay exchangeName={"GDAX"} price={this.state.gdaxPrice}/>

          <PriceDisplay exchangeName={"Average"} price={this.getAveragePrice()}/>

          <TouchableHighlight onPress={this.copyPrices} underlayColor="white">
            <View style={styles.button}>
              <Text style={styles.buttonText}>Copy</Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight onPress={this.refreshPrices} underlayColor="white">
            <View style={styles.button}>
              <Text style={styles.buttonText}>Refresh</Text>
            </View>
          </TouchableHighlight>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  button: {
    marginTop: 20,
    marginBottom: 30,
    marginHorizontal: 50,
    width: 260,
    alignItems: 'center',
    backgroundColor: '#2196F3'
  },
  buttonText: {
    padding: 20,
    color: 'white'
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
