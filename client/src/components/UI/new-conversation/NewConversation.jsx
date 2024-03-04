// external imports
import { useStoreState } from "easy-peasy";

const NewConversation = () => {
  const newUser = useStoreState((state) => state.currentChat.currChat);
  const isLoading = newUser.isConversationStart;

  return (
    <>{isLoading ? <h3>Loading...</h3> : <h3>Start New Conversation</h3>}</>
  );
};

export default NewConversation;
