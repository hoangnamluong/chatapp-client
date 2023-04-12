import store from "../../app/store";
import { chatApiSlice } from "../../features/chat/chatApiSlice";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const Prefetch = () => {
  useEffect(() => {
    store.dispatch(
      chatApiSlice.util.prefetch("getAllChats", "chatsList", { force: true })
    );
  }, []);

  return <Outlet />;
};
export default Prefetch;
