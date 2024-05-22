import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';

const ChatbotScreen = () => {
    const [messages, setMessages] = useState([
        {
            id: '1',
            text: 'What ya your problem?',
            sender: 'bot',
        },
    ]);
    const [inputText, setInputText] = useState('');

    const handleSend = () => {
        if (inputText.trim()) {
            const newMessage = {
                id: Date.now().toString(),
                text: inputText,
                sender: 'user',
            };
            setMessages((prevMessages) => [newMessage, ...prevMessages]);
            setInputText('');
            // Simulate bot response after a delay
            setTimeout(() => {
                const botResponse = {
                    id: (Date.now() + 1).toString(),
                    text: 'I dont work KEK',
                    sender: 'bot',
                };
                setMessages((prevMessages) => [botResponse, ...prevMessages]);
            }, 1000);
        }
    };

    const renderItem = ({ item }) => (
        <View style={[styles.messageContainer, item.sender === 'user' ? styles.userMessage : styles.botMessage]}>
            <Text style={[styles.messageText, item.sender === 'user' ? styles.userMessageText : styles.botMessageText]}>
                {item.text}
            </Text>
        </View>
    );

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Chat bot</Text>
            </View>
            <FlatList
                data={messages}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                inverted
                contentContainerStyle={styles.chatContainer}
            />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={inputText}
                    onChangeText={setInputText}
                    placeholder="Type a message"
                />
                <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
                    <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D5D5D5',
    },
    header: {
        height: 80,
        backgroundColor: '#D5D5D5',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 0,
        borderBottomColor: '#e0e0e0',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    chatContainer: {
        padding: 10,
    },
    messageContainer: {
        padding: 10,
        borderRadius: 10,
        marginVertical: 5,
        maxWidth: '80%',
    },
    userMessage: {
        backgroundColor: 'black',
        alignSelf: 'flex-end',
    },
    botMessage: {
        backgroundColor: '#e0e0e0',
        alignSelf: 'flex-start',
    },
    messageText: {
        fontSize: 18,
    },
    userMessageText: {
        color: '#fff',
    },
    botMessageText: {
        color: '#000',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        backgroundColor: '#ffffff',
    },
    input: {
        flex: 1,
        height: 40,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 10,
        backgroundColor: '#ffffff',
    },
    sendButton: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        width: 60,
        marginLeft: 10,
        borderRadius: 20,
        backgroundColor: 'black',
    },
    sendButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ChatbotScreen;