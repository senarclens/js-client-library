import BaseApi from '../baseApi';
import responseHandler from '../utils/response/responseHandlers';
import RequestParams from '../utils/requestParams/requestParams';
import { GeneralSetting } from './types';
import { ApiResponseOnSuccess } from '../utils/response/apiResponse';

export default class GeneralSettings extends BaseApi {
  public readonly resourceName = 'generalSettings';

  public read(requestParams?: RequestParams<GeneralSetting> | Object): Promise<GeneralSetting[]> {
    const params = requestParams instanceof RequestParams ? requestParams.getParams() : requestParams;
    const response = this._get<GeneralSetting>(`${this.getResourceName()}/read`, { params });
    return responseHandler.requiredList(response);
  }

  public readRaw(requestParams?: RequestParams<GeneralSetting> | Object): Promise<ApiResponseOnSuccess<GeneralSetting[]>> {
    const params = requestParams instanceof RequestParams ? requestParams.getParams() : requestParams;
    const response = this._get<GeneralSetting[]>(`${this.getResourceName()}/read`, { params });
    return responseHandler.toApiResponse(response);
  }

  public readById(id: number, requestParams?: RequestParams<GeneralSetting> | Object): Promise<GeneralSetting> {
    const params = requestParams instanceof RequestParams ? requestParams.getParams() : requestParams;
    const response = this._get<GeneralSetting>(`${this.getResourceName()}/read/${id}`, { params });
    return responseHandler.required(response);
  }

  public readBySettingType(settingType: string): Promise<GeneralSetting> {
    const params = new RequestParams<GeneralSetting>().eq('setting_type', settingType).getParams();
    const response = this._get<GeneralSetting>(`${this.getResourceName()}/read`, { params });
    return responseHandler.required(response);
  }
}
