window.addEventListener('load', () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js');
  }
});
const upload = document.getElementById("file");
  const download = document.getElementById("download")
  const textArea = document.getElementById("textArea")
  const fileNameInput = document.getElementById("fileNameInput")
  const overlay = document.getElementById("overlay")
  const fontPlus = document.getElementById("plusFont")
  const fontMinus = document.getElementById("minusFont")
  const downloadOpts = document.getElementById("downloadOptions")
  upload.addEventListener("change", handleFiles, false);
  var fileName = ""
  var fontSize = 80
  // var shiftKey = false
  
  bold = document.getElementById("bold")
  italic = document.getElementById("italic")
  underline = document.getElementById("underline")
  strikethrough = document.getElementById("strikethrough")

  document.addEventListener("keydown", handleKeyDown)

  fontPlus.addEventListener("click", fontSizeUp)
  fontMinus.addEventListener("click", fontSizeDown)

  function fontSizeUp() {
    fontSize+=10
    textArea.style.fontSize = `${fontSize}%`
  }

  function fontSizeDown() {
    fontSize-=10
    textArea.style.fontSize = `${fontSize}%`
  }

  function handleKeyDown(e) {
    if (document.activeElement != textArea
        &&
        document.activeElement != fileNameInput
        && !e.metaKey && !e.shiftKey && !e.altKey && !e.ctrlKey && e.key != " " && !e.key.includes("Arrow") && !e.key.includes("Tab")
       ) {
      textArea.focus()
    }
    if (e.shiftKey) {
      shiftKey = true
    }
    if (e.ctrlKey) {
      switch (e.key) {
        case "b":
          e.preventDefault()
          bold.click()
          return
        case "i":
          e.preventDefault()
          italic.click()
          return
        case "u":
          e.preventDefault()
          underline.click()
          return
      }
    }
  }



  async function handleFiles() {
    fileList = await this.files;
    printFile(await fileList[0])
  }

  async function printFile(file) {
    const reader = new FileReader();
    reader.onload = (evt) => {
      textArea.innerText = evt.target.result
      textArea.scroll(0,0)
    };
    reader.readAsText(await file);
    fileNameInput.value = file.name
  }

  function save(filename, text, type) {
    var element = document.createElement('a');
    element.setAttribute('href', `data:text/${type};charset=utf-8,` + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.documentElement.appendChild(element);
    element.click();
    document.documentElement.removeChild(element);
  }


  download.addEventListener("click", function () {
    fileName = fileNameInput.value
    // fileExt = fileName.substring(fileName.lastIndexOf(".") + 1);
    // console.log(fileExt)
    if (downloadOpts.value == "0") {
      text = textArea.innerText
      ext = "txt"
      type = "plain"
    } else {
      text = textArea.innerHTML
      ext = "html"
      type = "html"
    }
    if (fileName == "") {
      save(`textEdit.${ext}`, text, type)
    } else {
      save(fileNameInput.value, text, type)
    }
  }, false)

  fileNameInput.addEventListener("input", fileNameInputSizeCalc)
  window.addEventListener("resize", fileNameInputSizeCalc)

  function fileNameInputSizeCalc() {
    fileNameInput.style.width = `min(max(calc(${fileNameInput.value.length}ch + 1ch), 200px), 100%)`
  }

  /* ---- DROP CODE ---- */

  const drop = document.getElementById("upload")

  document.addEventListener("drop", handleDrop)
  document.addEventListener("dragover", handleDragOver)
  document.addEventListener("dragend", handleDragEnd)

  function handleDragEnd(e) {
    e.preventDefault();
    textArea.style.background = "initial"
  }

  function handleDragOver(e) {
    e.preventDefault();
    // overlay.showPopover()
  }

  async function handleDrop(e) {
    e.preventDefault()
    if (textArea.innerText) {
      if (confirm("Do you want to overwrite the current content?")) {
        data = e.dataTransfer.items[0].getAsFile()
        textArea.innerText = await data.text()
        fileNameInput.value = data.name
        fileNameInput.style.width = `min(max(calc(${fileNameInput.value.length}ch + 1ch), 200px), 100%)`
      }
    } else {
      data = e.dataTransfer.items[0].getAsFile()
      textArea.value = await data.text()
      fileNameInput.value = await data.name
    }
  }

  /* ---- LOCAL SAVE CODE ---- */

  /*
const lSave = document.getElementById('lSave')
const lCLear = document.getElementById('lClear')
lSaveIndex = 0

lSave.addEventListener("click", handleLSaveClick)
lClear.addEventListener("click", handleLClearClick)

function handleLSaveClick(e) {
}

function handleLClearClick(e) {
  localStorage.clear()
} */

  function log(t = "") {
    document.body.append(t,document.createElement("br"))
  }

  // alert("test")

function checkPlain() {
  alert(textArea.innerText)
}

function checkFormat() {
  alert(textArea.innerHTML)
}

bold.onclick = (e) => {
  textArea.focus()
  document.execCommand("bold")
}
italic.onclick = (e) => {
  textArea.focus()
  document.execCommand("italic")
}

underline.onclick = (e) => {
  textArea.focus()
  document.execCommand("underline")
}

strikethrough.onclick = (e) => {
  textArea.focus()
  document.execCommand("strikethrough")
}
