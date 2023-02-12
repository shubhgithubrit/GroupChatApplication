/////////////////------------------------------------------/////////////////////////////

//Upload Document Scripting




    function uploadFile() {
        let getUploadFromStorage = JSON.parse(localStorage.getItem("uploadList"));
    let uploadList = getUploadFromStorage ? getUploadFromStorage : [];

      
      let name = document.getElementById("name").value;
      if (name== "") {
        alert("Empty file selected");
        return false;
      }
      else {
        var userObj = {
          id: Number(new Date()),
          name: name,
          file: upload.value.replace("C:\\fakepath\\"," "),
        }
      }
      uploadList.push(userObj);
      localStorage.setItem("uploadList", JSON.stringify(uploadList));
      return true;
    }

function selectData() {
    let getUploadFromStorage = JSON.parse(localStorage.getItem("uploadList"));
    let uploadList = getUploadFromStorage ? getUploadFromStorage : [];

    if (uploadList != null) {
        let html = '';
        let sno = 1;
        for (let k in uploadList) {
            html = html + `<tr class="table-row">
			<td class="table-cell2">${uploadList[k].name}</td>
			<td class="table-cell2">${uploadList[k].file}</td>
			<td class="table-cell2" >
            
            <a href="edit_doc.html?id=${uploadList[k].id}">Edit</a> | 
			<a href="javascript:deleteFile(${uploadList[k].id})">Delete</a>
			</td>
			
			</tr>`;
            sno++;
        }
        document.getElementById('root').innerHTML = html;

    }
}
selectData();

function deleteFile(id) {
    let getUploadFromStorage = JSON.parse(localStorage.getItem("uploadList"));
    let uploadList = getUploadFromStorage ? getUploadFromStorage : [];

    for (let i = 0; i < uploadList.length; i++) {
        if (uploadList[i].id == id) {
            if (confirm("Do you want to delete file")) {
                uploadList.splice(i, 1);
                localStorage.setItem("uploadList", JSON.stringify(uploadList));
                location.reload();
            }
        }
    }
}


//update document
function updateDocument() {
    let getUploadFromStorage = JSON.parse(localStorage.getItem("uploadList"));
    let uploadList = getUploadFromStorage ? getUploadFromStorage : [];

    var name = document.getElementById("fullname").value;
    var url = window.location.href;
    var splitUrl = url.split("=");
    var id = splitUrl[1];

    if (name == " ") {
        alert("Please enter File name");
        return false;
    }

    for (var i = 0; i < uploadList.length; i++) {
        if (id == uploadList[i].id) {
            uploadList[i].name = name;

        }
    }
    localStorage.setItem("uploadList", JSON.stringify(uploadList));

}
