var selectedFile;
document
  .getElementById("fileUpload")
  .addEventListener("change", function(event) {
    selectedFile = event.target.files[0];
  });
document
  .getElementById("uploadExcel")
  .addEventListener("click", function() {
    if (selectedFile) {
      var fileReader = new FileReader();
      fileReader.onload = function(event) {
        var data = event.target.result;

        var workbook = XLSX.read(data, {
          type: "binary"
        });
        workbook.SheetNames.forEach(sheet => {
          let rowObject = XLSX.utils.sheet_to_row_object_array(
            workbook.Sheets[sheet]
          );
        //   let jsonObject = JSON.stringify(rowObject);
        //   document.getElementById("jsonData").innerHTML = rowObject;
        //   console.log(rowObject);


cargarProductos(rowObject);

        });
      };
      fileReader.readAsBinaryString(selectedFile);
    }
  });


  function cargarProductos(rowObject){
    text = ""
    rowObject.forEach(rowObjectx => {
      text += retornarCardHTML(rowObjectx);
    });
    document.getElementById("jsonData").innerHTML = text;
     }

     function retornarCardHTML(rowObjectx) {
        card = `
        <tr>
            <td>${rowObjectx.nombre}</td>

            <td>${rowObjectx.apellido}</td>
            </tr>
`
        
        return(card);
        
        
        }