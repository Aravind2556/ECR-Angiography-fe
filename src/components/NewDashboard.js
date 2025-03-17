import React, { useEffect, useState } from "react";
import LiveChart from './LiveChart'


export const NewDashboard = () => {

    

 

    const [ECG, setECG] = useState(null)
    const [Ultrasound, setUltrasoundy] = useState(null)
    const [Sound, setSound] = useState(null)


    const controls = {
        show: true,
        download: true,
        selection: false,
        zoom: false,
        zoomin: true,
        zoomout: true,
        pan: true,
        reset: true,
        zoomEnabled: true,
        autoSelected: 'zoom'
    };

  useEffect(() => {
    const fetchData = async () => {

        const url = "https://api.thingspeak.com/channels/2876404/feeds.json?api_key=U22MVFWIXFCEUM7C";


        fetch(url)
        .then(res=>res.json())
        .then(data=>{
            console.log("data:", data)

            if(data && data.feeds && data.feeds.length>0){
                const xAxis = data.feeds.map(feed=>new Date(feed.created_at).getTime())

                setECG({
                    "x-axis": xAxis,
                    "y-axis": data.feeds.map(feed=>feed.field1),
                    color: "green",
                    seriesName: 'ECG'
                })

                setUltrasoundy({
                    "x-axis": xAxis,
                    "y-axis": data.feeds.map(feed=>feed.field2),
                    color: "blue",
                    seriesName: 'Ultrasound'
                })

                setSound({
                    "x-axis": xAxis,
                    "y-axis": data.feeds.map(feed=>feed.field3),
                    color: "#ff4f4f",
                    seriesName: 'Microphone'
                })


            }

        })
        .catch(err=>{
            console.log("Error in fetching from Thinkspeak:",err)
        })

    };

    fetchData();

    // Optionally, set up polling for live data updates (e.g., every 30 seconds)
    const intervalId = setInterval(fetchData, 5000);

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);




  if(!ECG || !Ultrasound || !Sound ){
    return <div>Loading...</div>
  }

  return (
    <div className="container">
    <h1 className="text-center text-primary my-3 fs-2">
      Non-Invasive Coronary Blockage Detection System
    </h1>
  
    {/* Charts Section */}
   
    <div >
    
      {/* Row 1: Chart - Image */}
      <div className="col-12 col-md-10 col-lg-8 mx-auto my-5 p-3 rounded" style={{backgroundColor : "whitesmoke" }}>
      <h1 className="flex justify-content-center text-center">Combined chart</h1>
        <LiveChart
          data={[ECG, Ultrasound, Sound]}
          title={"Combined chart"}
          lineStyle={"straight"}
          lineWidth={1}
          chartType={"line"}
          controls={controls}
        />
      </div>


      
  
      {/* Row 2: Image - Chart */}

      <div className="col-12 col-md-10 col-lg-8 mx-auto my-5 p-3 rounded"  style={{backgroundColor : "whitesmoke"}}>
      <h1 className="flex justify-content-center text-center">ECG</h1>
        <LiveChart
          data={[ECG]}
          title={ECG.seriesName}
          lineStyle={"straight"}
          lineWidth={1}
          chartType={"line"}
          controls={controls}
        />
      </div>

      
  
      {/* Row 3: Chart - Image */}
      <div className="col-12 col-md-10 col-lg-8 mx-auto my-5 p-3 rounded"  style={{backgroundColor : "whitesmoke"}}>
      <h1 className="flex justify-content-center text-center">Ultrasound</h1>
        <LiveChart
          data={[Ultrasound]}
          title={Ultrasound.seriesName}
          lineStyle={"smooth"}
          lineWidth={1}
          chartType={"line"}
          controls={controls}
        />
      </div>

  
      {/* Row 4: Image - Chart */}

      <div className="col-12 col-md-10 col-lg-8 mx-auto my-5 p-3 rounded"  style={{backgroundColor : "whitesmoke"}}>
      <h1 className="flex justify-content-center text-center">Sound</h1>
        <LiveChart
          data={[Sound]}
          title={Sound.seriesName}
          lineStyle={"straight"}
          lineWidth={1}
          chartType={"line"}
          controls={controls}
        />
      </div>
    </div>
  </div>
  
  );
};



