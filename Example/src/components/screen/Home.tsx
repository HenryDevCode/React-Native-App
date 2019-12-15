//import Button from '../shared/Button';
import React from 'react';
import styled from 'styled-components/native';
import { View, Text , Button, Image} from 'react-native';

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.background};
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

interface Props {
  navigation: any;
}

function Page(props: Props) {
  return (
    // <Container>
    // {/* <Text>This is a text</Text> */}
    //   <Button
    //     testID='btn'
    //     onClick={() => props.navigation.goBack()}
    //     text='Go Back'
    //     style={{
    //       backgroundColor: '#333333',
    //     }}
    //   />
    // </Container>
    <View style={{ flex: 1, backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center' }}>
        <Image
          style={{width: 50, height: 50}}
          source={{uri: 'https://yt3.ggpht.com/-WRNh23JQYeE/AAAAAAAAAAI/AAAAAAAAAAA/NOJLzZxEBmA/s36-c-k-c0x00ffffff-no-rj-mo/photo.jpg'}}
        />
        <Text style={{fontSize:25}}>Idioma Academy</Text>
        <Button
          title="Go to Lectures"
          onPress={() => props.navigation.navigate('LecturesList')}
        />
      </View>
  );
}

export default Page;
