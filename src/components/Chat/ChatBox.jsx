import "./scss/chatBox.scss";

import InfoIcon from "../../assets/svg/info.svg";
import BackIcon from "../../assets/svg/back.svg";

import ChatUsersAvatar from "../GroupChat/ChatUsersAvatar";
import ChatForm from "../../components/Chat/ChatForm";
import Messages from "../Message/MessageItem";
import useAxios from "../../hooks/useAxios";
import { Spinner } from "react-bootstrap";
import BouncingLoader from "../misc/BouncingLoader";
import Avatar from "../User/Avatar";

import { useDispatch, useSelector } from "react-redux";
import {
  clearChat,
  selectChat,
  selectIsOpen,
  toggleAction,
} from "../../features/chat/chatSlice";

import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useTypingContext from "../../hooks/useTypingContext";
import useNotificationContext from "../../hooks/useNotificationContext";

import io from "socket.io-client";
import { endpoints } from "../../app/api/axiosClient";

import filterLoggedUser from "../../utils/filterLoggedUser";
import { useMediaQuery } from "react-responsive";

let socket = null;
let selectedChatCompare = null;

const ChatBox = () => {
  const dispatch = useDispatch();

  const { isTyping, dispatch: typingDispatch } = useTypingContext();
  const { notifications, dispatch: notificationDispatch } =
    useNotificationContext();

  const { _id: userId } = useAuth();

  const isOpen = useSelector(selectIsOpen);
  const chat = useSelector(selectChat);
  const { _id, name, users, isGroupChat, admin } = chat ?? "";

  const [messages, setMessages] = useState([]);
  const [socketConnected, setSocketConnected] = useState(false);

  const mobileScreen = useMediaQuery({ query: "(max-width: 1224px)" });
  const pcScreen = useMediaQuery({ query: "(min-width: 1224px)" });

  const { data, isLoading, isSuccess, isError, error } = useAxios({
    url: endpoints.message + `/${_id}`,
    method: "get",
  });

  //Event Handler
  const onChangedSocketConnected = (e) => setSocketConnected((prev) => !prev);

  const handleInfoClick = () => {
    dispatch(toggleAction());
  };

  const handleRemoveSelectedChat = () => {
    dispatch(clearChat());
    selectedChatCompare = null;
  };

  //usEffect
  useEffect(() => {
    socket = io(import.meta.env.VITE_SERVER_URL);
    socket.emit("setup", userId);
    socket.on("connected", onChangedSocketConnected);

    return () => {
      socket.off("connected", onChangedSocketConnected);
    };
  }, []);

  useEffect(() => {
    if (chat) {
      selectedChatCompare = chat;

      socket.emit("join room", _id);
      socket.on("typing", (roomId) => {
        if (roomId === selectedChatCompare._id)
          typingDispatch({ type: "SET_IS_TYPING_TRUE" });
      });
      socket.on("stop typing", (roomId) => {
        if (roomId === selectedChatCompare._id)
          typingDispatch({ type: "SET_IS_TYPING_FALSE" });
      });
    }

    return () => {
      socket.off("typing", () =>
        typingDispatch({ type: "SET_IS_TYPING_TRUE" })
      );
      socket.off("stop typing", () =>
        typingDispatch({ type: "SET_IS_TYPING_FALSE" })
      );
    };
  }, [chat]);

  useEffect(() => {
    setMessages(data);
  }, [data]);

  useEffect(() => {
    socket.on("message received", (newMessage) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessage.chat._id
      ) {
        const match = notifications.some(
          (notification) => notification.chat._id === newMessage.chat._id
        );
        if (!match) {
          notificationDispatch({
            type: "UNSHIFT_NOTIFICATION",
            payload: newMessage,
          });
        } else {
          notificationDispatch({
            type: "CLEAR_NOTIFICATION",
            payload: newMessage.chat._id,
          });

          notificationDispatch({
            type: "UNSHIFT_NOTIFICATION",
            payload: newMessage,
          });
        }
      } else {
        setMessages([...messages, newMessage]);
      }
    });

    return () => {
      socket.off("message received");
    };
  });

  //Rendered Component
  const MessageRender = () => {
    if (isLoading)
      return (
        <div className="text-center">
          <Spinner variant="primary" />
        </div>
      );

    if (isError) {
      console.log(error);
      return;
    }

    if (isSuccess) {
      return messages.length
        ? messages.map((message) => (
            <Messages key={message._id} message={message} />
          ))
        : null;
    }
  };

  const filteredUser = filterLoggedUser(users ? users : []);

  const renderContent = chat ? (
    <>
      <div className="chat-box__title">
        <div className="d-flex gap-3">
          <img
            src={BackIcon}
            width={30}
            height={30}
            onClick={handleRemoveSelectedChat}
            className="cursor-pointer"
          />
          <h4>{name ?? ""}</h4>
        </div>
        <img
          src={InfoIcon}
          width={30}
          height={30}
          onClick={handleInfoClick}
          className="cursor-pointer"
        />
      </div>
      <div className="chat-box__messages">
        <div className="chat-box__inner">
          <div className="text-center chat-box__sub-title">
            <div className="d-flex justify-content-center mb-3">
              {users.length > 1 && <ChatUsersAvatar users={users} />}
              {admin && users.length === 1 && <Avatar src={admin.avatar} />}
            </div>
            <h5>{isGroupChat ? name : filteredUser[0]?.username}</h5>
            <p>You're now connected</p>
          </div>
          <MessageRender />
          {isTyping && (
            <div className="d-flex loader align-items-center my-2">
              <BouncingLoader /> &nbsp; Someone is Typing
            </div>
          )}
        </div>
      </div>
      <div className="chat-box__form">
        <ChatForm
          chatId={_id}
          socket={socket}
          setData={setMessages}
          selectedChat={selectedChatCompare}
        />
      </div>
    </>
  ) : (
    <h1 className="d-flex justify-content-center align-items-center h-100">
      Select A Chat To Start Talking
    </h1>
  );

  return (
    (pcScreen || (mobileScreen && chat && !isOpen)) && (
      <div className="chat-box">{renderContent}</div>
    )
  );
};
export default ChatBox;
