import BaseApi from '../baseApi';
import RequestParams from '../utils/requestParams/requestParams';
import { Department } from './types';
import { required, requiredList } from '../utils/response/responseHandlers';

export default class Departments extends BaseApi {
  public readonly resourceName = 'departments';

  public read(requestParams?: RequestParams<Department> | Object): Promise<Department[]> {
    const params = requestParams instanceof RequestParams ? requestParams.getParams() : requestParams;
    const response = this._get<Department[]>(`${this.getResourceName()}/read`, { params });
    return requiredList(response);
  }

  public readById(id: number, requestParams?: RequestParams<Department> | Object): Promise<Department> {
    const params = requestParams instanceof RequestParams ? requestParams.getParams() : requestParams;
    const response = this._get<Department[]>(`${this.getResourceName()}/read/${id}`, { params });
    return required(response);
  }
}
