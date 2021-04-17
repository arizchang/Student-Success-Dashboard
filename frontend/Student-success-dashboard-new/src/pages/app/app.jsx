import Route from '../../router'
import { NavLink, BrowserRouter } from 'react-router-dom'
import './app.css'

function App() {
	return (
		<BrowserRouter>
			<div className='App'>
				<header className='App-header'>
					<nav>
						<NavLink to='/home'>Home</NavLink>
						<NavLink to='/calender'>Calender</NavLink>
						<NavLink to='/dueDate'>Due Dates</NavLink>
						<a href={'https://webapp4.asu.edu/myasu/'}>MyASU</a>
					</nav>
				</header>
				<div className='content container'>
					<Route />
				</div>
			</div>
		</BrowserRouter>
	)
}

export default App
