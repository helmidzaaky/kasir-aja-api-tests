import supertest from 'supertest';  // Mengimpor supertest
import { expect } from 'chai';       // Mengimpor chai
import { getAuthToken } from '../utils/auth.js';  // Mengimpor fungsi dari file lokal
import { userId } from './01-createUser.js'; // Mengimpor userId dari file createUser

const API_URL = 'https://kasir-api.zelz.my.id';  // URL API

describe('Delete User API Tests', function () {
    let token;

    // Sebelum setiap test, ambil auth token
    before(async function () {
        token = await getAuthToken();
    });

    it('should delete user', async function () {
        const response = await supertest(API_URL)
            .delete(`/users/${userId}`)  // Menggunakan userId dari createUser
            .set('Authorization', `Bearer ${token}`);  // Set header Authorization dengan token

        // Log status dan body dari respons untuk debugging
        console.log('Delete User Status Code:', response.status);
        console.log('Delete User Response Body:', response.body);

        // Assertion dengan chai
        expect(response.status).to.equal(200);  // Pastikan status code 200
        expect(response.body.status).to.equal('success');  // Pastikan status response adalah 'success'
        expect(response.body.message).to.equal('User berhasil dihapus');  // Memastikan pesan yang tepat diterima
    });
});