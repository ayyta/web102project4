import { useEffect, useState } from 'react'
const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

const DogInfo = (props) => {
  return (
    <>
      <div className="info-container">
        {props.list.map((attribute) => (
          <button onClick={() => props.banAttr(attribute)}>{attribute}</button>
        ))}
      </div>
      <p>{props.name}</p>
      <div className="img-container">
        <img src={props.img}></img>
      </div>
    </>
  )
}

const FilterAttributes = (props) => {
  return (
    <>
    
    <div className="filtered-container">
      {props.list.map((attribute, index) => (
        <button key={index} onClick={() => props.removeAttr(attribute)}>{attribute}</button>
      ))}
    </div>
    
    </>
  )
}

const Dogs = () => {
  const [bannedAttr, setBannedAttr] = useState([]);
  const [attributes, setAttr] = useState([]);
  const [name, setName] = useState('');
  const [catImg, setCatImg] = useState('');

  const addToBanned = (attribute) => {
    if (!bannedAttr.includes(attribute)) {
      setBannedAttr([...bannedAttr, attribute]);
    }
    console.log(bannedAttr);
  }

  const removeBanned = (attribute) => {
    setBannedAttr(bannedAttr.filter(attr => attr !== attribute));
  }
  const callAPI = async (query) => {
    try {
      const response = await fetch(query);
      const json = await response.json();

      const data = json[0];
      const attr = data.breeds[0];

      if ( (bannedAttr.includes(attr.life_span)) || (bannedAttr.includes(attr.origin)) || (bannedAttr.includes(attr.weight)) ) {
        callAPI(query).catch(console.error);
      } else {
        setCatImg(data.url);
        setAttr([attr.life_span, attr.origin, attr.weight.imperial])
        setName(attr.name)
      }

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const API_KEY = "live_4oeewzmDDTUWebj93os6tROFnFYwvMZFfANYs5ZvcLAT6rd6tCLNKf582ipyzIB4";
    let url = `https://api.thecatapi.com/v1/images/search?limit=1&has_breeds=1&api_key=${API_KEY}`;
    callAPI(url).catch(console.error);
  }, [])


  const handleDiscoverClick = () => {
    const API_KEY = "live_4oeewzmDDTUWebj93os6tROFnFYwvMZFfANYs5ZvcLAT6rd6tCLNKf582ipyzIB4";
    let url = `https://api.thecatapi.com/v1/images/search?limit=1&has_breeds=1&api_key=${API_KEY}`;

    callAPI(url).catch(console.error);

    console.log(bannedAttr.includes(attributes[0]), (bannedAttr.includes(attributes[1])), (bannedAttr.includes(attributes[2])), attributes)
    /*while ( (bannedAttr.includes(attributes[0])) || (bannedAttr.includes(attributes[1])) || (bannedAttr.includes(attributes[2])) ) {
      callAPI(url).catch(console.error);
    }*/
  }
  
  const sampleInfo = [['hello', 'this works'], 'name', 'https://img.freepik.com/free-photo/isolated-happy-smiling-dog-white-background-portrait-4_1562-693.jpg']
  return (
  <>
    <div className="cat-info-container">
      <div>
        <h1>Find Your Cat</h1>
        <p>Discover New Breeds of Cats</p>
        <DogInfo list={attributes} name={name} img={catImg} banAttr={addToBanned}/>
        <div className='discover-button-container'>
          <button className="discover-button" onClick={handleDiscoverClick}>Discover</button>
        </div>

      </div>

      <div>
        <h1 className="banned-title">FILTERED ATTRIBUTES</h1>
        <FilterAttributes list={bannedAttr} removeAttr={removeBanned}/>
      </div>
    </div>
  </>
  )
}


export default Dogs