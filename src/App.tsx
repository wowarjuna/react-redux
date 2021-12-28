import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css';
import { AppRoutes } from './AppRoutes';
import { NavigationBar } from './components/navigation-bar/NavigationBar';
import MomentUtils from '@date-io/moment'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import { SnackbarProvider } from 'notistack'


function App() {
  return (

    <BrowserRouter>
      <MuiPickersUtilsProvider utils={MomentUtils} >
        <SnackbarProvider>
          <NavigationBar />
          <AppRoutes />
        </SnackbarProvider>
      </MuiPickersUtilsProvider>
    </BrowserRouter>

  );
}

export default App;
