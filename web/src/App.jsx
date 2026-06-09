import { Routes, Route } from 'react-router';
import {
  Home,
  SignUp,
  Login,
  Notifications,
  Call,
  Chat,
  OnBoarding,
} from './pages/index.js';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <section className="h-screen" data-theme="calmpizza">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/onboarding' element={<OnBoarding />} />
        <Route path='/notifications' element={<Notifications />} />
        <Route path='/call' element={<Call />} />
        <Route path='/chat' element={<Chat />} />
      </Routes>

      <Toaster />
    </section>
  )
}

export default App
