// 获取 本地 存储
export const getItem = name => {
  const data = window.localStorage.getItem(name)
  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}

// 设置 本地 存储
export const setItem = (name, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(name, value)
}

// 移除本地 存储
export const removeItem = name => {
  window.localStorage.removeItem(name)
}
