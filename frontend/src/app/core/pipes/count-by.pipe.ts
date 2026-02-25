import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
name: 'countBy',
standalone: true
})
export class CountByPipe implements PipeTransform {
transform(array: any[], campo: string, valor: string): number {
    if (!array || !array.length) return 0;
    return array.filter(item => item[campo] === valor).length;
}
}