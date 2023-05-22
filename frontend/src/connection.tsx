import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import io from 'socket.io-client';
const socket = io('http://localhost:5000'); //Replace with your Node.js server URL

function App() {
  const [basicinfo, setBasicinfo] = useState([]);

  useEffect(() => {
    socket.on('chat message', (msg) => {

      const data: any = (JSON.parse(msg));
      setBasicinfo(data.basicinfo);
    });

    socket.on('connect', () => {
      socket.emit('chat message', 'Hello From Client');
    });

    return () => {
      socket.off('chat message', (msg => console.log(msg)));
    };
  }, []);


  return (
    <div>
      <div className="">
        <BasicInfo basicinfo={basicinfo} />
      </div>
    </div>
  );
}

export default App;

function BasicInfo({ basicinfo }: { basicinfo: any }) {
  const Manufacturer = (basicinfo)

  if (Manufacturer && Manufacturer.Manufacturer !== undefined) {
    console.log(Manufacturer)
    return (
      <div className="w-full h-auto px-5 py-10 bg-slate-900">
        <h1 className='w-full flex justify-center text-white font-head text-2xl'>Basic Information</h1>
        <div className="flex flex-col items-center justify-center w-full h-full py-5 rounded-md font-head bg-slate-900">
          <GreenWhite data={['Manufacturer', Manufacturer.Manufacturer.manufacturer]} data2={['Model', Manufacturer.Manufacturer.model]} />
          <GreenWhite data={['Platform', Manufacturer.OS.platform]} data2={['Architecture', Manufacturer.OS.arch]} />
          <GreenWhite data={['OS Name', Manufacturer.OS.distro]} data2={['Version', Manufacturer.OS.release]} />
          <GreenWhite data={['Kernel', Manufacturer.OS.kernel]} data2={['CodeName', Manufacturer.OS.codename]} />
          <GreenWhite data={['TimeZone', Manufacturer.timezone.timezone]} data2={['Region', Manufacturer.timezone.timezoneName]} />
        </div>
      </div>
    )
  }
  else return <div>Loading...</div>
}

function GreenWhite({ data, data2 }: { data: any, data2: any }) {
  return (
    <ul className='flex justify-center w-full my-2'>
      <li className='w-96 px-14 bg-slate-300 text-lg py-2 mx-1 rounded-md'>{data[0]}:{data[1]}</li>
      <li className='w-96 px-14 bg-slate-300 text-lg py-2 mx-1 rounded-md'>{data2[0]}:{data2[1]}</li>
    </ul>
  )
}

