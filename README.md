# React Native Chat UI

A simple chat interface built using React Native, with real-time messaging via Socket.IO, image sharing, and more.

![Chat UI Preview](https://raw.githubusercontent.com/akleem-AA/react-native-chat-ui/main/src/Assests/chat-preview.png)

## Table of Contents
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
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
import { ChatUI } from 'react-native-chat-ui';

const messages = [
  { id: 1, text: 'Hello!', sender: 'user', timestamp: '10:30 AM' },
  { id: 2, text: 'Hi there!', sender: 'me', timestamp: '10:32 AM' },
];

const ChatScreen = () => {
  const [chatMessages, setChatMessages] = useState(messages);

  const sendMessage = (message) => {
    setChatMessages([...chatMessages, message]);
  };

  return <ChatUI messages={chatMessages} onSendMessage={sendMessage} />;
};

export default ChatScreen;
```

## Passing Data

Ensure you pass messages in the following format:
```json
[
  {
    "id": 1,
    "text": "Hello!",
    "sender": "user",
    "timestamp": "10:30 AM"
  },
  {
    "id": 2,
    "text": "Hi there!",
    "sender": "me",
    "timestamp": "10:32 AM"
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

