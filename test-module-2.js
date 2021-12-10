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


window.onload = init = () => {
  input = document.querySelector(".main-inp");
  input.addEventListener("change", upDatevalue);
  DoIt();
};

const funcdeleteAll = () => {
  arr = [];
  DoIt();
  localStorage.clear();
}
deleteAll.addEventListener("click", funcdeleteAll);

const onClickMainBut = () => {
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

const upDatevalue = (event) => {
  InpVal = event.target.value;
};

const DoIt = () => {
  while (mainList.firstChild) {
    mainList.removeChild(mainList.firstChild);
  }
  arr.map((item, index) => {
    const newMain = document.createElement("div");
    newMain.className = "main-str";
    newMain.id = `main-str-${index}`;
    mainList.appendChild(newMain);

    const str = document.createElement("div");
    str.id = `str-${index}`;
    arr[index].isCheck ? str.className = "str2" : str.className = "str";

    str.innerHTML = item.text;
    newMain.appendChild(str);

    strButRed = document.createElement("div");
    strButRed.className = "str-but-red";
    const img = document.createElement("img");
    img.src = "img/listing_to_do_list_document_file_icon_147456.png";
    strButRed.appendChild(img);
    strButRed.addEventListener("click", () => redact(str, index));
    newMain.appendChild(strButRed);
    arr[index].isCheck ? strButRed.style = "display:none": '';

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
    emptyBlock2.addEventListener("click", () => dobav(str));
    localStorage.setItem("arr", JSON.stringify(arr));
  });
}

const checkbox = (index) => {
  arr[index].isCheck = !arr[index].isCheck;
  arr.sort(func = (a, b) => {
    return a.isCheck - b.isCheck;
  });
  DoIt();
  localStorage.setItem("arr", JSON.stringify(arr));
}

const deleteStr = (newMain, index) => {
  arr.splice(index, 1);
  newMain.remove();
  DoIt();

  localStorage.setItem("arr", JSON.stringify(arr));
}

const redact = (str, index) => {
  const newInp = document.createElement("input");
  newInp.className = "inp2";
  newInp.value = arr[index].text;
  str.innerHTML = "";
  str.appendChild(newInp);

  newInp.addEventListener("blur", () => {
    editValue = newInp.value;
    proindex = index;
  });

  console.log("redact", arr);
  emptyBlock.style = "display:block";
  emptyBlock2.style = "display:block";
  localStorage.setItem("arr", JSON.stringify(arr));
}

const dobav = (str) => {
  console.log("dobav", editValue, proindex);
  arr[proindex].text = editValue;
  if (str.id == `str-${proindex}`) {
    str.innerHTML = arr[proindex].text;
  }

  input.value = "";
  emptyBlock.style = "display:none";
  emptyBlock2.style = "display:none";
  localStorage.setItem("arr", JSON.stringify(arr));
}

const on = document.querySelector(".on");
const off = document.querySelector(".off");
const arr2 = [45, "qwdqw"];

const turnOn = () => {
  localStorage.setItem("arr2", JSON.stringify(arr2));
}
on.addEventListener("click", turnOn);

const turnOff = () => {
  localStorage.removeItem("arr2");
}
off.addEventListener("click", turnOff);
