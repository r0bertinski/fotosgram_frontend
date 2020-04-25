import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

const URL = environment.url;

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(img: any, userId: string): any {
    const imgUrl = `${ URL }/posts/image/${ userId }/${ img }`;
    console.log('imgUrl', imgUrl);
    return imgUrl;
  }

}
