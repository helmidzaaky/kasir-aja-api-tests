import supertest from 'supertest';  // Mengimpor supertest
import { expect } from 'chai';      // Mengimpor chai
import { getAuthToken } from '../utils/auth.js';  // Mengimpor fungsi dari file lokal (pastikan menggunakan .js)

const API_URL = 'https://kasir-api.zelz.my.id/';  // URL API

describe('Auth API Tests', function () {
    it('should get auth token', async function () {
        const token = await getAuthToken();
        expect(token).to.be.a('string');  // Assertion dengan chai
    });
});