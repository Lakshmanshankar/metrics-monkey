import { useState, useEffect } from "react";
import io from "socket.io-client";
const socket = io("http://localhost:5000"); //Replace with your Node.js server URL

function App() {
  const [basicinfo, setBasicinfo] = useState([]);
  const [cpuinfo, SetCPUinfo] = useState([]);
  useEffect(() => {
    socket.on("chat message", (msg) => {
      const data: any = JSON.parse(msg);
      console.log(data);
      setBasicinfo(data.basicinfo);
      SetCPUinfo(data.cpuinfo);
    });

    socket.on("connect", () => {
      socket.emit("chat message", "Hello From Client");
    });

    return () => {
      socket.off("chat message", (msg) => console.log(msg));
    };
  }, []);

  return (
    <div>
      <div className="">
        <BasicInfo basicinfo={basicinfo} />
        <CPUInfo cpuinfo={cpuinfo} />
      </div>
    </div>
  );
}

export default App;

function BasicInfo({ basicinfo }: { basicinfo: any }) {
  const Manufacturer = basicinfo;

  if (Manufacturer && Manufacturer.Manufacturer !== undefined) {
    console.log(Manufacturer);
    return (
      <div className="w-full h-auto px-5 py-10 bg-slate-900">
        <h1 className="w-full flex justify-center text-white font-head text-2xl">
          Basic Information
        </h1>
        <div className="flex flex-col items-center justify-center w-full h-full py-5 rounded-md font-head bg-slate-900">
          <GreenWhite
            data={["Manufacturer", Manufacturer.Manufacturer.manufacturer]}
            data2={["Model", Manufacturer.Manufacturer.model]}
          />
          <GreenWhite
            data={["Platform", Manufacturer.OS.platform]}
            data2={["Architecture", Manufacturer.OS.arch]}
          />
          <GreenWhite
            data={["OS Name", Manufacturer.OS.distro]}
            data2={["Version", Manufacturer.OS.release]}
          />
          <GreenWhite
            data={["Kernel", Manufacturer.OS.kernel]}
            data2={["CodeName", Manufacturer.OS.codename]}
          />
          <GreenWhite
            data={["TimeZone", Manufacturer.timezone.timezone]}
            data2={["Region", Manufacturer.timezone.timezoneName]}
          />
        </div>
      </div>
    );
  } else return <div>Loading...</div>;
}

function GreenWhite({ data, data2 }: { data: any; data2: any }) {
  return (
    <ul className="flex justify-center w-full my-2">
      <li className="w-96 px-14 bg-slate-300 text-lg py-2 mx-1 rounded-md">
        {data[0]}:{data[1]}
      </li>
      <li className="w-96 px-14 bg-slate-300 text-lg py-2 mx-1 rounded-md">
        {data2[0]}:{data2[1]}
      </li>
    </ul>
  );
}
interface CPU {
  model: string;
  speed: number;
  times: {
    user: number;
    nice: number;
    sys: number;
    idle: number;
    irq: number;
  };
}
function CPUInfo({ cpuinfo }: { cpuinfo: Array<CPU> }) {
  const data: Array<CPU> = cpuinfo;
  console.log(data);

  return (
    <>
      <div className="w-full h-auto px-5 py-10 bg-slate-900">
        <h1 className="w-full flex justify-center text-white font-head text-2xl">
          CPU Information
        </h1>
        <div className="flex flex-col items-center ml-56 justify-center w-10/12 h-full py-5 rounded-md font-head bg-slate-900">
          {data.map((cpu, id: number) => (
            <div
              className="w-auto px-10 py-5 m-1 rounded-md bg-slate-50"
              key={cpu.model + id}
            >
              CORE:{id} USER: {cpu.times.user} IDLE: {cpu.times.idle} SYS{" "}
              {cpu.times.sys} Speed {cpu.speed}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// interface fileSystem {
//   Avail: string;
// }
