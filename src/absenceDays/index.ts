import BaseApi from '../baseApi';
import responseHandler from '../utils/response/responseHandlers';
import RequestParams from '../utils/requestParams/requestParams';
import { AbsenceDay } from './types';

export default class AbsenceDays extends BaseApi {
  public readonly resourceName = 'absenceDays';

  public read(requestParams?: RequestParams<AbsenceDay> | Object): Promise<AbsenceDay[]> {
    const params = requestParams instanceof RequestParams ? requestParams.getParams() : requestParams;
    const response = this._get<AbsenceDay[]>(`${this.getResourceName()}/read`, { params });
    return responseHandler.requiredList(response);
  }

  public readById(id: number, requestParams?: RequestParams<AbsenceDay> | Object): Promise<AbsenceDay> {
    const params = requestParams instanceof RequestParams ? requestParams.getParams() : requestParams;
    const response = this._get<AbsenceDay>(`${this.getResourceName()}/read/${id}`, { params });
    return responseHandler.required(response);
  }
}
