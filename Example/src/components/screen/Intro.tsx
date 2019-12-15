import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';
import {
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  FlatList
} from 'react-native';
import React, { Component } from 'react';
import { ratio, screenWidth } from '../../utils/Styles';
import * as RNFS from 'react-native-fs';

import Button from '../shared/Button';
import { getString } from '../../../STRINGS';
import RecordingItem from './RecordingItem';  

const styles: any = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C3EFFC',
    flexDirection: 'column',
    alignItems: 'center',
  },
   container2: {
   flex: 1,
   paddingTop: 5
  },
  item: {
    padding: 0,
    fontSize: 18,
    height: 30,
  },
  titleTxt: {
    marginTop: 100 * ratio,
    color: 'white',
    fontSize: 28 * ratio,
  },
  viewRecorder: {
    marginTop: 40 * ratio,
    width: '100%',
    alignItems: 'center',
  },
  recordBtnWrapper: {
    flexDirection: 'row',
  },
  viewPlayer: {
    marginTop: 60 * ratio,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  viewBarWrapper: {
    marginTop: 28 * ratio,
    marginHorizontal: 28 * ratio,
    alignSelf: 'stretch',
  },
  viewBar: {
    backgroundColor: '#ccc',
    height: 4 * ratio,
    alignSelf: 'stretch',
  },
  viewBarPlay: {
    backgroundColor: '#000000',
    height: 4 * ratio,
    width: 0,
  },
  playStatusTxt: {
    marginTop: 8 * ratio,
    color: '#ccc',
  },
  playBtnWrapper: {
    flexDirection: 'row',
    marginTop: 40 * ratio,
  },
  btn: {
    borderColor: 'white',
    borderWidth: 1 * ratio,
  },
  txt: {
    color: '#000000',
    fontSize: 14 * ratio,
    marginHorizontal: 8 * ratio,
    marginVertical: 4 * ratio,
  },
  txtRecordCounter: {
    marginTop: 32 * ratio,
    color: '#000000',
    fontSize: 20 * ratio,
    textAlignVertical: 'center',
    fontWeight: '200',
    fontFamily: 'Helvetica Neue',
    letterSpacing: 3,
  },
  txtCounter: {
    marginTop: 12 * ratio,
    color: '#000000',
    fontSize: 20 * ratio,
    textAlignVertical: 'center',
    fontWeight: '200',
    fontFamily: 'Helvetica Neue',
    letterSpacing: 3,
  },
});

interface State {
  isLoggingIn: boolean;
  recordSecs: number;
  recordTime: string;
  currentPositionSec: number;
  currentDurationSec: number;
  playTime: string;
  duration: string;
}

class Page extends Component<any, State> {
  private audioRecorderPlayer: AudioRecorderPlayer;
  private videoName: number;
  constructor(props: any) {
    super(props);
    this.state = {
      isLoggingIn: false,
      recordSecs: 0,
      recordTime: '00:00:00',
      currentPositionSec: 0,
      currentDurationSec: 0,
      playTime: '00:00:00',
      duration: '00:00:00',
      isDone: false,
      recordings: []
    };

    this.audioRecorderPlayer = new AudioRecorderPlayer();
    this.audioRecorderPlayer.setSubscriptionDuration(0.09); // optional. Default is 0.1

    this.onDownloadImagePress = this.onDownloadImagePress.bind(this);

  }

  public render() {
    let playWidth =
      (this.state.currentPositionSec / this.state.currentDurationSec) *
      (screenWidth - 56 * ratio);
    if (!playWidth) playWidth = 0;



    // const previewImage = this.state.isDone ? (<View>
    //   <Image style={{
    //     width: 100,
    //     height: 100,
    //     backgroundColor: 'red',
    //   }}
    //     source={{
    //       uri: `file://${RNFS.DocumentDirectoryPath}/react-native.png`,
    //       scale: 1
    //     }}
    //   />
    //   <Text>{`file://${RNFS.DocumentDirectoryPath}/react-native.png`}</Text>
    // </View>
    // ) : null;

    return (
      <View style={styles.container}>
        {/* <Text style={styles.titleTxt}>{getString('TITLE')}</Text> */}

          <View style={styles.container2}>
            <FlatList
              data={this.state.recordings}
              renderItem={({ item }) => (
                <RecordingItem 
                todoItem={item} 
                hdlOnStartPlay = {this.onStartPlay}
                hdlOnRemoveRecord = {this.onRemoveRecord}
                />
              )}
              keyExtractor={item => item.recordingId.toString()}
            />
          </View>
        <Text style={styles.txtRecordCounter}>{this.state.recordTime}</Text>
        <View style={styles.viewRecorder}>
          <View style={styles.recordBtnWrapper}>
            <Button
              style={styles.btn}
              onPress={this.onStartRecord}
              textStyle={styles.txt}
            >
              {getString('RECORD')}
            </Button>
            <Button
              style={[
                styles.btn,
                {
                  marginLeft: 12 * ratio,
                },
              ]}
              onPress={this.onStopRecord}
              textStyle={styles.txt}
            >
              {getString('STOP')}
            </Button>
            <Text onPress={this.onDownloadImagePress}>Download Image</Text>
                
          </View>

        </View>
        <View style={styles.viewPlayer}>
          <TouchableOpacity
            style={styles.viewBarWrapper}
            onPress={this.onStatusPress}
          >
            <View style={styles.viewBar}>
              <View style={[styles.viewBarPlay, { width: playWidth }]} />
            </View>
          </TouchableOpacity>
          <Text style={styles.txtCounter}>
            {this.state.playTime} / {this.state.duration}
          </Text>
          <View style={styles.playBtnWrapper}>
            <Button
              style={styles.btn}
              onPress={this.onStartPlay}
              textStyle={styles.txt}
            >
              {getString('PLAY')}
            </Button>
            <Button
              style={[
                styles.btn,
                {
                  marginLeft: 12 * ratio,
                },
              ]}
              onPress={this.onPausePlay}
              textStyle={styles.txt}
            >
              {getString('PAUSE')}
            </Button>
            <Button
              style={[
                styles.btn,
                {
                  marginLeft: 12 * ratio,
                },
              ]}
              onPress={this.onStopPlay}
              textStyle={styles.txt}
            >
              {getString('STOP')}
            </Button>
          </View>
        </View>
      </View>
    );
  }

  private readFile = async() => {
  const fileContents = await FileSystem.readFile('my-directory/my-file.txt');
  console.log(`read from file: ${fileContents}`);
}


  // This will download files
  private onDownloadImagePress() {

      RNFS.downloadFile({
        //fromUrl: 'https://facebook.github.io/react-native/img/header_logo.png',
        //fromUrl: 'https://example-files.online-convert.com/audio/m4a/example.m4a',
        fromUrl: 'http://codigomentor.com/main_page/content/uploads/images/finallogo.jpg',
        toFile: `${RNFS.DocumentDirectoryPath}/finallogo.jpg`,
      }).promise.then((r) => {


        const recording = {
          key: `Audio`,
          recordingId: 2468,
          recordingFilePath: `${RNFS.DocumentDirectoryPath}/example.m4a`
        };

        this.state.recordings.push(recording);



        this.setState({ 
          isDone: true,
          recordings: this.state.recordings
        })
        console.log(this.state);
      });
  }

  private onStatusPress = (e: any) => {
    const touchX = e.nativeEvent.locationX;
    console.log(`touchX: ${touchX}`);
    const playWidth =
      (this.state.currentPositionSec / this.state.currentDurationSec) *
      (screenWidth - 56 * ratio);
    console.log(`currentPlayWidth: ${playWidth}`);

    const currentPosition = Math.round(this.state.currentPositionSec);
    console.log(`currentPosition: ${currentPosition}`);

    if (playWidth && playWidth < touchX) {
      const addSecs = Math.round(currentPosition + 3000);
      this.audioRecorderPlayer.seekToPlayer(addSecs);
      console.log(`addSecs: ${addSecs}`);
    } else {
      const subSecs = Math.round(currentPosition - 3000);
      this.audioRecorderPlayer.seekToPlayer(subSecs);
      console.log(`subSecs: ${subSecs}`);
    }
  };

  private onStartRecord = async () => {
    console.log('recording...')
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Permissions for write access',
            message: 'Give permission to your storage to write a file',
            buttonPositive: 'ok',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the storage');
        } else {
          console.log('permission denied');
          return;
        }
      } catch (err) {
        console.warn(err);
        return;
      }
    }
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: 'Permissions for write access',
            message: 'Give permission to your storage to write a file',
            buttonPositive: 'ok',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the camera');
        } else {
          console.log('permission denied');
          return;
        }
      } catch (err) {
        console.warn(err);
        return;
      }
    }
    
    // This is setting the name of the file in the device
    this.videoName = new Date().getTime();

    const path = Platform.select({
      ios: `${this.videoName}.m4a`,
      android: 'sdcard/hello.mp4',
    });
    const audioSet: AudioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
    };
    console.log('audioSet', audioSet);

    // This is saving the voice sound
    const uri = await this.audioRecorderPlayer.startRecorder(path, audioSet);
    // This is creating a new todo (recorded voice, so it can be added to the state)
    const recording = {
      key: `Audio${this.videoName}`,
      recordingId: this.videoName,
      recordingFilePath: uri};

      this.state.recordings.push(recording);

    this.audioRecorderPlayer.addRecordBackListener((e: any) => {
      this.setState({
        recordSecs: e.current_position,
        recordTime: this.audioRecorderPlayer.mmssss(
          Math.floor(e.current_position),
        ),
        recordings: this.state.recordings
      });
    });
    console.log(`uri: ${uri}`);
  };

  private onStopRecord = async() => {

// Works on both Android and iOS

    const result = await this.audioRecorderPlayer.stopRecorder();
    this.audioRecorderPlayer.removeRecordBackListener();
    this.setState({
      recordSecs: 0,
    });

    console.log('result', result);



    //BELOW IS AN ALERT POP UP
    // Alert.alert(
    //   'Grabación',
    //   'Deaseas Guardar la grabación',
    //   [
    //     {text: 'No', onPress: () => {
    //        RNFS.unlink(`${result}`).then(res => {
    //         console.log('file deleted');
    //         let recordings = this.state.recordings;
    //         recordings = recordings.filter((recording) => recording.recordingFilePath !== result);
    //           this.setState({recordings});
    //         })
    //         .catch(err => {
    //           console.log('Could not delete file');
    //           console.log(err.message, err.code);
    //         });
    //     } },
    //     {
    //       text: 'Si',
    //       onPress: () => {
    //         // Need to add routing here
    //       },
    //       style: 'cancel',
    //     }
    //   ]
    // );




  };

  // Playing recording
  private onStartPlay = async (recordingId) => {
    console.log('Playing...');
    const path = Platform.select({
      ios: `${recordingId}.m4a`,
      android: 'sdcard/hello.mp4',
    });
    console.log('path', path);
    const msg = await this.audioRecorderPlayer.startPlayer(path);
    console.log('message');
    console.log(msg);
    this.audioRecorderPlayer.setVolume(1.0);



    this.audioRecorderPlayer.addPlayBackListener((e: any) => {
      if (e.current_position === e.duration) {
        console.log('finished');
        this.audioRecorderPlayer.stopPlayer();
      }
      this.setState({
        currentPositionSec: e.current_position,
        currentDurationSec: e.duration,
        playTime: this.audioRecorderPlayer.mmssss(
          Math.floor(e.current_position),
        ),
        duration: this.audioRecorderPlayer.mmssss(Math.floor(e.duration)),
      });
    });
  };

  private onRemoveRecord = (recordingFilePath) => {
    RNFS.unlink(`${recordingFilePath}`).then(res => {
        console.log('file deleted');
        let recordings = this.state.recordings;
        recordings = recordings.filter((recording) => recording.recordingFilePath !== recordingFilePath);
          this.setState({recordings});
        })
        .catch(err => {
          console.log('Could not delete file');
          console.log(err.message, err.code);
        });
  }

  private onPausePlay = async () => {
    await this.audioRecorderPlayer.pausePlayer();
  };

  private onStopPlay = async () => {
    console.log('onStopPlay');
    this.audioRecorderPlayer.stopPlayer();
    this.audioRecorderPlayer.removePlayBackListener();
  };





  // //////// function test ////////
  // // ON recording
  // private someFunction = async() => {
  //   console.log('THIS IS GOING TO PLAY IT...');
    
  //   const path = Platform.select({
  //     ios: `${1576331415309}.m4a`,
  //     android: 'sdcard/hello.mp4',
  //   });
  //   console.log('path', path);
  //   const msg = await this.audioRecorderPlayer.startPlayer(path);
  //   console.log('message');
  //   console.log(msg);
  //   this.audioRecorderPlayer.setVolume(5.0);

  //   this.audioRecorderPlayer.addPlayBackListener((e: any) => {
  //     if (e.current_position === e.duration) {
  //       console.log('finished');
  //       this.audioRecorderPlayer.stopPlayer();
  //     }
  //     // this.setState({
  //     //   currentPositionSec: e.current_position,
  //     //   currentDurationSec: e.duration,
  //     //   playTime: this.audioRecorderPlayer.mmssss(
  //     //     Math.floor(e.current_position),
  //     //   ),
  //     //   duration: this.audioRecorderPlayer.mmssss(Math.floor(e.duration)),
  //     // });
  //   });


  //   const result = await this.audioRecorderPlayer.stopRecorder();
  //   this.audioRecorderPlayer.removeRecordBackListener();
  //   this.setState({
  //     recordSecs: 0,
  //   });


  //   // THIS IS GOING TO REACORD IT

  //   console.log('This is going to record it.');
  // // This is setting the name of the file in the device
  //   this.videoName = new Date().getTime();

  //   const path2 = Platform.select({
  //     ios: `${this.videoName}.m4a`,
  //     android: 'sdcard/hello.mp4',
  //   });
  //   const audioSet: AudioSet = {
  //     AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
  //     AudioSourceAndroid: AudioSourceAndroidType.MIC,
  //     AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
  //     AVNumberOfChannelsKeyIOS: 2,
  //     AVFormatIDKeyIOS: AVEncodingOption.aac,
  //   };
  //   console.log('audioSet', audioSet);

  //   // This is saving the voice sound
  //   const uri = await this.audioRecorderPlayer.startRecorder(path2, audioSet);
  //   // This is creating a new todo (recorded voice, so it can be added to the state)
  //   const recording = {
  //     key: `Audio${this.videoName}`,
  //     recordingId: this.videoName,
  //     recordingFilePath: uri};

  //     this.state.recordings.push(recording);

  //   this.audioRecorderPlayer.addRecordBackListener((e: any) => {
  //     this.setState({
  //       recordSecs: e.current_position,
  //       recordTime: this.audioRecorderPlayer.mmssss(
  //         Math.floor(e.current_position),
  //       ),
  //       recordings: this.state.recordings
  //     });
  //   });
  //   console.log(`uri: ${uri}`);

  // }
}

export default Page;
