import { get } from '@/utils/request'

export const getLogs = params => get('/logs/', { params })

export const getNodes = () => get('/nodes/')
