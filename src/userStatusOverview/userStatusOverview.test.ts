import UserStatusOverviews from './index';
import { UserStatusOverview } from './types';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import RequestParams from '../utils/requestParams/requestParams';

describe('UserStatusOverview', () => {
  var userStatusOverviews: UserStatusOverviews = new UserStatusOverviews({});
  var readPath: string = `${userStatusOverviews.getResourcePath()}/read`;
  var mock = new AxiosMockAdapter(axios);
  var result: Promise<UserStatusOverview[]> | null;
  var resultSingle: Promise<UserStatusOverview> | null;

  afterEach(() => {
    mock.reset();
    result = null;
    resultSingle = null;
  });

  test('read', async () => {
    mock.onGet(readPath).reply(200, { Success: true, NumResults: 1, Results: [{}] });
    result = userStatusOverviews.read();
    await result.then((result) => expect(result).toStrictEqual([{}]));
  });

  test('read with Success false', async () => {
    mock.onGet(readPath).reply(200, { Success: false });
    result = userStatusOverviews.read();
    await result.catch((result) => expect(result).toStrictEqual({ Success: false }));
  });

  test('read with status code 500', async () => {
    mock.onGet(readPath).reply(500);
    expect.assertions(1);
    await userStatusOverviews.read().catch((err) => expect(err.message).toMatch('Request failed with status code 500'));
  });
  test('readById', async () => {
    mock.onGet(`${readPath}/1`).reply(200, { Success: true, NumResults: 1, Results: [{}] });
    resultSingle = userStatusOverviews.readById(1);
    await resultSingle.then((result) => expect(result).toStrictEqual({}));
  });
});
