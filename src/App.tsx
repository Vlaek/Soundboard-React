import { FC } from 'react'
import Layout from './components/Layout/Layout'
import Aside from './components/Aside/Aside'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Items from './components/Items/Items'

const App: FC = () => {
	return (
		<div className='container'>
			<Layout aside={<Aside />} header={<Header />} footer={<Footer />} main={<Items />} />
		</div>
	)
}

export default App
