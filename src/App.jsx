import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Data from './Data';
import Home from './Home';
import Faturamento from './Modulos/Faturamento';
import EstatisticaGeral from './Modulos/EstatisticaGeral';
import Diagostico from './Modulos/Diagnostico';
import Suprimentos from './Modulos/Suprimentos';
import BlocoCirurgico from './Modulos/BlocoCirurgico';
import ProntoAtendimento from './Modulos/ProntoAtendimento';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Data />} />
        <Route path="/home" element={<Home />} />
        <Route path="/faturamento" element={<Faturamento />}/>
        <Route path='/estatisticas-gerais' element={<EstatisticaGeral/>}/>
        <Route path='/bloco-cirurgico' element={<BlocoCirurgico/>}/> 
        <Route path='/pronto-atendimento' element={<ProntoAtendimento/>}/>    
        <Route path='/suprimentos' element={<Suprimentos/>}/> 
        <Route path='/diagnostico' element={<Diagostico/>}/>                                                
      </Routes>
    </Router>
  );
}


export default App;
