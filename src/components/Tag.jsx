import axios from "axios";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";

const API_KEY = process.env.REACT_APP_GIPHY_API_KEY;

const Tag = () => {

  const[gif , setGif] = useState('');
  const[loading ,setLoading] = useState(false);
  const[tag ,setTag] = useState("");


  async function fetchData(){
    setLoading(true);
    const url = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=${tag}`;
    const {data} = await axios.get(url);
    const imageSource = data.data.images.downsized_large.url;
    setGif(imageSource);
    console.log(imageSource);
    setLoading(false);
  }

  useEffect( ()=>{
    fetchData();
  } ,[] )



  return (
      <div className="w-1/2  bg-blue-500 rounded-lg border-black border-2 flex flex-col items-center gap-y-5 mt-[15px]">

        <h1 className='mt-[15px] text-2xl underline uppercase font-bold'>Random {tag} Gif</h1>

        {
          loading ?(<Spinner/>):(<img src={gif} alt="" width="450"/>)
        }


        <input 
          className="w-10/12 text-lg py-2 rounded-lg mb-[6px] text-center"
          type="text"
          placeholder="Enter Category"
          onChange={(event) => setTag(event.target.value)}
          value={tag}
        />
         

        <button onClick={() => fetchData()}
          className="w-10/12 bg-yellow-500 text-lg py-2 rounded-lg mb-[20px] "
        >
          Generate
        </button>

      </div>
    );
}

export default Tag