import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, ImageBackground, Button } from 'react-native';
import Forecast from './Forecast';
import OpenWeatherMap from './open_weather_map'

export default function WeatherProject() {
  const [data, setData] = useState({ zip: '', forecast: null })

  const _handleTextChange = event => {
    let zip = event.nativeEvent.text
    OpenWeatherMap.fetchForecast(zip).then(forecast => {
      setData({ forecast: forecast })
    })
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={require('./background/horses.jpeg')}
        resizeMode='cover'
        style={styles.backdrop}
      >
        <View style={styles.overlay}>
          <View style={styles.row}>
            <Text style={styles.mainText}>
              Current weather for
            </Text>
            <View style={styles.zipContainer}>
              <TextInput
                style={[styles.zipCode, styles.mainText]}
                onSubmitEditing={_handleTextChange}
                underlineColorAndroid='transparent'
              />
            </View>
            <Button title='Press' onSubmitEditing={_handleTextChange} />

          </View>
          {data.forecast ? <Forecast main={data.forecast.main}
            description={data.forecast.description}
            temp={data.forecast.temp} /> : null}

        </View>
      </ImageBackground>
    </View>

  )
}

const baseFontSize = 16

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 30,
  },
  overlay: {
    paddingTop: 5,
    backgroundColor: '#000000',
    opacity: 0.5,
    flexDirection: 'column',
    alignItems: 'center'
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'flex-start',
    padding: 30
  },
  zipContainer: {
    height: baseFontSize + 10,
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 1,
    marginLeft: 5,
    marginTop: 3
  },
  zipCode: {
    flex: 1,
    flexBasis: 1,
    width: 50,
    height: baseFontSize
  },
  mainText: {
    fontSize: baseFontSize,
    color: '#FFFFFF'
  },
  input: {
    fontSize: 20,
    borderWidth: 2,
    padding: 2,
    height: 40,
    width: 100,
    textAlign: 'center'
  },

  backdrop: {
    flex: 1,
    flexDirection: 'column',
    width: '100%'
  }
});
