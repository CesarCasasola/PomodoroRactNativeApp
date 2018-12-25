import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image } from 'react-native';
import CircularProgress from './CircularProgressBar.js';
import {vibrate} from './utils';

const workingMins = 0.5;
const restingMins = 0.5;

export default class App extends React.Component {

  constructor(props){
    super(props)
    //situation: 0->stoped, 1->working, 2->paused,  3->resting
    this.state = {
      situation: 0,
      secsToComplete: workingMins*60,
      remaining: {
        mins: Math.floor(workingMins),
        secs: workingMins*60%60,
      },
      pomodorosInRow: 0,
    }
  }

  generateNode = ()=> {
    if(this.state.situation === 0){
      return (
        <View style={styles.container}>
        <View style={styles.buttonPanel}>
          <TouchableOpacity  onPress={this.startPomodoro}  style={styles.buttonPrimary}>
            <Image source={require('./assets/tomato.png')}/>
            <Text style={styles.buttonText}>Start Pomodoro</Text>
          </TouchableOpacity>
        </View>          
        </View>
      );
    }else if(this.state.situation === 1){
      const digits = this.displayDigits()
      const percent = (((workingMins*60) - this.state.secsToComplete) / (workingMins*60))*100 ; 
      return (
      <View style={styles.container}>
          <Text style={styles.messageText}>Focus</Text>
          <View style={styles.timerContainer}>
            <CircularProgress percent={percent} clock={digits}/>
          </View>
          <View style={styles.controlButtonPanel}>
            <TouchableOpacity onPress={this.pausePomodoro} style={styles.controlButton}>
              <Text style={styles.buttonText}>Pause</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.stopPomodoro} style={styles.controlButton}>
              <Text style={styles.buttonText}>Stop</Text>
            </TouchableOpacity>
          </View>                  
      </View>
      )
    }else if(this.state.situation === 2){
      const digits = this.displayDigits()
      const percent = (((workingMins*60) - this.state.secsToComplete) / (workingMins*60))*100 ; 
      return(
        <View style={styles.container}>
          <View style={styles.timerContainer}>
            <CircularProgress percent={percent} clock={digits}/>
          </View>
          <View style={styles.controlButtonPanel}>
            <TouchableOpacity onPress={this.resumePomodoro} style={styles.controlButton}>
              <Text style={styles.buttonText}>Resume</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.stopPomodoro} style={styles.controlButton}>
              <Text style={styles.buttonText}>Stop</Text>
            </TouchableOpacity>    
          </View>           
        </View>
      )
    }else {
      const digits = this.displayDigits()
      const percent = (((restingMins*60) - this.state.secsToComplete) / (restingMins*60))*100 ; 
      return(
        <View style={styles.container}>
          <Text style={styles.messageText}>Rest</Text>
          <View style={styles.timerContainer}>
            <CircularProgress percent={percent} clock={digits}/>
          </View>
          <TouchableOpacity onPress={this.stopPomodoro} style={styles.controlButton}>
            <Text style={styles.buttonText}>Stop</Text>
          </TouchableOpacity>          
        </View>
      )
    }
  }

  startPomodoro = ()=>{
    this.setState({
      situation: 1,
    })
    this.interval = setInterval(this.inc, 1000)
  }

  pausePomodoro = ()=> {
    this.setState({
      situation: 2,
    })
  }  

  resumePomodoro = ()=> {
    this.setState({
      situation: 1,
    })
  }

  stopPomodoro = () =>{
    this.setState({
      secsToComplete: workingMins*60,
      situation: 0,
      remaining: {
        mins: Math.floor(workingMins),
        secs: workingMins*60%60,
      }
    })
    clearInterval(this.interval)

  }


  inc = ()=>{
    //if pomodoro is not in pause mode
    if(this.state.situation !== 2){
      //if there is secondsToComplete working or resting
      if(this.state.secsToComplete > 0){
        this.setState(prevState => ({
          secsToComplete: prevState.secsToComplete-1,
          remaining: {
            mins: Math.floor((prevState.secsToComplete-1)/60),
            secs: (prevState.secsToComplete-1)%60,
          },
        }));
      }else{
        this.setState({
          pomodorosInRow: this.state.pomodorosInRow+1,
        })
        vibrate();
        if(this.state.situation === 1){
          this.setState({
            situation: 3,
            secsToComplete: restingMins*60,
          })
        }else if(this.state.situation === 3){
          this.setState({
            situation: 1,
            secsToComplete: workingMins*60,
          })
        }        
      }      
    }    
  }

  displayDigits = ()=> {
    if(this.state.remaining.mins > 9){
      if(this.state.remaining.secs > 9){
        return this.state.remaining.mins + ' : ' + this.state.remaining.secs
      }else{
        return this.state.remaining.mins + ' : 0' + this.state.remaining.secs
      }
    }else{
      if(this.state.remaining.secs > 9){
        return '0' + this.state.remaining.mins + ' : ' + this.state.remaining.secs
      }else{
        return '0' + this.state.remaining.mins + ' : 0' + this.state.remaining.secs
      }
    } 
  }


  render() {
    const nodeToRender = this.generateNode()
    return nodeToRender;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#80e27e',
    justifyContent: 'center',
  },
  buttonPanel: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'stretch',
  },
  buttonPrimary: {
    alignItems: 'center',
    padding: 10,
    width: '80%',
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 20,
    color: '#255d00',
    fontWeight: 'bold',
  },
  controlButtonPanel: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,    
  },
  controlButton: {
    backgroundColor: 'white',    
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: 'green',
    shadowOffset: {
      width: 2,
      height: 2,
    }
  }, 
  messageText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowOffset: {
      width: 3,
      height: 3,
    },
    textShadowColor: 'green',
  },
  timerContainer: {
    alignItems: 'center',
    padding: 50,
  }
});

