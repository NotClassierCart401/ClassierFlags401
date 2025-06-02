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

    for (file of flagfiles.files) {
        let reader = new FileReader();

        reader.onloadend = async function() {
            try {
                console.log("Sending request...");
                let response = await fetch("https://script.google.com/macros/s/AKfycbzlJhH85ToqMKnWCX56Sq-RVzJxbNN4E9FZK0gL1kRF8jQDBxzrMVf8h9goXr6sptou/exec", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    mode: "cors",
                    body: JSON.stringify({
                        file: reader.result.split(",")[1],
                        filename: file.name,
                        filetype: file.type
                    })
                });

                let data = await response.json();
                console.log("Response:", data);
            } catch (error) {
                console.error("Fetch Error:", error);
            }
        };

        reader.readAsDataURL(file);
    };
});