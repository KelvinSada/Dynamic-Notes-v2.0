import './App.css'
import Header from './Header'
import Home from './Home'
import Menu from './Menu'

function App() {

  return (
    <>
    <main className='relative min-h-screen bg-[#f4f4f4]'>
      <Header/>
      <Home/>
      <div className='absolute bottom-5 w-full'>
        <Menu/>
      </div>
    </main>
    </>
  )
}

export default App
