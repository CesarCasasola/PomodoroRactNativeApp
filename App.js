import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const workingMins = 0.5;

export default class App extends React.Component {

  constructor(props){
    super(props)
    //situation: 0->stoped, 1->working, 2->paused,  3->resting
    this.state = {
      situation: 0,
      secsToComplete: workingMins*60,
      remaining: {
        mins: 0,
        secs: 0,
      },
      pomodorosInRow: 0,
    }
  }

  generateNode = ()=> {
    if(this.state.situation === 0){
      return (
        <View style={styles.container}>
          <Button title="Start" onPress={this.startPomodoro}></Button>
        </View>
      );
    }else if(this.state.situation === 1){
      const digits = this.displayDigits()
      return (
      <View style={styles.container}>
          <Text>Focus</Text>
          <Text>{digits}</Text>
          <Button title="Pause" onPress={this.pausePomodoro}></Button>
          <Button title="Stop" onPress={this.stopPomodoro}></Button>          
      </View>
      )
    }else if(this.state.situation === 2){
      const digits = this.displayDigits()
      return(
        <View style={styles.container}>
          <Text>{digits}</Text>
          <Button title="Resume" onPress={this.resumePomodoro}></Button>
          <Button title="Stop" onPress={this.stopPomodoro}></Button>          
        </View>
      )
    }else {
      const digits = this.displayDigits()
      return(
        <View style={styles.container}>
          <Text>Rest</Text>
          <Text>{digits}</Text>
          <Button title="Stop" onPress={this.stopPomodoro}></Button>          
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
        if(this.state.situation === 1){
          this.setState({
            situation: 3,
            secsToComplete: 0.5*60,
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
