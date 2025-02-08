
class BaseApi {

    constructor() {
        this.baseUrl = "http://localhost:8080/";
    }

    async myFetch(setData, method, url, body) {

        console.log("BaseApi.myFetch(method: " + method + ", url: " +url);

        fetch(url, {
            method: method,
            contentType:'application/json',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((resp) => resp.json())
            .then((data) => {
                if (setData){
                    setData(data);
                }
            })
            .catch((err) => console.log(err))
    }

}

export default BaseApi
