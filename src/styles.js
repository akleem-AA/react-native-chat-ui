import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#075e54' },
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    backgroundColor: '#075e54',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  headerText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },

  userInfo: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  profileImage: { width: 40, height: 40, borderRadius: 20, marginLeft: 'auto' },
  messageContainer: { padding: 10 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', padding: 10, borderTopWidth: 1, borderColor: '#bdc3c7' },
  input: { flex: 1, height: 40, borderWidth: 1, borderColor: '#bdc3c7', borderRadius: 8, paddingHorizontal: 10 },
  sendIcon: { padding: 5 },
  messageText: { color: '#000000', fontSize: 16 },
  messageFromMe: { alignSelf: 'flex-end', backgroundColor: '#dcf8c6', padding: 10, borderRadius: 10, maxWidth: '80%' },
  messageFromFriend: { alignSelf: 'flex-start', backgroundColor: '#ffffff', padding: 10, borderRadius: 10, maxWidth: '80%' },
  imageMessage: { width: 200, height: 200, borderRadius: 8 },
  messageBubble: {
    padding: 10,
    borderRadius: 10,
    maxWidth: '80%',
},
feedbackContainer: {
  marginVertical: 5,
  // borderWidth:1,
  // maxWidth:'100%'
},
imageContainer: {
  position: 'relative',
},
timestampText: {
  fontSize: 12,
  color: '#777',
  marginTop: 5,
  alignSelf: 'flex-end',
},
timestampTextImage: {
  position: 'absolute',
  bottom: 5,
  right: 5,
  // backgroundColor: 'rgba(255, 255, 255, 255)',
  paddingHorizontal: 5,
  borderRadius: 3,
  color:'white'
},
input: {
  flex: 1,
  height: 40,
  borderWidth: 1,
  borderColor: '#bdc3c7',
  borderRadius: 8,
  marginRight: 10,
  paddingHorizontal: 10,
},
uploadIcon: {
  marginLeft: 10,
  paddingRight:10,
},
sendButton: {
  padding: 10,
  borderRadius: 8,
  backgroundColor: '#075e54',
},
sendButtonText: {
  color: '#ffffff',
},

});

export default styles;
