import { getAtPath } from "../utils/ObjectUtils"
import { StoreInterface } from "./StoreInterface"

/**
 * @typedef {(string | number)[]} PropertyPath
*/

export class NotReactiveStore extends StoreInterface {
  constructor(data) {
    super()
    /**
      * @type {object}
      * @private
    */
    this._data = structuredClone(data)

    /**
      * @type {object}
      * @private
    */
    this._defaultData = structuredClone(data)
  }

  /**
   * Method to get property value.
   * @param {PropertyPath} path
   */
  getValue(path) {
    return getAtPath(path, this._data)
  }


  /**
* Method to get property default value.
* @param {PropertyPath} path
*/
  getDefaultValue(path) {
    return getAtPath(path, this._defaultData)
  }


  /**
   * Method to set property value.
   * @param {PropertyPath} path
   * @param {any} value
   */
  setValue(path, value) {
    const propertyName = path.at(-1)
    const entryPath = path.slice(0, path.length - 1)

    const entry = getAtPath(entryPath, this._data)

    entry[propertyName] = value
  }

  /**
   * Method to get deep copy of data.
   */
  getData() {
    return structuredClone(this._data)
  }

  /**
   * Method to check if value of property is not same as default value.
   * @param {PropertyPath} path
   * @returns {boolean}
   */
  isChanged(path) {
    const value = JSON.stringify(this.getValue(path))
    const defaultValue = JSON.stringify(this.getDefaultValue(path))

    return value !== defaultValue
  }

  /**
   * Method to check if store contains any change.
   * @returns {boolean}
   */
  isDirty() {
    const data = JSON.stringify(this._data)
    const defaultData = JSON.stringify(this._defaultData)

    return data !== defaultData
  }
}