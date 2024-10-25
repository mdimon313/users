console.log("okay");
function base64ToBlob(base64, mimeType) {
  const byteCharacters = atob(base64); // Decode base64 to binary
  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: mimeType });
}

// fatch data
async function fatchData(url) {
  let x = await fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    });
  return x;
}

let containers = document.getElementById("container");
containers.innerHTML = "";
// html template
const url = "https://apex.oracle.com/pls/apex/cco54_1272926/user/users";
const data = fatchData(url);
data
  .then((res) => {
    return res;
  })
  .then((datas) => {
    datas.items.forEach((data) => {
      // Convert base64 data to a Blob
      const imageBlob = base64ToBlob(data.user_image, data.mime_type); // Assuming the image is a JPEG

      // Create a URL for the Blob
      const imageUrl = URL.createObjectURL(imageBlob);
      containers.innerHTML += `<div class="users">
        <div class="user_image">
          <img
            src="${imageUrl}"
            alt="image"
          />
        </div>
        <div class="user_info">
          <h3>${data.emp_name}</h3>
          ${data?.email ? `<p>${data?.email}</p>` : ""}
        </div>
      </div>`;
      // console.log(data);
    });
  })
  .catch((err) => {
    console.log(err);
  });
