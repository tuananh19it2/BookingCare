import React, { useState, useRef, useEffect } from "react";
import "./ChatBox.scss";
import ChatboxIcon from "../../assets/logochatbot1.png";
import ChatboxImg from "../../assets/chatbot.png";
import { SendOutlined } from "@ant-design/icons";

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const textFieldRef = useRef(null);

  const toggleState = () => {
    console.log("CHATBOTNOR");
    setIsOpen(!isOpen);
  };

  const onSendButton = () => {
    const text1 = textFieldRef.current.value;
    if (text1 === "") {
      return;
    }

    const newUserMessage = { name: "User", message: text1 };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);

    console.log("mess", newUserMessage);

    fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      body: JSON.stringify({ message: text1 }),
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        const newSamMessage = { name: "Bot", message: response.answer };
        setMessages((prevMessages) => [...prevMessages, newSamMessage]);
        textFieldRef.current.value = "";
      })
      .catch((error) => {
        console.log("Error:", error);
        textFieldRef.current.value = "";
      });
  };

  const updateChatText = () => {
    return messages.map((item, index) => {
      const className =
        item.name === "Bot"
          ? "messages-item messages-item-visitor"
          : "messages-item messages-item-operator";
      return (
        <div key={index} className={className}>
          {item.message}
        </div>
      );
    });
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      onSendButton();
    }
  };

  useEffect(() => {
    const chatbox = document.querySelector(".chatbox-messages");
    chatbox.scrollTop = chatbox.scrollHeight;
  }, [messages]);

  return (
    <div className="container">
      <div className="chatbox">
        <div className={`${isOpen ? "chatbox-active" : "chatbox-support"}`}>
          <div className="chatbox-header">
            <div className="chatbox-image-header">
              <img src={ChatboxImg} width="60px" height="60px" />
            </div>
            <div className="chatbox-content-header">
              <h4 className="chatbox-heading-header">Chat support</h4>
              <p className="chatbox-description-header">
                Hi. My name is Chatbot. How can I help you?
              </p>
            </div>
          </div>
          <div className="chatbox-messages">{updateChatText()}</div>
          <div className="chatbox-footer">
            <input
              className="footer-input"
              ref={textFieldRef}
              type="text"
              placeholder="Write a message..."
              onKeyPress={handleKeyPress}
            />
            <button className="chatbox-send-footer" onClick={onSendButton}>
              <SendOutlined />
            </button>
          </div>
        </div>
        <div className="chatbox-button">
          <button onClick={toggleState}>
            <img src={ChatboxIcon} alt="Chat" width="40px" height="40px" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
