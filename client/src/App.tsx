import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Game } from './pages/Game';
import { Contact } from './pages/Contact';
import { NotFound } from './pages/NotFound';

const App: React.FC = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/about" exact component={About} />
				<Route path="/contact" exact component={Contact} />
				<Route path="/game" exact component={Game} />
				<Route path="/game/:id" exact component={Game} />
				<Route path="/" component={NotFound} />
			</Switch>
		</BrowserRouter>
	);
};

export default App;
