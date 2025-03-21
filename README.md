# React Native Chat UI

A simple chat interface built using React Native, with real-time messaging via Socket.IO, image sharing, and more.

![Chat UI Preview](https://raw.githubusercontent.com/akleem-AA/react-native-chat-ui/main/src/Assests/chat-preview.png)

## Table of Contents
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Props](#props)
- [Passing Data](#passing-data)
- [Folder Structure](#folder-structure)
- [Publishing Your Own Package](#publishing-your-own-package)

## Features
- Real-time messaging with Socket.IO
- Text and image messages
- Clean, user-friendly UI
- Support for custom styles and easy navigation

## Prerequisites
Before you begin, make sure you have the following installed:
- [Node.js](https://nodejs.org/) (>= 14.0.0)
- [React Native CLI](https://reactnative.dev/docs/environment-setup)
- Xcode (for iOS development)
- Android Studio (for Android development)

## Installation

1. Install the package using npm:
   ```bash
   npm install react-native-chat-ui
   ```
   Or using yarn:
   ```bash
   yarn add react-native-chat-ui
   ```

2. Install peer dependencies:
   ```bash
   npm install socket.io-client react-native-image-picker
   ```

3. Link dependencies (if required):
   ```bash
   npx react-native link
   ```

## Usage

### Basic Example

```javascript
import React, { useState } from 'react';
import ChatUI from 'akleem-react-native-chat';;

const initialMessages = [
  { id: '1', text: 'Hello!', fromMe: false, timestamp: Date.now(), image: null },
  { id: '2', text: 'Hi there!', fromMe: true, timestamp: Date.now(), image: null },
];

const ChatScreen = () => {
  const [messages, setMessages] = useState(initialMessages);

  const onSendMessage = (message) => {
    setMessages([...messages, message]);
  };

  return <ChatUI
    messageData={messages} // render message
    onSendMessage={onSendMessage} // help to send message
    profileData={{ name: 'John' }}
    themesColor={'blue'} //default is whatsapp themes
  />;
};

export default ChatScreen;
```

## Props

| Prop Name       | Type     | Description |
|----------------|----------|-------------|
| `messageData` | `Array` | List of initial chat messages |
| `onSendMessage`  | `Function` | Callback function when a message is sent |
| `profileData` | `Object` | User profile data (e.g., `{ name: 'John' }`) |
| `themesColor` | `color code` | Theme customization (e.g., `{'#6200ea'}`) |

## Passing Data

Ensure you pass messages in the following format:
```json
[
  {
    "id": "1",
    "text": "Hello!",
    "fromMe": false,
    "timestamp": 1711025520000,
    "image": null
  },
  {
    "id": "2",
    "text": "Hi there!",
    "fromMe": true,
    "timestamp": 1711025580000,
    "image": "https://example.com/sample.jpg"
  }
]
```

## Folder Structure
```
react-native-chat-ui/
├── src/
│   ├── components/
│   │   ├── ChatBubble.js
│   │   ├── ChatInput.js
│   ├── screens/
│   │   ├── ChatScreen.js
│   ├── assets/
│   │   ├── chat-preview.png
├── package.json
├── README.md
├── index.js
```

## Publishing Your Own Package

If you want to publish your own version of this package to npm, follow these steps:

### 1. Initialize a New Package
```bash
npm init
```

### 2. Update package.json
Ensure the `name` field in `package.json` is unique and not already taken on npm.

### 3. Login to npm
```bash
npm login
```

### 4. Publish the Package
For a private package:
```bash
npm publish
```
For a public package:
```bash
npm publish --access public
```

### 5. Update the Package (if needed)
To update the package, increment the version number in `package.json` and run:
```bash
npm publish
```

### 6. Unpublish (if needed)
If you need to remove a package from npm:
```bash
npm unpublish package-name --force
```

---

This `README.md` provides complete instructions on installing, using, and publishing your package. 🚀 Let me know if you need further modifications!

