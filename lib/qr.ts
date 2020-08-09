import QRCode from 'qrcode'

export const makeQR = (data: string) => QRCode.toDataURL(data)