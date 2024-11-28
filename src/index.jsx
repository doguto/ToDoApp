import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App";
import Todo from "./todo";
//import * as serviceWorker from './serviceWorker'

//ReactDOM.render(<Todo />, document.getElementById('root'))

//serviceWorker.unregister();

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Todo />
	</React.StrictMode>,
);
