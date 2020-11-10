/**
 * Author: CreateSun
 * Date: 2020/7/21
 */
import request from '@/plugins/service'
import service from "../plugins/service";

// 获取单词
export const word = () => {
  return service({
    useBaseUrl: true,
    url: '/word',
    method: 'get',
  })
};

export const addSign = (data) => {
  return request({
    useBaseUrl: true,
    url: '/addSign',
    method: 'post',
    data
  })
};

export const uploadUrl = service.defaults.baseURL+"/upload";

export const addnote = (data) => {
  return service({
    useBaseUrl: true,
    url: "/notes",
    method: "post",
    data
  })
};

export const delnote = (id) => {
  return service({
    useBaseUrl: true,
    url: "/notes/"+id,
    method: "delete",
  })
};

export const getnote = () => {
  return service({
    useBaseUrl: true,
    url: "/notes",
    method: "get",
  })
};

export const journal = () => {
  return request({
    useBaseUrl: true,
    url: '/journal',
    method: 'get',
  })
};


export const statistic = () => {
  return request({
    useBaseUrl: true,
    url: `/statistic`,
    method: 'get',
  })
};

export const calendar = (start, end) => {
  return request({
    useBaseUrl: true,
    url: `/calendar?startTime=${start}&endTime=${end}`,
    method: 'get',
  })
};

export const delSign = (data) => {
  return request({
    useBaseUrl: true,
    url: `/delSign/${data}`,
    method: 'delete',
  })
};

export const getSignList = () => {
  return request({
    useBaseUrl: true,
    url: "/getSign",
    method: 'get'
  })
};

export const Signin = (data) => {
  return request({
    useBaseUrl: true,
    url: "/Signin",
    method: 'post',
    data
  })
};
