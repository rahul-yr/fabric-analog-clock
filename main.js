function getHour(hour) {
    if(hour >= 12) {
        hour = hour-12;
    }
    if(hour == 0) {
        h = 12;
    }
    return hour;
}


function initSquare({ length, hourAngle, minuteAngle, secondAngle }) {
  var canvas = new fabric.StaticCanvas("clock");
  canvas.setDimensions({ width: length, height: length });

  let center = new fabric.Circle({
    radius: 10,
    fill: "white",
  });

  let periphery = new fabric.Circle({
    radius: length / 2 - 20,
    fill: "black",
    strokeWidth: 10,
    stroke: "grey"
  });

  let hour = new fabric.Rect({
    left: length / 2 ,
    top: length / 2,
    fill: 'white',
    width: 4,
    height: length / 2 - 120,
    angle: hourAngle -180
  });


  let minute = new fabric.Rect({
    left: length / 2 ,
    top: length / 2,
    fill: "white",
    width: 3,
    height: length / 2 - 90,
    angle: minuteAngle -180
  });

  let second = new fabric.Rect({
    left: length / 2 ,
    top: length / 2,
    fill: "white",
    width: 2,
    height: length / 2 - 40,
    angle: secondAngle - 180
  });
  canvas.add(periphery,center, hour, minute, second);
  setInterval(() => {
    let current = timeStamp().split(":");
    let angle = current[2];
    second.animate("angle", angle-180, {
      duration: 1,
      onChange: val => {
        minute.animate( "angle", current[1]-180,{duration:1});
        hour.animate("angle",current[0]-180,{duration:1});
        canvas.renderAll();
      }
    });
  }, 60);
canvas.centerObject(center);
canvas.centerObject(periphery);

}

const timeStamp = () => {
    let date = new Date();
		
    let s = date.getSeconds() + (date.getMilliseconds()/1000);
    let m = date.getMinutes();
    let h = getHour(date.getHours());
    let stamp = `${h*30+m*0.5}:${m*6}:${s*6}`;
    return stamp;
  };


function initDigital() {
    let current = timeStamp().split(":");
    // console.log(current);
    initSquare({
        length: 400,
        hourAngle: current[0],
        minuteAngle: current[1],
        secondAngle: current[2]
      });
}

// setInterval(function(){
//     initDigital();
// }, 50);

initDigital();