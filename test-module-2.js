const mainList = document.querySelector(".main-list");
const deleteAll = document.querySelector(".delete-list");
const but = document.querySelector(".main-but");
const empty = document.querySelector(".empty");
const empty2 = document.querySelector(".empty2");
let arr = JSON.parse(localStorage.getItem("arr")) || [];
let InpVal = "";
let input = null;
let editValue = "";
let proindex;


window.onload = init = () => {
  input = document.querySelector(".main-inp");
  input.addEventListener("change", upDatevalue);
  DoIt();
};

funcdeleteAll = () => {
  arr = [];
  DoIt();
  localStorage.clear();
}
deleteAll.addEventListener("click", funcdeleteAll);

onClickMainBut = () => {
  arr.push({
    text: InpVal,
    isCheck: false,
  });
  InpVal = "";
  input.value = "";
  DoIt();
  localStorage.setItem("arr", JSON.stringify(arr));
}
but.addEventListener("click", onClickMainBut);

upDatevalue = (event) => {
  InpVal = event.target.value;
};

DoIt = () => {
  while (mainList.firstChild) {
    mainList.removeChild(mainList.firstChild);
  }
  arr.map((item, index) => {
    const newMain = document.createElement("div");
    newMain.className = "main-str";
    newMain.id = `main-str-${index}`;
    mainList.appendChild(newMain);

    let str = document.createElement("div");
    str.id = `str-${index}`;
    if (arr[index].isCheck) {
      str.className = "str2";
    } else {
      str.className = "str";
    }

    str.innerHTML = item.text;
    newMain.appendChild(str);

    strButRed = document.createElement("div");
    strButRed.className = "str-but-red";
    const img = document.createElement("img");
    img.src = "img/listing_to_do_list_document_file_icon_147456.png";
    strButRed.appendChild(img);
    strButRed.addEventListener("click", () => redact(str, index));
    newMain.appendChild(strButRed);
    if (arr[index].isCheck) {
      strButRed.style = "display:none";
    }

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
    strButDid.checked = item.isCheck;
    strButDid.addEventListener("click", () => checkbox(index));
    newMain.appendChild(strButDid);

    arr.sort(func = (a, b) => {
      return a.isCheck - b.isCheck;
    });
    empty2.addEventListener("click", () => dobav(index, str));
    localStorage.setItem("arr", JSON.stringify(arr));
  });
}

checkbox = (index) => {
  arr[index].isCheck = !arr[index].isCheck;
  arr.sort(func = (a, b) => {
    return a.isCheck - b.isCheck;
  });
  DoIt();
  localStorage.setItem("arr", JSON.stringify(arr));
}

deleteStr = (newMain, index) => {
  arr.splice(index, 1);
  newMain.remove();
  DoIt();

  localStorage.setItem("arr", JSON.stringify(arr));
}

redact = (str, index) => {
  let newInp = document.createElement("input");
  newInp.className = "inp2";
  newInp.value = arr[index].text;
  str.innerHTML = "";
  str.appendChild(newInp);

  newInp.addEventListener("blur", () => {
    editValue = newInp.value;
    proindex = index;
  });

  console.log("redact", arr);
  empty.style = "display:block";
  empty2.style = "display:block";
  localStorage.setItem("arr", JSON.stringify(arr));
}

dobav = (index, str) => {
  console.log("dobav", editValue, proindex);
  arr[proindex].text = editValue;
  if (str.id == `str-${proindex}`) {
    str.innerHTML = arr[proindex].text;
  }

  input.value = "";
  empty.style = "display:none";
  empty2.style = "display:none";
  localStorage.setItem("arr", JSON.stringify(arr));
}

const on = document.querySelector(".on");
const off = document.querySelector(".off");
const arr2 = [45, "qwdqw"];

turnOn = () => {
  localStorage.setItem("arr2", JSON.stringify(arr2));
}
on.addEventListener("click", turnOn);

turnOff = () => {
  localStorage.removeItem("arr2");
}
off.addEventListener("click", turnOff);
