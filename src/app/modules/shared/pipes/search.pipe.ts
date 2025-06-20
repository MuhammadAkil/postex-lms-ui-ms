import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchPipe'
})
export class SearchPipe implements PipeTransform {

  transform(array: any, text: string, params?: string[]): any {
    if (!array?.length) return []
    if(!text) return array
    
    return array.filter((item: any) => {
      if (!params) {
        return JSON.stringify(item).toString().toLowerCase().trim().includes(text.toLowerCase().trim())
      } else if (params?.length) {
        return params?.map(key=> item[key]).join("")
          .toLowerCase().trim().includes(text.toLowerCase().trim());
        
      }
      return true;
    });
  }

}
