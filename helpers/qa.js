const axios = require('axios');
const regeneratorRuntime = require('regenerator-runtime');
const config = require('../config.js');

axios.defaults.headers.common.authorization = config.API_TOKEN;

//  get next page helper for both questions/answers
const getNextPage = async (url) => {
  const response = await axios.get(url);
  console.log('CHECKING', response.data.rows);
  return response.data.rows;
};

const getQuestions = async (id) => {
  const questions = [];
  let page = 1;

  try {
    do {
      // let url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/qa/questions?product_id=${id}&page=${page}&count=100&sort=helpful`;

      let url = `http://13.59.128.134:5000/questions/${id}/?page=${page}&count=100`;

      var onePage = await getNextPage(url);
      questions.push(onePage);
      page += 1;
    } while (onePage.length > 0);

    return questions.flat();
  } catch (error) {
    return error.response.status;
  }
};

const getAnswers = async (id) => {
  const answers = [];
  let page = 1;

  try {
    do {
      // let url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/qa/questions/${id}/answers?page=${page}&count=100&sort=helpful`;

      let url = `http://13.59.128.134:5000/answers/${id}/?page=${page}&count=100`;

      var onePage = await getNextPage(url);
      answers.push(onePage);
      page += 1;
    } while (onePage.length > 0);

    return answers.flat();
  } catch (error) {
    return error.response.status;
  }
};

const markQuestionOrAnswerHelpful = async (QorA, id) => {
  try {
    // const url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/qa/${QorA}/${id}/helpful`;
    const url = `/${QorA}/${id}/helpful`;
    const response = await axios.put(url);
    return response.status;
  } catch (error) {
    return error.response.status;
  }
};

const reportQuestionOrAnswer = async (QorA, id) => {
  try {
    // const url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/qa/${QorA}/${id}/report`;
    const url = `/answers/${id}/reported`;
    const response = await axios.put(url);
    return response.status;
  } catch (error) {
    return error.response.status;
  }
};

const submitQuestion = async (params) => {
  try {
    // const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/qa/questions';
    const url = '/questions/';
    const response = await axios.post(url, params);
    return response.config.data;
  } catch (error) {
    return error.response.status;
  }
};

const submitAnswer = async (id, params) => {
  try {
    // const url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/qa/questions/${id}/answers`;
    const url = '/answers';
    const response = await axios.post(url, params);
    return response.status;
  } catch (error) {
    return error.response.status;
  }
};

module.exports = {
  getQuestions,
  getAnswers,
  markQuestionOrAnswerHelpful,
  reportQuestionOrAnswer,
  submitQuestion,
  submitAnswer
};
