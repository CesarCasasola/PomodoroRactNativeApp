import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
/**
**/
propStyle = (percent) => {
  const base_degrees = 45;
  const rotateBy = base_degrees + (percent * 3.6);
  return {
    transform:[{rotateZ: `${rotateBy}deg`}],
  };
}

const CircularProgress = (props) => {
  let stylesFromProps = propStyle(props.percent);
  if(props.percent > 50){
    return(
        <View style={styles.container}>
          <View style={[styles.progressLayer, {transform: [{rotateZ: '-135deg'}]}]}></View>
          <View style={[styles.offsetLayer, stylesFromProps]}></View>
          <View style={styles.progressLayer}></View>
          <Text style={styles.display}>{props.clock}</Text>
        </View>
      );
  }else{
    return(
        <View style={styles.container}>
          <View style={styles.progressLayer}></View>
          <View style={[styles.offsetLayer, stylesFromProps]}></View>
          <Text style={styles.display}>{props.clock}</Text>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 200,
    borderWidth: 20,
    borderRadius: 100,
    borderColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center'
  },
  progressLayer: {
    width: 200,
    height: 200,
    borderWidth: 20,
    borderRadius: 100,
    position: 'absolute',
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: 'white',
    borderTopColor: 'white',
    transform:[{rotateZ: '45deg'}]
  },
  offsetLayer: {
    width: 200,
    height: 200,
    position: 'absolute',
    borderWidth: 20,
    borderRadius: 100,
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: 'gray',
    borderTopColor: 'gray',
    transform:[{rotateZ: '45deg'}]
  }, 
  display: {
      position: 'absolute',
      fontSize: 40,
      fontWeight: 'bold',
      color: 'white',
  }
});

export default CircularProgress;
