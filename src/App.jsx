import React from 'react'
import './App.css'
import './index.css'
import './output.css'
import AppContent from './components/AppContent'
import { Provider } from 'react-redux';
import { store } from './store/store'; 
function App() {
  return (
 <Provider store={store}>
  <AppContent />
 </Provider>
  );
}

export default App