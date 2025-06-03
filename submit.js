let flagfiles = document.getElementById("nationflags");
let imgcontainer = document.getElementById("submittedflags")

function imgpreview() {
    imgcontainer.innerHTML = ""
    for (i of flagfiles.files) {
        let reader = new FileReader();
        let image = document.createElement("image");
        let filename = document.createElement("figcaption");
        filename.innerText = i.name;
        image.appendChild(filename)
        reader.onload=()=> {
            let img = document.createElement("img")
            img.setAttribute("src", reader.result)
            image.insertBefore(img, filename)
        }
        imgcontainer.appendChild(image)
        reader.readAsDataURL(i);
    }
}

document.getElementById("sanform").addEventListener("submit", async function(event) {
    event.preventDefault();

    let nationname = document.getElementById("nationname").value;
    let nationdesc = document.getElementById("nationdesc").value;
    let flagfiles = document.getElementById("nationflags");

    let nationdatatxt = `Nation Name: ${nationname}\nNation Description: ${nationdesc}`;
  let filesArray = [];
  
  // Process each file and convert it to Base64.
  for (let file of flagfiles.files) {
    let base64Data = await new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(",")[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
    
    filesArray.push({
      file: base64Data,
      filename: file.name,
      filetype: file.type
    });
  }
  
  let payload = {
    files: filesArray,  // Array of file objects
    metadata: nationdatatxt
  };
  
  let response = await fetch("https://script.google.com/macros/s/AKfycbzlJhH85ToqMKnWCX56Sq-RVzJxbNN4E9FZK0gL1kRF8jQDBxzrMVf8h9goXr6sptou/exec", {
    method: "POST",
    body: JSON.stringify(payload)
  });
  let data = await response.json();
  console.log("Response:", data);
});