const mainList = document.querySelector(".main-list");
const deleteAll = document.querySelector(".delete-list");
const but = document.querySelector(".main-but");
const emptyBlock = document.querySelector(".empty-block");
const emptyBlock2 = document.querySelector(".empty-block2");
let arr = JSON.parse(localStorage.getItem("arr")) || [];
let InpVal = "";
let input = null;
let editValue = "";
let proindex;

window.onload = init = async () => {
  input = document.querySelector(".main-inp");
  input.addEventListener("change", upDatevalue);
  const resp = await fetch("http://localhost:8000/getAllTasks", {
    method: "GET",
  });
  const result = await resp.json();
  arr = result.data;
  arr.sort(
    (a, b) =>  a.isCheck - b.isCheck 
 );
  DoIt();
};

const funcdeleteAll = () => {
  arr = [];
  DoIt();
  localStorage.clear();
};
deleteAll.addEventListener("click", funcdeleteAll);

const onClickMainBut = async () => {
  arr.push({
    text: InpVal,
    isCheck: false,
  });
  const resp = await fetch("http://localhost:8000/createTask", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      text: InpVal,
      isCheck: false,
    }),
  });
  const result = await resp.json();
  arr = result.data;
  InpVal = "";
  input.value = "";
  DoIt();
  localStorage.setItem("arr", JSON.stringify(arr));
};
but.addEventListener("click", onClickMainBut);

const upDatevalue = (event) => {
  InpVal = event.target.value;
};

const DoIt = () => {
  while (mainList.firstChild) {
    mainList.removeChild(mainList.firstChild);
  }
  arr.map((item, index) => {
    const { text, isCheck } = item;

    const newMain = document.createElement("div");
    newMain.className = "main-str";
    newMain.id = `main-str-${index}`;
    mainList.appendChild(newMain);

    const str = document.createElement("div");
    str.id = `str-${index}`;
    str.className = isCheck ? "str2" : "str";
    str.innerHTML = text;
    newMain.appendChild(str);

    strButRed = document.createElement("div");
    strButRed.className = "str-but-red";
    const img = document.createElement("img");
    img.src = "img/listing_to_do_list_document_file_icon_147456.png";
    strButRed.appendChild(img);
    strButRed.addEventListener("click", () => redact(str, index));
    newMain.appendChild(strButRed);
    isCheck ? (strButRed.style = "display:none") : "";

    const strButDel = document.createElement("div");
    strButDel.className = "str-but-del";
    const img3 = document.createElement("img");
    img3.src = "img/fe.png";
    strButDel.appendChild(img3);
    strButDel.addEventListener("click", () => deleteStr(newMain, index));
    newMain.appendChild(strButDel);

    const strButDid = document.createElement("div");
    strButDid.className = "str-but-did";
    const img2 = document.createElement("img");
    img2.src = "img/to_do_icon_153795.png";
    strButDid.appendChild(img2);
    strButDid.checked = isCheck;
    strButDid.addEventListener("click", () => checkbox(index, text));
    newMain.appendChild(strButDid);

    emptyBlock2.addEventListener("click", () => dobav(str));
    localStorage.setItem("arr", JSON.stringify(arr));
  });
};

const  checkbox = async (index) => {
  const { _id, text, isCheck } = arr[index];
  
  const resp = await fetch("http://localhost:8000/updateTask", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      text: text,
      isCheck: !isCheck,
      _id,
    }),
  });
  const result = await resp.json();
  arr = result.data;
  arr.sort(
    (a, b) =>  a.isCheck - b.isCheck 
 );
  DoIt();
  localStorage.setItem("arr", JSON.stringify(arr));
};

const deleteStr = async (newMain, index) => {
  const resp = await fetch(
    `http://localhost:8000/deleteTask?id=${arr[index]._id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
  
  const result = await resp.json();
  arr = result.data;
  DoIt();

  localStorage.setItem("arr", JSON.stringify(arr));
};

const redact = (str, index) => {
  editValue = str.innerHTML;
  const newInp = document.createElement("input");
  newInp.className = "inp2";
  newInp.value = editValue;
  str.innerHTML = "";
  str.appendChild(newInp);

  newInp.addEventListener("blur", () => {
    editValue = newInp.value;
    proindex = index;
  });

  emptyBlock.style = "display:block";
  emptyBlock2.style = "display:block";
  localStorage.setItem("arr", JSON.stringify(arr));
};

const dobav = async (str) => {
  arr[proindex].text = editValue;
  if (str.id == `str-${proindex}`) {
    str.innerHTML = arr[proindex].text;
  }

  const { _id } = arr[proindex];
  const resp = await fetch("http://localhost:8000/updateTask", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      text: editValue,
      isCheck: false,
      _id,
    }),
  });
  const result = await resp.json();
  arr = result.data;

  input.value = "";
  emptyBlock.style = "display:none";
  emptyBlock2.style = "display:none";
  localStorage.setItem("arr", JSON.stringify(arr));
};

const on = document.querySelector(".on");
const off = document.querySelector(".off");
const arr2 = [45, "qwdqw"];

const turnOn = () => {
  localStorage.setItem("arr2", JSON.stringify(arr2));
};
on.addEventListener("click", turnOn);

const turnOff = () => {
  localStorage.removeItem("arr2");
};
off.addEventListener("click", turnOff);
