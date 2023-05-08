
const btn = document.querySelector(".button-submit");
btn.addEventListener("click" ,  () => {
  let data = {
    name:document.querySelector("#name").value,
    id:document.querySelector("#room-id").value
  }
  // console.log(data);
// let roomID = await fetch("/room-id" , {
//   type:"get"
// });

async function getData() {
  const response = await fetch('/room-id');
  const data = await response.json();
  return data;
}
if(data.name===""){
alert("enter name");
}else{
  getData()
  .then(res => {
   
    console.log(data);
    if (data.id = "") {
      location.href= `/room?name=${data.name}&roomId=${res.roomId}`
    } else {
      location.href= `/room?name=${data.name}&roomId=${data.id}`
    }
  })
  .catch(error => {
    console.error(error);
  });
}

 ;
//   fetch(`/room?name=${data.name}&roomId=${data.id}`, {
//   method: "get"
// });
})