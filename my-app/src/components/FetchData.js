import React, { useEffect, useState } from "react";
import { Row, Col } from 'antd'
import {useLocation, Link} from 'react-router-dom';
const FetchData = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const { state } = useLocation();
    useEffect(() => {
      fetch("http://localhost:3000/seats")
        .then(res => res.json())
        .then(
          (result) => {
            setIsLoaded(true)
            var tab = []
            for (var i = 0; i <= result[result.length - 1].cords.x; i++) {
                tab[i] = []
                for (var p = 0; p <= result[result.length - 1].cords.y; p++) {
                    tab[i][p] = {}
                    for (var q = 0; q < result.length; q++) {
                        if(result[q].cords.x === i && result[q].cords.y === p) {
                            tab[i][p] = result[q]
                            if (tab[i][p].reserved === false) {
                                tab[i][p].added = false
                            }
                        }
                    }
                }
            }
            for(var i = 0; i < state[0]; i++){
                for(var p = 0; p < tab.length; p++){
                    for(var q = 0; q < tab[0].length; q++){
                        if(tab[p][q].reserved === false && tab[p][q].added !== true) {
                            tab[p][q].added = true;
                            break
                        }
                    }
                    break
                }
            }
            setItems(tab);
            console.log(items)
            
          },
         
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
        
    }, [])
    console.log(state)

  
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
            <div style={{margin: 20 +"px"}}>
            {items.map((subItems, index) => {
            return (
            <Row key={subItems[0].id + subItems[subItems.length - 1].id}>
                {subItems.map((item, subIndex) => {
                return (
                    <Col key={item.id}> 
                        <div style={{width: 64 + "px", height: 64 + "px", margin: 6 + "px"}}>
                        {item.id && 
                            <div className = "squareDiv" style={{backgroundColor: item.reserved? '#39403c': 'white'}} onClick={(event) => {
                                if(item.reserved === false) {
                                    item.added = !item.added
                                    console.log(items)
                                    // var copy = items
                                    // copy[index][subIndex].added = !copy[index][subIndex].added 
                                    // setItems(copy)
                                    if(item.added === true) {
                                        event.target.style.backgroundColor = "#ff9d2e"
                                    } else {
                                        event.target.style.backgroundColor = "white"
                                    }
                                }
                                
                                
                            }}> 
                                {item.added === true && 
                                    <div key={item.id} style={{backgroundColor: "#ff9d2e", width: 62 + "px", height: 62 + "px"}}>
                                                
                                    </div>
                                }
                            </div>
                        }
                
                        </div> 
                    </Col>
                )
                })}
            </Row>
            );
                })}
            </div>
            <div className="Footer">
                <div className="squareDiv" style={{backgroundColor: "white", marginRight: 8 + "px" }}></div>
                Miejsca dostępne
                <div className="squareDiv" style={{backgroundColor: "#39403c", marginLeft: 76 + "px", marginRight: 8 + "px" }}></div>
                Miejsca zarezerwowane
                <div className="squareDiv" style={{backgroundColor: "#ff9d2e", marginLeft: 76 + "px", marginRight: 8 + "px" }}></div>
                Twój wybór
                <Link style={{marginLeft: 76 + "px"}} className="link" to={{
                pathname: '/book',
                state: items
                }}>Zarezerwuj</Link>
            </div>
        </div>
      );
    }
  }
  
export default FetchData