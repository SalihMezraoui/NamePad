import axios from 'axios';
import { app } from '../server.js';

export const homeRoutes = (req, res) => {
  const PORT = app.get('port');

  const currentPage = req.query.page || 1;
  const genderFilter = req.query.gender || '';
  const searchFilter = req.query.search || '';
  const searchByPrefixFilter = req.query.searchPrefix || '';
  const searchBySuffixFilter = req.query.searchSuffix || '';
  const searchByNoPrefixFilter = req.query.searchNoPrefix || '';
  const searchByNoSuffixFilter = req.query.searchNoSuffix || '';
  const searchBySyllablesFilter = req.query.syllables || '';
  const limit = req.query.limit || '';

  axios.get(`http://localhost:${PORT}/api/users/filter?page=${currentPage}&gender=${genderFilter}&search=${searchFilter}&searchPrefix=${searchByPrefixFilter}&searchSuffix=${searchBySuffixFilter}&searchNoPrefix=${searchByNoPrefixFilter}&searchNoSuffix=${searchByNoSuffixFilter}&syllables=${searchBySyllablesFilter}&limit=${limit}`)
    .then(function (response) {
      res.render('index', {
        users: response.data.users,
        totalPages: response.data.totalPages,
        currentPage: response.data.currentPage,
        limit
      });
    })
    .catch(err => {
      res.send(err);
    });
};

export const mynotepad = (req, res) => {
  const PORT = app.get('port');

  axios.get(`http://localhost:${PORT}/api/notepad`)
    .then(function (response) {
      res.render('notepad', { notepads: response.data });
    })
    .catch(err => {
      res.send(err);
    });
};
