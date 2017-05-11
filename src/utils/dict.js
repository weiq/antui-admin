import {Session} from './storage';

class Dict {
  constructor() {
    this.dict = Session.getAttribute("dict");
  }

  /**
   * 跟据字典类型，获取对应字典
   */
  get(type) {
    if (this.dict == null) {
      console.error("dict is null");
    }
    return this.dict[type] || [];
  }

  /**
   * 跟据字典类型和值，获得对应字典名
   */
  getDictName(codeType, codeValue) {
    if (!this.dict) {
      console.error("dict is null");
    }
    if (!codeValue) return null;
    let code;
    if (codeType) {
      code = this.get(codeType).filter(item => item.code === codeValue)[0];
    } else {
      for (let i in this.dict) {
        for (let j in this.dict[i]) {
          if (dict[i][j].code === codeValue) {
            code = dict[i][j];
            break;
          } 
        }
      }
    }
    if (!code) return null;
    return code.codeName;
  }  
  
}

const dict = new Dict();

export default dict;