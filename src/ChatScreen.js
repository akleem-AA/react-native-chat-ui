import React, { useState, useEffect, useRef } from 'react';
import { View, FlatList, TextInput, TouchableOpacity, Text, Image, Alert, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ActionSheet from 'react-native-actionsheet';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PropTypes from 'prop-types';
import styles from './styles';

const ChatScreen = ({ messageData, onSendMessage, profileData, themesColor = '' }) => {
  const navigation = useNavigation();
  const [messages, setMessages] = useState(messageData || []);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [message, setMessage] = useState('');
  const flatListRef = useRef(null);
  const actionSheetRef = useRef(null);

  useEffect(() => {
    setMessages(messageData);
  }, [messageData]);

  const sendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: message,
      fromMe: true,
      timestamp: new Date(),
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setMessage('');
    onSendMessage(newMessage);
    flatListRef.current.scrollToEnd({ animated: true });
  };

  const pickImage = () => {
    showBottomSheet();
  };

  const showBottomSheet = () => {
    setBottomSheetVisible(true);
    actionSheetRef.current.show();
  };

  const handleBottomSheetSelection = (index) => {
    setBottomSheetVisible(false);
    if (index === 0) {
      // Take Photo
      handleCameraLaunch();
    } else if (index === 1) {
      // Choose from Gallery
      openImagePicker();
    }
  };

  // const handleCameraLaunch = async () => {
  //   launchCamera({ mediaType: 'photo', maxHeight: 2000, maxWidth: 2000 }, handleImagePickerResponse);
  // };

  const handleCameraLaunch = async () => {
    if (Platform.OS === 'ios') {
      const options = {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 2000,
        maxWidth: 2000,
      };
      launchCamera(options, (response) => handleImagePickerResponse(response, true));
    } else {
      console.log('Camera is not available in the simulator. Using a placeholder image.');
      const placeholderImage = {
        uri: 'https://via.placeholder.com/200',
        type: 'image/jpeg',
        name: 'placeholder.jpg',
      };
      handleImagePickerResponse({ assets: [placeholderImage] }, true);
    }
  };

  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, (response) => handleImagePickerResponse(response, false));
  };

  const handleImagePickerResponse = (response, fromCamera) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else {
      console.log('upload image response', response, fromCamera);
      const selectedImage = {
        uri: response.assets?.[0]?.uri,
        type: fromCamera ? 'image/jpeg' : response.type,
        name: fromCamera ? 'image.jpg' : response.fileName,
      };

      const newMessage = {
        id: Date.now(),
        image: selectedImage.uri,
        fromMe: true,
        timestamp: new Date(),
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);

      flatListRef.current.scrollToEnd({ animated: true });
    }
  };


  const handleLongPress = (item) => {
    Alert.alert(
      'Are you sure you want to delete?',
      'Select an option',
      [
        { text: 'Delete Message', onPress: () => handleDeleteMessage(item) },
        { text: 'Cancel', style: 'cancel' },
      ],
      { cancelable: true }
    );
  };

  const handleDeleteMessage = (item) => {
    // Implement logic to delete the message
    setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== item.id));
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return ''; // Handle empty timestamps

    const date = new Date(timestamp);
    if (isNaN(date.getTime())) return ''; // Handle invalid date

    const options = { hour: '2-digit', minute: '2-digit', hour12: true };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };



  const renderMessage = ({ item }) => {
    return (
      <TouchableOpacity
        style={[styles.feedbackContainer]}
        borderless={false}
        onLongPress={() => handleLongPress(item)}>
        <View style={[item.fromMe ? styles.messageFromMe : styles.messageFromFriend, styles.messageBubble]}>
          {item.image ? (
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: item.image }}
                style={styles.imageMessage}
              />
              <Text style={[styles.timestampText, styles.timestampTextImage]}>{formatTimestamp(item?.timestamp)}</Text>
            </View>
          ) : (
            <>
              <Text style={styles.messageText}>{item.text}</Text>
              <Text style={styles.timestampText}>{formatTimestamp(item?.timestamp)}</Text>
            </>
          )}
        </View>
      </TouchableOpacity>
    );
  };


  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>


        <View style={[styles.header, themesColor && { backgroundColor: themesColor }]}>
          <TouchableOpacity style={{ paddingRight: 10 }} onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="#ffffff" />
            {/* <Image source={require('../src/Assests/backArrow.jpg')} style={{width:30,height:30}} ccessible={true} alt="Back Arrow" /> */}
          </TouchableOpacity>
          <View style={styles.userInfo}>
            {profileData?.image ? (
              <TouchableOpacity>
                <Image source={{ uri: profileData?.image }} style={{ width: 30, height: 30, borderRadius: 15 }} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity  >
                <Icon name="account-circle" size={30} color="#ffffff" />
              </TouchableOpacity>
            )}
            <Text style={styles.headerText}>{profileData?.name || 'My Friend'}</Text>
          </View>
        </View>
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderMessage}
          contentContainerStyle={styles.messageContainer}
          onContentSizeChange={() => flatListRef.current.scrollToEnd({ animated: true })}
          onLayout={() => flatListRef.current.scrollToEnd({ animated: true })}
        />


        <View style={styles.inputContainer}>
          {/* <TouchableOpacity style={styles.uploadIcon} onPress={pickImage}>
            <Image source={require('../src/Assests/cameraIcon.jpeg')} style={{width:30,height:30}} />
          </TouchableOpacity> */}
          <TextInput
            style={styles.input}
            placeholder="Type a message"
            placeholderTextColor={'grey'}
            value={message}
            onChangeText={(text) => setMessage(text)}
          />
          <TouchableOpacity style={[styles.sendButton, themesColor && { backgroundColor: themesColor }]} onPress={sendMessage}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>

        <ActionSheet
          ref={actionSheetRef}
          title={'Select a photo'}
          options={['Take Photo', 'Choose from Gallery', 'Cancel']}
          cancelButtonIndex={2}
          destructiveButtonIndex={2}
          onPress={handleBottomSheetSelection}
          visible={bottomSheetVisible}
        />
      </View>
    </SafeAreaView>
  );
};

ChatScreen.propTypes = {
  friend: PropTypes.object.isRequired,
  initialMessages: PropTypes.array,
  onSendMessage: PropTypes.func.isRequired,
  profileData: PropTypes.object,
};

export default ChatScreen;
