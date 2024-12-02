import "./index.css";
import {PageHeader} from "./layout/pageHeader";
import {Todo} from "./layout/todo";


export default function App() {
  return (
    <div>
      <div className="sticky top-0 z-10 bg-white">
        <PageHeader />
        <Todo />
      </div>
    </div>
  );
};