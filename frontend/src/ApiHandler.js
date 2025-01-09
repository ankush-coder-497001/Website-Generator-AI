import axios from 'axios'
import BaseUrl from './ApiBaseUrl'
export const LoginUser = async (data)=>{
  try {
    const res = await axios.post(`${BaseUrl}/User/login`,data)
    const result = await res.data
    return result;
  } catch (error) {
    console.log(error)
  }
}

export const GenerateWebsite = async (data)=>{
  console.log(data)
  const prompt = data.propmt;
  const uid = data.Uid;
  try {
    const res = await axios.post(`${BaseUrl}/Website/generate/${uid}`,{prompt})
    const result = await res.data;
    return result;
  } catch (error) {
    return error;    
  }
}

export const DownloadZipFile = async (filename) => {
  console.log("Downloading file:", filename);

  try {
    const response = await axios.post(
      `${BaseUrl}/Website/downloadFile`,
      { filename },
      {
        responseType: 'blob', // This ensures the response is treated as binary data
      }
    );

    // Create a download link for the ZIP file
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;

    // Set the filename for the download
    link.setAttribute('download', `${filename}.zip`);
    document.body.appendChild(link);
    link.click();

    // Clean up
    link.remove();
     return "File downloaded successfully.";
  } catch (error) {
    return error
  }
};

export const DeployOnNetlify = async (fromData) =>{
  try {
   const res = await axios.post(`${BaseUrl}/Website/deployeOnNetlify`,{fromData});
   const data = await res.data;
   return data;
  } catch (error) {
    throw new error
  }
}
