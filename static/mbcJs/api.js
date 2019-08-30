
var api1 = ''; // 短信
var api2 = ''; // 业务
var api3 = ''; // 图片
// uEnvDev
if (process.env.NODE_ENV === 'development') {
    api1 = 'http://10.158.41.45:8090'; // 短信
    api2 = 'https://hc360cyd.mynatapp.cc'; // 业务
    api3 = 'https://img01.iambuyer.com'; // 图片
	// api1 = 'https://api.iambuyer.com';
	// api2 = 'https://open.iambuyer.com/invest-rest';
	// api3 = 'https://img01.iambuyer.com';
}
// uEnvProd
if (process.env.NODE_ENV === 'production') {
    api1 = 'https://api.iambuyer.com';
    api2 = 'https://open.iambuyer.com/invest-rest';
    api3 = 'https://img01.iambuyer.com';
	// api1 = 'http://10.158.41.45:8090'; // 短信
	// api2 = 'https://hc360cyd.mynatapp.cc'; // 业务
	// api3 = 'https://img01.iambuyer.com'; // 图片
}
export {api1, api2, api3};