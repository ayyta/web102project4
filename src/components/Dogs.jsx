import { useEffect, useState } from 'react'
const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

const DogInfo = (props) => {
  return (
    <>
      <div className='check'>
        {props.list.map((attribute) => (
          <button onClick={() => addToBanned(attribute)}>{attribute}</button>
        ))}
      </div>
      <p>{props.name}</p>
      <img src={props.img}></img>
    </>
  )
}

const setAttrAndName = (data, setAttr, setName, setCatID) => {
  data = data.breeds[0]
  setAttr([data.life_span, data.origin, data.weight.imperial]);
  setName(data.name);
  setCatID(data.id)
}

const findAndSetImg = (data, setCatImg, setAttr, setName) => {
  console.log('data: ', data)
  setCatImg(data[0].url)
}

const Dogs = () => {
  const [bannedAttr, setBannedAttr] = useState([]);
  const [attributes, setAttr] = useState([]);
  const [name, setName] = useState('');
  const [catImg, setCatImg] = useState('');
  const [catID, setCatID] = useState('');

  const addToBanned = (attribute) => {
    setBannedAttr([...bannedAttr, attribute]);
  }

  const handleDiscoverClick = () => {
    useEffect(() => {
      const API_KEY = "live_4oeewzmDDTUWebj93os6tROFnFYwvMZFfANYs5ZvcLAT6rd6tCLNKf582ipyzIB4";
      let url = `https://api.thecatapi.com/v1/images/search?limit=1&has_breeds=1&api_key=${API_KEY}`;
      let imgURL = `https://api.thecatapi.com/v1/images/search?breed_ids={catID}`
      const callAPI = async (query) => {
        try {
          const response = await fetch(query);
          const json = await response.json();

          const data = json[0];
          const attr = data.breeds[0]
          setCatImg(data.url);
          setAttr([attr.life_span, attr.origin, attr.weight.imperial])
          setName(attr.name)
          console.log('over here bruh',data)

        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      callAPI(url).catch(console.error);


    }, []) 
  }
  
  console.log("HELLO", attributes, name, catImg)
  const sampleInfo = [['hello', 'this works'], 'name', 'https://img.freepik.com/free-photo/isolated-happy-smiling-dog-white-background-portrait-4_1562-693.jpg']
  return (
  <>
    <div>
      <h1>Find Your Dawg</h1>
      <p>discover dogs</p>
      <DogInfo list={attributes} name={name} img={catImg}/>
      <button onClick={handleDiscoverClick}>Discover</button>
    </div>
  </>
  )
}


export default Dogs