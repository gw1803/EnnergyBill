import BaseApi from './BaseApi';

class PersonApi extends BaseApi{

    getPersons(setData){
        const method = "GET";
        const url = `${this.baseUrl}person/`;
        console.log(url);
        super.myFetch(setData, method, url);
    }

    getPerson(setData, id){
        const method = "GET";
        const url = `${this.baseUrl}person/${id}/`;
        console.log(url);
        super.myFetch(setData, method, url);
    }

    incluirPerson(person){
        const method = "POST";
        const url = `${this.baseUrl}person/`; 
        console.log(url);
        super.myFetch({}, method, url, person);
    }

    alterarPerson(person){
        const method = "PUT";
        const url = `${this.baseUrl}person/`;
        console.log(url);
        super.myFetch({}, method, url, person);
    }

    excluir(id){
        const method = "DELETE";
        const url = `${this.baseUrl}person/${id}`;
        console.log(url);
        super.myFetch({}, method, url);
    }

}

export default PersonApi;