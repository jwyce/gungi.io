import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Flower } from './components/Flower'; // TODO: remove
import { Home } from './modules/Home';
import { About } from './modules/About';
import { Game } from './modules/Game';
import { Contact } from './modules/Contact';
import { Login } from './modules/Login';
import { Lobby } from './modules/Lobby';
import { NotFound } from './modules/NotFound';

const App: React.FC = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/flower" exact component={Flower} />
				<Route path="/about" exact component={About} />
				<Route path="/contact" exact component={Contact} />
				<Route path="/login" exact component={Login} />
				<Route path="/lobby" exact component={Lobby} />
				<Route path="/game" exact component={Game} />
				<Route path="/" component={NotFound} />
			</Switch>
		</BrowserRouter>
	);
};

export default App;
