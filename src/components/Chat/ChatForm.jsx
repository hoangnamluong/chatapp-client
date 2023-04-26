import "./scss/chatForm.scss";
import { memo, useEffect, useState } from "react";
import SendIcon from "../../assets/svg/send.svg";
import axiosClient from "../../app/api/axiosClient";
import { endpoints } from "../../app/api/axiosClient";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../../features/auth/authSlice";
import useTypingContext from "../../hooks/useTypingContext";
import useLazyAxios from "../../hooks/useLazyAxios";
import { Spinner } from "react-bootstrap";

const ChatForm = ({ chatId, socket = null, setData, selectedChat }) => {
  const accessToken = useSelector(selectAccessToken);

  const { typing, isTyping, dispatch } = useTypingContext();

  const [fetch, { data, isLoading, isSuccess, isError, error }] = useLazyAxios({
    url: endpoints.message,
    method: "post",
  });

  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLoading) return;

    setMessage(message.trim());

    const messageSpaceOnly = message.replace(/\s/g, "").length;

    if (!message || !messageSpaceOnly) {
      return;
    }

    fetch({
      chatId,
      content: message,
    });

    setMessage("");
  };

  useEffect(() => {
    if (isSuccess) {
      setData((prev) => [...prev, data]);
      socket.emit("new message", data);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (chatId !== selectedChat) setMessage("");
  }, [chatId]);

  const onChangedMessage = (e) => {
    setMessage(e.target.value);

    if (!typing) {
      dispatch({ type: "SET_TYPING_TRUE" });
      socket.emit("typing", chatId);
    }

    let lastTypingTime = new Date().getTime();
    let typingTimer = 1000;

    setTimeout(() => {
      let timeNow = new Date().getTime();
      let timeDiff = timeNow - lastTypingTime;

      if (timeDiff >= typingTimer && typing) {
        dispatch({ type: "SET_TYPING_FALSE" });
        socket.emit("stop typing", chatId);
      }
    }, typingTimer);
  };

  return (
    <form onSubmit={handleSubmit} className="message-form">
      <div className="input-container">
        <input
          name="message"
          className="message-input"
          placeholder="Aa"
          value={message}
          onChange={onChangedMessage}
        />
        <span onClick={handleSubmit}>
          {isLoading ? (
            <Spinner style={{ width: "30px", height: "30px" }} />
          ) : (
            <img src={SendIcon} width={30} height={30} />
          )}
        </span>
      </div>
    </form>
  );
};

const memoizedChatForm = memo(ChatForm);

export default memoizedChatForm;
