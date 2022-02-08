import Sbutton from '../../components/Sbutton';
import { useNavigate } from 'react-router-dom';



const ThirdParty= () => {

    const navigate = useNavigate(); 
    const routeChange = () =>{ 
        let path = '/addNewThirdParty'; 
        navigate(path);
    }

    return ( 
        <div>
           
            <div>
                <Sbutton text="Add New" onClick={routeChange}></Sbutton>
            </div>
            
        </div>
     );
}
 
export default ThirdParty;