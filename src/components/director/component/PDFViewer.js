import React, { useEffect, useState } from 'react';
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';



function BlobPDFViewer({ blobURL }) {
  console.log(blobURL)
  const [file, setFile] = useState(null);
  const [docs, setDocs] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
   if(blobURL){

    setDocs([
      { uri: blobURL }, // Remote file
     // { uri: require("./example-files/pdf.pdf") }, // Local File
   ]);
   }
   else{
    toast("Please select file ", {
      position: toast.POSITION.BOTTOM_CENTER,
      type: 'error',
      onOpen: () => { navigate('/readmore') }
      
    })
    
   }
   
   
  }, [])

  
  

 
  

  
//iframe not supporting on mobile
  // useEffect(() => {
  //   const xhr = new XMLHttpRequest();
  //   xhr.open('GET', blobURL, true);
  //   xhr.responseType = 'blob';
  //   xhr.onload = function (e) {
  //     if (this.status === 200) {
  //       const blob = new Blob([this.response], { type: 'application/pdf' });
  //       const fileURL = URL.createObjectURL(blob);
  //       setFile(fileURL);
  //     }
  //   };
  //   xhr.send();
  // }, [blobURL]);
  // console.log(file)
  // console.log(docs)

  return (
    <div style={{ width: '80%', height: '100%', margin:  'auto' }}>
      {docs && <> 
        <DocViewer documents={docs} pluginRenderers={DocViewerRenderers} />
     </>}
    </div>
  )
}

export default BlobPDFViewer;
