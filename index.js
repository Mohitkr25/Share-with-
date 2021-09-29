const dropZone = document.querySelector(".drop-zone");
const fileinput = document.querySelector("#fileinput");
const browse = document.querySelector(".browse");

const bgprogres = document.querySelector(".bgprogress");
const percentdiv = document.querySelector("#percent");
const progresscont = document.querySelector(".progrescont");
const fileurls = document.querySelector("#fileurl");

const host = "https://innshare.herokuapp.com/";
const uploadurl = `${host}api/files`;
// const uploadurl = `${host}api/files`
dropZone.addEventListener("dragover", (e) => {
  e.preventDefault();
  if (!dropZone.classList.contains("draged")) {
    dropZone.classList.add("draged");
  }
});
dropZone.addEventListener("dragleave", (e) => {
  dropZone.classList.remove("draged");
});
dropZone.addEventListener("drop", (e) => {
  e.preventDefault();
  dropZone.classList.remove("draged");

  const files = e.dataTransfer.files;
  console.table(files);
  if (files.length) {
    fileinput.files = files;
    uploadfile();
  }
});
fileinput.addEventListener("change", () => {
  uploadfile();
});
browse.addEventListener("click", () => {
  fileinput.click();
});
const uploadfile = () => {
  progresscont.style.display = "block";
  const file = fileinput.files[0];
  const formdata = new FormData();
  formdata.append("myfile", file);
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      console.log(xhr.response);
      showlink(JSON.parse(xhr.response));
    }
    // console.log(xhr.readyState);
  };

  xhr.upload.onprogress = updateProgres;
  xhr.open("POST", uploadurl);
  xhr.send(formdata);
};
const updateProgres = (e) => {
  const percent = Math.round((e.loaded / e.total) * 100);
  // console.log(percent);

  bgprogres.style.width = `${percent}%`;
  percentdiv.innerText = percent;
};
const showlink = ({ file: url }) => {
  console.log(file);
  progresscont.style.display = "none";
  fileurls.value = url;
};
