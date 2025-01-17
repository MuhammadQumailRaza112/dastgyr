import UserModel from "../../models/UserModel";

export default class NetworkHandler {
  static myInstance = null;
  static getInstance() {
    if (NetworkHandler.myInstance === null) {
      NetworkHandler.myInstance = new NetworkHandler();
    }
    return this.myInstance;
  }

  timeout(promise) {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        reject('Api Taking Too long to respond Please try Again')
      }, 60000)
      promise.then(resolve, reject)
    })
  }

  getNetworkRequest(url, token, serviceParams, successCallback, failureCallback) {
    console.log('parameters are : ' + JSON.stringify(serviceParams));

    if (serviceParams != null) {
      url = url + '?'
      for (const [key, value] of Object.entries(serviceParams)) {
        url = url + key + '=' + value + '&'
        // console.log(key, value);
      }
      url = url.slice(0, -1)
      // serviceParams.forEach(element => {
      //   url = url + element.key + '=' + element.value + '&'
      // });
    }

    console.log(url)
    NetworkHandler.getInstance().timeout(
      fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'Application/json',
          'Authorization': `Bearer ${token}`,
          "MBQDEBUG": "MyBookQatar"
        },
        // body: JSON.stringify(serviceParams)
      }))
      .then((response) => {
        console.log('reponse', response)
        if (response.status === 401) {
          UserModel.getInstance().signOut();
        }
        return response.json()
      })
      .then(responseJson => {
        console.log('Responce from server is ', responseJson)
        if (responseJson.status === true) {
          console.log('Success')
          successCallback(responseJson.data);
        } else {
          console.log('Failure')
          failureCallback(responseJson.message)
        }
        // if (responseJson.data !== null) {
        //   if (responseJson.status === true){
        //     console.log(responseJson)
        //     successCallback(responseJson.data);
        //   }
        //   else {
        //     failureCallback('Error in input params: '+ responseJson.error);
        //   }
        // } else {
        //     failureCallback('Error from server :'+ responseJson.error);
        // }
      })
      .catch(error => {

        failureCallback(error);
      });
  }

  deleteNetworkRequest(url, token, serviceParams, successCallback, failureCallback) {
    if (serviceParams != null) {
      url = url + '?'
      for (const [key, value] of Object.entries(serviceParams)) {
        url = url + key + '=' + value + '&'
        // console.log(key, value);
      }
      url = url.slice(0, -1)
      // serviceParams.forEach(element => {
      //   url = url + element.key + '=' + element.value + '&'
      // });
    }
    NetworkHandler.getInstance().timeout(
      fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'Application/json',
          'Authorization': `Bearer ${token}`,
          "MBQDEBUG": "MyBookQatar"
        },
        // body: JSON.stringify(serviceParams)
      }))
      .then((response) => {
        console.log('reponse', response)
        if (response.status === 401) {
          UserModel.getInstance().signOut();
        }
        return response.json()
      })
      .then(responseJson => {
        console.log('Responce from server is ', responseJson)
        if (responseJson.status === true) {
          console.log('Success')
          successCallback(responseJson.data);
        } else {
          console.log('Failure')
          failureCallback(responseJson.message)
        }
        // if (responseJson.data !== null) {
        //   if (responseJson.status === true){
        //     console.log(responseJson)
        //     successCallback(responseJson.data);
        //   }
        //   else {
        //     failureCallback('Error in input params: '+ responseJson.error);
        //   }
        // } else {
        //     failureCallback('Error from server :'+ responseJson.error);
        // }
      })
      .catch(error => {

        failureCallback(error);
      });
  }

  updateNetworkRequest(url, token, serviceParams, successCallback, failureCallback) {
    // if (serviceParams != null) {
    //   url = url + '?'
    //   for (const [key, value] of Object.entries(serviceParams)) {
    //     url = url + key + '=' + value + '&'
    //     // console.log(key, value);
    //   }
    //   url = url.slice(0, -1)
    //   // serviceParams.forEach(element => {
    //   //   url = url + element.key + '=' + element.value + '&'
    //   // });
    // }
    NetworkHandler.getInstance().timeout(
      fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'Application/json',
          'Authorization': `Bearer ${token}`,
          "MBQDEBUG": "MyBookQatar"
        },
        body: JSON.stringify(serviceParams)
      }))
      .then((response) => {
        console.log('reponse', response)
        if (response.status === 401) {
          UserModel.getInstance().signOut();
        }
        return response.json()
      })
      .then(responseJson => {
        console.log('Responce from server is ', responseJson)
        if (responseJson.status === true) {
          console.log('Success')
          successCallback(responseJson.data);
        } else {
          console.log('Failure')
          failureCallback(responseJson.message)
        }
        // if (responseJson.data !== null) {
        //   if (responseJson.status === true){
        //     console.log(responseJson)
        //     successCallback(responseJson.data);
        //   }
        //   else {
        //     failureCallback('Error in input params: '+ responseJson.error);
        //   }
        // } else {
        //     failureCallback('Error from server :'+ responseJson.error);
        // }
      })
      .catch(error => {

        failureCallback(error);
      });
  }

  postNetworkRequest(url, token, serviceParams, successCallback, failureCallback) {
    let _headers = {
        'content-type': 'application/json'
    };
    if(token){
        _headers['Authorization'] = `Bearer ${token}`;
    }
    console.log('parameters are : ' + JSON.stringify(serviceParams));
    NetworkHandler.getInstance().timeout(
      fetch(url, {
        method: 'POST',
        headers: _headers,
        body: JSON.stringify(serviceParams)
      }))
      // .then((response) => {
      //   if (response.status === 401) {
      //     UserModel.getInstance().signOut();
      //   }
      // })
      .then((response) => {
        if (response.status === 401) {
          UserModel.getInstance().signOut();
        }
        return response.json()
      })
      .then(responseJson => {
        console.log('Responce from server is ', responseJson)
        if (responseJson.status === true) {
          console.log('Success')
          successCallback(responseJson.data);
        } else {
          console.log('Failure')
          failureCallback(responseJson.message)
        }
        // if (responseJson.data !== null) {
        //   if (responseJson.status === true){
        //     successCallback(responseJson.data);
        //   }
        //   else {
        //     failureCallback('Error in input params: '+ responseJson.error);
        //   }
        // } else {
        //   console.log('server wala error')
        //     failureCallback('Error from server :'+ responseJson.error);
        // }
      })
      .catch(error => {
        failureCallback(error);
      });
  }


  postFormRequest(url, token, serviceParams, successCallback, failureCallback) {
    console.log('parameters are : ' + JSON.stringify(serviceParams));
    NetworkHandler.getInstance().timeout(
      fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': token ? `Bearer ${token}` : null,
          'MBQDEBUG': 'MyBookQatar'
        },
        body: serviceParams
      }))
      .then((response) => {
        if (response.status === 401) {
          UserModel.getInstance().signOut();
        }
        return response.json()
      })
      .then(responseJson => {
        console.log('Responce from server is ', responseJson)
        if (responseJson.status === true) {
          console.log('Success')
          successCallback(responseJson.data);
        } else {
          console.log('Failure')
          failureCallback(responseJson.message)
        }
        // console.log('Responce from server is ', responseJson)
        // if (responseJson.data !== null) {
        //   if (responseJson.status === true){
        //     successCallback(responseJson.data);
        //   }
        //   else {
        //     failureCallback('Error in input params: '+ responseJson.message);
        //   }
        // } else {
        //     failureCallback('Error from server :'+ responseJson.message);
        // }
      })
      .catch(error => {
        failureCallback(error);
      });
  }

  getDownloadUrl(url, token, serviceParams, fileName, successCallback, failureCallback) {
    console.log('parameters are : ' + JSON.stringify(serviceParams));

    if (serviceParams != null) {
      url = url + '?'
      for (const [key, value] of Object.entries(serviceParams)) {
        url = url + key + '=' + value + '&'
      }
      url = url.slice(0, -1)
    }
    fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        "MBQDEBUG": "MyBookQatar"
      },
    })
      .then((response) => response.blob())
      .then((blob) => {
        if (blob.type === 'text/csv') {
          // 2. Create blob link to download
          const url = window.URL.createObjectURL(new Blob([blob]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', fileName);
          // 3. Append to html page
          document.body.appendChild(link);
          // 4. Force download
          link.click();
          // 5. Clean up and remove the link
          link.parentNode.removeChild(link);
          successCallback('Preparing Download');
        } else {
          failureCallback('data not found');
        }


      })
      .catch(error => {
        failureCallback(error);
      });
  }

}