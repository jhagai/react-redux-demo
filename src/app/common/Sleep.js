export default (success, data, ms) => new Promise((resolve, reject) => success ? setTimeout(()=> resolve(data), ms) : setTimeout(() => reject(data), ms))
