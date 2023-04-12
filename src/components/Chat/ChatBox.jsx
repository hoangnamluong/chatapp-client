import ChatUsersAvatar from "../GroupChat/ChatUsersAvatar";
import ChatForm from "../../components/Chat/ChatForm";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useSelector } from "react-redux";
import { selectChat } from "../../features/chat/chatSlice";
import "./scss/chatBox.scss";
import Messages from "../Message/MessageItem";
import useAxios from "../../hooks/useAxios";
import { Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useTypingContext from "../../hooks/useTypingContext";
import useNotificationContext from "../../hooks/useNotificationContext";
import filterLoggedUser from "../../utils/filterLoggedUser";
import io from "socket.io-client";
import { endpoints } from "../../app/api/axiosClient";
import BouncingLoader from "../misc/BouncingLoader";

let socket = null;
let selectedChatCompare = null;

const ChatBox = () => {
  const { typing, isTyping, dispatch: typingDispatch } = useTypingContext();
  const { notifications, dispatch: notificationDispatch } =
    useNotificationContext();

  const { _id: userId } = useAuth();

  const chat = useSelector(selectChat);
  const { _id, name, users, isGroupChat } = chat ?? "";

  const [messages, setMessages] = useState([]);
  const [socketConnected, setSocketConnected] = useState(false);

  const { data, isLoading, isSuccess, isError, error } = useAxios({
    url: endpoints.message + `/${_id}`,
    method: "get",
  });

  //Event Handler
  const onChangedSocketConnected = (e) => setSocketConnected((prev) => !prev);

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
          console.log("ddd");

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

  const filteredUser = filterLoggedUser(users ?? []);

  const renderContent = chat ? (
    <>
      <div className="chat-box__title">
        <h4>{name ?? ""}</h4>
      </div>
      <div className="chat-box__messages">
        <div className="chat-box__inner">
          <div className="text-center chat-box__sub-title">
            <div className="d-flex justify-content-center mb-3">
              <ChatUsersAvatar users={users} />
            </div>
            <h5>{isGroupChat ? name : filteredUser[0].username}</h5>
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

  return <div className="chat-box">{renderContent}</div>;
};
export default ChatBox;
