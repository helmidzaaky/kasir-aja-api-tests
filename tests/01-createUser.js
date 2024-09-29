import supertest from 'supertest';  // Mengimpor supertest
import { expect } from 'chai';       // Mengimpor chai
import { getAuthToken } from '../utils/auth.js';  // Mengimpor fungsi dari file lokal

const API_URL = 'https://kasir-api.zelz.my.id';  // URL API
let userId; // Variabel untuk menyimpan userId yang baru dibuat

describe('Create User API Tests', function () {
    let token;

    // Sebelum setiap test, ambil auth token
    before(async function () {
        token = await getAuthToken();
    });

    it('should create a new user and store userId', async function () {
        const newUser = {
            email: `newuser${Date.now()}@example.com`,  // Membuat email yang unik
            name: 'Helmi Dzaky Fauzan', // Menggunakan nama baru
            password: 'NewUser@1234'
        };

        const response = await supertest(API_URL)
            .post('/users')  // Ganti dengan endpoint yang sesuai
            .set('Authorization', `Bearer ${token}`)  // Set header Authorization dengan token
            .send(newUser);  // Kirim body user baru

        // Log status dan body dari respons untuk debugging
        console.log('Create User Status Code:', response.status); 
        console.log('Create User Response Body:', response.body);

        // Assertion dengan chai
        expect(response.status).to.equal(201);  // Pastikan status code 201
        expect(response.body.status).to.equal('success');  // Pastikan status response adalah 'success'
        expect(response.body.data).to.include.keys('userId', 'name');  // Memastikan kunci 'userId' dan 'name' ada

        // Simpan userId untuk digunakan di tes berikutnya
        userId = response.body.data.userId;  // Ambil userId yang baru saja dibuat
    });
});

export { userId }; // Ekspor userId untuk digunakan di file lain