let list1 = document.querySelector(".list1");
let deleteAll = document.querySelector(".list2");
let but = document.querySelector(".main-but");
let empty = document.querySelector(".empty");
let empty2 = document.querySelector(".empty2");
let arr = JSON.parse(localStorage.getItem("arr")) || [];
let InpVal = "";
let input = null;
let editValue = "";
let proindex;

window.onload = function init() {
  input = document.querySelector(".main-inp");
  input.addEventListener("change", upDatevalue);
  DoIt();
};

but.addEventListener("click", onClickMainBut);

function onClickMainBut() {
  arr.push({
    text: InpVal,
    isCheck: false,
  });
  InpVal = "";
  input.value = "";
  DoIt();
  localStorage.setItem("arr", JSON.stringify(arr));
}

upDatevalue = (event) => {
  InpVal = event.target.value;
};

function DoIt() {
  while (list1.firstChild) {
    list1.removeChild(list1.firstChild);
  }
  arr.map((item, index) => {
    let newMain = document.createElement("div");
    newMain.className = "main-str";
    newMain.id = `main-str-${index}`;
    list1.appendChild(newMain);

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
    let img = document.createElement("img");
    img.src = "img/listing_to_do_list_document_file_icon_147456.png";
    strButRed.appendChild(img);
    strButRed.addEventListener("click", () => redact(str, index));
    newMain.appendChild(strButRed);
    if (arr[index].isCheck) {
      strButRed.style = "display:none";
    }

    let strButDel = document.createElement("div");
    strButDel.className = "str-but-del";
    let img3 = document.createElement("img");
    img3.src = "img/fe.png";
    strButDel.appendChild(img3);
    strButDel.addEventListener("click", () => deleteStr(newMain, index));
    newMain.appendChild(strButDel);

    let strButDid = document.createElement("div");
    strButDid.className = "str-but-did";
    let img2 = document.createElement("img");
    img2.src = "img/to_do_icon_153795.png";
    strButDid.appendChild(img2);
    strButDid.checked = item.isCheck;
    strButDid.addEventListener("click", () => checkbox(index));
    newMain.appendChild(strButDid);

    arr.sort(function (a, b) {
      return a.isCheck - b.isCheck;
    });
    empty2.addEventListener("click", () => dobav(index, str));
    localStorage.setItem("arr", JSON.stringify(arr));
  });
}

function checkbox(index) {
  arr[index].isCheck = !arr[index].isCheck;
  arr.sort(function (a, b) {
    return a.isCheck - b.isCheck;
  });
  DoIt();
  localStorage.setItem("arr", JSON.stringify(arr));
}

function deleteStr(newMain, index) {
  arr.splice(index, 1);
  newMain.remove();
  DoIt();

  localStorage.setItem("arr", JSON.stringify(arr));
}

function redact(str, index) {
  let newInp = document.createElement("input");
  newInp.className = "inp2";
  newInp.value = arr[index].text;
  str.innerHTML = "";
  str.appendChild(newInp);

  newInp.addEventListener("blur", function () {
    editValue = newInp.value;
    proindex = index;
  });

  console.log("redact", arr);
  empty.style = "display:block";
  empty2.style = "display:block";
  localStorage.setItem("arr", JSON.stringify(arr));
}

function dobav(index, str) {
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

deleteAll.addEventListener("click", funcdeleteAll);

function funcdeleteAll() {
  arr = [];
  DoIt();
  localStorage.clear();
}

let on = document.querySelector(".on");
let off = document.querySelector(".off");
let arr2 = [45, "qwdqw"];

on.addEventListener("click", turnOn);
function turnOn() {
  localStorage.setItem("arr2", JSON.stringify(arr2));
}

off.addEventListener("click", turnOff);
function turnOff() {
  localStorage.removeItem("arr2");
}
