import BaseApi from './BaseApi';

class BillApi extends BaseApi{

    getBills(setData){
        const method = "GET";
        const url = `${this.baseUrl}bill`;
        console.log(url);
        super.myFetch(setData, method, url);
    }

    getBill(setData, id){
        const method = "GET";
        const url = `${this.baseUrl}bill/${id}`;
        console.log(url);
        super.myFetch(setData, method, url);
    }

    incluirBill(bill){
        const method = "POST";
        const url = `${this.baseUrl}bill`;
        console.log(url);
        super.myFetch({}, method, url, bill);
    }

    alterarBill(bill){
        const method = "PUT";
        const url = `${this.baseUrl}bill`;
        console.log(url);
        super.myFetch({}, method, url, bill);
    }

    excluir(id){
        const method = "DELETE";
        const url = `${this.baseUrl}bill/${id}`;
        console.log(url);
        super.myFetch({}, method, url);
    }

}

export default BillApi;