import dayjs from 'dayjs'

/** 格式化时间 */
export const formatTime = (time: string | number | Date) => {
  if (!time) {
    return 'N/A'
  }
  const date = new Date(time)
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss')
}

/** 将全局 CSS 变量导入 JS 中使用 */
export const getCssVariableValue = (cssVariableName: string) => {
  let cssVariableValue = ''
  try {
    // 没有拿到值时，会返回空串
    cssVariableValue = getComputedStyle(document.documentElement).getPropertyValue(cssVariableName)
  } catch (error) {
    console.error(error)
  }
  return cssVariableValue
}

/** 防抖，只有最后一次操作能被触发 */
export class Debounced {
  private timer: any
  /**
   * @param func 需要包装的函数
   * @param delay 延迟时间，单位ms
   */
  public use = (func: Function, delay = 200): Function => {
    return (...args: any) => {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        func.apply(this, args)
      }, delay)
    }
  }
}

/** 节流，返回函数连续调用时，间隔时间必须大于或等于 delay，func 才会执行 */
export class Throttle {
  private timer: any
  private resetTimer: any
  /**
   * @param func 需要包装的函数
   * @param delay 延迟时间，单位ms
   * @param immediate 是否默认执行一次(第一次不延迟)
   */
  public use = (func: Function, delay = 200, immediate = false): Function => {
    let flag = true
    let isImmediate = immediate
    return (...args: any) => {
      clearTimeout(this.resetTimer)
      if (isImmediate) {
        func.apply(this, args)
        isImmediate = false
        return
      }
      if (!flag) {
        return
      }
      flag = false
      this.timer = setTimeout(() => {
        func.apply(this, args)
        flag = true
        this.resetTimer = setTimeout(() => {
          isImmediate = immediate
        }, delay)
      }, delay)
    }
  }
}
