import Projects from './index';
import { Project } from './types';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import RequestParams from '../utils/requestParams/requestParams';
import { ApiResponseOnSuccess } from '../utils/response/apiResponse';

describe('Projects', () => {
  var projects: Projects = new Projects({});
  var readPath: string = `${projects.getResourcePath()}/read`;
  var mock = new AxiosMockAdapter(axios);
  var result: Promise<Project[]> | null;
  var resultSingle: Promise<Project> | null;
  var resultRaw: Promise<ApiResponseOnSuccess<Project[]>> | null;

  afterEach(() => {
    mock.reset();
    result = null;
    resultSingle = null;
    resultRaw = null;
  });

  test('read', async () => {
    mock.onGet(readPath).reply(200, { Success: true, NumResults: 1, Results: [{}] });
    result = projects.read();
    await result.then((result) => expect(result).toStrictEqual([{}]));
  });

  test('read with Success false', async () => {
    mock.onGet(readPath).reply(200, { Success: false });
    result = projects.read();
    await result.catch((result) => expect(result).toStrictEqual({ Success: false }));
  });

  test('read with status code 500', async () => {
    mock.onGet(readPath).reply(500);
    expect.assertions(1);
    await projects.read().catch((err) => expect(err.message).toMatch('Request failed with status code 500'));
  });

  test('readRaw', async () => {
    mock.onGet(readPath).reply(200, { Success: true, NumResults: 1, Results: [{}] });
    resultRaw = projects.readRaw();
    await resultRaw.then((result) => expect(result).toStrictEqual({ Success: true, NumResults: 1, Results: [{}] }));
  });

  test('readById', async () => {
    mock.onGet(`${readPath}/1`).reply(200, { Success: true, NumResults: 1, Results: [{}] });
    resultSingle = projects.readById(1);
    await resultSingle.then((result) => expect(result).toStrictEqual({}));
  });
});
