import { useState } from 'react';
import { Link } from "react-router-dom";

const ControlledInput = () => {
  const [value, setValue] = useState('');
  const [check, setCheck] = useState(false);

  const onChangeVal = (event) => {
    setValue(event.target.value);
  };
  const onChangeChk = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    setCheck(value);
  };

  return (
    <div className="inputPage"> 
    <input className="genericInput" type="checkbox" id="nextto" name="nextto" onChange={onChangeChk}/>
    <label for="nextto">Czy miejsca mają być obok siebie?</label>
    <br/>
    Liczba miejsc:<input style={{marginLeft: 20 + "px"}} className="genericInput" value={value} onChange={onChangeVal} />
    <Link className="link" to={{
        pathname: '/bookings',
        state: [value, check]
        }}>Wybierz miejsca</Link>
    
    
      
      
    </div>
    
  );
}

export default ControlledInput