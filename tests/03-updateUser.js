import supertest from 'supertest';  // Mengimpor supertest
import { expect } from 'chai';       // Mengimpor chai
import { getAuthToken } from '../utils/auth.js';  // Mengimpor fungsi dari file lokal
import { userId } from './01-createUser.js'; // Mengimpor userId dari file createUser

const API_URL = 'https://kasir-api.zelz.my.id';  // URL API

describe('Update User API Tests', function () {
    let token;

    // Sebelum setiap test, ambil auth token
    before(async function () {
        token = await getAuthToken();
    });

    it('should update user data', async function () {
        const updatedUser = {
            name: 'Helmi Dzaky Updated',  // Nama baru untuk diperbarui
            email: `updateduser${Date.now()}@example.com`, // Email baru untuk diperbarui
        };

        const response = await supertest(API_URL)
            .put(`/users/${userId}`)  // Menggunakan userId dari createUser
            .set('Authorization', `Bearer ${token}`)  // Set header Authorization dengan token
            .send(updatedUser);  // Kirim body user yang diperbarui

        // Log status dan body dari respons untuk debugging
        console.log('Update User Status Code:', response.status);
        console.log('Update User Response Body:', response.body);

        // Assertion dengan chai
        expect(response.status).to.equal(200);  // Pastikan status code 200
        expect(response.body.status).to.equal('success');  // Pastikan status response adalah 'success'
        expect(response.body.data).to.include.keys('name');  // Memastikan kunci 'name' ada
        expect(response.body.data.name).to.equal(updatedUser.name);  // Memastikan nama diperbarui
    });
});