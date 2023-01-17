import { unAuthorizedAxios, authorizedAxios } from '../config.js'

export class Auth {
    constructor() {
        this.prefix = '/auth'
    }

    async registration(formData) {
        return unAuthorizedAxios.post(`${this.prefix}/registration`, formData)

    }

    async authorization(email, password) {
        return unAuthorizedAxios.post(`${this.prefix}/login`, {
            email,
            password,
        })
    }
}

export class Company {
    constructor() {
        this.prefix = '/company'
    }

    async update(companyId, formData) {
        return authorizedAxios.put(`${this.prefix}/${companyId}`, formData)
    }

    async getById(companyId){
        return authorizedAxios.get(`${this.prefix}/${companyId}`)
    }
}

export class Vacancy {
    constructor() {
        this.prefix = '/vacancy'
    }

    async create(payload) {
        return authorizedAxios.post(`${this.prefix}`, payload)
    }

    async getById(id) {
        return authorizedAxios.get(`${this.prefix}/${id}`)
    }

    async getByFitler(filter) {
        return authorizedAxios.post(`${this.prefix}/filter`, filter)
    }

    async getAllVacancies() {
        return authorizedAxios.post(`${this.prefix}/filter`, {})
    }

    async getByUser() {
        return authorizedAxios.get(`${this.prefix}/byUser`)
    }

    async apply(id, formData) {
        return authorizedAxios.post(`${this.prefix}/${id}/apply`, formData)
    }
}