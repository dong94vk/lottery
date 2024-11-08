export async function  initWeb3(ethereum) {
  return await import('web3').then((module) => {
      return new module.default(ethereum);
  })
}

export async function  web3(httpProvider = '') {
  if (httpProvider !== '') {
      return  await initWeb3(httpProvider);
  }
  const web3  =  await initWeb3(window.ethereum);
  return web3;
}