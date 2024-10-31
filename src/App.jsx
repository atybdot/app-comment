
import ListComments from "./components/CommentSection";

function App() {

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="uppercase p-2 text-yellow-400 font-bold font-mono text-3xl">app-comment prototype</div>
      <ListComments defaultPost={"lorem-post"} />
    </div>
  );
}

export default App;
